import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ArrowRight, Zap, Target, Crown } from 'lucide-react';
import Footer from '../components/Footer';

const PropostaPage = () => {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-[#CCFF00] selection:text-black">

            {/* Hero Section */}
            <div className="pt-32 pb-12 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#CCFF00]/10 rounded-full blur-[120px] pointer-events-none" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                        Planos Estratégicos <span className="text-[#CCFF00]">Vettor28</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Escolha o nível de aceleração ideal para o seu negócio e conquiste sua independência das plataformas.
                    </p>
                </motion.div>
            </div>

            {/* Plans Container */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    {/* PLANO 01 — Vettor Start */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass-card p-8 rounded-3xl border border-white/10 relative group hover:border-[#CCFF00]/30 transition-all duration-300"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-green-500 tracking-wider uppercase">Vettor Start</h3>
                        </div>

                        <h2 className="text-3xl font-black mb-2">Primeiros Passos</h2>
                        <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                            "Sair da dependência das OTAs e começar a vender direto"
                        </p>

                        <div className="text-3xl font-bold mb-1">R$ 2.500 <span className="text-lg text-gray-500 font-normal">/mês</span></div>
                        <p className="text-xs text-gray-500 mb-8">ou R$ 3.500/mês dependendo do escopo</p>

                        <a
                            href="https://wa.me/5511933334444?text=Quero%20começar%20com%20o%20Plano%20Start"
                            target="_blank"
                            className="block w-full py-4 rounded-xl bg-white/5 hover:bg-green-500 hover:text-black text-center font-bold transition-all duration-300 border border-white/10 hover:border-transparent mb-8"
                        >
                            Escolher Start
                        </a>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Para quem é</h4>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Chalés e pousadas (1-3 unidades)</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> Faturamento até R$ 60k/mês</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-green-500 mt-0.5 shrink-0" /> 100% dependente de OTAs</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">O que inclui</h4>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Diagnóstico estratégico</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Tráfego Pago (Meta Ads)</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Direcionamento de conteúdo</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Acesso ao Painel Vettor28</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Relatório mensal</li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-gray-500 mb-3 text-sm uppercase tracking-wider text-opacity-70">Não inclui</h4>
                                <ul className="space-y-2 text-gray-600 text-sm">
                                    <li className="flex items-center gap-2"><X size={16} /> Google Ads</li>
                                    <li className="flex items-center gap-2"><X size={16} /> Branding premium</li>
                                    <li className="flex items-center gap-2"><X size={16} /> CRM avançado</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* PLANO 02 — Vettor Scale */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="glass-card p-8 rounded-3xl border border-[#CCFF00]/50 bg-[#CCFF00]/5 relative transform lg:-translate-y-6 shadow-[0_0_50px_-12px_rgba(204,255,0,0.2)]"
                    >
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#CCFF00] text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg flex items-center gap-1">
                            <Target size={14} /> Mais Vendido
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-[#CCFF00]/10 rounded-lg text-[#CCFF00]">
                                <ArrowRight size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-[#CCFF00] tracking-wider uppercase">Vettor Scale</h3>
                        </div>

                        <h2 className="text-3xl font-black mb-2">Tração & Escala</h2>
                        <p className="text-gray-300 text-sm mb-6 min-h-[40px]">
                            "Escalar reservas com previsibilidade e lucro"
                        </p>

                        <div className="text-3xl font-bold mb-1">R$ 4.500 <span className="text-lg text-gray-500 font-normal">/mês</span></div>
                        <p className="text-xs text-gray-400 mb-8">ou R$ 6.500/mês dependendo do escopo</p>

                        <a
                            href="https://wa.me/5511933334444?text=Quero%20escalar%20com%20o%20Plano%20Scale"
                            target="_blank"
                            className="block w-full py-4 rounded-xl bg-[#CCFF00] text-black text-center font-black hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-[#CCFF00]/20 mb-8"
                        >
                            Quero Escalar
                        </a>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Para quem é</h4>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Pousadas e pequenos resorts (2-10 un)</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Faturamento R$ 50k - R$ 200k/mês</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Quer crescer com controle</li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <h4 className="font-bold text-[#CCFF00] mb-3 text-sm uppercase tracking-wider">Tudo do Start, mais:</h4>
                                <ul className="space-y-3 text-white text-sm font-medium">
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Google Ads (Search + Maps)</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Estratégia de ocupação sazonal</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Branding & Posicionamento Premium</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Landing Page Otimizada</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Painel Completo (ROI, CPA, RevPAR)</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-[#CCFF00] mt-0.5 shrink-0" /> Reuniões Quinzenais</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* PLANO 03 — Vettor Elite */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="glass-card p-8 rounded-3xl border border-white/10 relative group hover:border-purple-500/50 transition-all duration-300"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                <Crown size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-purple-500 tracking-wider uppercase">Vettor Elite</h3>
                        </div>

                        <h2 className="text-3xl font-black mb-2">Domínio Total</h2>
                        <p className="text-gray-400 text-sm mb-6 min-h-[40px]">
                            "Dominar o mercado da sua região e liderar"
                        </p>

                        <div className="text-3xl font-bold mb-1">R$ 8.000 <span className="text-lg text-gray-500 font-normal">/mês</span></div>
                        <p className="text-xs text-gray-500 mb-8">a R$ 12.000/mês + Vagas Limitadas</p>

                        <a
                            href="https://wa.me/5511933334444?text=Tenho%20interesse%20no%20Vettor%20Elite"
                            target="_blank"
                            className="block w-full py-4 rounded-xl bg-purple-900/40 hover:bg-purple-600 text-white text-center font-bold transition-all duration-300 border border-purple-500/30 mb-8"
                        >
                            Aplicar para Elite
                        </a>

                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wider">Para quem é</h4>
                                <ul className="space-y-2 text-gray-400 text-sm">
                                    <li className="flex items-start gap-2"><Check size={16} className="text-purple-500 mt-0.5 shrink-0" /> Hospedagens Premium / Boutique</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-purple-500 mt-0.5 shrink-0" /> Operações de alto ticket</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-purple-500 mt-0.5 shrink-0" /> Quer liderança regional</li>
                                </ul>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                                <h4 className="font-bold text-purple-400 mb-3 text-sm uppercase tracking-wider">Tudo do Scale, mais:</h4>
                                <ul className="space-y-3 text-gray-300 text-sm">
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Exclusividade Regional</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Curadoria de imagens e Storytelling</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> CRM & Fidelização (LTV)</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Gestor Dedicado + Reunião Semanal</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-white mt-0.5 shrink-0" /> Acesso antecipado a features</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Bottom CTA / Logic */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <p className="text-gray-500 text-sm mb-4">Dúvidas sobre qual o melhor momento?</p>
                    <a href="https://wa.me/5511933334444" className="text-white hover:text-[#CCFF00] underline decoration-1 underline-offset-4 transition-colors">
                        Falar com consultor agora
                    </a>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default PropostaPage;
