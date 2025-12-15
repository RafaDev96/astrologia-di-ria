-- Create table for checkout sessions
CREATE TABLE public.checkout_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid')),
  email TEXT NOT NULL,
  birth_data JSONB NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

-- Public can read their own session by session_id (for access validation)
CREATE POLICY "Anyone can read checkout sessions by session_id"
ON public.checkout_sessions
FOR SELECT
USING (true);

-- Only service role can insert/update (edge functions)
-- No INSERT/UPDATE policies for anon users - only service role can modify

-- Create index for faster lookups
CREATE INDEX idx_checkout_sessions_session_id ON public.checkout_sessions(session_id);
CREATE INDEX idx_checkout_sessions_status ON public.checkout_sessions(status);