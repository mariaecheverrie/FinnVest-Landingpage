// EmailJS configuration for sending welcome emails
// This is a free service that can send emails from your website

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

// Function to send welcome email using EmailJS
async function sendWelcomeEmail(email) {
    try {
        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded');
            return { success: false, error: 'EmailJS not loaded' };
        }

        // Email template parameters
        const templateParams = {
            to_email: email,
            to_name: 'Usuario',
            from_name: 'FinnVest Team',
            subject: '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí',
            message: `
                ¡Hola! 👋
                
                ¡Estamos emocionados de tenerte en nuestro equipo!
                
                Tu email ${email} ha sido registrado exitosamente en nuestra lista de espera.
                
                ¿Qué sigue ahora? 🎯
                • 📚 Aprende desde cero: Más de 300 quizzes interactivos
                • 🎮 Practica sin riesgo: Simulador de inversiones 100% gratuito
                • 📈 De principiante a experto: Solo 5 minutos al día
                • 🛡️ Sin riesgo: Practica con dinero virtual
                
                Te notificaremos tan pronto como esté disponible la plataforma completa.
                
                ¡Mantente al día! 📱
                Síguenos en nuestras redes sociales:
                • Instagram: @finnvestedu
                • LinkedIn: FinnVest
                • Facebook: FinnVest
                
                ¡Gracias por confiar en nosotros para tu educación financiera!
                
                Saludos,
                El equipo de FinnVest 🎓
            `
        };

        // Send email using EmailJS
        const result = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        console.log('Email sent successfully:', result);
        return { success: true, result };

    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
}

// Make function globally available
window.sendWelcomeEmail = sendWelcomeEmail;
