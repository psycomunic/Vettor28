import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Booking, Property } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Trash2, Edit2, Loader2, CalendarCheck, Filter, Tag, X } from 'lucide-react';
import { NeonButton } from '../../components/Shared';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isWithinInterval, addMonths, subMonths, startOfWeek, endOfWeek, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const PREDEFINED_TAGS = [
    { label: 'Aniversário', emoji: '🎂' },
    { label: 'Lua de Mel', emoji: '💍' },
    { label: 'Cliente Recorrente', emoji: '🔄' },
    { label: 'Primeira Reserva', emoji: '🆕' },
    { label: 'Influencer', emoji: '📸' }
];

const CalendarPage: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Filters
    const [filterProperty, setFilterProperty] = useState('all');

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());

    // Form State
    const [formData, setFormData] = useState({
        property_id: '',
        guest_name: '',
        check_in: '',
        check_out: '',
        gross_value: 0,
        channel: 'direct',
        detailed_channel: '',
        channel_fee_value: 0,
        ad_cost: 0,
        status: 'confirmed',
        notes: '',
        tags: [] as string[],
    });

    const [customTagInput, setCustomTagInput] = useState('');

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
        try {
            if (editingId) {
                const { error } = await supabase.from('bookings').update(formData).eq('id', editingId);
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
            alert('Erro: ' + error.message);
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
            detailed_channel: '',
            channel_fee_value: 0,
            ad_cost: 0,
            status: 'confirmed',
            notes: '',
            tags: [],
        });
        setCustomTagInput('');
    };

    const openEdit = (b: Booking) => {
        setFormData({
            property_id: b.property_id,
            guest_name: b.guest_name,
            check_in: b.check_in,
            check_out: b.check_out,
            gross_value: b.gross_value,
            channel: b.channel,
            detailed_channel: b.detailed_channel || '',
            channel_fee_value: b.channel_fee_value || 0,
            ad_cost: b.ad_cost || 0,
            status: b.status,
            notes: b.notes || '',
            tags: b.tags || [],
        });
        setEditingId(b.id);
        setIsModalOpen(true);
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => {
            const exists = prev.tags.includes(tag);
            if (exists) return { ...prev, tags: prev.tags.filter(t => t !== tag) };
            return { ...prev, tags: [...prev.tags, tag] };
        });
    };

    const addCustomTag = () => {
        if (!customTagInput.trim()) return;
        if (!formData.tags.includes(customTagInput.trim())) {
            setFormData(prev => ({ ...prev, tags: [...prev.tags, customTagInput.trim()] }));
        }
        setCustomTagInput('');
    }

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

    const onDateClick = (date: Date) => {
        resetForm();
        setFormData(prev => ({
            ...prev,
            check_in: format(date, 'yyyy-MM-dd'),
            check_out: format(date, 'yyyy-MM-dd')
        }));
        setIsModalOpen(true);
    };

    const getBookingsForDay = (date: Date) => {
        return filteredBookings.filter(b => {
            const start = parseISO(b.check_in);
            const end = parseISO(b.check_out);
            return isWithinInterval(date, { start, end });
        });
    };

    const getBookingStyle = (b: Booking) => {
        if (b.status === 'cancelled') return 'bg-gray-500/50 text-gray-400 line-through';
        if (b.status === 'pending') return 'bg-yellow-500/80 text-black border border-yellow-500';

        switch (b.channel) {
            case 'booking': return 'bg-[#003580] text-white';
            case 'airbnb': return 'bg-[#FF5A5F] text-white';
            case 'direct': return 'bg-[#CCFF00] text-black';
            default: return 'bg-purple-600 text-white';
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-brand font-black text-white">Calendário Inteligente</h1>
                    <p className="text-gray-400 text-sm">Visão completa da sua ocupação.</p>
                </div>
                <div>
                    <NeonButton onClick={() => { setEditingId(null); resetForm(); setIsModalOpen(true); }} className="!py-3 !px-4 text-xs">
                        <Plus size={16} /> Nova Reserva
                    </NeonButton>
                </div>
            </div>

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

                <div className="flex items-center gap-3 text-[10px] text-gray-400 hidden md:flex">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#CCFF00]"></div> Direto</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#003580]"></div> Booking</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#FF5A5F]"></div> Airbnb</div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Pendente</div>
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={prevMonth} className="text-gray-400 hover:text-[#CCFF00] font-bold">&lt;</button>
                    <span className="text-white font-black uppercase text-sm tracking-widest">
                        {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                    </span>
                    <button onClick={nextMonth} className="text-gray-400 hover:text-[#CCFF00] font-bold">&gt;</button>
                </div>
            </div>

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
                                            className={`text-[8px] truncate px-1.5 py-0.5 rounded-md font-bold ${getBookingStyle(b)}`}
                                            title={`${b.guest_name} - ${b.tags?.join(', ')}`}
                                        >
                                            {/* Show first tag emoji if available */}
                                            {b.tags && b.tags.length > 0 ? (
                                                <span className="mr-1">{b.tags[0].split(' ')[0]}</span>
                                            ) : null}
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-[#111] border border-white/10 rounded-3xl p-8 max-w-2xl w-full relative my-10">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><Plus className="rotate-45" size={24} /></button>
                        <h2 className="text-2xl font-black mb-6"> {editingId ? 'Editar Reserva' : 'Nova Reserva'}</h2>
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
                                    <label className="text-gray-500 text-xs font-bold uppercase">Canal Principal</label>
                                    <select value={formData.channel} onChange={e => setFormData({ ...formData, channel: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]">
                                        <option value="direct">Direto</option>
                                        <option value="booking">Booking.com</option>
                                        <option value="airbnb">Airbnb</option>
                                        <option value="other">Outro</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Origem Detalhada</label>
                                    <input
                                        placeholder="Ex: Indicação, Instagram, Google..."
                                        value={formData.detailed_channel}
                                        onChange={e => setFormData({ ...formData, detailed_channel: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-500 text-xs font-bold uppercase">Status</label>
                                    <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]">
                                        <option value="confirmed">Confirmada</option>
                                        <option value="pending">Pendente</option>
                                        <option value="cancelled">Cancelada</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-gray-500 text-xs font-bold uppercase block">Tags</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {PREDEFINED_TAGS.map(tag => {
                                            const isActive = formData.tags.includes(`${tag.emoji} ${tag.label}`);
                                            return (
                                                <button
                                                    key={tag.label}
                                                    type="button"
                                                    onClick={() => toggleTag(`${tag.emoji} ${tag.label}`)}
                                                    className={`text-xs px-2 py-1 rounded-full border transition-all ${isActive ? 'bg-[#CCFF00] text-black border-[#CCFF00] font-bold' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
                                                >
                                                    {tag.emoji} {tag.label}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            placeholder="Tag personalizada..."
                                            value={customTagInput}
                                            onChange={e => setCustomTagInput(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 text-xs text-white outline-none focus:border-[#CCFF00]"
                                        />
                                        <button type="button" onClick={addCustomTag} className="bg-white/10 hover:bg-white/20 text-white rounded-lg px-3 text-xs"><Plus size={14} /></button>
                                    </div>
                                    {formData.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2 p-2 bg-white/5 rounded-lg">
                                            {formData.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-black text-[10px] px-2 py-1 rounded border border-white/10 flex items-center gap-1 group">
                                                    {tag}
                                                    <button type="button" onClick={() => toggleTag(tag)} className="text-gray-500 group-hover:text-red-500"><X size={10} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
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

export default CalendarPage;
