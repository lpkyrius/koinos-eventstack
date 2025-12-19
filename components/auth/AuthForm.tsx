'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { loginSchema, signUpSchema } from '@/lib/schemas/auth';
import { Loader2, Mail, Lock, UserPlus, LogIn } from 'lucide-react';

type AuthMode = 'login' | 'signup';

export const AuthForm: React.FC = () => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setError(null);
        setSuccess(null);
        setFieldErrors({});
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const values = { email, password };

        // Validation
        const schema = mode === 'login' ? loginSchema : signUpSchema;
        const result = schema.safeParse(values);

        if (!result.success) {
            const formattedErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0]?.toString();
                if (path) {
                    formattedErrors[path] = issue.message;
                }
            });
            setFieldErrors(formattedErrors);
            setLoading(false);
            return;
        }

        try {
            if (mode === 'signup') {
                const { data, error: signUpError } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (signUpError) throw signUpError;

                console.log('Sign-up successful, session:', data.session);
                setSuccess('Account created! Please check your email for verification.');

                // Redirect if session is already active (auto-login enabled in Supabase)
                if (data.session) {
                    router.push('/dashboard');
                }
            } else {
                const { data, error: signInError } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (signInError) throw signInError;

                console.log('Login successful, session:', data.session);
                router.push('/dashboard');
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred during authentication.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-card">
            <div className="auth-header">
                <h1 className="auth-title">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="auth-subtitle">
                    {mode === 'login'
                        ? 'Enter your credentials to access your account'
                        : 'Join us today and start managing your events'}
                </p>
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                            <Mail size={18} />
                        </span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="form-input"
                            placeholder="you@example.com"
                            required
                            style={{ paddingLeft: '2.75rem' }}
                        />
                    </div>
                    {fieldErrors.email && <p className="form-error">{fieldErrors.email}</p>}
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                            <Lock size={18} />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            required
                            style={{ paddingLeft: '2.75rem' }}
                        />
                    </div>
                    {fieldErrors.password && <p className="form-error">{fieldErrors.password}</p>}
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Loader2 className="animate-spin" size={20} />
                            Please wait...
                        </span>
                    ) : (
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            {mode === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
                            {mode === 'login' ? 'Sign In' : 'Sign Up'}
                        </span>
                    )}
                </button>
            </form>

            <div className="auth-switch">
                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button className="auth-link" onClick={toggleMode} type="button">
                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
            </div>
        </div>
    );
};
