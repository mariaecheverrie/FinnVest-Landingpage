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
                'Access-Control-Allow-Origin': '*',
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
                'Access-Control-Allow-Origin': '*',
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
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ error: 'Email is required' }),
            };
        }

        // Check if email already exists
        const { data: existingEmail } = await supabase
            .from('waitlist')
            .select('email')
            .eq('email', email)
            .single();

        if (existingEmail) {
            return {
                statusCode: 409,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ error: 'Email already exists' }),
            };
        }

        // Insert new email
        const { data, error } = await supabase
            .from('waitlist')
            .insert([
                {
                    email: email,
                    created_at: new Date().toISOString(),
                    source: 'netlify-website',
                    subscribed: true
                }
            ]);

        if (error) {
            throw error;
        }

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Email added successfully',
                data: data 
            }),
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ 
                error: 'Internal server error',
                details: error.message 
            }),
        };
    }
};
