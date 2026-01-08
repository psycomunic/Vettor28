import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export const NeonButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'solid' | 'outline'
    type?: "button" | "submit" | "reset";
}> = ({ children, onClick, className = "", variant = 'solid', type = "button" }) => {
    const baseStyles = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wider whitespace-nowrap";
    const variants = {
        solid: "bg-[#CCFF00] text-black hover:bg-[#d9ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]",
        outline: "border-2 border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black"
    };

    return (
        <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {children}
        </button>
    );
};

export const SectionTitle: React.FC<{ subtitle: string; title: string; alignment?: 'left' | 'center' }> = ({ subtitle, title, alignment = 'center' }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`mb-16 ${alignment === 'center' ? 'text-center' : 'text-left'}`}
    >
        <span className="text-[#CCFF00] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            {subtitle}
        </span>
        <h2 className="text-4xl md:text-6xl font-brand font-black leading-tight">
            {title}
        </h2>
    </motion.div>
);

export const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left hover:text-[#CCFF00] transition-colors"
            >
                <span className="text-lg font-bold">{question}</span>
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }}>
                    <Plus size={24} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className="pt-32 pb-20"
    >
        {children}
    </motion.div>
);
