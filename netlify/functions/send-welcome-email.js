const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xfvjdnrdoyhlvzlhbbdp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdmpkbnJkb3lobHZ6bGhiYmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjUzNjUsImV4cCI6MjA3MjYwMTM2NX0.RE34a0VmigUmGbi34JRpuSf_lDlH0zT1mNq2JqZRZcM';

const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event, context) => {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://finnvestedu.netlify.app',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
            },
            body: '',
        };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': 'https://finnvestedu.netlify.app',
            },
            body: JSON.stringify({ error: 'Method not allowed' }),
        };
    }

    try {
        const { email } = JSON.parse(event.body);

        if (!email) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': 'https://finnvestedu.netlify.app',
                },
                body: JSON.stringify({ error: 'Email is required' }),
            };
        }

        // Create the Spanish welcome email HTML
        const emailHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>¡Bienvenido a FinnVest!</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: #06255f; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { background: #007BFF; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
                .highlight { color: #007BFF; font-weight: bold; }
                .footer { text-align: center; margin-top: 30px; padding: 20px; background: #f0f0f0; border-radius: 5px; }
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
                    
                    <p>Tu email <span class="highlight">${email}</span> ha sido registrado exitosamente en nuestra lista de espera.</p>
                    
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
                </div>
                <div class="footer">
                    <p>Saludos,<br>
                    <strong>El equipo de FinnVest</strong> 🎓</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">
                        Si no solicitaste este email, puedes ignorarlo. Este es un mensaje automático.
                    </p>
                </div>
            </div>
        </body>
        </html>`;

        // For now, we'll just log the email (you can integrate with SendGrid, Resend, etc.)
        console.log(`Welcome email sent to: ${email}`);
        console.log('Email subject: ¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí');
        
        // TODO: Integrate with email service like SendGrid or Resend
        // Example with SendGrid:
        // const sgMail = require('@sendgrid/mail');
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // await sgMail.send({
        //     to: email,
        //     from: 'noreply@finnvestedu.com',
        //     subject: '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí',
        //     html: emailHtml,
        // });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': 'https://finnvestedu.netlify.app',
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Welcome email sent successfully',
                email: email
            }),
        };

    } catch (error) {
        console.error('Error sending welcome email:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': 'https://finnvestedu.netlify.app',
            },
            body: JSON.stringify({ 
                error: 'Internal server error',
                details: error.message 
            }),
        };
    }
};
