import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Property } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Trash2, Edit2, Loader2, Home } from 'lucide-react';
import { NeonButton } from '../../components/Shared';

const PropertiesPage: React.FC = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        type: 'chale',
        city: '',
        state: '',
        avg_daily_rate: 0,
        fixed_cost_monthly: 0,
        marketing_invest_monthly: 0,
        photo_url: '',
    });

    const fetchProperties = async () => {
        try {
            const { data, error } = await supabase.from('properties').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            setProperties(data || []);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) fetchProperties();
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                const { error } = await supabase.from('properties').update({ ...formData }).eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('properties').insert([{ ...formData, user_id: user?.id }]);
                if (error) throw error;
            }
            setIsModalOpen(false);
            setEditingId(null);
            setFormData({ name: '', type: 'chale', city: '', state: '', avg_daily_rate: 0, fixed_cost_monthly: 0 });
            fetchProperties();
        } catch (error) {
            alert('Erro ao salvar estabelecimento');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir? Isso apagará todas as reservas vinculadas.')) return;
        try {
            const { error } = await supabase.from('properties').delete().eq('id', id);
            if (error) throw error;
            fetchProperties();
        } catch (error) {
            console.error(error);
            alert('Erro ao excluir');
        }
    };

    const openEdit = (p: Property) => {
        setFormData({
            name: p.name,
            type: p.type as any,
            city: p.city || '',
            state: p.state || '',
            avg_daily_rate: p.avg_daily_rate || 0,
            fixed_cost_monthly: p.fixed_cost_monthly || 0,
            marketing_invest_monthly: p.marketing_invest_monthly || 0,
            photo_url: p.photo_url || '',
        });
        setEditingId(p.id);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-brand font-black text-white">Estabelecimentos</h1>
                    <p className="text-gray-400 text-sm">Gerencie suas unidades de negócio.</p>
                </div>
                <NeonButton onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="!py-3 !px-6 text-xs">
                    <Plus size={16} /> Adicionar
                </NeonButton>
            </div>

            {loading && !isModalOpen ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-[#CCFF00]" /></div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map(p => (
                        <div key={p.id} className="glass-card p-6 rounded-3xl border-white/5 group relative overflow-hidden">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00]">
                                    <Home size={24} />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => openEdit(p)} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                                    <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            
                            {p.photo_url && (
                                <div className="w-full h-40 mb-4 rounded-xl overflow-hidden">
                                     <img src={p.photo_url} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                </div>
                            )}

                            <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#CCFF00] mb-4">{p.type}</p>

                            <div className="space-y-2 text-sm text-gray-400">
                                <p>{p.city} - {p.state}</p>
                                <div className="flex justify-between border-t border-white/5 pt-2 mt-4">
                                    <span>Custo Fixo:</span>
                                    <span className="text-white font-mono">R$ {p.fixed_cost_monthly}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white font-mono">R$ {p.avg_daily_rate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Invest. Marketing:</span>
                                    <span className="text-white font-mono">R$ {p.marketing_invest_monthly || 0}</span>
                                </div>
                            </div>
                        </div>
    ))
}
{
    properties.length === 0 && (
        <div className="col-span-full text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500">Nenhum estabelecimento cadastrado.</p>
        </div>
    )
}
                </div >
            )}

{/* Modal / Simple Overlay Form */ }
{
    isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-lg w-full relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><Plus className="rotate-45" size={24} /></button>
                <h2 className="text-2xl font-black mb-6">{editingId ? 'Editar' : 'Novo'} Estabelecimento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-gray-500 text-xs font-bold uppercase">Nome</label>
                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                    </div>
                    <div>
                        <label className="text-gray-500 text-xs font-bold uppercase">Foto (URL)</label>
                        <input placeholder="https://..." value={formData.photo_url} onChange={e => setFormData({ ...formData, photo_url: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase">Tipo</label>
                            <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]">
                                <option value="chale">Chalé</option>
                                <option value="pousada">Pousada</option>
                                <option value="hotel">Hotel</option>
                                <option value="outro">Outro</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase">Cidade/UF</label>
                            <div className="flex gap-2">
                                <input placeholder="Cidade" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-2/3 bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                <input placeholder="UF" value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="w-1/3 bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase">Custo Fixo Mensal (R$)</label>
                            <input type="number" value={formData.fixed_cost_monthly} onChange={e => setFormData({ ...formData, fixed_cost_monthly: parseFloat(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase">Diária Média (R$)</label>
                            <input type="number" value={formData.avg_daily_rate} onChange={e => setFormData({ ...formData, avg_daily_rate: parseFloat(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                        </div>
                        <div className="col-span-2">
                            <label className="text-gray-500 text-xs font-bold uppercase">Investimento em Marketing (R$)</label>
                            <input type="number" value={formData.marketing_invest_monthly} onChange={e => setFormData({ ...formData, marketing_invest_monthly: parseFloat(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                        </div>
                    </div>
                    <button className="w-full bg-[#CCFF00] text-black font-bold py-4 rounded-xl mt-4 hover:bg-[#d9ff33] transition-colors">Salvar</button>
                </form>
            </div>
        </div>
    )
}
        </div >
    );
};

export default PropertiesPage;
