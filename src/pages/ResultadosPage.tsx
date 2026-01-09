import React from 'react';
import { SectionTitle } from '../components/Shared';
import { Star, MessageSquare } from 'lucide-react';

const ResultadosPage: React.FC = () => {
    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-6 border-b border-[#CCFF00]">
                        Track Record Comprovado
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black font-brand text-white mb-6 uppercase tracking-tighter leading-none">
                        Resultados reais, <br /><span className="text-[#CCFF00]">números reais.</span>
                    </h1>
                </div>

                {/* Case Stories Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-32">
                    {/* Case 1 */}
                    <div className="glass-card p-0 rounded-[2.5rem] border-white/10 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Case 1" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            <div className="absolute bottom-6 left-8">
                                <h3 className="text-2xl font-black uppercase text-white">Chalés Vila da Serra</h3>
                                <p className="text-[#CCFF00] font-bold text-sm">Campos do Jordão, SP</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8 mb-6">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Antes</p>
                                    <p className="text-2xl font-bold text-white">R$ 15k/mês</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Depois (3 Meses)</p>
                                    <p className="text-4xl font-black text-[#CCFF00]">R$ 120k/mês</p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed border-t border-white/10 pt-6">
                                "Estávamos reféns do Booking com comissões de 18%. A Vettor28 implementou o motor de reservas próprio e hoje 80% das nossas vendas são diretas."
                            </p>
                        </div>
                    </div>

                    {/* Case 2 */}
                    <div className="glass-card p-0 rounded-[2.5rem] border-white/10 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Case 2" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            <div className="absolute bottom-6 left-8">
                                <h3 className="text-2xl font-black uppercase text-white">Pousada Mar & Luz</h3>
                                <p className="text-[#CCFF00] font-bold text-sm">Trancoso, BA</p>
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="grid grid-cols-2 gap-8 mb-6">
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Taxa de Ocupação</p>
                                    <p className="text-2xl font-bold text-white">35%</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Nova Ocupação</p>
                                    <p className="text-4xl font-black text-[#CCFF00]">92%</p>
                                </div>
                            </div>
                            <p className="text-gray-400 leading-relaxed border-t border-white/10 pt-6">
                                "Sazonalidade era nosso pesadelo. Com as campanhas de remarketing da Vettor, conseguimos lotar os dias de semana com casais da região."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dashboard Screenshot Section */}
                <div className="mb-32">
                    <div className="bg-[#111] rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                        <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
                            <h2 className="text-3xl font-black font-brand uppercase mb-4">Números que não mentem</h2>
                            <p className="text-gray-400">Acesso transparente aos nossos dashboards de performance. Você vê exatamente para onde vai cada centavo.</p>
                        </div>
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" className="w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 border border-white/10 shadow-2xl" alt="Dashboard" />
                    </div>
                </div>

                {/* Testimonials */}
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5">
                            <div className="flex gap-1 mb-6 text-[#CCFF00]">
                                <Star size={16} fill="#CCFF00" />
                                <Star size={16} fill="#CCFF00" />
                                <Star size={16} fill="#CCFF00" />
                                <Star size={16} fill="#CCFF00" />
                                <Star size={16} fill="#CCFF00" />
                            </div>
                            <p className="text-gray-300 italic mb-6">"Equipe extremamente profissional. O atendimento é rápido e os resultados vieram mais rápido do que o prometido."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-600 rounded-full" />
                                <div>
                                    <p className="font-bold text-white text-sm">Cliente Verificado</p>
                                    <p className="text-xs text-gray-500">Proprietário de Hotel</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ResultadosPage;
