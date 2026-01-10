import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Booking, Property } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, Trash2, Edit2, Loader2, Filter, Download, Printer, Tag, X } from 'lucide-react';
import { NeonButton } from '../../components/Shared';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

const PREDEFINED_TAGS = [
    { label: 'Aniversário', emoji: '🎂' },
    { label: 'Lua de Mel', emoji: '💍' },
    { label: 'Cliente Recorrente', emoji: '🔄' },
    { label: 'Primeira Reserva', emoji: '🆕' },
    { label: 'Influencer', emoji: '📸' }
];

const BookingsPage: React.FC = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [companyProfile, setCompanyProfile] = useState<any>(null);

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
            fetchCompanyProfile();
        }
    }, [user]);

    const fetchCompanyProfile = async () => {
        const { data } = await supabase.from('profiles').select('*').eq('id', user?.id).single();
        if (data) setCompanyProfile(data);
    };

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

    const exportCSV = () => {
        const headers = ['Guest', 'Check-In', 'Check-Out', 'Gross Value', 'Channel', 'Detailed Channel', 'Ad Cost', 'Status', 'Property', 'Tags'];
        const rows = filteredBookings.map(b => [
            b.guest_name,
            b.check_in,
            b.check_out,
            b.gross_value,
            b.channel,
            b.detailed_channel || '',
            b.ad_cost,
            b.status,
            (b.property as any)?.name,
            (b.tags || []).join('; ')
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

    const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        } catch (e) {
            console.error("Error converting image", e);
            return null;
        }
    };

    const handlePrintBooking = async (booking: Booking) => {
        const doc = new jsPDF();
        let yPos = 20;

        if (companyProfile?.logo_url) {
            try {
                const imgData = await fetchImageAsBase64(companyProfile.logo_url);
                if (imgData) {
                    doc.addImage(imgData, 'PNG', 15, 10, 30, 30);
                }
            } catch (e) {
                console.error("Could not load logo", e);
            }
        } else {
            doc.setFontSize(10);
            doc.setTextColor(150);
            doc.text("LOGO", 20, 25);
        }

        doc.setFontSize(18);
        doc.setTextColor(0, 51, 102);
        doc.setFont("helvetica", "bold");
        doc.text(companyProfile?.company_name || "Sua Empresa", 195, 20, { align: 'right' });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(companyProfile?.website || "", 195, 26, { align: 'right' });
        doc.text(companyProfile?.whatsapp || "", 195, 31, { align: 'right' });

        doc.setDrawColor(200);
        doc.line(15, 45, 195, 45);

        yPos = 60;
        doc.setFontSize(16);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.text("Reserva Confirmada", 105, yPos, { align: 'center' });

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text(`Voucher #${booking.id.slice(0, 8).toUpperCase()}`, 105, yPos + 6, { align: 'center' });

        yPos += 20;
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont("helvetica", "bold");
        doc.text("Detalhes da Reserva", 15, yPos);
        yPos += 8;

        autoTable(doc, {
            startY: yPos,
            head: [['Item', 'Detalhe']],
            body: [
                ['Hóspede', booking.guest_name],
                ['Acomodação', (booking.property as any)?.name || 'N/A'],
                ['Check-in', format(new Date(booking.check_in), 'dd/MM/yyyy')],
                ['Check-out', format(new Date(booking.check_out), 'dd/MM/yyyy')],
                ['Canal', booking.channel.toUpperCase()],
                ['Origem Detalhada', booking.detailed_channel || '-'],
                ['Status', booking.status === 'confirmed' ? 'CONFIRMADA' : booking.status],
                ['Valor Total', new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(booking.gross_value)]
            ],
            theme: 'grid',
            headStyles: { fillColor: [0, 51, 102], textColor: 255 },
            styles: { fontSize: 10, cellPadding: 4 },
            columnStyles: { 0: { fontStyle: 'bold', cellWidth: 60 } }
        });

        const finalY = (doc as any).lastAutoTable.finalY + 20;
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text("Este documento serve como comprovante de sua reserva.", 105, finalY, { align: 'center' });
        doc.text(`Gerado em ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, 105, finalY + 5, { align: 'center' });

        doc.save(`voucher_${booking.guest_name?.split(' ')[0]}_${booking.id.slice(0, 6)}.pdf`);
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
            </div>

            {/* Table View */}
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
                                    {b.tags && b.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-1">
                                            {b.tags.map((tag: string, idx: number) => {
                                                const predefined = PREDEFINED_TAGS.find(pt => tag.includes(pt.label) || tag === pt.emoji + ' ' + pt.label);
                                                // If it's a legacy simple string, matching might be lose. 
                                                // We'll trust the tag content mostly.
                                                return (
                                                    <span key={idx} className="bg-white/10 text-[10px] px-1.5 py-0.5 rounded text-gray-300 border border-white/5">
                                                        {tag}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4 text-gray-300">
                                    <div>{new Date(b.check_in).toLocaleDateString()}</div>
                                    <div className="text-xs text-gray-500">até {new Date(b.check_out).toLocaleDateString()}</div>
                                </td>
                                <td className="p-4 font-mono text-[#CCFF00]">R$ {b.gross_value}</td>
                                <td className="p-4">
                                    <div className="capitalize text-gray-400">{b.channel}</div>
                                    {b.detailed_channel && <div className="text-xs text-gray-600">{b.detailed_channel}</div>}
                                </td>
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
                                        <button
                                            onClick={() => handlePrintBooking(b)}
                                            className="p-2 hover:bg-white/10 rounded text-blue-400"
                                            title="Imprimir Voucher"
                                        >
                                            <Printer size={16} />
                                        </button>
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

export default BookingsPage;
