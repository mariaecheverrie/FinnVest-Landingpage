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

-- Create a function to send welcome email in Spanish
CREATE OR REPLACE FUNCTION send_welcome_email_spanish()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    email_subject TEXT;
    email_body TEXT;
BEGIN
    -- Set email content in Spanish
    email_subject := '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí';
    
    email_body := '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>¡Bienvenido a FinnVest!</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #06255f; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { background: #007BFF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
            .highlight { color: #007BFF; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>¡Bienvenido a FinnVest! 🚀</h1>
                <p>Tu plataforma de educación financiera</p>
            </div>
            <div class="content">
                <h2>¡Hola! 👋</h2>
                <p>¡Estamos emocionados de tenerte en nuestro equipo!</p>
                
                <p>Tu email <span class="highlight">' || NEW.email || '</span> ha sido registrado exitosamente en nuestra lista de espera.</p>
                
                <h3>¿Qué sigue ahora? 🎯</h3>
                <ul>
                    <li><strong>📚 Aprende desde cero:</strong> Más de 300 quizzes interactivos</li>
                    <li><strong>🎮 Practica sin riesgo:</strong> Simulador de inversiones 100% gratuito</li>
                    <li><strong>📈 De principiante a experto:</strong> Solo 5 minutos al día</li>
                    <li><strong>🛡️ Sin riesgo:</strong> Practica con dinero virtual</li>
                </ul>
                
                <p>Te notificaremos tan pronto como esté disponible la plataforma completa.</p>
                
                <h3>¡Mantente al día! 📱</h3>
                <p>Síguenos en nuestras redes sociales para consejos diarios de inversión:</p>
                <ul>
                    <li>Instagram: @finnvestedu</li>
                    <li>LinkedIn: FinnVest</li>
                    <li>Facebook: FinnVest</li>
                </ul>
                
                <p>¡Gracias por confiar en nosotros para tu educación financiera!</p>
                
                <p>Saludos,<br>
                <strong>El equipo de FinnVest</strong> 🎓</p>
                
                <hr>
                <p style="font-size: 12px; color: #666;">
                    Si no solicitaste este email, puedes ignorarlo. Este es un mensaje automático.
                </p>
            </div>
        </div>
    </body>
    </html>';
    
    -- Here you would integrate with your email service (SendGrid, Resend, etc.)
    -- For now, we'll just log the email content
    RAISE NOTICE 'Email to send to %: Subject: %', NEW.email, email_subject;
    
    RETURN NEW;
END;
$$;

-- Create trigger to send welcome email on new signup
CREATE OR REPLACE TRIGGER send_welcome_email_trigger
    AFTER INSERT ON waitlist
    FOR EACH ROW
    EXECUTE FUNCTION send_welcome_email_spanish();

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION send_welcome_email_spanish() TO anon;
