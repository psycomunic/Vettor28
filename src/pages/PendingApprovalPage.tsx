import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PendingApprovalPage: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
            <div className="glass-card max-w-md w-full p-8 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent text-center">
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-yellow-500/10 rounded-full text-yellow-500">
                        <Clock size={48} />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-white mb-4">Aguardando Aprovação</h1>
                <p className="text-gray-400 mb-8">
                    Seu cadastro foi realizado com sucesso! Agora, é necessário aguardar a aprovação de um administrador para acessar o painel.
                </p>

                <div className="bg-white/5 p-4 rounded-xl mb-8 text-sm text-gray-400">
                    <p>Você será notificado por email assim que seu acesso for liberado.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <a
                        href="https://wa.me/5548999999999" // Replace with actual support number if known, or generic link
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-white/5 text-white font-bold uppercase tracking-widest py-3 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        Entrar em Contato
                        <ExternalLink size={18} />
                    </a>

                    <button
                        onClick={() => signOut()}
                        className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest font-bold"
                    >
                        Sair da conta
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovalPage;
