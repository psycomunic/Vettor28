import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    isApproved: boolean; // New field
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    isAdmin: false,
    isApproved: false,
    signOut: async () => { },
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        const fetchProfile = async (uid: string) => {
            const { data } = await supabase.from('profiles').select('role, status').eq('id', uid).single();
            if (data?.role === 'admin') setIsAdmin(true);
            else setIsAdmin(false);

            // Check status
            if (data?.status === 'approved') setIsApproved(true);
            else setIsApproved(false);
        };

        // Check active session
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                // IMMEDIATE CHECK: Use metadata as first source of truth to avoid flash
                if (session.user.user_metadata?.role === 'admin') setIsAdmin(true);
                if (session.user.user_metadata?.status === 'approved') setIsApproved(true);

                // Then fetch fresh data from DB
                await fetchProfile(session.user.id);
            }
            setLoading(false);
        }).catch((err) => {
            console.error('Auth session error:', err);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            try {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    setLoading(true);

                    // IMMEDIATE CHECK: Use metadata as first source of truth
                    if (session.user.user_metadata?.role === 'admin') setIsAdmin(true);
                    if (session.user.user_metadata?.status === 'approved') setIsApproved(true);

                    // Safety timeout
                    const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 5000));
                    await Promise.race([
                        fetchProfile(session.user.id),
                        timeoutPromise
                    ]);
                } else {
                    setIsAdmin(false);
                    setIsApproved(false);
                }
            } catch (error) {
                console.error('Auth state change error:', error);
            } finally {
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setIsAdmin(false);
        setIsApproved(false);
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut, isAdmin, isApproved }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
