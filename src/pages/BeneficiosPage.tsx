import React from 'react';
import { Clock, ShieldCheck, BarChart3 } from 'lucide-react';
import { PageWrapper, SectionTitle } from '../components/Shared';

const BeneficiosPage: React.FC = () => (
    <PageWrapper>
        <div className="container mx-auto px-6">
            <SectionTitle subtitle="Vantagens" title="Sua hospedagem em outro nível" />
            <div className="grid md:grid-cols-3 gap-12 text-center">
                {[
                    { icon: <Clock size={40} />, title: "Venda na Baixa Temporada", desc: "Acabamos com a ociosidade criando campanhas específicas para dias de semana e períodos calmos." },
                    { icon: <ShieldCheck size={40} />, title: "Independência Total", desc: "Pague menos comissões para Booking e Airbnb e tenha o controle total dos seus hóspedes." },
                    { icon: <BarChart3 size={40} />, title: "Previsibilidade de Caixa", desc: "Saiba exatamente quanto você vai faturar no próximo mês com nossa inteligência de dados." }
                ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 border border-[#CCFF00]/20">
                            {b.icon}
                        </div>
                        <h4 className="text-2xl font-bold mb-4">{b.title}</h4>
                        <p className="text-gray-400 leading-relaxed">{b.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </PageWrapper>
);

export default BeneficiosPage;
