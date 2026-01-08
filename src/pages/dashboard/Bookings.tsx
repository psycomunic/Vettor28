import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Booking, Property } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Trash2, Edit2, Loader2, CalendarCheck, Filter, Download } from 'lucide-react';
import { NeonButton } from '../../components/Shared';

const BookingsPage: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Filters
    const [filterProperty, setFilterProperty] = useState('all');

    // Form State
    const [formData, setFormData] = useState({
        property_id: '',
        guest_name: '',
        check_in: '',
        check_out: '',
        gross_value: 0,
        channel: 'direct',
        channel_fee_value: 0,
        ad_cost: 0,
        status: 'confirmed',
        notes: '',
    });

    useEffect(() => {
        if (user) {
            fetchProperties();
            fetchBookings();
        }
    }, [user]);

    const fetchProperties = async () => {
        const { data } = await supabase.from('properties').select('*');
        if (data) setProperties(data);
    };

    const fetchBookings = async () => {
        setLoading(true);
        let query = supabase.from('bookings').select('*, property:properties(name)').order('check_in', { ascending: false });

        // We would apply filters here if we were doing server-side filtering
        // reusing the same query object
        // if (filterProperty !== 'all') query = query.eq('property_id', filterProperty);

        const { data, error } = await query;
        if (error) console.error(error);
        else setBookings(data || []);
        setLoading(false);
    };

    const filteredBookings = filterProperty === 'all'
        ? bookings
        : bookings.filter(b => b.property_id === filterProperty);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.property_id) { alert('Selecione um estabelecimento'); return; }

        setLoading(true);
        try {
            if (editingId) {
                const { error } = await supabase.from('bookings').update({ ...formData }).eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('bookings').insert([{ ...formData, user_id: user?.id }]);
                if (error) throw error;
            }
            setIsModalOpen(false);
            setEditingId(null);
            resetForm();
            fetchBookings();
        } catch (error) {
            alert('Erro ao salvar reserva');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Excluir reserva?')) return;
        try {
            await supabase.from('bookings').delete().eq('id', id);
            fetchBookings();
        } catch (e) { console.error(e); }
    };

    const resetForm = () => {
        setFormData({
            property_id: properties[0]?.id || '',
            guest_name: '',
            check_in: '',
            check_out: '',
            gross_value: 0,
            channel: 'direct',
            channel_fee_value: 0,
            ad_cost: 0,
            status: 'confirmed',
            notes: '',
        });
    };

    const openEdit = (b: Booking) => {
        setFormData({ ...b } as any);
        setEditingId(b.id);
        setIsModalOpen(true);
    };

    const exportCSV = () => {
        const headers = ['Guest', 'Check-In', 'Check-Out', 'Gross Value', 'Channel', 'Ad Cost', 'Status', 'Property'];
        const rows = filteredBookings.map(b => [
            b.guest_name,
            b.check_in,
            b.check_out,
            b.gross_value,
            b.channel,
            b.ad_cost,
            b.status,
            (b.property as any)?.name
        ]);
        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reservas_vettor28.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-brand font-black text-white">Reservas</h1>
                    <p className="text-gray-400 text-sm">Controle total de ocupação.</p>
                </div>
                <div className="flex gap-4">
                    <NeonButton variant="outline" onClick={exportCSV} className="!py-3 !px-4 text-xs">
                        <Download size={16} /> CSV
                    </NeonButton>
                    <NeonButton onClick={() => { setEditingId(null); resetForm(); setIsModalOpen(true); }} className="!py-3 !px-4 text-xs">
                        <Plus size={16} /> Nova Reserva
                    </NeonButton>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6 flex gap-4 items-center">
                <Filter size={16} className="text-gray-500" />
                <select
                    value={filterProperty}
                    onChange={e => setFilterProperty(e.target.value)}
                    className="bg-transparent text-gray-300 text-sm outline-none cursor-pointer"
                >
                    <option value="all" className="bg-black">Todos os estabelecimentos</option>
                    {properties.map(p => (
                        <option key={p.id} value={p.id} className="bg-black">{p.name}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="glass-card rounded-3xl border-white/5 overflow-hidden overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 uppercase text-xs font-bold text-gray-500 tracking-widest">
                        <tr>
                            <th className="p-4">Hóspede</th>
                            <th className="p-4">Check-in / Out</th>
                            <th className="p-4">Valor</th>
                            <th className="p-4">Canal</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredBookings.map(b => (
                            <tr key={b.id} className="hover:bg-white/[0.02]">
                                <td className="p-4">
                                    <div className="font-bold text-white">{b.guest_name}</div>
                                    <div className="text-xs text-gray-500">{(b.property as any)?.name}</div>
                                </td>
                                <td className="p-4 text-gray-300">
                                    <div>{new Date(b.check_in).toLocaleDateString()}</div>
                                    <div className="text-xs text-gray-500">até {new Date(b.check_out).toLocaleDateString()}</div>
                                </td>
                                <td className="p-4 font-mono text-[#CCFF00]">R$ {b.gross_value}</td>
                                <td className="p-4 capitalize text-gray-400">{b.channel}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold ${b.status === 'confirmed' ? 'bg-green-500/20 text-green-500' :
                                            b.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                                'bg-red-500/20 text-red-500'
                                        }`}>
                                        {b.status === 'confirmed' ? 'Confirmada' : b.status === 'pending' ? 'Pendente' : 'Cancelada'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => openEdit(b)} className="p-2 hover:bg-white/10 rounded text-gray-400"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(b.id)} className="p-2 hover:bg-red-500/10 rounded text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredBookings.length === 0 && (
                    <div className="p-12 text-center text-gray-500">Nenhuma reserva encontrada.</div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative my-10">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><Plus className="rotate-45" size={24} /></button>
                        <h2 className="text-2xl font-black mb-6">Reserva</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Estabelecimento</label>
                                    <select required value={formData.property_id} onChange={e => setFormData({ ...formData, property_id: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]">
                                        <option value="">Selecione...</option>
                                        {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Hóspede</label>
                                    <input required value={formData.guest_name} onChange={e => setFormData({ ...formData, guest_name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Check-in</label>
                                    <input type="date" required value={formData.check_in} onChange={e => setFormData({ ...formData, check_in: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Check-out</label>
                                    <input type="date" required value={formData.check_out} onChange={e => setFormData({ ...formData, check_out: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Valor Bruto (R$)</label>
                                    <input type="number" required value={formData.gross_value} onChange={e => setFormData({ ...formData, gross_value: parseFloat(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Taxa Canal (R$)</label>
                                    <input type="number" value={formData.channel_fee_value} onChange={e => setFormData({ ...formData, channel_fee_value: parseFloat(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Custo Anúncio (R$)</label>
                                    <input type="number" value={formData.ad_cost} onChange={e => setFormData({ ...formData, ad_cost: parseFloat(e.target.value) })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]" />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Canal</label>
                                    <select value={formData.channel} onChange={e => setFormData({ ...formData, channel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]">
                                        <option value="direct">Direto</option>
                                        <option value="booking">Booking.com</option>
                                        <option value="airbnb">Airbnb</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]">
                                        <option value="confirmed">Confirmada</option>
                                        <option value="pending">Pendente</option>
                                        <option value="cancelled">Cancelada</option>
                                    </select>
                                </div>
                            </div>
                            <button className="w-full bg-[#CCFF00] text-black font-bold py-4 rounded-xl mt-4 hover:bg-[#d9ff33] transition-colors">Salvar Reserva</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsPage;
