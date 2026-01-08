import React from 'react';
import { motion } from 'framer-motion';
import { Search, Target, MousePointer2, TrendingUp, CheckCircle2, Zap } from 'lucide-react';
import { PageWrapper, SectionTitle } from '../components/Shared';

const MetodoPage: React.FC = () => (
    <PageWrapper>
        <div className="container mx-auto px-6 relative">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[600px] bg-[#CCFF00]/5 blur-[120px] rounded-full -z-10" />

            <SectionTitle subtitle="Nosso DNA" title="O Ciclo de Escala Vettor28" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-20">
                {/* Connector Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#CCFF00]/30 to-transparent -z-10" />

                {[
                    {
                        icon: <Search size={32} />,
                        step: "01",
                        title: "Imersão Profunda",
                        desc: "Mergulhamos no DNA da sua hospedagem para entender o perfil exato do hóspede ideal.",
                        output: "Persona Definida"
                    },
                    {
                        icon: <Target size={32} />,
                        step: "02",
                        title: "Posicionamento",
                        desc: "Ajustamos a narrativa e o visual para atrair o público A+ que valoriza exclusividade e experiência.",
                        output: "Branding Irresistível"
                    },
                    {
                        icon: <MousePointer2 size={32} />,
                        step: "03",
                        title: "Captação Ativa",
                        desc: "Campanhas agressivas de tráfego pago (Meta & Google) nos canais onde seu cliente está agora.",
                        output: "Tráfego Qualificado"
                    },
                    {
                        icon: <TrendingUp size={32} />,
                        step: "04",
                        title: "Fidelização",
                        desc: "Estratégias de CRM para transformar hóspedes ocasionais em promotores leais da marca.",
                        output: "LTV Maximizado"
                    }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="group relative"
                    >
                        {/* Step Number Background */}
                        <span className="absolute -top-12 -right-4 text-[8rem] font-black text-white/[0.02] group-hover:text-[#CCFF00]/10 transition-colors select-none pointer-events-none font-brand leading-none">
                            {item.step}
                        </span>

                        <div className="glass-card p-10 rounded-[2.5rem] border-white/5 h-full hover:border-[#CCFF00]/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.1)] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                                    {item.icon}
                                </div>

                                <div className="mb-2 flex items-center gap-3">
                                    <span className="text-[#CCFF00] text-xs font-black uppercase tracking-widest">Fase {item.step}</span>
                                    <div className="h-[1px] flex-grow bg-white/10" />
                                </div>

                                <h3 className="text-2xl font-brand font-black mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm flex-grow mb-8">{item.desc}</p>

                                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Resultado</p>
                                    <div className="flex items-center gap-2 text-[#CCFF00] font-bold">
                                        <CheckCircle2 size={16} />
                                        {item.output}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 text-center"
            >
                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
                    <Zap size={16} className="text-[#CCFF00]" />
                    <span>O ciclo se repete mensalmente para garantir escala constante.</span>
                </div>
            </motion.div>
        </div>

        {/* Section: Tech Stack */}
        <div className="container mx-auto px-6 mt-32">
            <div className="glass-card p-12 rounded-[3.5rem] border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#CCFF00]/5 blur-[100px] rounded-full -z-10" />
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="text-[#CCFF00] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Tecnologia</span>
                        <h2 className="text-4xl md:text-5xl font-brand font-black leading-tight mb-8">
                            Decisões baseadas em <span className="text-[#CCFF00]">Dados</span>, não em "achismos".
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Utilizamos um ecossistema de ferramentas proprietárias e de mercado para monitorar a demanda da sua região em tempo real e ajustar preços dinamicamente.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {["Google Analytics 4", "Meta Ads Manager", "Stays.net", "PriceLabs", "AirDNA", "RD Station"].map((tech, i) => (
                                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-gray-300 hover:border-[#CCFF00]/50 hover:text-[#CCFF00] transition-colors cursor-default">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 opacity-80 animate-pulse">
                                <div className="h-2 w-20 bg-gray-700 rounded mb-4" />
                                <div className="flex gap-2 items-end">
                                    <div className="w-4 h-12 bg-[#CCFF00]/20 rounded-t" />
                                    <div className="w-4 h-20 bg-[#CCFF00]/40 rounded-t" />
                                    <div className="w-4 h-16 bg-[#CCFF00]/60 rounded-t" />
                                    <div className="w-4 h-24 bg-[#CCFF00] rounded-t" />
                                </div>
                            </div>
                            <div className="bg-[#111] p-6 rounded-2xl border border-white/5 opacity-60 translate-y-8">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-700" />
                                    <div className="w-16 h-2 bg-gray-800 rounded" />
                                </div>
                                <div className="space-y-2">
                                    <div className="w-full h-2 bg-gray-800 rounded" />
                                    <div className="w-3/4 h-2 bg-gray-800 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Section: Timeline */}
        <div className="container mx-auto px-6 mt-32">
            <SectionTitle subtitle="Roadmap" title="O caminho até a escala" />
            <div className="relative border-l border-white/10 ml-4 md:ml-1/2 space-y-16">
                {[
                    { time: "Semana 01", title: "Setup & Diagnóstico", desc: "Configuração de pixels, análise de concorrentes e definição de metas. Iniciamos a criação dos primeiros anúncios." },
                    { time: "Mês 01", title: "Validação de Canais", desc: "Testes A/B de criativos e públicos. Primeiras reservas diretas começam a entrar e o custo por lead (CPL) é estabilizado." },
                    { time: "Mês 03", title: "Otimização de ROI", desc: "Escala das campanhas vencedoras. Implementação de automação de e-mail marketing e recuperação de carrinho." },
                    { time: "Mês 06+", title: "Consolidação de Marca", desc: "Sua hospedagem se torna referência na região. A dependência de OTAs cai drasticamente enquanto houver demanda." }
                ].map((item, i) => (
                    <div key={i} className="relative pl-12 md:pl-0">
                        <div className="absolute left-[-5px] top-0 w-3 h-3 bg-[#CCFF00] rounded-full md:left-1/2 md:-translate-x-[5px] shadow-[0_0_10px_#CCFF00]" />
                        <div className={`md:flex items-center justify-between gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className={`hidden md:block w-1/2 text-right ${i % 2 !== 0 ? 'text-left' : ''}`}>
                                <span className="text-4xl font-black font-brand text-white/5">{item.time}</span>
                            </div>
                            <div className="md:w-1/2">
                                <span className="md:hidden text-xs font-bold text-[#CCFF00] uppercase tracking-widest mb-2 block">{item.time}</span>
                                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed max-w-md">{item.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Section: Comparison */}
        <div className="container mx-auto px-6 mt-32 mb-20">
            <SectionTitle subtitle="Comparativo" title="Por que escolher a Vettor28?" />
            <div className="glass-card p-8 md:p-12 rounded-[3.5rem] border-white/5 overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-6 px-4 text-gray-500 font-medium w-1/3">Critério</th>
                            <th className="py-6 px-4 text-white font-black text-xl w-1/3">Vettor28</th>
                            <th className="py-6 px-4 text-gray-500 font-medium w-1/3">Agência Comum</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[
                            { crit: "Especialização", us: "100% Hospedagem", them: "Generalista (Padaria, Clínica, etc)" },
                            { crit: "Foco", us: "Performance (Reservas)", them: "Métricas de Vaidade (Likes)" },
                            { crit: "Atendimento", us: "Gestor Dedicado", them: "Ticket de Suporte" },
                            { crit: "Relatórios", us: "Dashboard em Tempo Real", them: "PDF Mensal Estático" },
                            { crit: "Tecnologia", us: "Integração c/ PMS", them: "Apenas Facebook Ads" },
                        ].map((row, i) => (
                            <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                <td className="py-6 px-4 font-bold text-gray-300">{row.crit}</td>
                                <td className="py-6 px-4 text-[#CCFF00] font-bold shadow-[0_0_20px_rgba(204,255,0,0)] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.1)] transition-shadow rounded-lg">{row.us}</td>
                                <td className="py-6 px-4 text-gray-600">{row.them}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </PageWrapper>
);

export default MetodoPage;
