import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmailConfirmedPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <div className="glass-card max-w-md w-full p-8 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-[#CCFF00]/10 rounded-full text-[#CCFF00]">
                        <CheckCircle2 size={48} />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-white mb-4">Email Verificado!</h1>
                <p className="text-gray-400 mb-8">
                    Seu email foi confirmado com sucesso. Você já pode acessar sua conta.
                </p>

                <button
                    onClick={() => navigate('/auth')}
                    className="w-full bg-[#CCFF00] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 group"
                >
                    Ir para Login
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default EmailConfirmedPage;
