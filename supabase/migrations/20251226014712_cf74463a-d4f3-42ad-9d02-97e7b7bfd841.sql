-- Function to get all users for admin panel
CREATE OR REPLACE FUNCTION public.get_admin_users(
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0,
  p_search text DEFAULT NULL,
  p_filter text DEFAULT 'all'
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  SELECT json_build_object(
    'users', (
      SELECT json_agg(row_to_json(t))
      FROM (
        SELECT 
          up.id,
          up.user_id,
          au.email,
          up.is_premium,
          up.created_at,
          up.updated_at,
          up.premium_activated_at,
          up.mp_last_payment_id,
          up.charts_created_count,
          up.birth_data
        FROM public.user_profiles up
        LEFT JOIN auth.users au ON au.id = up.user_id
        WHERE 
          (p_search IS NULL OR au.email ILIKE '%' || p_search || '%')
          AND (
            p_filter = 'all'
            OR (p_filter = 'premium' AND up.is_premium = true)
            OR (p_filter = 'free' AND up.is_premium = false)
          )
        ORDER BY up.created_at DESC
        LIMIT p_limit
        OFFSET p_offset
      ) t
    ),
    'total', (
      SELECT COUNT(*)
      FROM public.user_profiles up
      LEFT JOIN auth.users au ON au.id = up.user_id
      WHERE 
        (p_search IS NULL OR au.email ILIKE '%' || p_search || '%')
        AND (
          p_filter = 'all'
          OR (p_filter = 'premium' AND up.is_premium = true)
          OR (p_filter = 'free' AND up.is_premium = false)
        )
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Function to toggle premium status (admin only)
CREATE OR REPLACE FUNCTION public.admin_toggle_premium(p_user_id uuid, p_is_premium boolean)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  UPDATE public.user_profiles
  SET 
    is_premium = p_is_premium,
    premium_activated_at = CASE WHEN p_is_premium THEN now() ELSE NULL END,
    updated_at = now()
  WHERE user_id = p_user_id;
  
  SELECT json_build_object(
    'success', true,
    'user_id', p_user_id,
    'is_premium', p_is_premium
  ) INTO result;
  
  RETURN result;
END;
$$;

-- Function to get payment history for admin
CREATE OR REPLACE FUNCTION public.get_admin_payments(
  p_limit integer DEFAULT 50,
  p_offset integer DEFAULT 0
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied: Admin role required';
  END IF;
  
  SELECT json_build_object(
    'payments', (
      SELECT json_agg(row_to_json(t))
      FROM (
        SELECT 
          o.id,
          o.order_id,
          o.email,
          o.status,
          o.created_at,
          o.paid_at,
          o.birth_data
        FROM public.orders o
        ORDER BY o.created_at DESC
        LIMIT p_limit
        OFFSET p_offset
      ) t
    ),
    'total', (SELECT COUNT(*) FROM public.orders),
    'paid_count', (SELECT COUNT(*) FROM public.orders WHERE status = 'paid'),
    'pending_count', (SELECT COUNT(*) FROM public.orders WHERE status = 'pending')
  ) INTO result;
  
  RETURN result;
END;
$$;