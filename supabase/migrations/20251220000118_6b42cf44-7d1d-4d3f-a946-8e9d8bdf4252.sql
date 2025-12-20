-- Create saved_charts table to store user birth charts with limit tracking
CREATE TABLE public.saved_charts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  birth_data JSONB NOT NULL,
  chart_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  premium_purchase_id TEXT -- Links chart to specific premium purchase
);

-- Add column to user_profiles to track current premium purchase and chart count
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS current_premium_id TEXT,
ADD COLUMN IF NOT EXISTS charts_created_count INTEGER NOT NULL DEFAULT 0;

-- Enable Row Level Security
ALTER TABLE public.saved_charts ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_charts
CREATE POLICY "Users can view their own saved charts" 
ON public.saved_charts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved charts" 
ON public.saved_charts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved charts" 
ON public.saved_charts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_saved_charts_user_id ON public.saved_charts(user_id);
CREATE INDEX idx_saved_charts_premium_purchase_id ON public.saved_charts(premium_purchase_id);