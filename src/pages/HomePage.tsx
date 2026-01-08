import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, CheckCircle2, Target, LayoutDashboard, BarChart3, Quote, Star, Zap } from 'lucide-react';
import { NeonButton, SectionTitle, FAQItem } from '../components/Shared';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-[#050505]">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000"
                            className="w-full h-full object-cover opacity-50"
                        >
                            <source src="https://assets.mixkit.co/videos/preview/mixkit-wooden-cabin-in-the-middle-of-the-forest-4424-large.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10 py-20">
                    <div className="max-w-4xl">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 mb-8">
                                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                                <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">Growth Agency Especializada</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-brand font-black mb-8 leading-[1] text-white">
                                Sua hospedagem <br /><span className="text-[#CCFF00]">ocupada</span> 365 dias.
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                                O método Vettor28 utiliza inteligência de tráfego e posicionamento premium para lotar chalés, resorts e pousadas sem depender exclusivamente de OTAs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <NeonButton onClick={() => navigate('/contato')}>
                                    Solicitar Diagnóstico Grátis <ArrowRight size={20} />
                                </NeonButton>
                                <NeonButton variant="outline" onClick={() => navigate('/metodo')}>
                                    Ver o Método
                                </NeonButton>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase font-bold tracking-widest">Scroll</span>
                    <ChevronDown size={20} />
                </motion.div>
            </section>

            {/* Partners Marquee */}
            <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
                <div className="container mx-auto px-6 mb-8 text-center">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em]">Hospedagens que escalam com a Vettor28</p>
                </div>
                <div className="flex gap-12 whitespace-nowrap animate-marquee">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="flex gap-12 items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Luxury Resort</span>
                            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Mountain Cabin</span>
                            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Ocean House</span>
                            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Boutique Hotel</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pillars of Growth */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-6">
                    <SectionTitle subtitle="Nossos Pilares" title="Como multiplicamos suas reservas" />
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Target className="text-[#CCFF00]" size={40} />,
                                title: "Tráfego Direto",
                                desc: "Anúncios cirúrgicos no Instagram e Google para levar o hóspede direto para o seu site ou WhatsApp."
                            },
                            {
                                icon: <LayoutDashboard className="text-[#CCFF00]" size={40} />,
                                title: "Posicionamento Premium",
                                desc: "Transformamos a percepção da sua hospedagem para atrair o público que paga mais e reclama menos."
                            },
                            {
                                icon: <BarChart3 className="text-[#CCFF00]" size={40} />,
                                title: "Otimização de ROI",
                                desc: "Análise diária de dados para garantir que cada centavo investido retorne em diárias vendidas."
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="glass-card p-10 rounded-[2.5rem] border-white/5 group"
                            >
                                <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-[#CCFF00]/10 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-brand font-black mb-4">{item.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Authority / Why Us */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/5 blur-[150px] -z-10 rounded-full" />
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="grid grid-cols-2 gap-4">
                                <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800" className="rounded-2xl w-full h-[300px] object-cover mt-12" alt="Cabin 1" />
                                <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800" className="rounded-2xl w-full h-[300px] object-cover" alt="Cabin 2" />
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card p-6 rounded-3xl border-[#CCFF00]/30 backdrop-blur-3xl">
                                <p className="text-4xl font-brand font-black text-[#CCFF00]">8.5x</p>
                                <p className="text-[10px] text-gray-400 uppercase font-bold">ROI Médio em 2024</p>
                            </div>
                        </div>
                        <div>
                            <SectionTitle subtitle="Diferencial" title="Por que não somos uma agência comum?" alignment="left" />
                            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                                Agências comuns atendem de padarias a clínicas médicas. Nós respiramos <strong>Hospitalidade</strong>. Entendemos as sazonalidades, os canais de desejo do hóspede e como converter curiosos em check-ins.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Foco exclusivo em Hospedagens Premium",
                                    "Gestores com experiência real no setor",
                                    "Faturamento direto na sua conta, sem taxas de OTAs",
                                    "Dashboards de acompanhamento em tempo real"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00] flex-shrink-0">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="font-bold text-gray-200">{text}</span>
                                    </div>
                                ))}
                            </div>
                            <NeonButton className="mt-12" onClick={() => navigate('/contato')}>Quero esses resultados</NeonButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio / Visual Showcase */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <SectionTitle subtitle="Portfólio" title="Onde aplicamos nossa inteligência" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", title: "Refúgios de Montanha", tag: "Chalés Luxo" },
                            { img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200", title: "Resorts Beira Mar", tag: "Escala Nacional" },
                            { img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", title: "Hotéis Boutique", tag: "Posicionamento" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 0.98 }}
                                className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] group cursor-pointer"
                            >
                                <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <span className="px-3 py-1 bg-[#CCFF00] text-black text-[10px] font-bold rounded-full uppercase mb-3 inline-block">
                                        {item.tag}
                                    </span>
                                    <h4 className="text-2xl font-brand font-black text-white">{item.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <SectionTitle subtitle="Depoimentos" title="Vozes de quem escalou" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Ricardo Alves", role: "Dono do Chalé Vila Rica", text: "Minhas reservas aumentaram 200% em apenas 3 meses. Hoje não dependo mais das taxas abusivas das plataformas." },
                            { name: "Mariana Costa", role: "Gerente de Resort", text: "A Vettor28 trouxe um público muito mais qualificado. Nosso ticket médio subiu e o atendimento ficou mais fluido." },
                            { name: "Bruno Mendes", role: "Proprietário Pousada SPA", text: "Excelente entrega. O dashboard que eles oferecem dá uma clareza que eu nunca tive antes sobre meu negócio." }
                        ].map((t, i) => (
                            <div key={i} className="glass-card p-10 rounded-3xl border-white/5 relative">
                                <Quote className="text-[#CCFF00]/20 absolute top-8 right-8" size={40} />
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-[#CCFF00] text-[#CCFF00]" />)}
                                </div>
                                <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
                                <div>
                                    <h5 className="font-bold text-white">{t.name}</h5>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-6 max-w-4xl">
                    <SectionTitle subtitle="Dúvidas Frequentes" title="O que você precisa saber" />
                    <div className="space-y-4">
                        <FAQItem
                            question="Quanto tempo leva para ver os resultados?"
                            answer="Os primeiros resultados em termos de cliques e interesse costumam aparecer em 7 dias. O amadurecimento das reservas acontece entre 30 e 60 dias conforme otimizamos o algoritmo."
                        />
                        <FAQItem
                            question="Vocês atendem hospedagens pequenas?"
                            answer="Sim, desde que tenham o objetivo de crescer e escala. Nosso método é adaptável, mas buscamos parceiros que valorizem o posicionamento premium."
                        />
                        <FAQItem
                            question="Preciso de um site próprio?"
                            answer="É o ideal para maximizar a conversão. Caso não tenha, nosso time de branding pode desenvolver uma Landing Page de alta performance para você."
                        />
                        <FAQItem
                            question="Qual o investimento mínimo recomendado?"
                            answer="O investimento em anúncios depende da sua meta de reservas, mas recomendamos começar com um valor que permita ao algoritmo aprender seu público."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="bg-[#CCFF00] p-16 rounded-[4rem] text-black text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-brand font-black mb-8 leading-tight">
                                Pronto para ter seu <br />calendário sempre cheio?
                            </h2>
                            <p className="text-xl font-bold mb-12 opacity-80 max-w-2xl mx-auto">
                                Nossa agenda para novos clientes é limitada para garantir a exclusividade do seu nicho e região.
                            </p>
                            <button
                                onClick={() => navigate('/contato')}
                                className="bg-black text-white px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
                            >
                                Falar com um Especialista
                            </button>
                        </div>
                        {/* Decorative shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 translate-y-1/2 -translate-x-1/2 rounded-full" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
