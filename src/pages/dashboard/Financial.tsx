import React from 'react';

const FinancialPage: React.FC = () => {
    return (
        <div>
            <h1 className="text-3xl font-brand font-black text-white mb-2">Financeiro</h1>
            <p className="text-gray-400 text-sm mb-8">Acompanhe a saúde financeira da sua operação.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* KPI Placeholders */}
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Receita Total</p>
                    <p className="text-2xl font-black text-white">R$ 0,00</p>
                </div>
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Ticket Médio</p>
                    <p className="text-2xl font-black text-white">R$ 0,00</p>
                </div>
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Lucro Real</p>
                    <p className="text-2xl font-black text-[#CCFF00]">R$ 0,00</p>
                </div>
                <div className="glass-card p-6 border-white/5">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">ROI</p>
                    <p className="text-2xl font-black text-green-500">0%</p>
                </div>
            </div>

            <div className="glass-card p-8 text-center text-gray-500">
                Gráficos em desenvolvimento.
            </div>
        </div>
    );
};

export default FinancialPage;
