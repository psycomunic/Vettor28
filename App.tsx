
import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  MapPin,
  CheckCircle2,
  Menu,
  X,
  Layers,
  MousePointer2,
  LayoutDashboard,
  Zap,
  Star,
  Quote,
  ArrowLeft,
  Mail,
  Phone,
  Instagram,
  BarChart3,
  Search,
  PenTool,
  Clock,
  ShieldCheck,
  Globe,
  ChevronDown,
  Plus,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
type Page = 'home' | 'metodo' | 'servicos' | 'beneficios' | 'contato';

// --- Sub-components ---

const NeonButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'outline'
}> = ({ children, onClick, className = "", variant = 'solid' }) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 text-sm uppercase tracking-wider whitespace-nowrap";
  const variants = {
    solid: "bg-[#CCFF00] text-black hover:bg-[#d9ff33] hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]",
    outline: "border-2 border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00] hover:text-black"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionTitle: React.FC<{ subtitle: string; title: string; alignment?: 'left' | 'center' }> = ({ subtitle, title, alignment = 'center' }) => (
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

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
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

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
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

// --- Page Components ---

const HomePage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => (
  <>
    {/* Hero Section */}
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[#050505]">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=2000"
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-wooden-cabin-in-the-middle-of-the-forest-4424-large.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 py-20">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-widest">Growth Agency Especializada</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-brand font-black mb-8 leading-[1] text-white">
              Sua hospedagem <br /><span className="text-[#CCFF00]">ocupada</span> 365 dias.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
              O método Vettor28 utiliza inteligência de tráfego e posicionamento premium para lotar chalés, resorts e pousadas sem depender exclusivamente de OTAs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <NeonButton onClick={() => onNavigate('contato')}>
                Solicitar Diagnóstico Grátis <ArrowRight size={20} />
              </NeonButton>
              <NeonButton variant="outline" onClick={() => onNavigate('metodo')}>
                Ver o Método
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>

    {/* Partners Marquee */}
    <section className="py-12 bg-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em]">Hospedagens que escalam com a Vettor28</p>
      </div>
      <div className="flex gap-12 whitespace-nowrap animate-marquee">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="flex gap-12 items-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Luxury Resort</span>
            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Mountain Cabin</span>
            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Ocean House</span>
            <span className="text-2xl font-brand font-black uppercase text-white tracking-tighter">Boutique Hotel</span>
          </div>
        ))}
      </div>
    </section>

    {/* Pillars of Growth */}
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Nossos Pilares" title="Como multiplicamos suas reservas" />
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="text-[#CCFF00]" size={40} />,
              title: "Tráfego Direto",
              desc: "Anúncios cirúrgicos no Instagram e Google para levar o hóspede direto para o seu site ou WhatsApp."
            },
            {
              icon: <LayoutDashboard className="text-[#CCFF00]" size={40} />,
              title: "Posicionamento Premium",
              desc: "Transformamos a percepção da sua hospedagem para atrair o público que paga mais e reclama menos."
            },
            {
              icon: <BarChart3 className="text-[#CCFF00]" size={40} />,
              title: "Otimização de ROI",
              desc: "Análise diária de dados para garantir que cada centavo investido retorne em diárias vendidas."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-10 rounded-[2.5rem] border-white/5 group"
            >
              <div className="mb-6 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-[#CCFF00]/10 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-2xl font-brand font-black mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Authority / Why Us */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/5 blur-[150px] -z-10 rounded-full" />
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800" className="rounded-2xl w-full h-[300px] object-cover mt-12" alt="Cabin 1" />
              <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800" className="rounded-2xl w-full h-[300px] object-cover" alt="Cabin 2" />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card p-6 rounded-3xl border-[#CCFF00]/30 backdrop-blur-3xl">
              <p className="text-4xl font-brand font-black text-[#CCFF00]">8.5x</p>
              <p className="text-[10px] text-gray-400 uppercase font-bold">ROI Médio em 2024</p>
            </div>
          </div>
          <div>
            <SectionTitle subtitle="Diferencial" title="Por que não somos uma agência comum?" alignment="left" />
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Agências comuns atendem de padarias a clínicas médicas. Nós respiramos <strong>Hospitalidade</strong>. Entendemos as sazonalidades, os canais de desejo do hóspede e como converter curiosos em check-ins.
            </p>
            <div className="space-y-4">
              {[
                "Foco exclusivo em Hospedagens Premium",
                "Gestores com experiência real no setor",
                "Faturamento direto na sua conta, sem taxas de OTAs",
                "Dashboards de acompanhamento em tempo real"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#CCFF00]/20 flex items-center justify-center text-[#CCFF00] flex-shrink-0">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="font-bold text-gray-200">{text}</span>
                </div>
              ))}
            </div>
            <NeonButton className="mt-12" onClick={() => onNavigate('contato')}>Quero esses resultados</NeonButton>
          </div>
        </div>
      </div>
    </section>

    {/* Portfolio / Visual Showcase */}
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Portfólio" title="Onde aplicamos nossa inteligência" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200", title: "Refúgios de Montanha", tag: "Chalés Luxo" },
            { img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200", title: "Resorts Beira Mar", tag: "Escala Nacional" },
            { img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200", title: "Hotéis Boutique", tag: "Posicionamento" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 0.98 }}
              className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] group cursor-pointer"
            >
              <img src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-8 left-8 right-8">
                <span className="px-3 py-1 bg-[#CCFF00] text-black text-[10px] font-bold rounded-full uppercase mb-3 inline-block">
                  {item.tag}
                </span>
                <h4 className="text-2xl font-brand font-black text-white">{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionTitle subtitle="Depoimentos" title="Vozes de quem escalou" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: "Ricardo Alves", role: "Dono do Chalé Vila Rica", text: "Minhas reservas aumentaram 200% em apenas 3 meses. Hoje não dependo mais das taxas abusivas das plataformas." },
            { name: "Mariana Costa", role: "Gerente de Resort", text: "A Vettor28 trouxe um público muito mais qualificado. Nosso ticket médio subiu e o atendimento ficou mais fluido." },
            { name: "Bruno Mendes", role: "Proprietário Pousada SPA", text: "Excelente entrega. O dashboard que eles oferecem dá uma clareza que eu nunca tive antes sobre meu negócio." }
          ].map((t, i) => (
            <div key={i} className="glass-card p-10 rounded-3xl border-white/5 relative">
              <Quote className="text-[#CCFF00]/20 absolute top-8 right-8" size={40} />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} className="fill-[#CCFF00] text-[#CCFF00]" />)}
              </div>
              <p className="text-gray-300 italic mb-8 leading-relaxed">"{t.text}"</p>
              <div>
                <h5 className="font-bold text-white">{t.name}</h5>
                <p className="text-xs text-gray-500 uppercase tracking-widest">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-6 max-w-4xl">
        <SectionTitle subtitle="Dúvidas Frequentes" title="O que você precisa saber" />
        <div className="space-y-4">
          <FAQItem
            question="Quanto tempo leva para ver os resultados?"
            answer="Os primeiros resultados em termos de cliques e interesse costumam aparecer em 7 dias. O amadurecimento das reservas acontece entre 30 e 60 dias conforme otimizamos o algoritmo."
          />
          <FAQItem
            question="Vocês atendem hospedagens pequenas?"
            answer="Sim, desde que tenham o objetivo de crescer e escala. Nosso método é adaptável, mas buscamos parceiros que valorizem o posicionamento premium."
          />
          <FAQItem
            question="Preciso de um site próprio?"
            answer="É o ideal para maximizar a conversão. Caso não tenha, nosso time de branding pode desenvolver uma Landing Page de alta performance para você."
          />
          <FAQItem
            question="Qual o investimento mínimo recomendado?"
            answer="O investimento em anúncios depende da sua meta de reservas, mas recomendamos começar com um valor que permita ao algoritmo aprender seu público."
          />
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="bg-[#CCFF00] p-16 rounded-[4rem] text-black text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-brand font-black mb-8 leading-tight">
              Pronto para ter seu <br />calendário sempre cheio?
            </h2>
            <p className="text-xl font-bold mb-12 opacity-80 max-w-2xl mx-auto">
              Nossa agenda para novos clientes é limitada para garantir a exclusividade do seu nicho e região.
            </p>
            <button
              onClick={() => onNavigate('contato')}
              className="bg-black text-white px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest hover:scale-105 transition-transform shadow-2xl"
            >
              Falar com um Especialista
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-black/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/5 translate-y-1/2 -translate-x-1/2 rounded-full" />
        </div>
      </div>
    </section>
  </>
);

