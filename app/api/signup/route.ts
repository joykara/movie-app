import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

// Handle POST requests for signup
export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const { data, error } = await supabase.auth.signUp({ email, password });
        console.log(data, error)

        if (error) {
            if (error.message.includes('User already registered')) {
                return NextResponse.json(
                    { message: 'This email is already registered. Please log in.' },
                    { status: 400 }
                );
            }
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { message: 'Check your email for the confirmation link!' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}
