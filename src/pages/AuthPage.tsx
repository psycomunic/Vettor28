import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { NeonButton } from '../components/Shared';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (activeTab === 'login') {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/dashboard');
            } else {
                if (password !== confirmPassword) {
                    throw new Error('As senhas não conferem.');
                }

                const { error, data } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: name,
                            company_name: companyName, // Will be used by trigger to insert into profiles
                        },
                    },
                });

                if (error) throw error;
                if (data.session) {
                    navigate('/dashboard');
                } else {
                    setError('Verifique seu email para confirmar o cadastro (se o Magic Link estiver ativo).');
                }
            }
        } catch (err: any) {
            setError(err.message || 'Ocorreu um erro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 pt-32">
            <div className="w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card border-white/10 rounded-[2rem] overflow-hidden"
                >
                    {/* Tabs */}
                    <div className="flex border-b border-white/5">
                        <button
                            className={`flex-1 py-6 font-bold text-sm tracking-widest uppercase transition-colors ${activeTab === 'login' ? 'bg-[#CCFF00] text-black' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('login')}
                        >
                            Entrar
                        </button>
                        <button
                            className={`flex-1 py-6 font-bold text-sm tracking-widest uppercase transition-colors ${activeTab === 'register' ? 'bg-[#CCFF00] text-black' : 'text-gray-400 hover:text-white'}`}
                            onClick={() => setActiveTab('register')}
                        >
                            Criar Conta
                        </button>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex justify-center mb-8">
                            <img src="/logo.png" alt="Vettor28" className="h-12 w-auto" />
                        </div>
                        <h2 className="text-2xl font-brand font-black text-white mb-2 text-center">
                            {activeTab === 'login' ? 'Bem-vindo de volta' : 'Comece a escalar'}
                        </h2>
                        <p className="text-gray-400 text-center mb-8 text-sm">
                            {activeTab === 'login' ? 'Acesse seu dashboard de performance.' : 'Cadastre sua hospedagem no ecossistema Vettor28.'}
                        </p>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="space-y-4">
                            {activeTab === 'register' && (
                                <>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nome Completo</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-all"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Nome da Hospedagem</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-all"
                                            value={companyName}
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            placeholder="Ex: Pousada Vista Alegre"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">E-mail</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Senha</label>
                                <div className="relative">
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-all pr-12"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {activeTab === 'register' && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Confirmar Senha</label>
                                    <input
                                        required
                                        type="password"
                                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-all"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                            )}

                            <div className="pt-4">
                                <NeonButton type="submit" className="w-full">
                                    {loading ? <Loader2 className="animate-spin" /> : (activeTab === 'login' ? 'Entrar' : 'Cadastrar')}
                                </NeonButton>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
