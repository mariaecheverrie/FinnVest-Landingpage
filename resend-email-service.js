// Resend email service for sending beautiful welcome emails
// Free tier: 3,000 emails/month

const RESEND_API_KEY = 'YOUR_RESEND_API_KEY'; // Replace with your Resend API key
const FROM_EMAIL = 'noreply@finnvestedu.com'; // Your verified domain email

// Function to send welcome email using Resend
async function sendWelcomeEmailResend(email) {
    try {
        const emailData = {
            from: FROM_EMAIL,
            to: [email],
            subject: '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>¡Bienvenido a FinnVest!</title>
                    <style>
                        body { 
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
                            line-height: 1.6; 
                            color: #333; 
                            margin: 0; 
                            padding: 0; 
                            background-color: #f4f4f4;
                        }
                        .container { 
                            max-width: 600px; 
                            margin: 0 auto; 
                            background: white;
                            border-radius: 10px;
                            overflow: hidden;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header { 
                            background: linear-gradient(135deg, #06255f 0%, #007BFF 100%);
                            color: white; 
                            padding: 40px 30px; 
                            text-align: center; 
                        }
                        .header h1 { 
                            margin: 0; 
                            font-size: 28px; 
                            font-weight: 700;
                        }
                        .header p { 
                            margin: 10px 0 0 0; 
                            font-size: 16px; 
                            opacity: 0.9;
                        }
                        .content { 
                            padding: 40px 30px; 
                        }
                        .welcome-section {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .welcome-section h2 {
                            color: #06255f;
                            font-size: 24px;
                            margin-bottom: 15px;
                        }
                        .highlight { 
                            color: #007BFF; 
                            font-weight: bold; 
                            background: #f0f8ff;
                            padding: 2px 6px;
                            border-radius: 4px;
                        }
                        .features {
                            background: #f8f9fa;
                            padding: 25px;
                            border-radius: 8px;
                            margin: 25px 0;
                        }
                        .features h3 {
                            color: #06255f;
                            margin-top: 0;
                            font-size: 20px;
                        }
                        .feature-list {
                            list-style: none;
                            padding: 0;
                        }
                        .feature-list li {
                            padding: 8px 0;
                            border-bottom: 1px solid #e9ecef;
                        }
                        .feature-list li:last-child {
                            border-bottom: none;
                        }
                        .social-section {
                            text-align: center;
                            margin: 30px 0;
                            padding: 20px;
                            background: #f8f9fa;
                            border-radius: 8px;
                        }
                        .social-links {
                            margin: 15px 0;
                        }
                        .social-links a {
                            color: #007BFF;
                            text-decoration: none;
                            margin: 0 10px;
                            font-weight: 500;
                        }
                        .footer { 
                            text-align: center; 
                            margin-top: 30px; 
                            padding: 20px; 
                            background: #f8f9fa; 
                            border-top: 1px solid #e9ecef;
                        }
                        .footer p {
                            margin: 5px 0;
                            font-size: 14px;
                        }
                        .disclaimer {
                            font-size: 12px; 
                            color: #666;
                            margin-top: 20px;
                            padding-top: 15px;
                            border-top: 1px solid #e9ecef;
                        }
                        .cta-button {
                            display: inline-block;
                            background: #007BFF;
                            color: white;
                            padding: 12px 25px;
                            text-decoration: none;
                            border-radius: 6px;
                            font-weight: 600;
                            margin: 20px 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>¡Bienvenido a FinnVest! 🚀</h1>
                            <p>Tu plataforma de educación financiera</p>
                        </div>
                        <div class="content">
                            <div class="welcome-section">
                                <h2>¡Hola! 👋</h2>
                                <p>¡Estamos emocionados de tenerte en nuestro equipo!</p>
                                <p>Tu email <span class="highlight">${email}</span> ha sido registrado exitosamente en nuestra lista de espera.</p>
                            </div>
                            
                            <div class="features">
                                <h3>¿Qué sigue ahora? 🎯</h3>
                                <ul class="feature-list">
                                    <li><strong>📚 Aprende desde cero:</strong> Más de 300 quizzes interactivos</li>
                                    <li><strong>🎮 Practica sin riesgo:</strong> Simulador de inversiones 100% gratuito</li>
                                    <li><strong>📈 De principiante a experto:</strong> Solo 5 minutos al día</li>
                                    <li><strong>🛡️ Sin riesgo:</strong> Practica con dinero virtual</li>
                                    <li><strong>🏆 Gamificación:</strong> Aprende jugando y ganando</li>
                                    <li><strong>📱 Accesible:</strong> Juega en cualquier lugar</li>
                                </ul>
                            </div>
                            
                            <p style="text-align: center; font-size: 18px; color: #06255f; font-weight: 600;">
                                Te notificaremos tan pronto como esté disponible la plataforma completa.
                            </p>
                            
                            <div class="social-section">
                                <h3>¡Mantente al día! 📱</h3>
                                <p>Síguenos en nuestras redes sociales para consejos diarios de inversión:</p>
                                <div class="social-links">
                                    <a href="https://instagram.com/finnvestedu">Instagram: @finnvestedu</a><br>
                                    <a href="https://linkedin.com/company/finnvest">LinkedIn: FinnVest</a><br>
                                    <a href="https://facebook.com/finnvestedu">Facebook: FinnVest</a>
                                </div>
                            </div>
                            
                            <p style="text-align: center; font-size: 16px;">
                                ¡Gracias por confiar en nosotros para tu educación financiera!
                            </p>
                        </div>
                        
                        <div class="footer">
                            <p><strong>Saludos,</strong></p>
                            <p><strong>El equipo de FinnVest</strong> 🎓</p>
                            <div class="disclaimer">
                                <p>Si no solicitaste este email, puedes ignorarlo. Este es un mensaje automático.</p>
                                <p>FinnVest - Educación financiera para todos</p>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Email sent successfully via Resend:', result);
            return { success: true, result };
        } else {
            const error = await response.json();
            console.error('Resend API error:', error);
            return { success: false, error: error.message || 'Failed to send email' };
        }

    } catch (error) {
        console.error('Error sending email via Resend:', error);
        return { success: false, error: error.message };
    }
}

// Make function globally available
window.sendWelcomeEmailResend = sendWelcomeEmailResend;
