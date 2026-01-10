import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Profile } from '../../types';
import { Loader2, TrendingUp, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const [clients, setClients] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalClients: 0,
        pendingClients: 0,
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('role', 'admin')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setClients(profiles || []);
            setStats({
                totalClients: profiles?.length || 0,
                pendingClients: profiles?.filter(p => p.status === 'pending').length || 0
            });

        } catch (error) {
            console.error('Error fetching clients:', error);
            // alert("Failed to load clients.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id: string) => {
        try {
            const { error } = await supabase.from('profiles').update({ status: 'approved' }).eq('id', id);
            if (error) throw error;
            fetchClients(); // Refresh list
        } catch (error) {
            console.error('Error approving user:', error);
            alert("Error approving user");
        }
    };

    const pendingClients = clients.filter(c => c.status === 'pending');
    const activeClients = clients.filter(c => c.status !== 'pending');

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#CCFF00]" size={40} /></div>;

    return (
        <div>
            <h1 className="text-4xl font-black text-white mb-2">Painel da Agência</h1>
            <p className="text-gray-400 mb-8">Gerencie todos os clientes e aprovações.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-[#CCFF00]/10 rounded-xl text-[#CCFF00]"><Users size={24} /></div>
                        <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total de Clientes</h3>
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
                                        <th className="p-6">Data Cadastro</th>
                                        <th className="p-6 text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-gray-300">
                                    {pendingClients.map(client => (
                                        <tr key={client.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-6 font-bold text-white">{client.name || 'Sem nome'}</td>
                                            <td className="p-6">{client.company_name || '-'}</td>
                                            <td className="p-6">{new Date(client.created_at).toLocaleDateString()}</td>
                                            <td className="p-6 text-right">
                                                <button
                                                    onClick={() => handleApprove(client.id)}
                                                    className="bg-[#CCFF00] text-black hover:bg-white font-bold text-xs uppercase tracking-widest px-4 py-2 rounded-lg transition-colors"
                                                >
                                                    Aprovar
                                                </button>
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
                                <th className="p-6">Nome</th>
                                <th className="p-6">Empresa</th>
                                <th className="p-6">Data Cadastro</th>
                                <th className="p-6 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {activeClients.map(client => (
                                <tr key={client.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-bold text-white">{client.name || 'Sem nome'}</td>
                                    <td className="p-6">{client.company_name || '-'}</td>
                                    <td className="p-6">{new Date(client.created_at).toLocaleDateString()}</td>
                                    <td className="p-6 text-right">
                                        <button className="text-[#CCFF00] hover:text-white font-bold text-xs">VER DASHBOARD</button>
                                    </td>
                                </tr>
                            ))}
                            {activeClients.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-500">Nenhum cliente ativo encontrado.</td>
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
