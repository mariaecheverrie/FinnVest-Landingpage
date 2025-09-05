import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get the email from the request body
    const { email } = await req.json()

    if (!email) {
      return new Response(
        JSON.stringify({ error: 'Email is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Create the HTML email content
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Bienvenido a FinnVest!</title>
        <style>
            body { 
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; 
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
                background: linear-gradient(135deg, #007BFF 0%, #0056CC 100%); 
                color: white; 
                padding: 30px 20px; 
                text-align: center;
            }
            .header h1 { 
                margin: 0; 
                font-size: 28px; 
                font-weight: bold;
            }
            .content { 
                padding: 30px 20px; 
            }
            .welcome-text { 
                font-size: 18px; 
                margin-bottom: 20px; 
                color: #2c3e50;
            }
            .highlight { 
                color: #007BFF; 
                font-weight: bold;
            }
            .cta-button { 
                display: inline-block; 
                background: linear-gradient(135deg, #007BFF 0%, #0056CC 100%); 
                color: white; 
                padding: 15px 30px; 
                text-decoration: none; 
                border-radius: 25px; 
                font-weight: bold; 
                margin: 20px 0;
                text-align: center;
            }
            .features { 
                margin: 30px 0; 
            }
            .feature { 
                margin: 15px 0; 
                padding: 10px 0; 
                border-left: 3px solid #007BFF; 
                padding-left: 15px;
            }
            .footer { 
                background: #f8f9fa; 
                padding: 20px; 
                text-align: center; 
                color: #666; 
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚀 ¡Bienvenido a FinnVest!</h1>
            </div>
            <div class="content">
                <div class="welcome-text">
                    <p>¡Hola!</p>
                    <p>¡Estamos emocionados de tenerte en <span class="highlight">FinnVest</span>! Tu viaje hacia la independencia financiera comienza ahora.</p>
                </div>
                
                <div class="features">
                    <h3>🎯 Lo que obtienes con FinnVest:</h3>
                    <div class="feature">
                        <strong>📚 Aprende sin riesgo:</strong> Practica con dinero virtual antes de invertir real
                    </div>
                    <div class="feature">
                        <strong>🎓 Educación de calidad:</strong> Cursos diseñados por expertos financieros
                    </div>
                    <div class="feature">
                        <strong>💡 Estrategias probadas:</strong> Técnicas que realmente funcionan en el mercado
                    </div>
                    <div class="feature">
                        <strong>🤝 Comunidad activa:</strong> Conecta con otros inversionistas como tú
                    </div>
                </div>
                
                <p style="text-align: center;">
                    <a href="https://finnvestedu.netlify.app" class="cta-button">
                        🚀 Comenzar mi viaje financiero
                    </a>
                </p>
                
                <p style="font-size: 16px; color: #2c3e50;">
                    <strong>¿Qué sigue?</strong><br>
                    Te mantendremos informado sobre el lanzamiento oficial y tendrás acceso prioritario a todas las funcionalidades.
                </p>
            </div>
            <div class="footer">
                <p><strong>FinnVest</strong> - Tu futuro financiero comienza aquí</p>
                <p>Si no solicitaste este email, puedes ignorarlo. Este es un mensaje automático.</p>
            </div>
        </div>
    </body>
    </html>`

    // Send email using Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FinnVest <mdmecheverri@gmail.com>',
        to: email,
        subject: '¡Bienvenido a FinnVest! 🚀 Tu futuro financiero comienza aquí',
        html: emailHtml,
      }),
    })

    if (!resendResponse.ok) {
      const error = await resendResponse.text()
      console.error('Resend error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const result = await resendResponse.json()
    console.log('Email sent successfully:', result)

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})
