import React from 'react';
import { SectionTitle } from '../components/Shared';
import { BarChart3, Globe, PenTool, Layout, Layers, Megaphone, Smartphone, PieChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServicosPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
                        Soluções 360º
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-brand text-white mb-6 uppercase tracking-tighter leading-none">
                        Soluções para gerar <br /><span className="text-[#CCFF00]">reservas diretas</span>
                    </h1>
                </div>

                <div className="space-y-32">
                    {/* Bloc 1: Performance */}
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-black font-brand text-white uppercase mb-4 flex items-center gap-4">
                                    <BarChart3 className="text-[#CCFF00]" size={40} />
                                    Performance & Tráfego
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#CCFF00] pl-6">
                                    Gestão profissional de mídia paga focada exclusivamente em ROAS (Retorno Sobre o Investimento). Não vendemos cliques, vendemos reservas.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <Megaphone className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">Meta Ads</h3>
                                    <p className="text-sm text-gray-400">Anúncios de alta conversão no Instagram e Facebook.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <Globe className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">Google Search</h3>
                                    <p className="text-sm text-gray-400">Esteja presente quando o hóspede buscar pela sua região.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <Layers className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">Remarketing</h3>
                                    <p className="text-sm text-gray-400">Recupere usuários que quase reservaram.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#CCFF00] rounded-3xl blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
                            <div className="glass-card p-2 rounded-3xl border-white/10 rotate-1 group-hover:rotate-0 transition-transform duration-500">
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500" alt="Performance" />
                            </div>
                        </div>
                    </div>

                    {/* Bloc 2: Branding */}
                    <div className="grid lg:grid-cols-2 gap-16 lg:flex-row-reverse">
                        <div className="relative group lg:order-2">
                            <div className="absolute inset-0 bg-[#CCFF00] rounded-3xl blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
                            <div className="glass-card p-2 rounded-3xl border-white/10 -rotate-1 group-hover:rotate-0 transition-transform duration-500">
                                <img src="https://images.unsplash.com/photo-1626245386086-6467053eb38c?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500" alt="Branding" />
                            </div>
                        </div>
                        <div className="space-y-8 lg:order-1">
                            <div>
                                <h2 className="text-4xl font-black font-brand text-white uppercase mb-4 flex items-center gap-4">
                                    <PenTool className="text-[#CCFF00]" size={40} />
                                    Branding Premium
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#CCFF00] pl-6">
                                    Transformamos sua hospedagem em uma marca desejada. Criamos identidade visual e narrativas que conectam com o público de alto padrão.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <Layout className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">Identidade Visual</h3>
                                    <p className="text-sm text-gray-400">Logos, paletas e tipografia que transmitem sofisticação.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <Smartphone className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">Conteúdo</h3>
                                    <p className="text-sm text-gray-400">Direção criativa para fotos e vídeos da propriedade.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bloc 3: Sales System */}
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-black font-brand text-white uppercase mb-4 flex items-center gap-4">
                                    <PieChart className="text-[#CCFF00]" size={40} />
                                    Sistema de Vendas
                                </h2>
                                <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-[#CCFF00] pl-6">
                                    Implementamos a infraestrutura necessária para você vender sem depender de ninguém. Site próprio, motor de reservas e CRM.
                                </p>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <Globe className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">Websites</h3>
                                    <p className="text-sm text-gray-400">Sites otimizados para conversão e mobile-first.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#CCFF00]/50 transition-colors">
                                    <BarChart3 className="text-[#CCFF00] mb-4" size={24} />
                                    <h3 className="font-bold text-xl mb-2">CRM e Dados</h3>
                                    <p className="text-sm text-gray-400">Organize seus clientes e automatize o relacionamento.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#CCFF00] rounded-3xl blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity" />
                            <div className="glass-card p-2 rounded-3xl border-white/10 rotate-1 group-hover:rotate-0 transition-transform duration-500">
                                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-500" alt="Sales System" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32 text-center">
                    <Link to="/diagnostico">
                        <button className="bg-[#CCFF00] text-black font-black uppercase text-xl py-6 px-12 rounded-full hover:scale-105 transition-transform shadow-2xl">
                            Contratar Soluções Vettor 28
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicosPage;
