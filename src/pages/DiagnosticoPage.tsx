import React, { useState } from 'react';
import { SectionTitle } from '../components/Shared';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const DiagnosticoPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        type: 'Pousada',
        region: '',
        avgTicket: '',
        occupancy: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Obrigado! Entraremos em contato em breve.");
        // Here we would send data to Supabase/API
    };

    return (
        <div className="bg-[#0a0a0a] min-h-screen text-white pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-2xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#CCFF00] text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                        Vagas Limitadas por Região
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black font-brand uppercase tracking-tighter mb-6">
                        Descubra o potencial real <br /> da sua hospedagem
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Preencha o formulário abaixo para receber um diagnóstico estratégico gratuito.
                    </p>
                </div>

                <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border-white/10 relative overflow-hidden">
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                        {/* Progressive Form Fields could go here, keeping it simple for now */}

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Seu Nome</label>
                                <input
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors"
                                    placeholder="Nome completo"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">WhatsApp</label>
                                <input
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors"
                                    placeholder="(00) 00000-0000"
                                    value={formData.whatsapp}
                                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email Comercial</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Tipo de Hospedagem</label>
                                <select
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors appearance-none"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option>Pousada</option>
                                    <option>Hotel Boutique</option>
                                    <option>Resort</option>
                                    <option>Chalés / Cabanas</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Região / Cidade</label>
                                <input
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors"
                                    placeholder="Ex: Campos do Jordão"
                                    value={formData.region}
                                    onChange={e => setFormData({ ...formData, region: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ticket Médio (Diária)</label>
                                <select
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors appearance-none"
                                    value={formData.avgTicket}
                                    onChange={e => setFormData({ ...formData, avgTicket: e.target.value })}
                                >
                                    <option value="">Selecione...</option>
                                    <option>Até R$ 500</option>
                                    <option>R$ 500 - R$ 1.000</option>
                                    <option>R$ 1.000 - R$ 2.000</option>
                                    <option>Acima de R$ 2.000</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Ocupação Média Atual</label>
                                <select
                                    className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-[#CCFF00] outline-none transition-colors appearance-none"
                                    value={formData.occupancy}
                                    onChange={e => setFormData({ ...formData, occupancy: e.target.value })}
                                >
                                    <option value="">Selecione...</option>
                                    <option>Abaixo de 30%</option>
                                    <option>30% - 50%</option>
                                    <option>50% - 70%</option>
                                    <option>Acima de 70%</option>
                                </select>
                            </div>
                        </div>

                        <button className="w-full bg-[#CCFF00] text-black font-black uppercase text-lg py-5 rounded-xl hover:bg-[#b3e600] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#CCFF00]/20">
                            Solicitar Diagnóstico <ArrowRight />
                        </button>

                    </form>

                    {/* Decorative Gradients */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 blur-[100px] translate-y-1/2 -translate-x-1/2 rounded-full pointer-events-none" />
                </div>

                <div className="mt-12 flex justify-center gap-8 text-gray-500 text-sm font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#CCFF00]" /> Dados Seguros</div>
                    <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[#CCFF00]" /> Resposta em 24h</div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosticoPage;
