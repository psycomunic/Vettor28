import React from 'react';
import { SectionTitle } from '../components/Shared';
import { ArrowRight, Target, Users, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const SobrePage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-12">

            {/* Hero */}
            <div className="container mx-auto px-6 mb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black font-brand uppercase tracking-tighter mb-8 leading-none">
                        Não somos uma agência. <br /> Somos um <span className="text-[#CCFF00]">vetor de crescimento.</span>
                    </h1>
                    <p className="text-2xl text-gray-400 font-light leading-relaxed">
                        A Vettor 28 nasceu de uma inconformidade: ver hospedagens incríveis reféns das taxas abusivas das plataformas de reserva.
                    </p>
                </div>
            </div>

            {/* Manifesto / History */}
            <div className="container mx-auto px-6 mb-32">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="glass-card p-2 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/5 to-transparent relative">
                        <div className="absolute inset-0 bg-[#CCFF00] blur-[150px] opacity-10 rounded-full" />
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" className="rounded-[2.5rem] grayscale relative z-10 w-full" alt="Team" />
                    </div>
                    <div>
                        <SectionTitle subtitle="NOSSA MISSÃO" title="Direction & Force" alignment="left" />
                        <div className="space-y-6 text-lg text-gray-400 mt-8">
                            <p>
                                Na física, um vetor é definido por <strong>direção</strong> e <strong>força</strong>. É exatamente isso que aplicamos no seu negócio.
                            </p>
                            <p>
                                A maioria das agências de marketing são generalistas. Elas tentam vender hambúrguer, clareamento dental e reserva de hotel com a mesma estratégia. <strong>Nós não.</strong>
                            </p>
                            <p>
                                Respiramos hospitalidade. Entendemos a dor de um check-in vazio na terça-feira. Entendemos a frustração de pagar 15% para o Booking. Nossa única métrica de sucesso é o lucro líquido no seu bolso.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-[#111] py-24 mb-32">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div>
                            <div className="w-20 h-20 bg-[#CCFF00]/10 rounded-full flex items-center justify-center text-[#CCFF00] mx-auto mb-6">
                                <Target size={40} />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-4">Especialização Extrema</h3>
                            <p className="text-gray-400">Não fazemos "marketing digital". Fazemos growth para hotelaria. Ponto.</p>
                        </div>
                        <div>
                            <div className="w-20 h-20 bg-[#CCFF00]/10 rounded-full flex items-center justify-center text-[#CCFF00] mx-auto mb-6">
                                <Users size={40} />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-4">Parceria Real</h3>
                            <p className="text-gray-400">Limitamos nossa carteira de clientes para garantir um atendimento de "sócio", não de "fornecedor".</p>
                        </div>
                        <div>
                            <div className="w-20 h-20 bg-[#CCFF00]/10 rounded-full flex items-center justify-center text-[#CCFF00] mx-auto mb-6">
                                <Globe size={40} />
                            </div>
                            <h3 className="text-2xl font-black uppercase mb-4">Escala Global</h3>
                            <p className="text-gray-400">Aplicamos estratégias validadas em mercados internacionais para o cenário brasileiro.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-black text-white uppercase mb-8">
                    Sua visão, nossa força.
                </h2>
                <Link to="/diagnostico">
                    <button className="bg-[#CCFF00] text-black font-black uppercase text-xl py-5 px-10 rounded-full hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                        Conversar com a Vettor 28 <ArrowRight />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SobrePage;
