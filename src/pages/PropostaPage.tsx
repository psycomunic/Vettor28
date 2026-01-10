import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Target, Crown, ChevronRight, ChevronLeft, Search, Palette, MousePointer2, Rocket, Star, Shield, TrendingUp } from 'lucide-react';

const PropostaPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 11; // Updated count with visual slides

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

    // Generic Visual Slide Component
    const VisualSlide = ({ image, title, subtitle }: { image: string, title: string, subtitle: string }) => (
        <div className="relative h-full w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-linear hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-10 md:p-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <h2 className="text-[#CCFF00] font-bold uppercase tracking-widest mb-4">{subtitle}</h2>
                    <h1 className="text-5xl md:text-7xl font-black text-white max-w-4xl leading-tight drop-shadow-2xl">
                        {title}
                    </h1>
                </motion.div>
            </div>
        </div>
    );

    const PricingSlide = () => (
        <div className="flex flex-col items-center h-full px-4 md:px-6 max-w-[1600px] mx-auto pt-10 pb-40 overflow-y-auto custom-scrollbar relative">
            <div className="text-center mb-10 shrink-0">
                <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    Planos Estratégicos
                </h1>
                <h1 className="text-4xl md:text-6xl font-black text-[#CCFF00] tracking-tight mb-4 drop-shadow-[0_0_25px_rgba(204,255,0,0.5)]">
                    Vettor28
                </h1>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                    Escolha o nível de aceleração ideal para o seu negócio e conquiste sua independência das plataformas.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl items-start pb-40">

                {/* Vettor Start */}
                <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] hover:border-green-500/30 transition-all duration-300 flex flex-col overflow-hidden relative group h-full">
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-4 text-green-500">
                            <Zap size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Vettor Start</span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-2">Primeiros Passos</h3>
                        <p className="text-gray-400 text-sm mb-8 min-h-[40px]">
                            "Sair da dependência das OTAs e começar a vender direto"
                        </p>

                        <div className="mb-1">
                            <span className="text-4xl font-black text-white">R$ 2.500</span>
                            <span className="text-gray-500 ml-1 text-sm">/mês</span>
                        </div>
                        <p className="text-gray-600 text-xs mb-8">ou R$ 3.500/mês dependendo do escopo</p>

                        <a href="https://wa.me/5511933334444?text=Quero%20começar%20com%20o%20Plano%20Start" target="_blank" className="w-full py-4 rounded-xl bg-white/5 hover:bg-green-500 hover:text-black text-white text-center font-bold text-sm transition-all mb-10 border border-white/10">
                            Escolher Start
                        </a>

                        <div className="space-y-8">
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Para quem é</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-green-500 shrink-0" /> Chalés e pousadas (1-3 unidades)</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-green-500 shrink-0" /> Faturamento até R$ 60k/mês</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-green-500 shrink-0" /> 100% dependente de OTAs</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">O que inclui</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-white shrink-0" /> Diagnóstico estratégico</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-white shrink-0" /> Tráfego Pago (Meta Ads)</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-white shrink-0" /> Direcionamento de conteúdo</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-white shrink-0" /> Acesso ao Painel Vettor28</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vettor Scale */}
                <div className="rounded-3xl border border-[#CCFF00] bg-[#CCFF00]/5 flex flex-col overflow-visible relative h-full transform md:-translate-y-4 z-10 shadow-[0_0_30px_-5px_rgba(204,255,0,0.15)]">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#CCFF00] text-black px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 whitespace-nowrap z-20">
                        <Target size={14} className="animate-pulse" /> Mais Vendido
                    </div>

                    <div className="p-8 flex flex-col h-full bg-[#0A0A0A] rounded-3xl m-[1px]">
                        <div className="flex items-center gap-2 mb-4 text-[#CCFF00]">
                            <ArrowRight size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Vettor Scale</span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-2">Tração & Escala</h3>
                        <p className="text-gray-400 text-sm mb-8 min-h-[40px]">
                            "Escalar reservas com previsibilidade e lucro"
                        </p>

                        <div className="mb-1">
                            <span className="text-4xl font-black text-white">R$ 4.500</span>
                            <span className="text-gray-500 ml-1 text-sm">/mês</span>
                        </div>
                        <p className="text-gray-600 text-xs mb-8">ou R$ 6.500/mês dependendo do escopo</p>

                        <a href="https://wa.me/5511933334444?text=Quero%20escalar%20com%20o%20Plano%20Scale" target="_blank" className="w-full py-4 rounded-xl bg-[#CCFF00] text-black text-center font-black text-sm hover:scale-[1.02] transition-all mb-10 shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                            Quero Escalar
                        </a>

                        <div className="space-y-8">
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Para quem é</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-[#CCFF00] shrink-0" /> Pousadas e pequenos resorts (2-10 un)</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-[#CCFF00] shrink-0" /> Faturamento R$ 50k - R$ 200k/mês</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-[#CCFF00] shrink-0" /> Quer crescer com controle</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest mb-4">Tudo do Start, mais:</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-[#CCFF00] shrink-0" /> Google Ads (Search + Maps)</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-[#CCFF00] shrink-0" /> Estratégia de ocupação sazonal</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-[#CCFF00] shrink-0" /> Branding & Posicionamento Premium</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-[#CCFF00] shrink-0" /> Otimização de OTAs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vettor Elite */}
                <div className="rounded-3xl border border-white/10 bg-[#0A0A0A] hover:border-purple-500/30 transition-all duration-300 flex flex-col overflow-hidden relative group h-full">
                    <div className="p-8 flex flex-col h-full">
                        <div className="flex items-center gap-2 mb-4 text-purple-500">
                            <Crown size={20} />
                            <span className="font-bold uppercase tracking-wider text-sm">Vettor Elite</span>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-2">Domínio Total</h3>
                        <p className="text-gray-400 text-sm mb-8 min-h-[40px]">
                            "Dominar o mercado da sua região e liderar"
                        </p>

                        <div className="mb-1">
                            <span className="text-4xl font-black text-white">R$ 8.000</span>
                            <span className="text-gray-500 ml-1 text-sm">/mês</span>
                        </div>
                        <p className="text-gray-600 text-xs mb-8">a R$ 12.000/mês + Vagas Limitadas</p>

                        <a href="https://wa.me/5511933334444?text=Tenho%20interesse%20no%20Vettor%20Elite" target="_blank" className="w-full py-4 rounded-xl bg-purple-900/20 hover:bg-purple-600 border border-purple-500/30 text-white text-center font-bold text-sm transition-all mb-10">
                            Aplicar para Elite
                        </a>

                        <div className="space-y-8">
                            <div>
                                <p className="text-xs font-bold text-white uppercase tracking-widest mb-4">Para quem é</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-purple-500 shrink-0" /> Hospedagens Premium / Boutique</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-purple-500 shrink-0" /> Operações de alto ticket</li>
                                    <li className="flex gap-3 text-sm text-gray-400"><Check size={16} className="text-purple-500 shrink-0" /> Quer liderança regional</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-4">Tudo do Scale, mais:</p>
                                <ul className="space-y-3">
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500 shrink-0" /> Exclusividade Regional</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500 shrink-0" /> Curadoria de imagens e Storytelling</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500 shrink-0" /> CRM & Fidelização (LTV)</li>
                                    <li className="flex gap-3 text-sm text-gray-300"><Check size={16} className="text-purple-500 shrink-0" /> Consultoria de Revenue</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );


    const slides = [
        <CoverSlide />,
        <ScenarioSlide />,
        <VisualSlide image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80" title="Entendemos o seu negócio como ninguém." subtitle="Diagnóstico" />,
        <Phase1Slide />,
        <VisualSlide image="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=80" title="Design que desperta desejo imediato." subtitle="Posicionamento" />,
        <Phase2Slide />,
        <Phase3Slide />,
        <VisualSlide image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80" title="Resultados previsíveis e escaláveis." subtitle="Crescimento" />,
        <Phase4Slide />,
        <ResultsSlide />,
        <PricingSlide />
    ];

    // const totalSlides = slides.length; // Uses static count at top to avoid hoisting issues

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
                    {/* Progress Dots - Desktop Only */}
                    <div className="hidden md:flex gap-1 mr-4">
                        {Array.from({ length: totalSlides }).map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentSlide ? 'bg-[#CCFF00] w-6' : 'bg-white/10'}`}
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
