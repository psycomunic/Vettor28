import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Menu, X, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function AdminLayout() {
    const { signOut, user } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Visão Geral', path: '/admin' },
        { icon: Users, label: 'Clientes', path: '/admin/clients' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#111] border-r border-white/5 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center">
                            <span className="text-black font-black text-xl">V</span>
                        </div>
                        <div>
                            <h1 className="font-brand font-black text-xl tracking-tight leading-none">VETTOR28</h1>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Panel</span>
                        </div>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive ? 'bg-[#CCFF00] text-black shadow-[0_0_20px_rgba(204,255,0,0.3)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <Icon size={20} className={isActive ? 'text-black' : 'group-hover:text-[#CCFF00] transition-colors'} />
                                    <span className="font-bold text-sm">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="absolute bottom-0 w-full p-6 border-t border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#CCFF00] to-green-400 p-[2px]">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                <span className="font-bold text-[#CCFF00]">{user?.email?.[0].toUpperCase()}</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate">Admin</p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={signOut} className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400 transition-colors w-full px-2">
                        <LogOut size={16} /> SAI
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto h-screen relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                <div className="md:hidden p-4 flex justify-between items-center sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
                    <span className="font-bold">Admin</span>
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            {/* Overlay */}
            {isMobileMenuOpen && (
                <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" />
            )}
        </div>
    );
}
