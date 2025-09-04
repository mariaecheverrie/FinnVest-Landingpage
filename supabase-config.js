// Supabase Configuration for Netlify
const SUPABASE_URL = 'https://xfvjdnrdoyhlvzlhbbdp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhmdmpkbnJkb3lobHZ6bGhiYmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjUzNjUsImV4cCI6MjA3MjYwMTM2NX0.RE34a0VmigUmGbi34JRpuSf_lDlH0zT1mNq2JqZRZcM';

// CORS configuration for Netlify
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
};

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to add email to waitlist
async function addToWaitlist(email) {
    try {
        const { data, error } = await supabaseClient
            .from('waitlist')
            .insert([
                { 
                    email: email,
                    created_at: new Date().toISOString(),
                    source: 'website'
                }
            ]);

        if (error) {
            console.error('Error adding to waitlist:', error);
            return { success: false, error: error.message };
        }

        console.log('Successfully added to waitlist:', data);
        return { success: true, data };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { success: false, error: err.message };
    }
}

// Function to check if email already exists
async function checkEmailExists(email) {
    try {
        const { data, error } = await supabaseClient
            .from('waitlist')
            .select('email')
            .eq('email', email)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
            console.error('Error checking email:', error);
            return { exists: false, error: error.message };
        }

        return { exists: !!data, data };
    } catch (err) {
        console.error('Unexpected error:', err);
        return { exists: false, error: err.message };
    }
}

// Make functions globally available
window.addToWaitlist = addToWaitlist;
window.checkEmailExists = checkEmailExists;
