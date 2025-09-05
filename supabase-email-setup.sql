-- Supabase Email Setup using Edge Functions
-- This is a simpler approach using Supabase Edge Functions

-- Create a simple function that logs the email (for now)
-- The actual email sending will be handled by a Supabase Edge Function
CREATE OR REPLACE FUNCTION send_welcome_email_spanish()
RETURNS TRIGGER AS $$
DECLARE
    email_subject TEXT := '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí';
BEGIN
    -- For now, just log that an email should be sent
    -- The actual email sending will be handled by the client-side code
    RAISE NOTICE 'Email should be sent to % with subject: %', NEW.email, email_subject;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS send_welcome_email_trigger ON waitlist;

-- Create the trigger
CREATE TRIGGER send_welcome_email_trigger
    AFTER INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION send_welcome_email_spanish();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION send_welcome_email_spanish() TO anon;
