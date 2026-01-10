import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Profile, Booking, Property } from '../../types';
import { Loader2, Search, BedDouble, AlertCircle } from 'lucide-react';
import ClientDetailsModal from '../../components/admin/ClientDetailsModal';

interface ClientWithMetrics extends Profile {
    metrics: {
        totalRevenue: number;
        bookingsCount: number;
        propertiesCount: number;
    };
    suggestion: string;
}

const AdminClients: React.FC = () => {
    const [clients, setClients] = useState<ClientWithMetrics[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedClient, setSelectedClient] = useState<ClientWithMetrics | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: profiles, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .neq('role', 'admin')
                .order('created_at', { ascending: false });

            if (profileError) throw profileError;

            const { data: bookings, error: bookingsError } = await supabase
                .from('bookings')
                .select('*');

            if (bookingsError) throw bookingsError;
            setBookings(bookings || []);

            const { data: properties, error: propertiesError } = await supabase
                .from('properties')
                .select('*');

            if (propertiesError) throw propertiesError;
            setProperties(properties || []);

            const enhancedClients: ClientWithMetrics[] = (profiles || []).map(profile => {
                const clientBookings = (bookings || []).filter((b: Booking) => b.user_id === profile.id);
                const clientProperties = (properties || []).filter((p: Property) => p.user_id === profile.id);

                const totalRevenue = clientBookings.reduce((sum, b) => sum + (b.gross_value || 0), 0);

                let suggestion = "Manter bom trabalho!";
                if (clientProperties.length === 0) suggestion = "Cadastrar primeiro imóvel 🏠";
                else if (clientBookings.length === 0) suggestion = "Investir em tráfego pago 🚀";
                else if (totalRevenue < 5000) suggestion = "Otimizar preços e anúncios 💰";
                else if (clientBookings.length > 5) suggestion = "Expandir portfólio 📈";

                return {
                    ...profile,
                    metrics: {
                        totalRevenue,
                        bookingsCount: clientBookings.length,
                        propertiesCount: clientProperties.length
                    },
                    suggestion
                };
            });

            setClients(enhancedClients);

        } catch (error) {
            console.error('Error fetching clients:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredClients = clients.filter(client =>
        client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#CCFF00]" size={40} /></div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-black text-white mb-2">Clientes</h1>
                    <p className="text-gray-400">Gerencie e analise a performance de todos os clientes.</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar cliente..."
                        className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#CCFF00] outline-none w-64 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="glass-card rounded-3xl border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Cliente</th>
                                <th className="p-6 text-center">Status</th>
                                <th className="p-6 text-center">Imóveis</th>
                                <th className="p-6 text-center">Reservas</th>
                                <th className="p-6">Receita Gerada</th>
                                <th className="p-6">Sugestão</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {filteredClients.map(client => (
                                <tr key={client.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#CCFF00] to-green-500 p-[2px]">
                                                <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-white">
                                                    {client.name?.[0]?.toUpperCase()}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{client.company_name || client.name}</p>
                                                <p className="text-xs text-gray-500">{client.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${client.status === 'approved' ? 'bg-green-500/10 text-green-500' :
                                            client.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                                                'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {client.status === 'approved' ? 'Ativo' : client.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                                        </span>
                                    </td>
                                    <td className="p-6 text-center">
                                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                                            <BedDouble size={14} className="text-gray-400" />
                                            <span className="font-bold text-white">{client.metrics.propertiesCount}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 text-center">
                                        <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-lg">
                                            <span className="font-bold text-white">{client.metrics.bookingsCount}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 font-mono text-[#CCFF00]">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(client.metrics.totalRevenue)}
                                    </td>
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-sm text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-500/20">
                                            <AlertCircle size={14} />
                                            {client.suggestion}
                                        </div>
                                    </td>
                                    <td className="p-6 text-right">
                                        <button
                                            onClick={() => {
                                                setSelectedClient(client);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-[#CCFF00] hover:text-white font-bold text-xs uppercase tracking-widest transition-colors"
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredClients.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="p-12 text-center text-gray-500">Nenhum cliente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ClientDetailsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                client={selectedClient}
                bookings={bookings}
                properties={properties}
            />
        </div >
    );
};

export default AdminClients;
