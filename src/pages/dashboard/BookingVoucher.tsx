import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Booking, Profile } from '../../types';
import { Loader2, Printer, MapPin, Phone, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const BookingVoucher: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [booking, setBooking] = useState<Booking | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) fetchBookingData();
    }, [id]);

    const fetchBookingData = async () => {
        try {
            // Fetch booking with property details
            const { data: bookingData, error: bookingError } = await supabase
                .from('bookings')
                .select('*, property:properties(name)')
                .eq('id', id)
                .single();

            if (bookingError) throw bookingError;

            // Fetch owner profile (company details)
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', bookingData.user_id)
                .single();

            if (profileError) throw profileError;

            setBooking(bookingData);
            setProfile(profileData);
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('Erro ao carregar dados da reserva.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-gray-800" size={32} /></div>;
    if (!booking) return <div className="h-screen flex items-center justify-center bg-white text-gray-800">Reserva não encontrada.</div>;

    const nights = Math.ceil((new Date(booking.check_out).getTime() - new Date(booking.check_in).getTime()) / (1000 * 60 * 60 * 24));

    return (
        <div className="bg-white min-h-screen text-gray-800 p-8 font-sans print:p-0">
            {/* Print Button - Hiden on Print */}
            <div className="max-w-3xl mx-auto mb-8 flex justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg"
                >
                    <Printer size={18} /> Imprimir Voucher
                </button>
            </div>

            {/* Voucher Container */}
            <div className="max-w-3xl mx-auto border-2 border-gray-200 bg-white shadow-xl print:shadow-none print:border-0 rounded-none relative overflow-hidden">
                {/* Header */}
                <div className="border-b-2 border-gray-100 p-8 flex justify-between items-center bg-gray-50 print:bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        {profile?.logo_url && (
                            <img src={profile.logo_url} alt="Logo" className="h-20 w-auto object-contain" />
                        )}
                        {!profile?.logo_url && (
                            <div className="h-16 w-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 font-bold text-xs">LOGO</div>
                        )}
                        <div>
                            <h1 className="text-2xl font-black text-blue-900 uppercase leading-none mb-1">
                                {profile?.company_name || 'Hospedagem'}
                            </h1>
                            <p className="text-sm text-gray-500 font-medium">{profile?.website || 'www.seusite.com.br'}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Voucher Nº</div>
                        <div className="text-xl font-mono font-bold text-gray-800">{booking.id.slice(0, 8).toUpperCase()}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="text-center mb-10">
                        <h2 className="text-xl font-bold text-blue-900 uppercase tracking-wide mb-2">Confirmação de Reserva</h2>
                        <p className="text-gray-500 text-sm">Olá, sua reserva foi confirmada com sucesso! Confira os detalhes abaixo.</p>
                    </div>

                    {/* Booking Details Grid */}
                    <div className="border rounded-lg border-gray-200 overflow-hidden mb-8">
                        <div className="bg-gray-100 p-3 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">
                            Dados da Reserva
                        </div>
                        <div className="grid grid-cols-2 divide-x divide-gray-200 bg-white">
                            <div className="p-4 space-y-4">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Hóspede Responsável</span>
                                    <span className="block text-gray-900 font-bold text-lg">{booking.guest_name}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Acomodação</span>
                                    <span className="block text-gray-900 font-medium">{(booking.property as any)?.name}</span>
                                </div>
                            </div>
                            <div className="p-4 space-y-4">
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Período ({nights} noites)</span>
                                    <div className="flex items-center gap-2 text-gray-900 font-medium">
                                        <span>{format(new Date(booking.check_in), 'dd/MM/yyyy')}</span>
                                        <span className="text-gray-400">→</span>
                                        <span>{format(new Date(booking.check_out), 'dd/MM/yyyy')}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Canal de Reserva</span>
                                    <span className="block text-gray-900 font-medium capitalize">{booking.channel}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="border rounded-lg border-gray-200 overflow-hidden mb-12">
                        <div className="bg-gray-100 p-3 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-200">
                            Informações Financeiras
                        </div>
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-gray-200">
                                <tr>
                                    <td className="p-4 font-bold text-gray-600 w-1/2">Forma de Pagamento</td>
                                    <td className="p-4 text-gray-900">A combinar no Check-in</td>
                                </tr>
                                <tr>
                                    <td className="p-4 font-bold text-gray-600 bg-blue-50/50">Valor Total da Reserva</td>
                                    <td className="p-4 font-black text-xl text-blue-900 bg-blue-50/50">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(booking.gross_value)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Instructions */}
                    <div className="text-sm text-gray-500 mb-12 text-center italic">
                        <p>Se possível, apresente este documento (digital ou impresso) no momento do check-in.</p>
                        <p>Desejamos a você uma ótima estadia!</p>
                    </div>

                    {/* Footer Contact */}
                    <div className="border-t-2 border-gray-100 pt-8 mt-8">
                        <div className="text-center">
                            <h4 className="font-bold text-blue-900 uppercase text-sm mb-4">Central de Atendimento</h4>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-600">
                                {profile?.whatsapp && (
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} />
                                        <span>{profile.whatsapp}</span>
                                    </div>
                                )}
                                {profile?.website && (
                                    <div className="flex items-center gap-2">
                                        <Globe size={16} />
                                        <span>{profile.website}</span>
                                    </div>
                                )}
                            </div>
                            {profile?.address && (
                                <div className="flex justify-center items-center gap-2 mt-4 text-xs text-gray-400">
                                    <MapPin size={14} />
                                    <span>{profile.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center text-xs text-gray-300 mt-8 print:hidden">
                Gerado via Sistema Vettor28
            </div>
        </div>
    );
};

export default BookingVoucher;
