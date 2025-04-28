import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lrysywqbugwlnveswsii.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxyeXN5d3FidWd3bG52ZXN3c2lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MjAzNTgsImV4cCI6MjA2MTI5NjM1OH0.2L-uPHb3qeYeLPZIFt8k0Sk4FCPjOxfp6loq5DwSD_A';

export const supabase = createClient(supabaseUrl, supabaseKey);
