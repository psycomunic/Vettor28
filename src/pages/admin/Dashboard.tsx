import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Profile, Booking, Property } from '../../types';
import { Loader2, TrendingUp, Users, DollarSign, BedDouble, AlertCircle } from 'lucide-react';

interface ClientWithMetrics extends Profile {
    metrics: {
        totalRevenue: number;
        bookingsCount: number;
        propertiesCount: number;
    };
    suggestion: string;
}

const AdminDashboard: React.FC = () => {
    const [clients, setClients] = useState<ClientWithMetrics[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalClients: 0,
        pendingClients: 0,
        totalRevenue: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // 1. Fetch Profiles
            const { data: profiles, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .neq('role', 'admin')
                .order('created_at', { ascending: false });

            if (profileError) throw profileError;

            // 2. Fetch All Bookings
            const { data: bookings, error: bookingsError } = await supabase
                .from('bookings')
                .select('*');

            if (bookingsError) throw bookingsError;

            // 3. Fetch All Properties
            const { data: properties, error: propertiesError } = await supabase
                .from('properties')
                .select('*');

            if (propertiesError) throw propertiesError;

            // 4. Calculate Metrics per Client
            const enhancedClients: ClientWithMetrics[] = (profiles || []).map(profile => {
                const clientBookings = (bookings || []).filter((b: Booking) => b.user_id === profile.id);
                const clientProperties = (properties || []).filter((p: Property) => p.user_id === profile.id);

                const totalRevenue = clientBookings.reduce((sum, b) => sum + (b.gross_value || 0), 0);

                // 5. Generate Suggestion
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
            setStats({
                totalClients: profiles?.length || 0,
                pendingClients: profiles?.filter(p => p.status === 'pending').length || 0,
                totalRevenue: enhancedClients.reduce((sum, c) => sum + c.metrics.totalRevenue, 0)
            });

        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const { error } = await supabase.from('profiles').update({ status: 'approved' }).eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error('Error approving user:', error);
            alert("Error approving user");
        }
    };

    const handleReject = async (id: string) => {
        if (!confirm('Tem certeza que deseja rejeitar este cadastro?')) return;
        try {
            const { error } = await supabase.from('profiles').update({ status: 'rejected' }).eq('id', id);
            if (error) throw error;
            fetchData();
        } catch (error) {
            console.error('Error rejecting user:', error);
            alert("Error rejecting user");
        }
    };

    const pendingClients = clients.filter(c => c.status === 'pending');
    const activeClients = clients.filter(c => c.status === 'approved');

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#CCFF00]" size={40} /></div>;

    return (
        <div>
            <h1 className="text-4xl font-black text-white mb-2">Painel da Agência</h1>
            <p className="text-gray-400 mb-8">Visão geral de performance e gestão de clientes.</p>

            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-[#CCFF00]/10 rounded-xl text-[#CCFF00]"><Users size={24} /></div>
                        <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Clientes</h3>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.totalClients}</p>
                </div>
                <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500"><TrendingUp size={24} /></div>
                        <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Pendentes</h3>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.pendingClients}</p>
                </div>
                <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><DollarSign size={24} /></div>
                        <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Receita Total (Clientes)</h3>
                    </div>
                    <p className="text-4xl font-black text-white">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(stats.totalRevenue)}
                    </p>
                </div>
            </div>

            {/* Pending Approvals Section */}
            {pendingClients.length > 0 && (
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-[#CCFF00] mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"></span>
                        Aprovações Pendentes
                    </h2>
                    <div className="glass-card rounded-3xl border-[#CCFF00]/20 overflow-hidden bg-[#CCFF00]/5">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                                    <tr>
                                        <th className="p-6">Nome</th>
                                        <th className="p-6">Empresa</th>
                                        <th className="p-6">Data</th>
                                        <th className="p-6 text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300">
                                    {pendingClients.map(client => (
                                        <tr key={client.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6 font-bold text-white">{client.name || 'Sem nome'}</td>
                                            <td className="p-6">{client.company_name || '-'}</td>
                                            <td className="p-6">{new Date(client.created_at).toLocaleDateString()}</td>
                                            <td className="p-6 text-right flex justify-end gap-2">
                                                <button onClick={() => handleApprove(client.id)} className="bg-[#CCFF00] text-black hover:bg-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg">Aprovar</button>
                                                <button onClick={() => handleReject(client.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg">Rejeitar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-bold text-white mb-6">Lista de Clientes Ativos</h2>
            <div className="glass-card rounded-3xl border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Cliente</th>
                                <th className="p-6 text-center">Imóveis</th>
                                <th className="p-6 text-center">Reservas</th>
                                <th className="p-6">Receita Gerada</th>
                                <th className="p-6">Sugestão / Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {activeClients.map(client => (
                                <tr key={client.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="p-6">
                                        <p className="font-bold text-white">{client.company_name || client.name}</p>
                                        <p className="text-xs text-gray-500">{client.email}</p>
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
                                </tr>
                            ))}
                            {activeClients.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-gray-500">Nenhum cliente ativo encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
