import React from 'react';
import { TrendingUp, PenTool, Globe, Zap } from 'lucide-react';
import { PageWrapper, SectionTitle, NeonButton } from '../components/Shared';

const ServicosPage: React.FC = () => (
    <PageWrapper>
        <div className="container mx-auto px-6">
            <SectionTitle subtitle="Especialidades" title="Soluções que geram diárias" />
            <div className="grid lg:grid-cols-3 gap-8">
                {[
                    {
                        icon: <TrendingUp size={40} />,
                        title: "Performance Ads",
                        features: ["Meta Ads Estratégico", "Google Search & Maps", "Remarketing de Desejo", "Dashboard de Vendas"],
                        desc: "Levamos as pessoas certas para o seu site no momento exato da decisão de viagem."
                    },
                    {
                        icon: <PenTool size={40} />,
                        title: "Luxury Branding",
                        features: ["Identidade Visual Premium", "Produção de Criativos", "Copywriting Hipnótico", "Curadoria de Imagem"],
                        desc: "Criamos uma marca que respira exclusividade e justifica seu ticket médio."
                    },
                    {
                        icon: <Globe size={40} />,
                        title: "Direct Sales Setup",
                        features: ["Motor de Reservas", "Landing Pages", "Treinamento de Atendimento", "Gestão de CRM"],
                        desc: "Reduzimos sua dependência de intermediários focando no canal de venda direto."
                    }
                ].map((s, i) => (
                    <div key={i} className="glass-card p-12 rounded-[3rem] border-white/5 flex flex-col">
                        <div className="text-[#CCFF00] mb-8">{s.icon}</div>
                        <h3 className="text-2xl font-brand font-black mb-4">{s.title}</h3>
                        <p className="text-gray-400 text-sm mb-8 flex-grow">{s.desc}</p>
                        <div className="space-y-3 mb-10">
                            {s.features.map((f, j) => (
                                <div key={j} className="flex items-center gap-2 text-xs text-gray-300">
                                    <Zap size={12} className="text-[#CCFF00]" /> {f}
                                </div>
                            ))}
                        </div>
                        <NeonButton variant="outline" className="w-full">Saber Mais</NeonButton>
                    </div>
                ))}
            </div>
        </div>
    </PageWrapper>
);

export default ServicosPage;
