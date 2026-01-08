import React from 'react';
import { Phone, Mail } from 'lucide-react';
import { PageWrapper, SectionTitle, NeonButton } from '../components/Shared';

const ContatoPage: React.FC = () => (
    <PageWrapper>
        <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-start">
                <div>
                    <SectionTitle subtitle="Fale Conosco" title="O próximo passo da sua escala" alignment="left" />
                    <p className="text-gray-400 mb-12 text-lg leading-relaxed">
                        Estamos prontos para analisar sua operação atual e traçar um plano de crescimento agressivo. Escolha o canal abaixo:
                    </p>

                    <div className="space-y-6">
                        <a href="#" className="flex items-center gap-6 glass-card p-8 rounded-3xl border-white/5 hover:border-[#CCFF00]/40 transition-all group">
                            <div className="w-16 h-16 bg-[#CCFF00]/10 rounded-2xl flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors"><Phone size={32} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">WhatsApp Business</p>
                                <p className="text-xl font-bold">+55 (11) 99999-9999</p>
                            </div>
                        </a>
                        <a href="#" className="flex items-center gap-6 glass-card p-8 rounded-3xl border-white/5 hover:border-[#CCFF00]/40 transition-all group">
                            <div className="w-16 h-16 bg-[#CCFF00]/10 rounded-2xl flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors"><Mail size={32} /></div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold mb-1">E-mail Corporativo</p>
                                <p className="text-xl font-bold">growth@vettor28.com.br</p>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="glass-card p-12 rounded-[3.5rem] border-white/10 shadow-2xl">
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome Completo</label>
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all" placeholder="Como devemos te chamar?" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all" placeholder="Seu melhor e-mail" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hospedagem / Site</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all" placeholder="Qual o nome do seu projeto?" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mensagem</label>
                            <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all resize-none" placeholder="Qual o seu principal desafio hoje?" />
                        </div>
                        <NeonButton className="w-full !py-6 text-lg">Solicitar Diagnóstico</NeonButton>
                    </form>
                </div>
            </div>
        </div>
    </PageWrapper>
);

export default ContatoPage;
