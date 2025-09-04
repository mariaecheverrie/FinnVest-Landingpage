-- Create waitlist table for FinnVest website
CREATE TABLE IF NOT EXISTS waitlist (
    id BIGSERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    source TEXT DEFAULT 'website',
    subscribed BOOLEAN DEFAULT true,
    notes TEXT
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index for created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to insert emails
CREATE POLICY "Allow anonymous insert" ON waitlist
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Create policy to allow anonymous users to select their own emails (for duplicate checking)
CREATE POLICY "Allow anonymous select" ON waitlist
    FOR SELECT 
    TO anon 
    USING (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON waitlist TO anon;
GRANT USAGE, SELECT ON SEQUENCE waitlist_id_seq TO anon;

-- Create a function to handle CORS preflight requests
CREATE OR REPLACE FUNCTION handle_cors_preflight()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- This function handles CORS preflight requests
    -- It's called by the API when OPTIONS requests are made
    PERFORM 1;
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION handle_cors_preflight() TO anon;
