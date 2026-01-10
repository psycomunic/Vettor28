import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Target, Crown, ChevronRight, ChevronLeft, Search, Palette, MousePointer2, Rocket, Star, Shield, TrendingUp } from 'lucide-react';

const PropostaPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 8; // 0 to 7

    const nextSlide = () => {
        if (currentSlide < totalSlides - 1) setCurrentSlide(curr => curr + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide(curr => curr - 1);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                nextSlide();
            }
            if (e.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    // Slide Content Components
    const CoverSlide = () => (
        <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#CCFF00]/5 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <div className="inline-block px-4 py-2 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/10 text-[#CCFF00] font-bold uppercase tracking-widest mb-8">
                    Apresentação Comercial
                </div>
                <h1 className="text-6xl md:text-9xl font-black font-brand uppercase tracking-tighter leading-none mb-6">
                    Método <span className="text-[#CCFF00]">Vettor 28</span>
                </h1>
                <p className="text-2xl md:text-3xl text-gray-400 max-w-3xl mx-auto font-light">
                    O sistema definitivo para sair da dependência das plataformas e escalar suas reservas diretas.
                </p>
                <p className="mt-12 text-sm text-gray-500 animate-pulse uppercase tracking-widest">
                    Pressione Espaço ou clique para começar
                </p>
            </motion.div>
        </div>
    );

    const ScenarioSlide = () => (
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="text-left">
                    <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-4">O Cenário Atual</h2>
                    <h1 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                        Por que é perigoso depender só do <span className="text-gray-500 line-through decoration-red-500 decoration-4">Airbnb</span>?
                    </h1>
                    <div className="space-y-6 text-xl text-gray-300">
                        <p className="flex items-center gap-4">
                            <X className="text-red-500 shrink-0" /> Comissões que comem 15-20% do lucro.
                        </p>
                        <p className="flex items-center gap-4">
                            <X className="text-red-500 shrink-0" /> Você não tem os dados do hóspede (CRM).
                        </p>
                        <p className="flex items-center gap-4">
                            <X className="text-red-500 shrink-0" /> Instabilidade: o algoritmo muda, suas reservas somem.
                        </p>
                        <p className="flex items-center gap-4">
                            <X className="text-red-500 shrink-0" /> Ocupação baixa durante a semana.
                        </p>
                    </div>
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-red-500/20 blur-[100px] rounded-full group-hover:bg-red-500/30 transition-all duration-700" />
                    <div className="glass-card p-12 rounded-3xl border-white/10 text-center relative z-10 hover:scale-105 transition-transform duration-500 hover:border-red-500/30 hover:bg-red-500/5">
                        <p className="text-6xl font-black text-white mb-2">0%</p>
                        <p className="text-gray-400 uppercase tracking-widest">De Previsibilidade</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const Phase1Slide = () => (
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-5xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 mx-auto">
                <Search size={40} />
            </div>
            <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-4">Fase 01</h2>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase">Diagnóstico Profundo</h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Antes de vender, precisamos entender. Mapeamos a demanda reprimida da sua região, analisamos seus concorrentes e definimos a estratégia de preço ideal.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Análise de Mercado</h3>
                    <p className="text-gray-400 text-sm">Quem é seu hóspede ideal e quanto ele paga.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Benchmarking</h3>
                    <p className="text-gray-400 text-sm">O que seus concorrentes estão fazendo errado.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Metas Claras</h3>
                    <p className="text-gray-400 text-sm">Definição de ROI e taxa de ocupação alvo.</p>
                </div>
            </div>
        </div>
    );

    const Phase2Slide = () => (
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-5xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 mx-auto">
                <Palette size={40} />
            </div>
            <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-4">Fase 02</h2>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase">Posicionamento Premium</h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Hospedagens comuns vendem diárias. Nós vendemos <span className="text-white font-bold">desejo</span>. Criamos uma identidade visual e verbal que justifica o seu preço.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Redesign de Oferta</h3>
                    <p className="text-gray-400 text-sm">Pacotes e experiências que aumentam o ticket.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Landing Pages</h3>
                    <p className="text-gray-400 text-sm">Páginas de alta conversão focadas em venda.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Storytelling</h3>
                    <p className="text-gray-400 text-sm">Narrativas que conectam emocionalmente.</p>
                </div>
            </div>
        </div>
    );

    const Phase3Slide = () => (
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-5xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 mx-auto">
                <MousePointer2 size={40} />
            </div>
            <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-4">Fase 03</h2>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase">Captação Ativa</h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Não esperamos o cliente vir. Nós o perseguimos. Um ecossistema de tráfego pago (Meta + Google) que coloca sua reserva na frente do cliente certo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Tráfego Pago</h3>
                    <p className="text-gray-400 text-sm">Anúncios no Instagram, Facebook e Google.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Remarketing</h3>
                    <p className="text-gray-400 text-sm">Recuperação de quem visitou e não comprou.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Comercial Ativo</h3>
                    <p className="text-gray-400 text-sm">Scripts de venda validados para WhatsApp.</p>
                </div>
            </div>
        </div>
    );

    const Phase4Slide = () => (
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-5xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 mx-auto">
                <Rocket size={40} />
            </div>
            <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-4">Fase 04</h2>
            <h1 className="text-5xl md:text-7xl font-black mb-8 uppercase">Escala & CRM</h1>
            <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                Onde o lucro real acontece. Transformamos hóspedes em clientes recorrentes e aumentamos o LTV (Lifetime Value) sem gastar mais com anúncios.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">CRM Organizado</h3>
                    <p className="text-gray-400 text-sm">Base de dados viva e segmentada.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Email Marketing</h3>
                    <p className="text-gray-400 text-sm">Ofertas automáticas para base de clientes.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-[#CCFF00]/10 hover:border-[#CCFF00]/30 transition-all duration-300 group hover:-translate-y-1">
                    <h3 className="font-bold text-white mb-2 group-hover:text-[#CCFF00] transition-colors">Fidelização</h3>
                    <p className="text-gray-400 text-sm">Estratégias para fazer o hóspede voltar sempre.</p>
                </div>
            </div>
        </div>
    );

    const ResultsSlide = () => (
        <div className="flex flex-col items-center justify-center h-full px-6 max-w-6xl mx-auto">
            <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-8 text-center">Resultados Reais</h2>
            <h1 className="text-5xl md:text-7xl font-black mb-16 text-center">O que acontece quando você aplica?</h1>

            <div className="grid md:grid-cols-3 gap-8 w-full">
                <div className="p-10 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                    <div className="text-6xl font-black text-white mb-2">+400%</div>
                    <p className="text-gray-400 uppercase font-bold tracking-widest text-xs mb-4">Em reservas diretas</p>
                    <p className="text-gray-300 text-sm">Pousada de charme que zerou a dependência do Airbnb em 6 meses.</p>
                </div>
                <div className="p-10 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                    <div className="text-6xl font-black text-[#CCFF00] mb-2">12x</div>
                    <p className="text-gray-400 uppercase font-bold tracking-widest text-xs mb-4">ROI Médio</p>
                    <p className="text-gray-300 text-sm">Para cada R$ 1.000 investidos, R$ 12.000 retornaram em reservas.</p>
                </div>
                <div className="p-10 rounded-3xl bg-white/5 border border-white/5 flex flex-col items-center text-center">
                    <div className="text-6xl font-black text-white mb-2">90%</div>
                    <p className="text-gray-400 uppercase font-bold tracking-widest text-xs mb-4">Ocupação Média</p>
                    <p className="text-gray-300 text-sm">Manutenção de alta ocupação mesmo na baixa temporada.</p>
                </div>
            </div>
        </div>
    );

    const PricingSlide = () => (
        <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 max-w-[1400px] mx-auto pt-16 pb-6 overflow-y-auto">
            <h1 className="text-3xl md:text-5xl font-black mb-12 text-center">ESCOLHA SEU PLANO DE ACELERAÇÃO</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end w-full">

                {/* Vettor Start */}
                <div className="glass-card rounded-3xl border border-white/10 relative group hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex flex-col p-1 overflow-hidden">
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/10 rounded-lg text-white"><Zap size={20} /></div>
                            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Start</h3>
                        </div>
                        <div className="mb-2">
                            <span className="text-4xl font-black text-white">R$ 2.500</span>
                        </div>
                        <p className="text-gray-400 text-xs uppercase tracking-widest mb-6">/mês</p>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            Fundação sólida para profissionalizar sua hospedagem.
                        </p>
                        <a href="https://wa.me/5511933334444?text=Quero%20começar%20com%20o%20Plano%20Start" target="_blank" className="block w-full py-3 rounded-lg bg-white/10 hover:bg-white hover:text-black text-center font-bold uppercase text-xs transition-all border border-white/10">
                            Selecionar
                        </a>
                    </div>
                    <div className="bg-black/20 p-8 pt-6 flex-1 space-y-6">
                        <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">O que inclui</p>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex gap-3"><Check size={14} className="text-white shrink-0 mt-0.5" /> Diagnóstico inicial</li>
                                <li className="flex gap-3"><Check size={14} className="text-white shrink-0 mt-0.5" /> Estratégia de Preços</li>
                                <li className="flex gap-3"><Check size={14} className="text-white shrink-0 mt-0.5" /> Tráfego Pago (Meta)</li>
                                <li className="flex gap-3"><Check size={14} className="text-white shrink-0 mt-0.5" /> Relatórios Mensais</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Vettor Scale - HERO */}
                <div className="rounded-3xl border border-[#CCFF00] bg-[#CCFF00]/5 relative transform md:-translate-y-8 shadow-[0_0_60px_-15px_rgba(204,255,0,0.3)] flex flex-col p-1 overflow-hidden z-20">
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent" />
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <div className="bg-[#CCFF00] text-black px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(204,255,0,0.6)] flex items-center gap-2">
                            <Target size={14} className="animate-pulse" /> Mais Escolhido
                        </div>
                    </div>

                    <div className="p-10 pb-6 relative">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-[#CCFF00] rounded-lg text-black"><Star size={20} fill="black" /></div>
                            <h3 className="text-2xl font-black text-[#CCFF00] uppercase tracking-wider">Scale</h3>
                        </div>
                        <div className="mb-2">
                            <span className="text-6xl font-black text-white tracking-tighter">R$ 4.500</span>
                        </div>
                        <p className="text-[#CCFF00]/80 text-xs uppercase tracking-widest mb-8">/mês</p>

                        <p className="text-white text-base mb-8 leading-relaxed font-medium">
                            Aceleração agressiva para quem busca previsibilidade e lucro real.
                        </p>

                        <a href="https://wa.me/5511933334444?text=Quero%20escalar%20com%20o%20Plano%20Scale" target="_blank" className="block w-full py-4 rounded-xl bg-[#CCFF00] text-black text-center font-black uppercase text-sm hover:bg-white hover:scale-[1.02] transition-all shadow-[0_0_30px_-5px_rgba(204,255,0,0.4)]">
                            Quero Escalar
                        </a>
                    </div>

                    <div className="bg-[#CCFF00]/5 p-10 pt-8 flex-1 space-y-8">
                        <div>
                            <p className="text-[10px] font-bold text-[#CCFF00]/60 uppercase tracking-widest mb-4">Features Premium</p>
                            <ul className="space-y-4 text-white text-sm font-medium">
                                <li className="flex gap-3"><span className="p-1 rounded bg-[#CCFF00]/20 text-[#CCFF00]"><Check size={12} /></span> <span>Tudo do Start</span></li>
                                <li className="flex gap-3"><span className="p-1 rounded bg-[#CCFF00]/20 text-[#CCFF00]"><Check size={12} /></span> <span>Google Adwords & Maps</span></li>
                                <li className="flex gap-3"><span className="p-1 rounded bg-[#CCFF00]/20 text-[#CCFF00]"><Check size={12} /></span> <span>Otimização de OTAs</span></li>
                                <li className="flex gap-3"><span className="p-1 rounded bg-[#CCFF00]/20 text-[#CCFF00]"><Check size={12} /></span> <span>Reuniões Quinzenais</span></li>
                            </ul>
                        </div>
                        <div className="p-4 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/20">
                            <p className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-widest mb-2 flex items-center gap-1"><Zap size={12} /> Bônus Exclusivo</p>
                            <p className="text-xs text-white/90">Consultoria completa de Revenue Management para otimização de diárias.</p>
                        </div>
                    </div>
                </div>

                {/* Vettor Elite */}
                <div className="glass-card rounded-3xl border border-white/10 relative group hover:border-purple-500/50 hover:bg-purple-500/5 transition-all duration-300 flex flex-col p-1 overflow-hidden">
                    <div className="p-8 pb-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Crown size={20} /></div>
                            <h3 className="text-lg font-bold text-purple-400 uppercase tracking-wider">Elite</h3>
                        </div>
                        <div className="mb-2">
                            <span className="text-4xl font-black text-white">R$ 8.000</span>
                        </div>
                        <p className="text-purple-400/60 text-xs uppercase tracking-widest mb-6">/mês</p>
                        <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                            Gestão de alto nível com dedicação exclusiva e growth hacking.
                        </p>
                        <a href="https://wa.me/5511933334444?text=Tenho%20interesse%20no%20Vettor%20Elite" target="_blank" className="block w-full py-3 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-white text-center font-bold uppercase text-xs transition-all border border-purple-500/30">
                            Aplicar agora
                        </a>
                    </div>
                    <div className="bg-black/20 p-8 pt-6 flex-1 space-y-6">
                        <div>
                            <p className="text-[10px] font-bold text-purple-500/60 uppercase tracking-widest mb-3">Exclusividade</p>
                            <ul className="space-y-3 text-gray-400 text-sm">
                                <li className="flex gap-3"><Check size={14} className="text-purple-400 shrink-0 mt-0.5" /> Tudo do Scale</li>
                                <li className="flex gap-3"><Check size={14} className="text-purple-400 shrink-0 mt-0.5" /> Exclusividade Regional</li>
                                <li className="flex gap-3"><Check size={14} className="text-purple-400 shrink-0 mt-0.5" /> Gestor Dedicado</li>
                                <li className="flex gap-3"><Check size={14} className="text-purple-400 shrink-0 mt-0.5" /> Implementação de CRM</li>
                            </ul>
                        </div>
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1 flex items-center gap-1"><Star size={10} /> Bônus</p>
                            <p className="text-xs text-gray-400">Sistema de Fidelidade Próprio</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );


    const slides = [
        <CoverSlide />,
        <ScenarioSlide />,
        <Phase1Slide />,
        <Phase2Slide />,
        <Phase3Slide />,
        <Phase4Slide />,
        <ResultsSlide />,
        <PricingSlide />
    ];

    return (
        <div
            className="h-screen bg-black text-white font-sans overflow-hidden flex flex-col relative"
            onClick={nextSlide}
        >


            <div className="flex-1 relative cursor-pointer">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="h-full w-full"
                    >
                        {slides[currentSlide]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="h-16 flex items-center justify-between px-6 border-t border-white/5 bg-black/50 backdrop-blur-sm z-50">
                <div className="text-xs text-gray-500 font-mono">
                    SLIDE {currentSlide + 1} / {totalSlides}
                </div>

                <div className="flex items-center gap-2">
                    {/* Progress Dots */}
                    <div className="flex gap-1 mr-4">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-[#CCFF00] w-6' : 'bg-white/10'}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                        disabled={currentSlide === 0}
                        className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                        disabled={currentSlide === totalSlides - 1}
                        className="p-2 hover:bg-white/10 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropostaPage;
