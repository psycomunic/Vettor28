import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import MetodoPage from './pages/MetodoPage';
import ServicosPage from './pages/ServicosPage';
import ResultadosPage from './pages/ResultadosPage';
import SobrePage from './pages/SobrePage';
import DiagnosticoPage from './pages/DiagnosticoPage';
import AuthPage from './pages/AuthPage';
import ContatoPage from './pages/ContatoPage'; // Keeping as fallback
import EmailConfirmedPage from './pages/EmailConfirmedPage';
import PendingApprovalPage from './pages/PendingApprovalPage';

// Dashboard
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/Overview';
import PropertiesPage from './pages/dashboard/Properties';
import BookingsPage from './pages/dashboard/Bookings';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import BookingVoucher from './pages/dashboard/BookingVoucher';

// Other Components
import { Menu, X } from 'lucide-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading, isApproved } = useAuth();
    if (loading) return <div className="h-screen flex items-center justify-center bg-[#050505] text-[#CCFF00]"><Loader2 className="animate-spin" size={32} /></div>;
    if (!user) return <Navigate to="/auth" />;
    if (!isApproved) return <Navigate to="/pending-approval" />;
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
    if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin') || location.pathname === '/auth') return null;

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
        { name: "Resultados", path: "/resultados" },
        { name: "Sobre", path: "/sobre" },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <a href="/" className="flex items-center gap-3 cursor-pointer group">
                        <img src="/logo.png" alt="Vettor28" className="h-12 w-auto group-hover:scale-105 transition-transform" />
                    </a>

                    <div className="hidden md:flex gap-10 items-center">
                        {navLinks.map((link) => (
                            <a key={link.path} href={link.path} className={`text-[10px] font-black transition-all uppercase tracking-[0.2em] relative py-1 ${location.pathname === link.path ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'}`}>
                                {link.name}
                            </a>
                        ))}
                        <a href="/diagnostico" className="bg-[#CCFF00] text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg hover:shadow-[#CCFF00]/20">
                            Diagnóstico
                        </a>
                        <a href="/auth" className="text-white hover:text-[#CCFF00] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                        </a>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>
            </nav>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-8 md:hidden">
                    {navLinks.map(link => (
                        <a key={link.path} href={link.path} className="text-3xl font-brand font-black uppercase tracking-tighter text-white hover:text-[#CCFF00]" onClick={() => setIsMenuOpen(false)}>{link.name}</a>
                    ))}
                    <a href="/diagnostico" className="text-3xl font-brand font-black text-[#CCFF00] uppercase tracking-tighter" onClick={() => setIsMenuOpen(false)}>Diagnóstico</a>
                    <a href="/auth" className="text-xl font-bold text-gray-400 uppercase tracking-widest mt-8" onClick={() => setIsMenuOpen(false)}>Área do Cliente</a>
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
                        <Route path="/resultados" element={<ResultadosPage />} />
                        <Route path="/sobre" element={<SobrePage />} />
                        <Route path="/diagnostico" element={<DiagnosticoPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/contato" element={<ContatoPage />} />
                        <Route path="/email-confirmed" element={<EmailConfirmedPage />} />
                        <Route path="/pending-approval" element={<PendingApprovalPage />} />

                        {/* Dashboard */}
                        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                            <Route index element={<OverviewPage />} />
                            <Route path="properties" element={<PropertiesPage />} />
                            <Route path="bookings" element={<BookingsPage />} />
                            <Route path="settings" element={<ProfileSettings />} />
                        </Route>

                        {/* Print Routes - Protected but standalone layout */}
                        <Route path="/voucher/:id" element={<ProtectedRoute><BookingVoucher /></ProtectedRoute>} />

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
