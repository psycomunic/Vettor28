import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Profile } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Save, Upload, User, Building } from 'lucide-react';
import { NeonButton } from '../../components/Shared';

const ProfileSettings: React.FC = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [profile, setProfile] = useState<Partial<Profile>>({});

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

    const fetchProfile = async () => {
        if (!user) return;
        setLoading(true);
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) setProfile(data);
        if (error) console.error(error);
        setLoading(false);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.from('profiles').update({
                company_name: profile.company_name,
                whatsapp: profile.whatsapp,
                website: profile.website,
                address: profile.address,
                logo_url: profile.logo_url
            }).eq('id', user?.id);

            if (error) throw error;
            alert('Perfil atualizado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Erro ao atualizar perfil.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('Selecione uma imagem.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('logos')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('logos')
                .getPublicUrl(filePath);

            setProfile(prev => ({ ...prev, logo_url: publicUrl }));
        } catch (error: any) {
            alert(error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading && !profile.id) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-[#CCFF00]" size={40} /></div>;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-brand font-black text-white mb-2">Configurações do Perfil</h1>
            <p className="text-gray-400 mb-8">Personalize seus dados para o Voucher.</p>

            <form onSubmit={handleUpdate} className="space-y-8">
                {/* Logo Section */}
                <div className="glass-card p-8 rounded-3xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Upload size={20} className="text-[#CCFF00]" /> Logo da Empresa
                    </h3>

                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden relative group bg-black">
                            {profile.logo_url ? (
                                <img src={profile.logo_url} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <Building size={32} className="text-gray-600" />
                            )}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                                <span className="text-xs text-white font-bold">Alterar</span>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                disabled={uploading}
                            />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-400 mb-2">
                                Carregue sua logo para que ela apareça nos vouchers de reserva.
                                <br />Recomendado: 500x500px, PNG ou JPG.
                            </p>
                            {uploading && <div className="text-[#CCFF00] text-sm animate-pulse">Enviando imagem...</div>}
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="glass-card p-8 rounded-3xl border-white/5">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <User size={20} className="text-[#CCFF00]" /> Informações Gerais
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase mb-2 block">Nome da Empresa / Hospedagem</label>
                            <input
                                value={profile.company_name || ''}
                                onChange={e => setProfile({ ...profile, company_name: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]"
                                placeholder="Ex: Pousada Recanto"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase mb-2 block">WhatsApp (para voucher)</label>
                            <input
                                value={profile.whatsapp || ''}
                                onChange={e => setProfile({ ...profile, whatsapp: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]"
                                placeholder="Ex: (48) 99999-9999"
                            />
                        </div>
                        <div>
                            <label className="text-gray-500 text-xs font-bold uppercase mb-2 block">Site / Link Booking</label>
                            <input
                                value={profile.website || ''}
                                onChange={e => setProfile({ ...profile, website: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00]"
                                placeholder="Ex: www.minhapousada.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-gray-500 text-xs font-bold uppercase mb-2 block">Endereço Completo</label>
                            <textarea
                                value={profile.address || ''}
                                onChange={e => setProfile({ ...profile, address: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#CCFF00] h-24"
                                placeholder="Rua das Flores, 123 - Centro, Florianópolis - SC"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <NeonButton className="!py-4 !px-8 text-black font-bold">
                        {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Salvar Alterações</>}
                    </NeonButton>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
