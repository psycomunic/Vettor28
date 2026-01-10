import React from 'react';
import { Instagram, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/10 py-16 text-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                    <img src="/logo.png" alt="Vettor28" className="h-10 w-auto opacity-80 hover:opacity-100 transition-opacity" />

                    <div className="flex gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#CCFF00] hover:text-black transition-all">
                            <Instagram size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-[#CCFF00] hover:text-black transition-all">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:contato@vettor28.com.br" className="p-3 bg-white/5 rounded-full hover:bg-[#CCFF00] hover:text-black transition-all">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Vettor28. Todos os direitos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
