import React from 'react';

const MarketingPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-brand font-black text-white mb-2">Marketing & Performance</h1>
            <p className="text-gray-400 text-sm mb-8">Ouro da Agência: Monitore o retorno dos seus investimentos.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Investimento (Ads)</p>
                    <p className="text-2xl font-black text-white">R$ 0,00</p>
                </div>
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Leads Gerados</p>
                    <p className="text-2xl font-black text-white">0</p>
                </div>
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Custo por Reserva</p>
                    <p className="text-2xl font-black text-white">R$ 0,00</p>
                </div>
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Alcance / Impressões</p>
                    <p className="text-2xl font-black text-[#CCFF00]">0</p>
                </div>
            </div>

            <div className="glass-card p-8 text-center text-gray-500">
                Métricas detalhadas em desenvolvimento.
            </div>
        </div>
    );
};

export default MarketingPage;
