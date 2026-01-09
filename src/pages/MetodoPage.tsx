import React from 'react';
import { SectionTitle } from '../components/Shared';
import { Target, Search, BarChart3, TrendingUp, CheckCircle2, Rocket, Palette, MousePointer2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MetodoPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-12">
            {/* Header */}
            <div className="container mx-auto px-6 text-center max-w-4xl mb-24">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                    Método Proprietário Vettor 28
                </div>
                <h1 className="text-5xl md:text-7xl font-black font-brand uppercase tracking-tighter mb-8 leading-none">
                    Não é tráfego. <br /> Não é branding. <br /> É um <span className="text-[#CCFF00]">sistema de reservas.</span>
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Um método criado exclusivamente para hospedagens que desejam previsibilidade.
                </p>
            </div>

            {/* Phases */}
            <div className="container mx-auto px-6 max-w-6xl space-y-24">
                {/* Phase 01 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-6">
                            <Search size={32} />
                        </div>
                        <h2 className="text-4xl font-black font-brand uppercase mb-4">Fase 01: Diagnóstico Profundo</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Antes de gastar um centavo em anúncios, mergulhamos no seu negócio. Analisamos a demanda reprimida da sua região, seus concorrentes diretos, sua sazonalidade histórica e a estrutura do seu ticket médio.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Análise de Demanda e Região</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Benchmarking de Concorrência</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Definição de Metas de Ocupação</li>
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="glass-card p-2 rounded-3xl border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full" alt="Analysis" />
                        </div>
                    </div>
                </div>

                {/* Phase 02 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="glass-card p-2 rounded-3xl border-white/10 -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full" alt="Branding" />
                        </div>
                    </div>
                    <div>
                        <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-6">
                            <Palette size={32} />
                        </div>
                        <h2 className="text-4xl font-black font-brand uppercase mb-4">Fase 02: Posicionamento Premium</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Preço é o que você cobra. Valor é o que o cliente percebe. Criamos uma narrativa visual e verbal que justifica o seu preço, transformando sua hospedagem em um objeto de desejo, não apenas uma cama para dormir.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Redesign de Oferta</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Landing Pages de Alta Conversão</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Estratégia de Conteúdo Visual</li>
                        </ul>
                    </div>
                </div>

                {/* Phase 03 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-6">
                            <MousePointer2 size={32} />
                        </div>
                        <h2 className="text-4xl font-black font-brand uppercase mb-4">Fase 03: Captação Ativa</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Implementamos nosso ecossistema de tráfego pago (Meta Ads + Google Ads) focado 100% em conversão. Perseguimos o hóspede ideal em todos os canais até a confirmação da reserva.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Gestão de Tráfego Avançada</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Remarketing Omnichannel</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Script de Vendas para WhatsApp</li>
                        </ul>
                    </div>
                    <div className="order-1 md:order-2">
                        <div className="glass-card p-2 rounded-3xl border-white/10 rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full" alt="Traffic" />
                        </div>
                    </div>
                </div>

                {/* Phase 04 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="glass-card p-2 rounded-3xl border-white/10 -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="https://images.unsplash.com/photo-1553835973-dec43bfddbeb?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 w-full" alt="Scale" />
                        </div>
                    </div>
                    <div>
                        <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-6">
                            <Rocket size={32} />
                        </div>
                        <h2 className="text-4xl font-black font-brand uppercase mb-4">Fase 04: Escala e CRM</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Transformamos hóspedes em clientes recorrentes. Implementamos CRM para gestão de base, automações de e-mail e estratégias de LTV (Lifetime Value) para aumentar o lucro sem aumentar o custo de aquisição.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Implementação de CRM</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Automação de E-mail Marketing</li>
                            <li className="flex items-center gap-3 font-bold text-gray-300"><span className="w-2 h-2 bg-[#CCFF00] rounded-full" /> Otimização Contínua de ROAS</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="container mx-auto px-6 mt-32 text-center">
                <div className="bg-[#CCFF00] rounded-[3rem] p-12 md:p-20 text-black shadow-2xl shadow-[#CCFF00]/10 relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black font-brand uppercase leading-none mb-8">
                            Quer aplicar esse método <br /> no seu negócio?
                        </h2>
                        <Link to="/diagnostico">
                            <button className="bg-black text-white font-black uppercase text-xl py-6 px-12 rounded-full hover:scale-105 transition-transform shadow-2xl cursor-pointer">
                                Solicitar Aplicação
                            </button>
                        </Link>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                </div>
            </div>
        </div>
    );
};

export default MetodoPage;
