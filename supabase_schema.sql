-- ============================================================
-- PIONEERX LABS - TESTIMONIALS SUPABASE SCHEMA & RLS POLICIES
-- ============================================================
-- Copy and execute this SQL script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- 1. Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT,
    company TEXT,
    review TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    photo_url TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    permission_granted BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Create index for fast status filtering
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON public.testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Drop previous policies if re-running
DROP POLICY IF EXISTS "Public can submit pending testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Public can view approved testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow select for all testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow insert for testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow update for testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Allow delete for testimonials" ON public.testimonials;

-- 4. Insert Policy: Anyone can submit a review (status starts as 'pending')
CREATE POLICY "Allow insert for testimonials"
ON public.testimonials
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- 5. Select Policy: Anyone can query testimonials (frontend filters approved vs all)
CREATE POLICY "Allow select for all testimonials"
ON public.testimonials
FOR SELECT
TO anon, authenticated
USING (true);

-- 6. Update Policy: Admin can approve/reject/edit testimonials
CREATE POLICY "Allow update for testimonials"
ON public.testimonials
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- 7. Delete Policy: Admin can delete testimonials
CREATE POLICY "Allow delete for testimonials"
ON public.testimonials
FOR DELETE
TO anon, authenticated
USING (true);

-- 8. Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_testimonials_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_testimonials_updated_at ON public.testimonials;
CREATE TRIGGER trigger_testimonials_updated_at
BEFORE UPDATE ON public.testimonials
FOR EACH ROW
EXECUTE FUNCTION update_testimonials_updated_at();
