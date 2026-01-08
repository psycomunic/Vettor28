import { createClient } from '@supabase/supabase-js';

// Access environment variables using Vite's import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://jpvjzplixfcjkmqpggwj.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impwdmp6cGxpeGZjamttcXBnZ3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4ODExMjksImV4cCI6MjA4MzQ1NzEyOX0.5gloaziKzFslM1B3wgF5BlzdLGbDPdE4pKDyOJCZ9c4";

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables! Check your .env.local file.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');
