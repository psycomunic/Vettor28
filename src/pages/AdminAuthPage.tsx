import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { NeonButton } from '../components/Shared';
import { Eye, EyeOff, Loader2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminAuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [masterKey, setMasterKey] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Security Check (Simple Client-Side for now, ideally verified via Edge Function)
        // In a real app complexity, this should be server-side validated to prevent bypassing.
        // For this MVP, assuming the URL is somewhat secret and this check keeps out casual users.
        if (masterKey !== 'Vettor28MasterAdmin') {
            setError('Chave Mestra inválida. Acesso negado.');
            setLoading(false);
            return;
        }

        try {
            const { error, data } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        company_name: 'Vettor28 Admin',
                        role: 'admin',
                        status: 'approved'
                    },
                },
            });

            if (error) throw error;
            if (data.session) {
                navigate('/admin');
            } else {
                setError('Verifique seu email para confirmar o cadastro de administrador.');
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card border-red-500/20 rounded-[2rem] overflow-hidden p-8 border"
                >
                    <div className="flex justify-center mb-6">
                        <div className="bg-red-500/10 p-4 rounded-full text-red-500 animate-pulse">
                            <ShieldAlert size={40} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-center mb-2 uppercase tracking-tight">Cadastro de Admin</h2>
                    <p className="text-center text-gray-500 text-xs mb-8">Esta área é restrita para administradores do sistema.</p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6 text-center font-bold">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nome Admin</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">E-mail</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Senha</label>
                            <div className="relative">
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-red-500 outline-none transition-all pr-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-red-500 uppercase tracking-widest">Chave Mestra</label>
                            <input
                                required
                                type="password"
                                className="w-full bg-red-900/10 border border-red-500/50 rounded-xl p-4 text-red-500 focus:border-red-500 outline-none transition-all placeholder-red-900/50"
                                value={masterKey}
                                onChange={(e) => setMasterKey(e.target.value)}
                                placeholder="Insira a chave de segurança"
                            />
                        </div>

                        <div className="pt-4">
                            <NeonButton type="submit" className="w-full !bg-red-500 hover:!bg-red-600 !text-white !border-none">
                                {loading ? <Loader2 className="animate-spin" /> : 'Criar Acesso Admin'}
                            </NeonButton>
                        </div>
                    </form>
                </motion.div>

                <p className="text-center text-gray-600 text-[10px] mt-8 uppercase tracking-widest">
                    Acesso monitorado e restrito.
                </p>
            </div>
        </div>
    );
};

export default AdminAuthPage;