const MetodoPage: React.FC = () => (
  <PageWrapper>
    <div className="container mx-auto px-6 relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[600px] bg-[#CCFF00]/5 blur-[120px] rounded-full -z-10" />

      <SectionTitle subtitle="Nosso DNA" title="O Ciclo de Escala Vettor28" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-20">
        {/* Connector Line (Desktop) */}
        <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#CCFF00]/30 to-transparent -z-10" />

        {[
          {
            icon: <Search size={32} />,
            step: "01",
            title: "Imersão Profunda",
            desc: "Mergulhamos no DNA da sua hospedagem para entender o perfil exato do hóspede ideal.",
            output: "Persona Definida"
          },
          {
            icon: <Target size={32} />,
            step: "02",
            title: "Posicionamento",
            desc: "Ajustamos a narrativa e o visual para atrair o público A+ que valoriza exclusividade e experiência.",
            output: "Branding Irresistível"
          },
          {
            icon: <MousePointer2 size={32} />,
            step: "03",
            title: "Captação Ativa",
            desc: "Campanhas agressivas de tráfego pago (Meta & Google) nos canais onde seu cliente está agora.",
            output: "Tráfego Qualificado"
          },
          {
            icon: <TrendingUp size={32} />,
            step: "04",
            title: "Fidelização",
            desc: "Estratégias de CRM para transformar hóspedes ocasionais em promotores leais da marca.",
            output: "LTV Maximizado"
          }
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="group relative"
          >
            {/* Step Number Background */}
            <span className="absolute -top-12 -right-4 text-[8rem] font-black text-white/[0.02] group-hover:text-[#CCFF00]/10 transition-colors select-none pointer-events-none font-brand leading-none">
              {item.step}
            </span>

            <div className="glass-card p-10 rounded-[2.5rem] border-white/5 h-full hover:border-[#CCFF00]/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 rounded-2xl bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 group-hover:scale-110 group-hover:bg-[#CCFF00] group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(204,255,0,0.1)] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]">
                  {item.icon}
                </div>

                <div className="mb-2 flex items-center gap-3">
                  <span className="text-[#CCFF00] text-xs font-black uppercase tracking-widest">Fase {item.step}</span>
                  <div className="h-[1px] flex-grow bg-white/10" />
                </div>

                <h3 className="text-2xl font-brand font-black mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm flex-grow mb-8">{item.desc}</p>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">Resultado</p>
                  <div className="flex items-center gap-2 text-[#CCFF00] font-bold">
                    <CheckCircle2 size={16} />
                    {item.output}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-20 text-center"
      >
        <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-400 text-sm">
          <Zap size={16} className="text-[#CCFF00]" />
          <span>O ciclo se repete mensalmente para garantir escala constante.</span>
        </div>
      </motion.div>
    </div>
  </PageWrapper>
);

const ServicosPage: React.FC = () => (
  <PageWrapper>
    <div className="container mx-auto px-6">
      <SectionTitle subtitle="Especialidades" title="Soluções que geram diárias" />
      <div className="grid lg:grid-cols-3 gap-8">
        {[
          {
            icon: <TrendingUp size={40} />,
            title: "Performance Ads",
            features: ["Meta Ads Estratégico", "Google Search & Maps", "Remarketing de Desejo", "Dashboard de Vendas"],
            desc: "Levamos as pessoas certas para o seu site no momento exato da decisão de viagem."
          },
          {
            icon: <PenTool size={40} />,
            title: "Luxury Branding",
            features: ["Identidade Visual Premium", "Produção de Criativos", "Copywriting Hipnótico", "Curadoria de Imagem"],
            desc: "Criamos uma marca que respira exclusividade e justifica seu ticket médio."
          },
          {
            icon: <Globe size={40} />,
            title: "Direct Sales Setup",
            features: ["Motor de Reservas", "Landing Pages", "Treinamento de Atendimento", "Gestão de CRM"],
            desc: "Reduzimos sua dependência de intermediários focando no canal de venda direto."
          }
        ].map((s, i) => (
          <div key={i} className="glass-card p-12 rounded-[3rem] border-white/5 flex flex-col">
            <div className="text-[#CCFF00] mb-8">{s.icon}</div>
            <h3 className="text-2xl font-brand font-black mb-4">{s.title}</h3>
            <p className="text-gray-400 text-sm mb-8 flex-grow">{s.desc}</p>
            <div className="space-y-3 mb-10">
              {s.features.map((f, j) => (
                <div key={j} className="flex items-center gap-2 text-xs text-gray-300">
                  <Zap size={12} className="text-[#CCFF00]" /> {f}
                </div>
              ))}
            </div>
            <NeonButton variant="outline" className="w-full">Saber Mais</NeonButton>
          </div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const BeneficiosPage: React.FC = () => (
  <PageWrapper>
    <div className="container mx-auto px-6">
      <SectionTitle subtitle="Vantagens" title="Sua hospedagem em outro nível" />
      <div className="grid md:grid-cols-3 gap-12 text-center">
        {[
          { icon: <Clock size={40} />, title: "Venda na Baixa Temporada", desc: "Acabamos com a ociosidade criando campanhas específicas para dias de semana e períodos calmos." },
          { icon: <ShieldCheck size={40} />, title: "Independência Total", desc: "Pague menos comissões para Booking e Airbnb e tenha o controle total dos seus hóspedes." },
          { icon: <BarChart3 size={40} />, title: "Previsibilidade de Caixa", desc: "Saiba exatamente quanto você vai faturar no próximo mês com nossa inteligência de dados." }
        ].map((b, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-[#CCFF00]/10 flex items-center justify-center text-[#CCFF00] mb-8 border border-[#CCFF00]/20">
              {b.icon}
            </div>
            <h4 className="text-2xl font-bold mb-4">{b.title}</h4>
            <p className="text-gray-400 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </PageWrapper>
);

const ContatoPage: React.FC = () => (
  <PageWrapper>
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <SectionTitle subtitle="Fale Conosco" title="O próximo passo da sua escala" alignment="left" />
          <p className="text-gray-400 mb-12 text-lg leading-relaxed">
            Estamos prontos para analisar sua operação atual e traçar um plano de crescimento agressivo. Escolha o canal abaixo:
          </p>

          <div className="space-y-6">
            <a href="#" className="flex items-center gap-6 glass-card p-8 rounded-3xl border-white/5 hover:border-[#CCFF00]/40 transition-all group">
              <div className="w-16 h-16 bg-[#CCFF00]/10 rounded-2xl flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors"><Phone size={32} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">WhatsApp Business</p>
                <p className="text-xl font-bold">+55 (11) 99999-9999</p>
              </div>
            </a>
            <a href="#" className="flex items-center gap-6 glass-card p-8 rounded-3xl border-white/5 hover:border-[#CCFF00]/40 transition-all group">
              <div className="w-16 h-16 bg-[#CCFF00]/10 rounded-2xl flex items-center justify-center text-[#CCFF00] group-hover:bg-[#CCFF00] group-hover:text-black transition-colors"><Mail size={32} /></div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-1">E-mail Corporativo</p>
                <p className="text-xl font-bold">growth@vettor28.com.br</p>
              </div>
            </a>
          </div>
        </div>

        <div className="glass-card p-12 rounded-[3.5rem] border-white/10 shadow-2xl">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome Completo</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all" placeholder="Como devemos te chamar?" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all" placeholder="Seu melhor e-mail" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hospedagem / Site</label>
              <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all" placeholder="Qual o nome do seu projeto?" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mensagem</label>
              <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-[#CCFF00] outline-none transition-all resize-none" placeholder="Qual o seu principal desafio hoje?" />
            </div>
            <NeonButton className="w-full !py-6 text-lg">Solicitar Diagnóstico</NeonButton>
          </form>
        </div>
      </div>
    </div>
  </PageWrapper>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; id: Page }[] = [
    { name: "Início", id: "home" },
    { name: "Método", id: "metodo" },
    { name: "Serviços", id: "servicos" },
    { name: "Benefícios", id: "beneficios" },
  ];

  const handleNavigate = (page: Page) => {
    setActivePage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#CCFF00] selection:text-black">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavigate('home')}
          >
            <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center font-black text-black text-xl group-hover:rotate-12 transition-transform">
              V
            </div>
            <span className="text-2xl font-brand font-black tracking-tighter uppercase">Vettor<span className="text-[#CCFF00]">28</span></span>
          </div>

          <div className="hidden md:flex gap-10 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`text-[10px] font-black transition-all uppercase tracking-[0.2em] relative py-1 ${activePage === link.id ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'}`}
              >
                {link.name}
                {activePage === link.id && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#CCFF00]" />
                )}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('contato')}
              className="bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all"
            >
              Diagnóstico Grátis
            </button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-12 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`text-4xl font-brand font-black uppercase tracking-tighter ${activePage === link.id ? 'text-[#CCFF00]' : 'text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('contato')}
              className="text-4xl font-brand font-black text-[#CCFF00] uppercase tracking-tighter"
            >
              Falar Conosco
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage key="home" onNavigate={handleNavigate} />}
          {activePage === 'metodo' && <MetodoPage key="metodo" />}
          {activePage === 'servicos' && <ServicosPage key="servicos" />}
          {activePage === 'beneficios' && <BeneficiosPage key="beneficios" />}
          {activePage === 'contato' && <ContatoPage key="contato" />}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-24 border-t border-white/5 relative bg-black">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-20 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-[#CCFF00] rounded-xl flex items-center justify-center font-black text-black text-xl">V</div>
                <span className="text-3xl font-brand font-black uppercase">Vettor<span className="text-[#CCFF00]">28</span></span>
              </div>
              <p className="text-gray-400 text-xl max-w-md mb-10 leading-relaxed">
                Transformando a hospitalidade brasileira através de dados, branding de luxo e escala acelerada de reservas.
              </p>
              <div className="flex gap-6">
                {[Instagram, Users, MapPin].map((Icon, i) => (
                  <div key={i} className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-gray-400 hover:text-[#CCFF00] hover:border-[#CCFF00]/40 transition-all cursor-pointer">
                    <Icon size={24} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-[#CCFF00] mb-8 text-xs">A Agência</h5>
              <div className="flex flex-col gap-5 text-gray-400 font-bold">
                {navLinks.map(l => (
                  <button key={l.id} onClick={() => handleNavigate(l.id)} className="text-left hover:text-white transition-colors">{l.name}</button>
                ))}
                <button onClick={() => handleNavigate('contato')} className="text-left hover:text-white transition-colors">Contato</button>
              </div>
            </div>

            <div>
              <h5 className="font-black uppercase tracking-[0.2em] text-[#CCFF00] mb-8 text-xs">Atendimento</h5>
              <div className="text-gray-400 space-y-5 font-bold">
                <p>São Paulo, SP<br />Hub de Inovação Digital</p>
                <p className="text-white">growth@vettor28.com.br</p>
                <p className="text-white">+55 (11) 99999-9999</p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-gray-600 uppercase tracking-widest font-black">&copy; {new Date().getFullYear()} Vettor28. Todos os direitos reservados.</p>
            <div className="flex gap-10 text-[10px] text-gray-600 uppercase tracking-widest font-black">
              <span className="hover:text-white cursor-pointer">Privacidade</span>
              <span className="hover:text-white cursor-pointer">Compliance</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
