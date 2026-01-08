import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboard,
    Building2,
    CalendarCheck,
    LogOut,
    User,
    Menu,
    X,
    ChevronDown
} from 'lucide-react';

const DashboardLayout: React.FC = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleSignOut = async () => {
        await signOut();
        navigate('/auth');
    };

    const navItems = [
        { name: 'Visão Geral', path: '/dashboard', icon: <LayoutDashboard size={20} />, end: true },
        { name: 'Estabelecimentos', path: '/dashboard/properties', icon: <Building2 size={20} /> },
        { name: 'Reservas', path: '/dashboard/bookings', icon: <CalendarCheck size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 bottom-0 w-64 bg-[#0A0A0A] border-r border-white/5 z-50 transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#CCFF00] rounded-lg flex items-center justify-center font-black text-black text-lg">
                            V
                        </div>
                        <span className="font-brand font-black tracking-tighter uppercase text-xl">Vettor<span className="text-[#CCFF00]">28</span></span>
                    </div>
                    <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-[#CCFF00] text-black' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-white/5 bg-[#0A0A0A]">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                            <User size={20} />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate text-white">{user?.user_metadata?.full_name || 'Usuário'}</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors text-sm font-bold"
                    >
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-6 md:p-10 transition-all">
                {/* Header (Top Bar with Mobile Menu Toggle) */}
                <div className="flex md:hidden items-center justify-between mb-8">
                    <button onClick={() => setSidebarOpen(true)} className="text-white p-2 glass-card rounded-lg">
                        <Menu size={24} />
                    </button>
                    <span className="font-brand font-black text-lg">Dashboard</span>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
