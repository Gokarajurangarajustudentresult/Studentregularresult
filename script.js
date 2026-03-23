// ============================================
// CONFIGURE YOUR SUPABASE SETTINGS HERE
// ============================================
const SUPABASE_URL = 'https://acygyzsepdlpqubsbhrr.supabase.co'; // e.g., https://your-project.supabase.co
const SUPABASE_KEY = 'sb_publishable_NUWcPhZSAGMc6HEQbcwGxA_4j04h3IP'; // Your public anon key
const BUCKET_NAME = 'images'; // Storage bucket name
const IMAGE_PATH = 'WhatsApp%20Image%202026-03-23%20at%206.19.18%20PM.jpeg'; // Path to your image in Supabase
// ============================================

let supabaseClient = null;

// DOM Elements
const displayImage = document.getElementById('displayImage');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSupabase();
    loadImage();
});

// Initialize Supabase client
function initializeSupabase() {
    if (!SUPABASE_URL || !SUPABASE_KEY || SUPABASE_URL === 'YOUR_SUPABASE_URL') {
        console.error('Please configure Supabase credentials in script.js');
        displayImage.alt = 'Configuration required';
        return;
    }

    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
    }
}

// Load image from Supabase
async function loadImage() {
    if (!supabaseClient) {
        console.error('Supabase client not initialized');
        return;
    }

    try {
        // Get public URL of the image
        const { data } = supabaseClient
            .storage
            .from(BUCKET_NAME)
            .getPublicUrl(IMAGE_PATH);

        if (data && data.publicUrl) {
            displayImage.src = data.publicUrl;
            displayImage.alt = 'Image from Supabase';
            console.log('Image loaded successfully:', data.publicUrl);
        }
    } catch (error) {
        console.error('Failed to load image:', error);
        displayImage.alt = 'Failed to load image';
    }
}

// Optional: Add touch/mouse event listeners if needed
displayImage.addEventListener('load', () => {
    console.log('Image fully loaded');
});

displayImage.addEventListener('error', () => {
    console.error('Error loading image');
    displayImage.alt = 'Failed to load image';
});
