import React, { useState } from 'react';
import { X, Building2, Calendar, DollarSign, ExternalLink, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { Profile, Booking, Property } from '../../types';

interface ClientWithMetrics extends Profile {
    metrics: {
        totalRevenue: number;
        bookingsCount: number;
        propertiesCount: number;
    };
    suggestion: string;
}

interface ClientDetailsModalProps {
    client: ClientWithMetrics | null;
    isOpen: boolean;
    onClose: () => void;
    bookings: Booking[];
    properties: Property[];
}

const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({ client, isOpen, onClose, bookings, properties }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'bookings'>('overview');

    if (!isOpen || !client) return null;

    const clientProperties = properties.filter(p => p.user_id === client.id);
    const clientBookings = bookings.filter(b => b.user_id === client.id).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Slide-over Panel */}
            <div className="relative w-full max-w-2xl bg-[#09090B] border-l border-white/10 h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-out">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-start bg-white/5">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#CCFF00] to-green-500 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-white text-2xl">
                                {client.name?.[0]?.toUpperCase()}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">{client.company_name || client.name}</h2>
                            <div className="flex flex-col gap-1 text-gray-400 text-sm mt-1">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} /> {client.email}
                                </div>
                                {client.whatsapp && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={14} /> {client.whatsapp}
                                    </div>
                                )}
                                <div className="mt-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${client.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                                            client.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {client.status === 'approved' ? 'Ativo' : client.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto">

                    {/* Tabs */}
                    <div className="flex border-b border-white/10 px-6">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`py-4 px-2 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'overview' ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-transparent text-gray-400 hover:text-white'}`}
                        >
                            Visão Geral
                        </button>
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`py-4 px-2 mr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'properties' ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-transparent text-gray-400 hover:text-white'}`}
                        >
                            Imóveis ({clientProperties.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`py-4 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'bookings' ? 'border-[#CCFF00] text-[#CCFF00]' : 'border-transparent text-gray-400 hover:text-white'}`}
                        >
                            Reservas ({clientBookings.length})
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                {/* Metrics Grid */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                                            <DollarSign size={16} />
                                            <span className="text-xs uppercase font-bold">Receita Total</span>
                                        </div>
                                        <div className="text-xl font-bold text-[#CCFF00] font-mono">
                                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.metrics.totalRevenue)}
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                                            <Calendar size={16} />
                                            <span className="text-xs uppercase font-bold">Reservas</span>
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {client.metrics.bookingsCount}
                                        </div>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <div className="flex items-center gap-2 text-gray-400 mb-2">
                                            <Building2 size={16} />
                                            <span className="text-xs uppercase font-bold">Imóveis</span>
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {client.metrics.propertiesCount}
                                        </div>
                                    </div>
                                </div>

                                {/* Suggestion Box */}
                                <div className="bg-gradient-to-r from-yellow-500/10 to-transparent p-6 rounded-2xl border border-yellow-500/20">
                                    <h3 className="text-yellow-500 font-bold mb-2 flex items-center gap-2">
                                        <ExternalLink size={18} />
                                        Sugestão do Sistema
                                    </h3>
                                    <p className="text-gray-300">{client.suggestion}</p>
                                </div>

                                {/* Client Additional Info */}
                                <div className="space-y-4 pt-4">
                                    <h3 className="text-white font-bold">Informações Adicionais</h3>
                                    {client.website && (
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <span className="text-gray-400 text-sm">Website</span>
                                            <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-[#CCFF00] hover:underline text-sm truncate max-w-[200px]">
                                                {client.website}
                                            </a>
                                        </div>
                                    )}
                                    {client.address && (
                                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <MapPin size={14} /> Endereço
                                            </div>
                                            <span className="text-white text-sm text-right">{client.address}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                        <span className="text-gray-400 text-sm">Cliente desde</span>
                                        <span className="text-white text-sm">
                                            {new Date(client.created_at).toLocaleDateString('pt-BR')}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'properties' && (
                            <div className="space-y-4">
                                {clientProperties.length > 0 ? (
                                    clientProperties.map(property => (
                                        <div key={property.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-bold text-white text-lg">{property.name}</h4>
                                                    <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                                                        <MapPin size={12} /> {property.city} - {property.state}
                                                    </p>
                                                </div>
                                                <span className="px-2 py-1 rounded text-xs bg-white/10 text-white font-mono">
                                                    {property.type}
                                                </span>
                                            </div>
                                            <div className="mt-4 grid grid-cols-2 gap-4">
                                                <div className="p-2 bg-black/20 rounded-lg">
                                                    <p className="text-xs text-gray-500 uppercase">Diária Média</p>
                                                    <p className="text-[#CCFF00] font-mono">
                                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.avg_daily_rate || 0)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <Building2 className="mx-auto mb-3 opacity-50" size={32} />
                                        <p>Nenhum imóvel cadastrado.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="space-y-4">
                                {clientBookings.length > 0 ? (
                                    clientBookings.map(booking => (
                                        <div key={booking.id} className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-white">{booking.guest_name || 'Hóspede sem nome'}</h4>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(booking.check_in).toLocaleDateString('pt-BR')} - {new Date(booking.check_out).toLocaleDateString('pt-BR')}
                                                    </p>
                                                </div>
                                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                                                        booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                                                            'bg-yellow-500/10 text-yellow-500'
                                                    }`}>
                                                    {booking.status === 'confirmed' ? 'Confirmado' : booking.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-end mt-2 pt-2 border-t border-white/5">
                                                <span className="text-xs text-gray-400 uppercase bg-white/5 px-2 py-1 rounded">
                                                    {booking.channel}
                                                </span>
                                                <span className="text-[#CCFF00] font-mono font-bold">
                                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(booking.gross_value)}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <Calendar className="mx-auto mb-3 opacity-50" size={32} />
                                        <p>Nenhuma reserva registrada.</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-white/10 flex gap-4 bg-white/5">
                    {client.whatsapp && (
                        <a
                            href={`https://wa.me/${client.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <MessageCircle size={18} />
                            WhatsApp
                        </a>
                    )}
                    <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold transition-colors">
                        Editar Perfil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClientDetailsModal;
