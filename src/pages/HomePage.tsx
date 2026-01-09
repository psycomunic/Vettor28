import React from 'react';
import { NeonButton, SectionTitle } from '../components/Shared';
import { ArrowRight, Target, Zap, MousePointer2, TrendingUp, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-[#0a0a0a] text-white">
            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background Video/Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-[#050505]">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop"
                            className="w-full h-full object-cover opacity-40"
                        >
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-wooden-cabin-in-the-middle-of-the-forest-4424-large.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-black/50" />
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-up backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                        Método Exclusivo Vettor 28
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black font-brand leading-[0.9] text-white mb-6 uppercase tracking-tighter">
                        Reservas diretas <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-green-500">todos os meses</span> <br />
                        para hospedagens premium.
                    </h1>

                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        Somos a Vettor 28, uma agência especializada em chalés, cabanas e pousadas que transforma tráfego em diárias vendidas, sem dependência de Airbnb ou Booking.
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                        <Link to="/diagnostico">
                            <NeonButton className="!py-4 !px-8 text-lg">
                                Solicitar Diagnóstico Gratuito <ArrowRight className="ml-2" />
                            </NeonButton>
                        </Link>
                        <Link to="/metodo" className="text-gray-400 hover:text-white font-bold text-sm uppercase tracking-widest border-b border-transparent hover:border-[#CCFF00] transition-all pb-1">
                            Conhecer o método
                        </Link>
                    </div>
                </div>
            </section>

            {/* 2. O PROBLEMA */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <SectionTitle
                                subtitle="O CENÁRIO ATUAL"
                                title="Por que a maioria das hospedagens não cresce de forma previsível?"
                                alignment="left"
                            />
                            <div className="space-y-6 mt-8">
                                {[
                                    "Dependência total de OTAs (Booking, Airbnb) e suas taxas abusivas.",
                                    "Baixa ocupação durante a semana, vivendo apenas de finais de semana.",
                                    "Tráfego pago que traz cliques, mas não vira reserva no caixa.",
                                    "Falta de dados e previsibilidade de caixa para os próximos meses."
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 mt-1">
                                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                                        </div>
                                        <p className="text-gray-400 text-lg">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#CCFF00] to-green-500 blur-[100px] opacity-20 rounded-full" />
                            <div className="glass-card p-1 border-white/10 rounded-3xl relative z-10 rotate-3 transition-transform hover:rotate-0 duration-700">
                                <img
                                    src="https://images.unsplash.com/photo-1551882547-ff40c432d255?q=80&w=2072&auto=format&fit=crop"
                                    alt="Dashboard Confuso"
                                    className="rounded-2xl grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. A NOVA LÓGICA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="container mx-auto px-6 text-center max-w-4xl relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black font-brand text-white mb-6 uppercase tracking-tighter">
                        Hospedagens que crescem não vendem diárias. <span className="text-[#CCFF00]">Vendem desejo.</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                        Não basta anunciar. É preciso posicionamento, tráfego inteligente e um sistema de vendas diretas.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="h-80 md:h-[500px] rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[#CCFF00]/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none mix-blend-overlay" />
                            <img src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop" alt="Experience 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <p className="font-bold text-white uppercase tracking-widest text-sm">Experiência</p>
                            </div>
                        </div>
                        <div className="h-80 md:h-[500px] rounded-3xl overflow-hidden relative group md:-mt-12 md:pb-12">
                            <div className="absolute inset-0 bg-[#CCFF00]/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none mix-blend-overlay" />
                            <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2070&auto=format&fit=crop" alt="Experience 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <p className="font-bold text-white uppercase tracking-widest text-sm">Conforto</p>
                            </div>
                        </div>
                        <div className="h-80 md:h-[500px] rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-[#CCFF00]/10 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none mix-blend-overlay" />
                            <img src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=3230&auto=format&fit=crop" alt="Experience 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <p className="font-bold text-white uppercase tracking-widest text-sm">Exclusividade</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. O MÉTODO - Introduction */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <SectionTitle subtitle="NOSSO PROCESSO" title="O Método Vettor 28" alignment="left" />
                            <p className="text-gray-400 mt-4 max-w-md">Um sistema validado para transformar visibilidade em reservas diretas de forma previsível.</p>
                        </div>
                        <Link to="/metodo">
                            <NeonButton className="text-sm">Ver método completo</NeonButton>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            { step: "01", title: "Diagnóstico de Demanda", icon: Target },
                            { step: "02", title: "Posicionamento Premium", icon: Zap },
                            { step: "03", title: "Captação de Reservas", icon: MousePointer2 },
                            { step: "04", title: "Escala e Previsibilidade", icon: TrendingUp },
                        ].map((card, i) => (
                            <div key={i} className="glass-card p-8 rounded-3xl border-white/10 hover:border-[#CCFF00]/50 transition-all group cursor-default">
                                <div className="text-[#CCFF00] font-black text-4xl mb-6 opacity-30 group-hover:opacity-100 transition-opacity">{card.step}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                                <div className="w-8 h-1 bg-[#CCFF00] mt-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. PROVA SOCIAL */}
            <section className="py-24 bg-[#0a0a0a] border-y border-white/5">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-brand font-black text-white mb-16 uppercase tracking-tight">
                        Hospedagens que já <span className="text-[#CCFF00]">escalaram</span>
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                            <p className="text-gray-300 text-lg mb-6 leading-relaxed">"Saímos de R$10 mil/mês para mais de <strong className="text-white">R$100 mil em reservas diretas</strong> aplicando o método da Vettor 28."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-[#CCFF00]">B</div>
                                <div>
                                    <p className="font-bold text-white">Bruno</p>
                                    <p className="text-xs text-[#CCFF00] uppercase font-bold tracking-widest">Pousada Serra</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                            <div className="text-5xl font-black text-white mb-2">+400%</div>
                            <p className="text-gray-400 uppercase font-bold tracking-widest text-xs mb-6">Em reservas diretas</p>
                            <p className="text-gray-300">Case de sucesso de cabanas de alto padrão que zeraram a dependência do Airbnb.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/5 bg-gradient-to-b from-white/5 to-transparent">
                            <div className="text-5xl font-black text-white mb-2">12x</div>
                            <p className="text-gray-400 uppercase font-bold tracking-widest text-xs mb-6">ROI Médio</p>
                            <p className="text-gray-300">Para cada R$1 investido em tráfego, R$12 retornaram em reservas confirmadas.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. PARA QUEM É */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <SectionTitle subtitle="PERFIL DE CLIENTE" title="Trabalhamos com hospedagens que querem crescer de verdade" center />

                    <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                        {[
                            "Chalés e Cabanas Premium",
                            "Pousadas de Experiência",
                            "Hotéis Boutique"
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#CCFF00] transition-colors group">
                                <CheckCircle2 className="text-[#CCFF00] group-hover:scale-110 transition-transform" />
                                <span className="font-bold text-white">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. CTA FINAL */}
            <section className="py-32 bg-[#CCFF00] text-black text-center">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-brand font-black mb-6 uppercase tracking-tighter leading-none">
                        Sua hospedagem pronta <br /> para escalar?
                    </h2>
                    <p className="text-xl font-medium mb-10 max-w-2xl mx-auto opacity-80">
                        Nossa agenda é limitada para garantir exclusividade por região.
                    </p>
                    <Link to="/diagnostico">
                        <button className="bg-black text-[#CCFF00] font-black uppercase text-xl py-6 px-12 rounded-full hover:scale-105 transition-transform shadow-2xl flex items-center gap-2 mx-auto">
                            Solicitar Diagnóstico Estratégico <ArrowUpRight />
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
