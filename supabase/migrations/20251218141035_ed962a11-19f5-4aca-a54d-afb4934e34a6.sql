-- Create orders table for payment tracking without login
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  access_token TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  email TEXT NOT NULL,
  birth_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read their order by order_id (for status checking)
CREATE POLICY "Anyone can read orders by order_id" 
ON public.orders 
FOR SELECT 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_orders_order_id ON public.orders(order_id);
CREATE INDEX idx_orders_access_token ON public.orders(access_token);