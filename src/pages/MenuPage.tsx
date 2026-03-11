import { motion } from 'motion/react';
import { ArrowLeft, Flame, Snowflake, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from '../components/Sections';

// ─── Types ────────────────────────────────────────────────────────────────────

type Price = string | { m?: string; l?: string };

interface MenuItem {
    name: string;
    desc?: string;
    price: Price;
    hot?: boolean;
    iced?: boolean;
}

interface AddOn {
    label: string;
    price: string;
}

interface MenuSection {
    id: string;
    title: string;
    subtitle?: string;
    items: MenuItem[];
    addOns?: AddOn[];      // shown as dashed-border footnote (brunch extras & café milk)
}

// ─── Data ────────────────────────────────────────────────────────────────────

const sections: MenuSection[] = [
    {
        id: 'brunch',
        title: 'Brunch',
        subtitle: 'Hechas con pan de masa madre',
        items: [
            { name: 'Tostada Ligera', desc: 'Hogaza artesanal, mantequilla, mermelada', price: '2.8€' },
            { name: 'Tostada de Tomate / Jamón', desc: 'Hogaza artesanal, tomate del día, AOVE, aceite aromatizado secreto', price: '4€ / 6€' },
            { name: 'Croissant a la Plancha', desc: 'Croissant, mantequilla, mermelada', price: '3.5€' },
            { name: 'Croissant Mixto', desc: 'Croissant, jamón york, queso edam, queso mozzarella, rúcula', price: '6.9€' },
            { name: 'Tostada Aguacate', desc: 'Hogaza artesanal, crema de queso, aguacate, fruto seco, AOVE, aceite aromatizado secreto, ralladura de queso', price: '6.9€' },
            { name: 'Sandwich Tokyo', desc: 'Pan brioche, huevo revuelto, jamón cocido, queso mozzarella, cebollino, salsa de mostaza y miel', price: '8.5€' },
            { name: 'Sandwich de Pollo Gochujiang', desc: 'Hogaza o brioche, pechuga de pollo asado, salsa casera gochujiang, pepinillos, cebolla crujiente, queso edam, rúcula', price: '9.4€' },
            { name: 'Granola Bowl', desc: 'Granola casera, aceite de coco, miel, mermelada, yogur natural, frutos secos, fruta de temporada', price: '7.9€' },
        ],
        addOns: [
            { label: 'Add huevo revuelto', price: '+2€' },
            { label: 'Add huevo plancha', price: '+1.8€' },
            { label: 'Add jamón ibérico', price: '+2€' },
            { label: 'Aguacate', price: '+2€' },
            { label: 'Salmón', price: '+3.5€' },
        ],
    },
    {
        id: 'cafe',
        title: 'Café',
        items: [
            { name: 'Espresso', price: { m: '2.2€', l: '3€' }, hot: true },
            { name: 'Americano', price: { l: '3€' }, hot: true },
            { name: 'Cappuccino', price: { m: '2.8€', l: '3.8€' }, hot: true },
            { name: 'Cortado', price: { m: '2.6€' }, hot: true },
            { name: 'Latte', price: { m: '2.8€', l: '3.8€' }, hot: true },
            { name: 'Flat White', price: { l: '3.5€' }, hot: true },
            { name: 'Iced Americano', price: { l: '3.4€' }, iced: true },
            { name: 'Iced Latte', price: { l: '4€' }, iced: true },
        ],
        addOns: [
            { label: '+ Oat milk', price: '+0.4€' },
            { label: '+ Coconut milk', price: '+0.4€' },
        ],
    },
    {
        id: 'matcha',
        title: 'Matcha',
        items: [
            { name: 'Matcha Latte', price: { l: '4.5€' }, hot: true, iced: true },
            { name: 'Matcha Coconut Milk', price: { l: '4.5€' }, hot: true, iced: true },
            { name: 'Greenbeard', desc: 'Matcha + coconut water + light cream', price: { l: '4.5€' }, iced: true },
            { name: 'Matcha Land', desc: 'Matcha + oat milk + cacao + espresso', price: { l: '6.5€' }, iced: true },
            { name: 'Signature Strawberry Matcha', desc: 'Matcha + silky strawberry milk + strawberry jam', price: { l: '6.5€' }, iced: true },
        ],
    },
    {
        id: 'creative',
        title: 'Creative Coffee',
        items: [
            { name: 'Rosé Coco Latte', price: { l: '4.5€' } },
            { name: 'Hot Chocolate Latte', price: { l: '4.5€' }, hot: true },
            { name: 'Iced Shake Choco Latte', price: { l: '4.5€' }, iced: true },
            { name: 'Iced Coconut Water Americano', price: { l: '4.5€' }, iced: true },
            { name: 'Iced Lemonade Soda Coffee', price: { l: '4.5€' }, iced: true },
            { name: 'Iced Apple Juice Soda Coffee', price: { l: '4.5€' }, iced: true },
        ],
    },
    {
        id: 'others',
        title: 'Otros',
        items: [
            { name: 'Leche', price: '1.8€' },
            { name: 'Zumo de Naranja Natural', price: '3.5€' },
            { name: 'Cola Cao', price: '2.5€' },
            { name: 'Refrescos', price: '2.5€' },
            { name: 'Agua', price: '2€' },
            { name: 'Cerveza', price: '2.5€' },
        ],
    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PriceDisplay({ price }: { price: Price }) {
    if (typeof price === 'string') {
        return <span className="font-serif text-base text-[#1C1C1C] whitespace-nowrap">{price}</span>;
    }
    return (
        <div className="flex items-center gap-3 whitespace-nowrap">
            {price.m && (
                <span className="font-sans text-xs text-gray-400 tabular-nums">
                    <span className="text-[#8A9A5B] mr-1">M</span>{price.m}
                </span>
            )}
            {price.l && (
                <span className="font-sans text-xs text-gray-400 tabular-nums">
                    <span className="text-[#8A9A5B] mr-1">L</span>{price.l}
                </span>
            )}
        </div>
    );
}

function TempBadges({ hot, iced }: { hot?: boolean; iced?: boolean }) {
    return (
        <div className="flex gap-1.5 ml-2 shrink-0">
            {hot && <Flame size={12} className="text-[#C47E2A]" />}
            {iced && <Snowflake size={12} className="text-[#5B8FA8]" />}
        </div>
    );
}

function MenuSectionBlock({ section, index }: { section: MenuSection; index: number; key?: string | number }) {
    const hasSizes = section.items.some(i => typeof i.price === 'object');

    return (
        <motion.div
            id={section.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="scroll-mt-40"
        >
            {/* Header */}
            <div className="border-b border-[#1C1C1C]/10 pb-4 mb-6">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-[#8A9A5B] block mb-1">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl text-[#1C1C1C]">{section.title}</h3>
                        {section.subtitle && (
                            <p className="font-sans text-xs text-gray-400 tracking-widest uppercase mt-1">{section.subtitle}</p>
                        )}
                    </div>
                    {hasSizes && (
                        <div className="flex gap-4 font-sans text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-1">
                            <span>M</span>
                            <span>L</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Items */}
            <div className="space-y-5">
                {section.items.map((item, i) => (
                    <div key={i} className="group">
                        <div className="flex items-baseline gap-2 mb-0.5">
                            <h4 className="font-sans font-medium text-sm uppercase tracking-wider text-[#1C1C1C] group-hover:text-[#8A9A5B] transition-colors leading-snug">
                                {item.name}
                            </h4>
                            <TempBadges hot={item.hot} iced={item.iced} />
                            <span className="flex-1 h-[1px] bg-[#1C1C1C]/8 self-center min-w-[12px]" />
                            <PriceDisplay price={item.price} />
                        </div>
                        {item.desc && (
                            <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">{item.desc}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Add-ons — unified dashed footnote style for both brunch & café */}
            {section.addOns && (
                <div className="mt-5 pt-4 border-t border-dashed border-[#8A9A5B]/30">
                    <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-[#8A9A5B] mb-3">Extras</p>
                    <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                        {section.addOns.map((a, i) => (
                            <span key={i} className="font-sans text-xs text-[#8A9A5B] tracking-wider">
                                {a.label} <span className="text-gray-400">{a.price}</span>
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// ─── Menu Navbar ─────────────────────────────────────────────────────────────

function MenuNavbar({ activeId, onScrollTo }: { activeId: string; onScrollTo: (id: string) => void }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-[#F9F8F6]/95 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">

                {/* Logo → home */}
                <Link
                    to="/"
                    className="font-serif text-3xl tracking-widest text-[#1C1C1C] leading-tight hover:text-[#8A9A5B] transition-colors"
                >
                    LÂND
                </Link>

                {/* Center: category links (desktop) */}
                <div className="hidden lg:flex items-center space-x-8">
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => onScrollTo(s.id)}
                            className={`relative font-sans text-xs tracking-[0.18em] uppercase transition-colors hover:text-[#8A9A5B] ${activeId === s.id ? 'text-[#8A9A5B] after:scale-x-100 after:origin-bottom-left' : 'text-[#1C1C1C] after:scale-x-0'} after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}
                        >
                            {s.title}
                        </button>
                    ))}
                </div>

                {/* Right: back to home (desktop) + mobile toggle */}
                <div className="flex items-center gap-6">
                    <Link
                        to="/"
                        className="hidden lg:inline-flex items-center gap-1.5 relative font-sans text-xs tracking-[0.18em] uppercase text-gray-400 hover:text-[#8A9A5B] transition-colors after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
                    >
                        <ArrowLeft size={13} /> Inicio
                    </Link>
                    <button
                        className="lg:hidden text-[#1C1C1C]"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden bg-[#F9F8F6] border-t border-gray-100 py-6 px-6 flex flex-col items-center space-y-5"
                >
                    {sections.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => { onScrollTo(s.id); setMobileOpen(false); }}
                            className={`font-sans text-xs tracking-[0.2em] uppercase transition-transform active:scale-95 ${activeId === s.id ? 'text-[#8A9A5B]' : 'text-[#1C1C1C]'}`}
                        >
                            {s.title}
                        </button>
                    ))}
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 font-sans text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-[#8A9A5B] active:scale-95 transition-all pt-2 border-t border-gray-100 w-full justify-center"
                    >
                        <ArrowLeft size={13} /> Volver al inicio
                    </Link>
                </motion.div>
            )}
        </nav>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MenuPage() {
    const [activeId, setActiveId] = useState<string>('brunch');


    const scrollTo = (id: string) => {
        setActiveId(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] selection:bg-[#8A9A5B] selection:text-white overflow-x-hidden w-full">
            <MenuNavbar activeId={activeId} onScrollTo={scrollTo} />

            {/* ── Hero ─────────────────────────────────────────── */}
            <section className="pt-36 pb-16 px-6 text-center bg-[#F9F8F6]">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] block mb-4">Para disfrutar</span>
                    <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-[#1C1C1C] leading-tight mb-6">Nuestra Carta</h1>
                    <p className="font-sans text-xs tracking-[0.35em] uppercase text-gray-400 mb-10">
                        Pastelería artesanal · Café de especialidad · Brunch
                    </p>
                    <div className="w-16 h-[2px] bg-[#8A9A5B] mx-auto" />
                </motion.div>
            </section>


            {/* ── Featured Matcha ───────────────────────────────── */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-2 gap-12 md:gap-20 items-center"
                    >
                        <div className="aspect-[4/3] overflow-hidden rounded-sm">
                            <img
                                src="/assets/images/matcha.png"
                                alt="Matcha Latte"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="space-y-5">
                            <span className="inline-block bg-[#1C1C1C] text-white font-sans text-[10px] tracking-widest uppercase px-3 py-1">
                                Producto Estrella
                            </span>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1C1C1C]">Ceremonial<br />Matcha Latte</h2>
                            <div className="w-10 h-[2px] bg-[#8A9A5B]" />
                            <p className="font-sans text-sm leading-relaxed text-gray-500 font-light">
                                Matcha de grado ceremonial de la mano de{' '}
                                <span className="italic text-[#1C1C1C]">@tranquilomatcha</span>. Batido a mano para preservar su esencia y dulzor natural. Disponible caliente o frío.
                            </p>
                            <div className="flex items-center gap-4">
                                <p className="font-serif text-3xl text-[#8A9A5B]">4.5€</p>
                                <div className="flex gap-3">
                                    <span className="flex items-center gap-1 font-sans text-xs text-gray-400"><Flame size={12} className="text-[#C47E2A]" /> Caliente</span>
                                    <span className="flex items-center gap-1 font-sans text-xs text-gray-400"><Snowflake size={12} className="text-[#5B8FA8]" /> Frío</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Menu ─────────────────────────────────────────── */}
            <section className="py-24 px-6 bg-[#F9F8F6]">
                <div className="max-w-5xl mx-auto">
                    {/* Icon legend */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex gap-6 mb-16 pb-6 border-b border-[#1C1C1C]/10"
                    >
                        <span className="flex items-center gap-1.5 font-sans text-xs text-gray-400 tracking-wider">
                            <Flame size={13} className="text-[#C47E2A]" /> Caliente
                        </span>
                        <span className="flex items-center gap-1.5 font-sans text-xs text-gray-400 tracking-wider">
                            <Snowflake size={13} className="text-[#5B8FA8]" /> Frío / Iced
                        </span>
                        <span className="font-sans text-xs text-gray-400 tracking-wider">
                            <span className="text-[#8A9A5B] font-medium">M</span> Medium ·{' '}
                            <span className="text-[#8A9A5B] font-medium">L</span> Large
                        </span>
                    </motion.div>

                    {/* Two-column grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
                        {sections.map((section, i) => (
                            <MenuSectionBlock key={section.id} section={section} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Philosophy ───────────────────────────────────── */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-2xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="border border-[#8A9A5B]/30 p-12"
                    >
                        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] block mb-6">Nuestra Filosofía</span>
                        <p className="font-serif text-xl md:text-2xl italic leading-relaxed text-gray-700">
                            "En LÂND todo se hace con el mismo cariño: desde elegir los ingredientes hasta el último detalle de cada pastel. Porque cuando algo se hace bien, el sabor lo dice todo."
                        </p>
                        <div className="w-10 h-[2px] bg-[#8A9A5B] mx-auto mt-8" />
                    </motion.div>
                    <div className="font-sans text-xs tracking-[0.3em] uppercase text-gray-400 mt-10 space-y-1.5">
                        <p>C. de Beatriz de Bobadilla, 9 · Madrid</p>
                        <p>Martes – Viernes</p>
                        <p>09:30 – 19:30</p>
                        <p>Sábado – Domingo</p>
                        <p>12:00 – 19:30</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
