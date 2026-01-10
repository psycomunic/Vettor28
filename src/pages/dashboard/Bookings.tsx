import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Booking, Property } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Trash2, Edit2, Loader2, CalendarCheck, Filter, Download } from 'lucide-react';
import { NeonButton } from '../../components/Shared';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, addMonths, subMonths, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
        } catch (error: any) {
            alert(`Erro ao salvar reserva: ${error.message || error.details || JSON.stringify(error)}`);
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

    // Calendar State
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('calendar');
    const [currentDate, setCurrentDate] = useState(new Date());

    // ... (rest of the component)

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const onDateClick = (date: Date) => {
        resetForm();
        setFormData(prev => ({
            ...prev,
            check_in: format(date, 'yyyy-MM-dd'),
            check_out: format(date, 'yyyy-MM-dd') // User will have to adjust checkout
        }));
        setIsModalOpen(true);
    };

    const getBookingsForDay = (date: Date) => {
        return filteredBookings.filter(b => {
            // Basic overlap check or just exact start date for simplicity in dot view?
            // Let's do a bar if it's within interval
            const start = parseISO(b.check_in);
            const end = parseISO(b.check_out);
            return isWithinInterval(date, { start, end });
        });
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-brand font-black text-white">Reservas</h1>
                    <p className="text-gray-400 text-sm">Controle total de ocupação.</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex bg-white/5 rounded-xl p-1 border border-white/5">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-[#CCFF00] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Lista
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'calendar' ? 'bg-[#CCFF00] text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            Calendário
                        </button>
                    </div>

                    <NeonButton variant="outline" onClick={exportCSV} className="!py-3 !px-4 text-xs">
                        <Download size={16} /> CSV
                    </NeonButton>
                    <NeonButton onClick={() => { setEditingId(null); resetForm(); setIsModalOpen(true); }} className="!py-3 !px-4 text-xs">
                        <Plus size={16} /> Nova Reserva
                    </NeonButton>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
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

                {viewMode === 'calendar' && (
                    <div className="flex items-center gap-4">
                        <button onClick={prevMonth} className="text-gray-400 hover:text-[#CCFF00] font-bold">&lt;</button>
                        <span className="text-white font-black uppercase text-sm tracking-widest">
                            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                        </span>
                        <button onClick={nextMonth} className="text-gray-400 hover:text-[#CCFF00] font-bold">&gt;</button>
                    </div>
                )}
            </div>

            {viewMode === 'list' ? (
                /* Table View */
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
            ) : (
                /* Calendar View */
                <div className="glass-card rounded-3xl border-white/5 p-6">
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                            <div key={day} className="text-center text-xs font-bold text-gray-500 uppercase py-2">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {eachDayOfInterval({
                            start: startOfWeek(startOfMonth(currentDate)),
                            end: endOfWeek(endOfMonth(currentDate))
                        }).map((day, idx) => {
                            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                            const dayBookings = getBookingsForDay(day);
                            const hasBooking = dayBookings.length > 0;

                            return (
                                <div
                                    key={idx}
                                    onClick={() => onDateClick(day)}
                                    className={`min-h-[100px] rounded-xl border p-2 relative cursor-pointer group transition-all
                                        ${isCurrentMonth ? 'border-white/5 bg-white/5 hover:bg-white/10' : 'border-transparent bg-transparent opacity-30'}
                                    `}
                                >
                                    <span className={`text-xs font-bold ${isSameDay(day, new Date()) ? 'text-[#CCFF00]' : 'text-gray-400'}`}>
                                        {format(day, 'd')}
                                    </span>

                                    <div className="flex flex-col gap-1 mt-2">
                                        {dayBookings.slice(0, 3).map(b => (
                                            <div key={b.id}
                                                onClick={(e) => { e.stopPropagation(); openEdit(b); }}
                                                className={`text-[8px] truncate px-1.5 py-0.5 rounded-md font-bold text-black
                                                 ${b.status === 'confirmed' ? 'bg-[#CCFF00]' : b.status === 'pending' ? 'bg-yellow-400' : 'bg-red-400'}
                                                `}
                                                title={`${b.guest_name} (${(b.property as any)?.name})`}
                                            >
                                                {b.guest_name}
                                            </div>
                                        ))}
                                        {dayBookings.length > 3 && (
                                            <div className="text-[9px] text-gray-400 text-center">+{dayBookings.length - 3}</div>
                                        )}
                                    </div>

                                    {!hasBooking && isCurrentMonth && (
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
                                            <Plus size={20} className="text-[#CCFF00]" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

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
