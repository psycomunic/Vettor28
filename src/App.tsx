import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import MetodoPage from './pages/MetodoPage';
import ServicosPage from './pages/ServicosPage';
import BeneficiosPage from './pages/BeneficiosPage';
import ContatoPage from './pages/ContatoPage';
import AuthPage from './pages/AuthPage';

// Dashboard
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/Overview';
import PropertiesPage from './pages/dashboard/Properties';
import BookingsPage from './pages/dashboard/Bookings';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';

// Other Components
import { Menu, X } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="h-screen flex items-center justify-center bg-[#050505] text-[#CCFF00]"><Loader2 className="animate-spin" size={32} /></div>;
    if (!user) return <Navigate to="/auth" />;
    return <>{children}</>;
};

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, isAdmin } = useAuth();
    if (loading) return <div className="h-screen flex items-center justify-center bg-[#050505] text-[#CCFF00]"><Loader2 className="animate-spin" size={32} /></div>;
    if (!user || !isAdmin) return <Navigate to="/dashboard" />; // Redirect non-admins to dashboard
    return <>{children}</>;
};

const PublicNavbar = () => {
    const location = useLocation();
    // Hide navbar on dashboard or auth?
    if (location.pathname.startsWith('/dashboard') || location.pathname === '/auth') return null;

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "Início", path: "/" },
        { name: "Método", path: "/metodo" },
        { name: "Serviços", path: "/servicos" },
        { name: "Benefícios", path: "/beneficios" },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center font-black text-black text-xl group-hover:rotate-12 transition-transform">V</div>
                        <span className="text-2xl font-brand font-black tracking-tighter uppercase text-white">Vettor<span className="text-[#CCFF00]">28</span></span>
                    </a>

                    <div className="hidden md:flex gap-10 items-center">
                        {navLinks.map((link) => (
                            <a key={link.path} href={link.path} className={`text-[10px] font-black transition-all uppercase tracking-[0.2em] relative py-1 ${location.pathname === link.path ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'}`}>
                                {link.name}
                            </a>
                        ))}
                        <a href="/auth" className="bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all">
                            Entrar
                        </a>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-12 md:hidden">
                    {navLinks.map(link => (
                        <a key={link.path} href={link.path} className="text-4xl font-brand font-black uppercase tracking-tighter text-white">{link.name}</a>
                    ))}
                    <a href="/auth" className="text-4xl font-brand font-black text-[#CCFF00] uppercase tracking-tighter">Entrar</a>
                    <button className="absolute top-8 right-6 text-white" onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
                </div>
            )}
        </>
    );
}

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="bg-[#050505] min-h-screen font-sans">
                    <PublicNavbar />
                    <Routes>
                        {/* Public Pages */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/metodo" element={<MetodoPage />} />
                        <Route path="/servicos" element={<ServicosPage />} />
                        <Route path="/beneficios" element={<BeneficiosPage />} />
                        <Route path="/contato" element={<ContatoPage />} />
                        <Route path="/auth" element={<AuthPage />} />

                        {/* Dashboard */}
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                            <Route index element={<OverviewPage />} />
                            <Route path="properties" element={<PropertiesPage />} />
                            <Route path="bookings" element={<BookingsPage />} />
                        </Route>

                        {/* Admin Panel */}
                        <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
                            <Route index element={<AdminDashboard />} />
                            {/* We can add 'clients' route here too later */}
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
