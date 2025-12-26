
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create admin_metrics view for dashboard
CREATE VIEW public.admin_metrics AS
SELECT
  (SELECT COUNT(*) FROM public.user_profiles) as total_users,
  (SELECT COUNT(*) FROM public.user_profiles WHERE is_premium = true) as premium_users,
  (SELECT COUNT(*) FROM public.user_profiles WHERE created_at > now() - interval '7 days') as new_users_week,
  (SELECT COUNT(*) FROM public.user_profiles WHERE premium_activated_at > now() - interval '30 days') as conversions_month,
  (SELECT COUNT(*) FROM public.saved_charts) as total_charts;

-- Grant access to authenticated users (will be filtered by RLS check in function)
GRANT SELECT ON public.admin_metrics TO authenticated;

-- Function to get metrics (only for admins)
CREATE OR REPLACE FUNCTION public.get_admin_metrics()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  SELECT json_build_object(
    'total_users', (SELECT COUNT(*) FROM public.user_profiles),
    'premium_users', (SELECT COUNT(*) FROM public.user_profiles WHERE is_premium = true),
    'new_users_week', (SELECT COUNT(*) FROM public.user_profiles WHERE created_at > now() - interval '7 days'),
    'conversions_month', (SELECT COUNT(*) FROM public.user_profiles WHERE premium_activated_at > now() - interval '30 days'),
    'total_charts', (SELECT COUNT(*) FROM public.saved_charts),
    'recent_signups', (
      SELECT json_agg(row_to_json(t))
      FROM (
        SELECT id, user_id, is_premium, created_at, premium_activated_at
        FROM public.user_profiles
        ORDER BY created_at DESC
        LIMIT 10
      ) t
    ),
    'recent_premium', (
      SELECT json_agg(row_to_json(t))
      FROM (
        SELECT id, user_id, is_premium, premium_activated_at, mp_last_payment_id
        FROM public.user_profiles
        WHERE is_premium = true
        ORDER BY premium_activated_at DESC
        LIMIT 10
      ) t
    )
  ) INTO result;
  
  RETURN result;
END;
$$;
