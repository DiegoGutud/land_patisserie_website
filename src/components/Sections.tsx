import { motion, useScroll, useTransform } from 'motion/react';
import { Menu, X, Instagram, MapPin, Clock, Phone, Mail, Star, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = ({ forceDark = false }: { forceDark?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dark = forceDark || scrolled || isOpen;

  const links = [
    { name: 'INICIO', href: '#hero' },
    { name: 'SOBRE NOSOTROS', href: '#about' },
    { name: 'ESPECIALIDADES', href: '#specialties' },
    { name: 'MENÚ', href: '#menu' },
    { name: 'VISÍTANOS', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${dark ? 'bg-[#F9F8F6]/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`font-serif text-3xl tracking-widest transition-colors leading-tight ${dark ? 'text-[#1C1C1C]' : 'text-white'}`}>LÂND</a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-12">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`relative font-sans text-sm tracking-[0.2em] transition-colors ${dark ? 'text-[#1C1C1C] hover:text-[#8A9A5B]' : 'text-white hover:text-white/70'} after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className={`lg:hidden ${dark ? 'text-[#1C1C1C]' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden absolute top-full left-0 w-full bg-[#F9F8F6] shadow-lg py-8 flex flex-col items-center space-y-6"
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans text-sm tracking-[0.2em] text-[#1C1C1C] active:scale-95 transition-transform"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );

};

export const Preloader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-[#F9F8F6] flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="font-serif text-6xl md:text-8xl text-[#1C1C1C] tracking-tighter leading-tight py-2">LÂND</h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
          className="h-0.5 bg-[#8A9A5B] mt-4 mx-auto"
        />
      </motion.div>
    </motion.div>
  );
};

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#F9F8F6]">
      <div className="absolute inset-0 z-0">
        <motion.div style={{ y: yImage, scale }} className="w-full h-full">
          <img
            src="/assets/images/land_shop.png"
            alt="Artisan Pastry"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </div>

      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 text-center text-white px-6 flex flex-col items-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-bold"
        >
          Madrid • Desde 2025
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
          className="font-serif text-6xl md:text-8xl lg:text-[12vw] leading-[1.1] mb-4 pt-4"
        >
          LÂND
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
          className="font-sans text-base md:text-2xl tracking-[0.4em] uppercase mb-1 font-light"
        >
          PATISSERIE
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="w-80 h-[1px] bg-white mx-auto mt-0 mb-12"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="font-serif italic text-lg md:text-2xl tracking-wide font-light"
        >
          Técnica francesa. Sabores asiáticos.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white"
      >
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase">Descubre</span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-[#F9F8F6]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-[3/4] overflow-hidden rounded-sm">
            <img
              src="../../public/assets/images/land_coffe_cup.jpeg"
              alt="Land coffe cup"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#F9F8F6] p-4 hidden md:block">
            <img
              src="../../public/assets/images/land_founder.png"
              alt="Land founder"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C]">Nuestra Historia</h2>
          <div className="w-16 h-[2px] bg-[#8A9A5B]" />
          <p className="font-sans text-lg leading-relaxed text-gray-600 font-light">
            LÂND nació en 2022 con una ilusión: crear un lugar acogedor donde cada bocado hiciera feliz a alguien. Formada en <span className="italic font-serif text-[#1C1C1C]">Le Cordon Bleu</span>, nuestra fundadora trae consigo la precisión de la técnica francesa y los sabores con los que creció en Asia. Esa mezcla — entre lo aprendido y lo sentido — es lo que hace que cada tarta, cada cake roll y cada matcha latte tenga algo especial.
          </p>
          <p className="font-sans text-lg leading-relaxed text-gray-600 font-light">
            Pero LÂND es mucho más que pastelería. Es un rincón tranquilo en Madrid para compartir una conversación, una sonrisa o un momento de calma en mitad del día. Nosotros pusimos el espacio, el cariño y las recetas — pero sois vosotros quienes le dais vida cada día.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export const Specialties = () => {
  const items = [
    {
      title: "Matcha Latte",
      desc: "Reconocido por nuestros clientes como el mejor de Madrid. Matcha de la mejor calidad.",
      img: "../../public/assets/images/matcha.png",
      badge: "Best in Madrid"
    },
    {
      title: "Cake Rolls",
      desc: "Esponjosidad aérea con cremas ligeras de sésamo negro, matcha, fresa y más.",
      img: "../../public/assets/images/land_cake_rolls.png"
    },
    {
      title: "Tartas de Temporada",
      desc: "Creaciones efímeras que celebran los ingredientes de cada estación.",
      img: "../../public/assets/images/land_cake_season.jpg"
    },
    {
      title: "Bollería",
      desc: "Nuestros clásicos de siempre, horneados a diario con ingredientes seleccionados.",
      img: "../../public/assets/images/land_baked_goods.jpg"
    },
    {
      title: "Brunch",
      desc: "Creatividad y sabor en cada bocado, perfecto para empezar el día con energía.",
      img: "../../public/assets/images/land_brunch.png"
    }
  ];

  const carouselRow1 = [
    "/assets/images/land_product_1.jpg",
    "/assets/images/land_product_2.jpg",
    "/assets/images/land_product_3.png",
    "/assets/images/land_product_4.jpeg",
    "/assets/images/land_product_5.jpg",
    "/assets/images/land_product_6.jpeg",
    "/assets/images/land_product_7.jpg",
  ];

  const carouselRow2 = [
    "/assets/images/land_product_8.jpg",
    "/assets/images/land_product_9.png",
    "/assets/images/land_product_10.jpg",
    "/assets/images/land_product_11.jpg",
    "/assets/images/land_product_12.jpg",
    "/assets/images/land_product_13.jpg",
    "/assets/images/land_product_14.jpg",
  ];

  return (
    <section id="specialties" className="py-24 bg-white overflow-hidden">
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] mb-4 block">Nuestra Carta</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C]">Especialidades</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-default relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] transition-transform duration-500 hover:-translate-y-2"
            >
              <div className="aspect-square overflow-hidden mb-6 bg-gray-100 relative">
                {item.badge && (
                  <div className="absolute top-4 right-4 z-10 bg-[#1C1C1C] text-white text-[10px] uppercase tracking-widest px-3 py-1">
                    {item.badge}
                  </div>
                )}
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl mb-3 group-hover:text-[#8A9A5B] transition-colors">{item.title}</h3>
              <p className="font-sans text-gray-500 font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* "Y mucho más..." text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mt-24 mb-12"
      >
        <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-[#1C1C1C]/80">
          Y mucho más...
        </h3>
        <div className="w-16 h-[2px] bg-[#8A9A5B] mx-auto mt-4" />
      </motion.div>

      {/* Carousel Row 1 — scrolling LEFT */}
      <div className="relative w-full overflow-hidden mb-4">
        <div
          className="flex gap-4 w-max"
          style={{ animation: 'scrollLeft 30s linear infinite' }}
        >
          {[...carouselRow1, ...carouselRow1].map((img, idx) => (
            <div
              key={idx}
              className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] flex-shrink-0 overflow-hidden rounded-sm"
            >
              <img
                src={img}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Row 2 — scrolling RIGHT */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex gap-4 w-max"
          style={{ animation: 'scrollRight 35s linear infinite' }}
        >
          {[...carouselRow2, ...carouselRow2].map((img, idx) => (
            <div
              key={idx}
              className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] flex-shrink-0 overflow-hidden rounded-sm"
            >
              <img
                src={img}
                alt={`Product ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const MenuPreview = () => {
  const categories = [
    {
      name: "Brunch",
      items: ["Sandwich de pollo Gochujiang", "Tostada de Aguacate", "Granola Bowl"]
    },
    {
      name: "Café de Especialidad",
      items: ["Cappucino", "Iced Lemonade Soda Coffee", "Hot Chocolate Latte"]
    },
    {
      name: "Matcha",
      items: ["Matcha Latte", "Signature Strawberry Matcha", "Greenbeard"]
    }
  ];

  return (
    <section id="menu" className="py-24 bg-[#F9F8F6]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] mb-4 block">Para disfrutar</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] mb-16">Menú & Brunch</h2>

        <div className="grid md:grid-cols-3 gap-12 text-left">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="space-y-6"
            >
              <h3 className="font-serif text-2xl border-b border-[#1C1C1C]/10 pb-2">{cat.name}</h3>
              <ul className="space-y-3 font-sans font-light text-gray-600">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-[#8A9A5B] rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            to="/menu"
            className="inline-block border border-[#1C1C1C] px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#1C1C1C] hover:text-white transition-all duration-300 active:scale-95"
          >
            Ver Menú Completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export const Space = () => {
  return (
    <section id="space" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] mb-4 block">Nuestro Hogar</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C]">El Espacio</h2>
          <div className="w-16 h-[2px] bg-[#8A9A5B]" />
          <p className="font-sans text-lg leading-relaxed text-gray-600 font-light">
            En LÂND hemos creado un refugio en medio del ajetreo de la ciudad. Un espacio con tonos cálidos, maderas y una iluminación suave donde algo te envuelve desde que llegas. No es solo la decoración — que es bonita, limpia y minimalista — sino todo junto: el aroma, la calma, el trato.
          </p>
          <p className="font-sans text-lg leading-relaxed text-gray-600 font-light">
            Ya sea para charlar con alguien, disfrutar de una tarta sin prisa o trabajar con un matcha latte al lado, cada rincón está pensado para quedarse un rato más — y querer volver.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-4 items-start">
            {/* Left column — one tall image */}
            <div className="aspect-[3/4] overflow-hidden rounded-sm mt-8">
              <img
                src="/assets/images/land_space_1.jpg"
                alt="Interior de Länd"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Right column — two stacked images */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square overflow-hidden rounded-sm">
                <img
                  src="/assets/images/land_space_4.png"
                  alt="Café en Länd"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="aspect-square overflow-hidden rounded-sm">
                <img
                  src="/assets/images/land_space_3.png"
                  alt="Brunch en Länd"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const GranolaPromo = () => {
  return (
    <section id="granola" className="py-24 bg-[#F9F8F6]">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative order-2 md:order-1"
        >
          <div className="aspect-square overflow-hidden rounded-sm bg-gray-100">
            <img
              src="/assets/images/land_granola_1.jpg"
              alt="Granola Länd"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Spinning badge */}
          <div className="absolute top-8 right-8 bg-[#1C1C1C] text-white w-24 h-24 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <span className="font-sans text-[10px] tracking-widest uppercase text-center leading-tight hover:animate-none">100%<br />Natural</span>
          </div>
          {/* Secondary overlay image — bottom left, mirroring About section style */}
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#F9F8F6] p-4 hidden md:block">
            <img
              src="/assets/images/land_granola_2.png"
              alt="Granola detalle"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 order-1 md:order-2"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] mb-4 block">Para llevar a casa</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C]">Nuestra Granola</h2>
          <div className="w-16 h-[2px] bg-[#8A9A5B]" />
          <p className="font-sans text-lg leading-relaxed text-gray-600 font-light">
            Llévate el sabor de LÂND a tus propios desayunos. Nuestra granola artesanal es horneada lentamente cada semana en nuestro obrador para lograr el punto perfecto de crujiente.
          </p>
          <ul className="space-y-4 font-sans font-light text-gray-600 mt-4">
            <li className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
              <span>Ingredientes seleccionados con el mismo rigor que nuestros pasteles</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
              <span>Crujiente y perfecta con yogur, fruta o sola a puñados</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-1.5 h-1.5 bg-[#8A9A5B] rounded-full" />
              <span>Hecha con cariño, como todo en LÂND</span>
            </li>
          </ul>
        </motion.div>

      </div>
    </section>
  );
};

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "Dulces de temporada y brunch con carácter. Muy buen café de especialidad, bien preparado y sin amargor. Se nota que cuidan la molienda y la extracción. Todos los pasteles son caseros, bonitos y equilibrados con sabores que se ajustan a la fruta de temporada. Repetiré mil veces sin duda.",
      author: "Fang Chang"
    },
    {
      quote: "Simplemente perfecto. Es un lugar acogedor, pero no por el espacio físico, sino por la comida y por el trato. Y el matcha latte es, sin duda, el mejor que he probado en Madrid. Un sitio al que vas cuando quieres que el mundo se detenga un momento y disfrutar de algo hecho con cariño.",
      author: "Dani"
    },
    {
      quote: "El local ofrece productos de gran calidad. Probé un rollo de bizcocho: la masa estaba en su punto justo y la nata no humedecía el bizcocho, manteniendo una textura perfecta. Se nota claramente que utilizan materias primas de excelente calidad. Sin duda, una experiencia muy recomendable.",
      author: "Stephan H."
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-[#8A9A5B] mb-4 block">Lo que dicen</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C]">Opiniones</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center text-center px-6 py-9 border border-gray-100 hover:border-[#8A9A5B]/40 transition-colors duration-300"
            >
              <span className="text-[#8A9A5B] text-3xl font-serif leading-none mb-3">"</span>
              <p className="font-serif text-base italic leading-relaxed text-gray-700 mb-5 flex-1">
                {t.quote}
              </p>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, s) => (
                  <Star key={s} size={12} className="fill-[#8A9A5B] text-[#8A9A5B]" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-gray-300" />
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-gray-400">{t.author}</span>
                <div className="w-8 h-[1px] bg-gray-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Info = () => {
  return (
    <section id="contact" className="py-24 bg-[#1C1C1C] text-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl md:text-5xl mb-10">Visítanos</h2>
          <div className="space-y-8 font-sans font-light tracking-wide">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-[#8A9A5B] mt-1" />
              <div>
                <p className="uppercase tracking-[0.2em] text-sm text-gray-400 mb-2">Dirección</p>
                <p className="text-xl">C. de Beatriz de Bobadilla, 9</p>
                <p className="text-xl">28040 Madrid, España</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-[#8A9A5B] mt-1" />
              <div>
                <p className="uppercase tracking-[0.2em] text-sm text-gray-400 mb-2">Horario</p>
                <p className="text-lg">Martes - Viernes: 09:30 - 19:30</p>
                <p className="text-lg">Sábado - Domingo: 12:00 - 19:30</p>
                <p className="text-lg text-gray-500">Lunes: Cerrado</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Instagram className="w-6 h-6 text-[#8A9A5B] mt-1" />
              <div>
                <p className="uppercase tracking-[0.2em] text-sm text-gray-400 mb-2">Síguenos</p>
                <a
                  href="https://www.instagram.com/landpatisserie"
                  target="_blank"
                  rel="noreferrer"
                  className="text-lg hover:text-[#8A9A5B] transition-colors"
                >
                  @landpatisserie
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="h-full min-h-[400px] bg-gray-800 relative overflow-hidden">
          {/* Placeholder for Map */}
          <img
            src="assets/images/product (13).jpg"
            alt="Interior atmosphere"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a
              href="https://maps.app.goo.gl/MoDCrLdtwNGeLGVe7"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-black px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase hover:bg-[#8A9A5B] hover:text-white transition-all duration-300 active:scale-95"
            >
              Ver en Mapa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-[#1C1C1C] text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h3 className="font-serif text-2xl tracking-widest mb-2">LÂND</h3>
          <p className="font-sans text-xs text-gray-500 tracking-wider">© 2026 LÂND Pâtisserie. Todos los derechos reservados.</p>
        </div>

        <div className="flex items-center space-x-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/landpatisserie"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          {/* Red Note / 小红书 */}
          <a
            href="https://www.xiaohongshu.com/user/profile/liudanqing1116"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Red Note"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M22.405 9.879c.002.016.01.02.07.019h.725a.797.797 0 0 0 .78-.972.794.794 0 0 0-.884-.618.795.795 0 0 0-.692.794c0 .101-.002.666.001.777zm-11.509 4.808c-.203.001-1.353.004-1.685.003a2.528 2.528 0 0 1-.766-.126.025.025 0 0 0-.03.014L7.7 16.127a.025.025 0 0 0 .01.032c.111.06.336.124.495.124.66.01 1.32.002 1.981 0 .01 0 .02-.006.023-.015l.712-1.545a.025.025 0 0 0-.024-.036zM.477 9.91c-.071 0-.076.002-.076.01a.834.834 0 0 0-.01.08c-.027.397-.038.495-.234 3.06-.012.24-.034.389-.135.607-.026.057-.033.042.003.112.046.092.681 1.523.787 1.74.008.015.011.02.017.02.008 0 .033-.026.047-.044.147-.187.268-.391.371-.606.306-.635.44-1.325.486-1.706.014-.11.021-.22.03-.33l.204-2.616.022-.293c.003-.029 0-.033-.03-.034zm7.203 3.757a1.427 1.427 0 0 1-.135-.607c-.004-.084-.031-.39-.235-3.06a.443.443 0 0 0-.01-.082c-.004-.011-.052-.008-.076-.008h-1.48c-.03.001-.034.005-.03.034l.021.293c.076.982.153 1.964.233 2.946.05.4.186 1.085.487 1.706.103.215.223.419.37.606.015.018.037.051.048.049.02-.003.742-1.642.804-1.765.036-.07.03-.055.003-.112zm3.861-.913h-.872a.126.126 0 0 1-.116-.178l1.178-2.625a.025.025 0 0 0-.023-.035l-1.318-.003a.148.148 0 0 1-.135-.21l.876-1.954a.025.025 0 0 0-.023-.035h-1.56c-.01 0-.02.006-.024.015l-.926 2.068c-.085.169-.314.634-.399.938a.534.534 0 0 0-.02.191.46.46 0 0 0 .23.378.981.981 0 0 0 .46.119h.59c.041 0-.688 1.482-.834 1.972a.53.53 0 0 0-.023.172.465.465 0 0 0 .23.398c.15.092.342.12.475.12l1.66-.001c.01 0 .02-.006.023-.015l.575-1.28a.025.025 0 0 0-.024-.035zm-6.93-4.937H3.1a.032.032 0 0 0-.034.033c0 1.048-.01 2.795-.01 6.829 0 .288-.269.262-.28.262h-.74c-.04.001-.044.004-.04.047.001.037.465 1.064.555 1.263.01.02.03.033.051.033.157.003.767.009.938-.014.153-.02.3-.06.438-.132.3-.156.49-.419.595-.765.052-.172.075-.353.075-.533.002-2.33 0-4.66-.007-6.991a.032.032 0 0 0-.032-.032zm11.784 6.896c0-.014-.01-.021-.024-.022h-1.465c-.048-.001-.049-.002-.05-.049v-4.66c0-.072-.005-.07.07-.07h.863c.08 0 .075.004.075-.074V8.393c0-.082.006-.076-.08-.076h-3.5c-.064 0-.075-.006-.075.073v1.445c0 .083-.006.077.08.077h.854c.075 0 .07-.004.07.07v4.624c0 .095.008.084-.085.084-.37 0-1.11-.002-1.304 0-.048.001-.06.03-.06.03l-.697 1.519s-.014.025-.008.036c.006.01.013.008.058.008 1.748.003 3.495.002 5.243.002.03-.001.034-.006.035-.033v-1.539zm4.177-3.43c0 .013-.007.023-.02.024-.346.006-.692.004-1.037.004-.014-.002-.022-.01-.022-.024-.005-.434-.007-.869-.01-1.303 0-.072-.006-.071.07-.07l.733-.003c.041 0 .081.002.12.015.093.025.16.107.165.204.006.431.002 1.153.001 1.153zm2.67.244a1.953 1.953 0 0 0-.883-.222h-.18c-.04-.001-.04-.003-.042-.04V10.21c0-.132-.007-.263-.025-.394a1.823 1.823 0 0 0-.153-.53 1.533 1.533 0 0 0-.677-.71 2.167 2.167 0 0 0-1-.258c-.153-.003-.567 0-.72 0-.07 0-.068.004-.068-.065V7.76c0-.031-.01-.041-.046-.039H17.93s-.016 0-.023.007c-.006.006-.008.012-.008.023v.546c-.008.036-.057.015-.082.022h-.95c-.022.002-.028.008-.03.032v1.481c0 .09-.004.082.082.082h.913c.082 0 .072.128.072.128V11.19s.003.117-.06.117h-1.482c-.068 0-.06.082-.06.082v1.445s-.01.068.064.068h1.457c.082 0 .076-.006.076.079v3.225c0 .088-.007.081.082.081h1.43c.09 0 .082.007.082-.08v-3.27c0-.029.006-.035.033-.035l2.323-.003c.098 0 .191.02.28.061a.46.46 0 0 1 .274.407c.008.395.003.79.003 1.185 0 .259-.107.367-.33.367h-1.218c-.023.002-.029.008-.028.033.184.437.374.871.57 1.303a.045.045 0 0 0 .04.026c.17.005.34.002.51.003.15-.002.517.004.666-.01a2.03 2.03 0 0 0 .408-.075c.59-.18.975-.698.976-1.313v-1.981c0-.128-.01-.254-.034-.38 0 .078-.029-.641-.724-.998z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
