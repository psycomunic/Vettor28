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
import AdminAuthPage from './pages/AdminAuthPage';
import PropostaPage from './pages/PropostaPage';

// Dashboard
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/dashboard/Overview';
import PropertiesPage from './pages/dashboard/Properties';
import BookingsPage from './pages/dashboard/Bookings';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminClients from './pages/admin/Clients';
import ProfileSettings from './pages/dashboard/ProfileSettings';
import BookingVoucher from './pages/dashboard/BookingVoucher';

// Other Components
import Navbar from './components/Navbar';

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

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="bg-[#050505] min-h-screen font-sans">
                    <Navbar />
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
                        <Route path="/admin-secret-access" element={<AdminAuthPage />} />
                        <Route path="/propostavettor28" element={<PropostaPage />} />

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
                            <Route path="clients" element={<AdminClients />} />
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
