import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { Property } from '../../types';
import { TrendingUp, DollarSign, Calendar, PieChart, ArrowUpRight, BarChart3, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from 'recharts';

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
        salesIncrease: 0,
        occupancyRate: 0,
        revpar: 0,
    });
    const [chartData, setChartData] = useState<any[]>([]);
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

        const relevantProps = propertyFilter === 'all' ? (props || []) : (props || []).filter(p => p.id === propertyFilter);

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

        // Costs
        const days = parseInt(period);
        const fixedCostMultipler = days / 30; // Approximation for fixed monthly costs in period

        const totalFixedCost = relevantProps.reduce((sum, p) => sum + (p.fixed_cost_monthly || 0), 0) * fixedCostMultipler;
        const totalMarketingInvest = relevantProps.reduce((sum, p) => sum + (p.marketing_invest_monthly || 0), 0) * fixedCostMultipler;

        const variableCosts = validBookings.reduce((sum, b) => sum + (b.channel_fee_value || 0) + (b.ad_cost || 0), 0);
        const totalCosts = totalFixedCost + totalMarketingInvest + variableCosts;

        // Marketing Cost for CPA (Ad Cost + Marketing Fixed Invest)
        const marketingCost = validBookings.reduce((sum, b) => sum + (b.ad_cost || 0), 0) + totalMarketingInvest;

        const count = validBookings.length;

        // Occupancy Rate Calculation
        // Total possible nights = (number of properties) * (days in period)
        // If propertyFilter is 'all', sum all properties. But wait, 'properties' can be > 1.
        // If 'hotel', maybe it has many rooms? The schema assumes 1 property = 1 unit for now (e.g. 1 chalé).
        // If the user has a hotel with 20 rooms, they might register 1 Property "Hotel X" and have bookings overlap?
        // Current schema: Bookings linked to Property.
        // Occupancy = (Total Nights Booked) / (Total Available Nights)
        // Total Available Nights = (Number of Properties in Filter) * days

        // This is a simplification. Ideally Property needs "capacity" field. Assuming capacity=1 per Property row for Chalés.

        let totalNightsBooked = 0;
        validBookings.forEach(b => {
            const checkIn = new Date(b.check_in);
            const checkOut = new Date(b.check_out);
            // Clip to period?
            // Simple diff for now:
            const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            totalNightsBooked += diffDays;
        });

        const totalAvailableNights = relevantProps.length * days;
        const occupancyRate = totalAvailableNights > 0 ? (totalNightsBooked / totalAvailableNights) * 100 : 0;

        // RevPAR = Revenue / Total Available Nights
        const revpar = totalAvailableNights > 0 ? revenue / totalAvailableNights : 0;

        setStats({
            revenue,
            costs: totalCosts,
            profit: revenue - totalCosts,
            cpa: count > 0 ? marketingCost / count : 0,
            ticket: count > 0 ? revenue / count : 0,
            totalBookings: count,
            salesIncrease,
            occupancyRate,
            revpar
        });

        // Prepare Chart Data (Group by Day)
        const dayMap = new Map();
        // Initialize all days
        for (let i = 0; i < days; i++) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const label = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            dayMap.set(label, { name: label, revenue: 0, bookings: 0 });
        }

        validBookings.forEach(b => {
            const d = new Date(b.check_in);
            const label = d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            if (dayMap.has(label)) {
                const current = dayMap.get(label);
                dayMap.set(label, { ...current, revenue: current.revenue + b.gross_value, bookings: current.bookings + 1 });
            }
        });

        // Sort by date (reverse the map)
        setChartData(Array.from(dayMap.values()).reverse());

        setLoading(false);
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <div className="pb-10">
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

            {/* Cards Grid Primary */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card
                    title="Receita Bruta"
                    value={formatCurrency(stats.revenue)}
                    icon={<DollarSign size={24} className="text-[#CCFF00]" />}
                    trend={`${stats.salesIncrease.toFixed(1)}%`}
                    trendUp={stats.salesIncrease >= 0}
                />
                <Card
                    title="Lucro Líquido"
                    value={formatCurrency(stats.profit)}
                    icon={<PieChart size={24} className="text-[#CCFF00]" />}
                    sub={`Margem: ${stats.revenue > 0 ? ((stats.profit / stats.revenue) * 100).toFixed(1) : 0}%`}
                />
                <Card
                    title="Reservas"
                    value={stats.totalBookings.toString()}
                    icon={<Calendar size={24} className="text-[#CCFF00]" />}
                    sub={`Ticket Médio: ${formatCurrency(stats.ticket)}`}
                />
                <Card
                    title="CPA Médio"
                    value={formatCurrency(stats.cpa)}
                    icon={<TrendingUp size={24} className="text-[#CCFF00]" />}
                    sub="Custo por Aquisição"
                />
            </div>

            {/* Secondary Metrics & Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6 mb-10">
                {/* Chart */}
                <div className="lg:col-span-2 glass-card p-6 rounded-[2rem] border-white/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-white">Receita no Período</h3>
                        <BarChart3 size={20} className="text-gray-500" />
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val / 1000}k`} />
                                <Tooltip
                                    contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#CCFF00' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#CCFF00" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* KPI Column */}
                <div className="flex flex-col gap-6">
                    <Card
                        title="Taxa de Ocupação"
                        value={`${stats.occupancyRate.toFixed(1)}%`}
                        icon={<Users size={24} className="text-[#CCFF00]" />}
                        sub="Baseado nas noites disponíveis"
                    />
                    <Card
                        title="RevPAR"
                        value={formatCurrency(stats.revpar)}
                        icon={<BarChart3 size={24} className="text-[#CCFF00]" />}
                        sub="Receita por Quarto Disp."
                    />
                    <div className="glass-card p-6 rounded-[2rem] border-white/5 flex-1 flex flex-col justify-center items-center text-center">
                        <h4 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">Total de Custos</h4>
                        <p className="text-4xl font-brand font-black text-red-500">{formatCurrency(stats.costs)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Card = ({ title, value, icon, sub, trend, trendUp }: any) => (
    <div className="glass-card p-6 rounded-[2rem] border-white/5 relative overflow-hidden group hover:border-[#CCFF00]/30 transition-colors">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-[#CCFF00]/10">{icon}</div>
            {trend && (
                <div className={`text-xs font-bold px-2 py-1 rounded-full ${trendUp ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {trendUp ? '+' : ''}{trend}
                </div>
            )}
        </div>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <p className="text-2xl lg:text-3xl font-brand font-black text-white">{value}</p>
        {sub && <div className="text-xs text-gray-500 mt-2">{sub}</div>}
    </div>
);

export default OverviewPage;
