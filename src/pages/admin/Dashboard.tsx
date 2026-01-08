import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Profile } from '../../types';
import { Loader2, TrendingUp, Users } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const [clients, setClients] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalClients: 0,
        activeClients: 0,
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            // Because of our new RLS policies, as an admin we should be able to see all profiles!
            const { data: profiles, error } = await supabase.from('profiles').select('*').neq('role', 'admin'); // Don't list other admins

            if (error) throw error;

            setClients(profiles || []);
            setStats({
                totalClients: profiles?.length || 0,
                activeClients: profiles?.length || 0 // Placeholder logic
            });

        } catch (error) {
            console.error('Error fetching clients:', error);
            alert("Failed to load clients. Are you sure you are an admin?");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#CCFF00]" size={40} /></div>;

    return (
        <div>
            <h1 className="text-4xl font-black text-white mb-2">Painel da Agência</h1>
            <p className="text-gray-400 mb-8">Gerencie todos os clientes e acompanhe resultados.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-[#CCFF00]/10 rounded-xl text-[#CCFF00]"><Users size={24} /></div>
                        <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total de Clientes</h3>
                    </div>
                    <p className="text-4xl font-black text-white">{stats.totalClients}</p>
                </div>
                {/* We can add aggregated revenue here later */}
                <div className="glass-card p-6 rounded-3xl border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-500/10 rounded-xl text-green-500"><TrendingUp size={24} /></div>
                        <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Growth (MoM)</h3>
                    </div>
                    <p className="text-4xl font-black text-white">-- %</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-6">Lista de Clientes</h2>
            <div className="glass-card rounded-3xl border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/5 text-gray-400 text-xs uppercase font-bold tracking-wider">
                            <tr>
                                <th className="p-6">Nome</th>
                                <th className="p-6">Empresa</th>
                                <th className="p-6">Data Cadastro</th>
                                <th className="p-6">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-300">
                            {clients.map(client => (
                                <tr key={client.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-6 font-bold text-white">{client.name || 'Sem nome'}</td>
                                    <td className="p-6">{client.company_name || '-'}</td>
                                    <td className="p-6">{new Date(client.created_at).toLocaleDateString()}</td>
                                    <td className="p-6">
                                        <button className="text-[#CCFF00] hover:text-white font-bold text-xs">VER DASHBOARD</button>
                                    </td>
                                </tr>
                            ))}
                            {clients.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-12 text-center text-gray-500">Nenhum cliente encontrado.</td>
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
