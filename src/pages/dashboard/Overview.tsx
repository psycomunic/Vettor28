import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { Booking, Property } from '../../types';
import { TrendingUp, DollarSign, Calendar, PieChart, ArrowUpRight } from 'lucide-react';

const OverviewPage: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        revenue: 0,
        costs: 0,
        profit: 0,
        cpa: 0,
        ticket: 0,
        totalBookings: 0,
        salesIncrease: 0
    });
    const [period, setPeriod] = useState('30'); // days
    const [propertyFilter, setPropertyFilter] = useState('all');
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        if (user) loadData();
    }, [user, period, propertyFilter]);

    const loadData = async () => {
        setLoading(true);
        // Fetch properties for filter
        const { data: props } = await supabase.from('properties').select('*');
        setProperties(props || []);

        // Define date range
        const now = new Date();
        const past = new Date();
        past.setDate(now.getDate() - parseInt(period));

        const prevPast = new Date(past);
        prevPast.setDate(prevPast.getDate() - parseInt(period)); // For comparison

        // Fetch Bookings Current Period
        let query = supabase.from('bookings').select('*')
            .gte('check_in', past.toISOString())
            .lte('check_in', now.toISOString())
            .neq('status', 'cancelled');

        if (propertyFilter !== 'all') query = query.eq('property_id', propertyFilter);
        const { data: currentBookings } = await query;

        // Fetch Bookings Previous Period (for "Growth" stat)
        let prevQuery = supabase.from('bookings').select('gross_value')
            .gte('check_in', prevPast.toISOString())
            .lte('check_in', past.toISOString())
            .neq('status', 'cancelled');

        if (propertyFilter !== 'all') prevQuery = prevQuery.eq('property_id', propertyFilter);
        const { data: prevBookings } = await prevQuery;

        // Calculate Stats
        const validBookings = currentBookings || [];
        const prevValidBookings = prevBookings || [];

        const revenue = validBookings.reduce((sum, b) => sum + (b.gross_value || 0), 0);
        const prevRevenue = prevValidBookings.reduce((sum, b) => sum + (b.gross_value || 0), 0);

        // Sales Increase %
        let salesIncrease = 0;
        if (prevRevenue > 0) {
            salesIncrease = ((revenue - prevRevenue) / prevRevenue) * 100;
        } else if (revenue > 0) {
            salesIncrease = 100;
        }

        // Costs (Ad + Channel Fee + Fixed Cost Estimate)
        // Fixed cost needs to be proportional to period? Or just monthly?
        // Let's assume fixed cost is monthly. If period is 30, use 1x. If 7, use 7/30x.
        const days = parseInt(period);
        const fixedCostMultipler = days / 30;

        // Sum fixed costs of relevant properties
        const relevantProperties = propertyFilter === 'all' ? (props || []) : (props || []).filter(p => p.id === propertyFilter);
        const totalFixedCost = relevantProperties.reduce((sum, p) => sum + (p.fixed_cost_monthly || 0), 0) * fixedCostMultipler;

        const variableCosts = validBookings.reduce((sum, b) => sum + (b.channel_fee_value || 0) + (b.ad_cost || 0), 0);
        const totalCosts = totalFixedCost + variableCosts;

        // Marketing Cost for CPA
        const marketingCost = validBookings.reduce((sum, b) => sum + (b.ad_cost || 0), 0);

        const count = validBookings.length;

        setStats({
            revenue,
            costs: totalCosts,
            profit: revenue - totalCosts,
            cpa: count > 0 ? marketingCost / count : 0,
            ticket: count > 0 ? revenue / count : 0,
            totalBookings: count,
            salesIncrease
        });

        setLoading(false);
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-brand font-black text-white">Visão Geral</h1>
                    <p className="text-gray-400 text-sm">Acompanhe a saúde do seu negócio.</p>
                </div>

                <div className="flex gap-4">
                    <select
                        value={propertyFilter}
                        onChange={(e) => setPropertyFilter(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-[#CCFF00]"
                    >
                        <option value="all" className="bg-black">Todos os estabelecimentos</option>
                        {properties.map(p => <option className="bg-black" key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-[#CCFF00]"
                    >
                        <option value="7" className="bg-black">Últimos 7 dias</option>
                        <option value="30" className="bg-black">Últimos 30 dias</option>
                        <option value="90" className="bg-black">Últimos 90 dias</option>
                    </select>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <div className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50"><DollarSign size={40} className="text-[#CCFF00]" /></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Receita Bruta</p>
                    <p className="text-3xl font-brand font-black text-white">{formatCurrency(stats.revenue)}</p>
                    <div className={`text-xs font-bold mt-2 flex items-center gap-1 ${stats.salesIncrease >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <ArrowUpRight size={14} /> {stats.salesIncrease.toFixed(1)}% vs anterior
                    </div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50"><PieChart size={40} className="text-[#CCFF00]" /></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Lucro Líquido</p>
                    <p className="text-3xl font-brand font-black text-white">{formatCurrency(stats.profit)}</p>
                    <div className="text-xs text-gray-500 mt-2">Margem: {stats.revenue > 0 ? ((stats.profit / stats.revenue) * 100).toFixed(1) : 0}%</div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50"><Calendar size={40} className="text-[#CCFF00]" /></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Reservas</p>
                    <p className="text-3xl font-brand font-black text-white">{stats.totalBookings}</p>
                    <div className="text-xs text-gray-500 mt-2">Ticket Médio: {formatCurrency(stats.ticket)}</div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-50"><TrendingUp size={40} className="text-[#CCFF00]" /></div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">CPA Médio</p>
                    <p className="text-3xl font-brand font-black text-white">{formatCurrency(stats.cpa)}</p>
                    <div className="text-xs text-gray-500 mt-2">Custo por Aquisição</div>
                </div>
            </div>

            {/* Note: In a real app we'd use Chart.js or Recharts here. For now keeping it simple with the grid */}

        </div>
    );
};

export default OverviewPage;
