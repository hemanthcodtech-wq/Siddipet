import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingCart, Star, Flame, Sparkles, Circle, Gift, Wind, Bell, Droplet, Flower2, Cloud, Grid, Package, MapPin, Globe, Users, Store, ArrowRight } from 'lucide-react';
import { Header } from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../store/useStoreData';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import imgHeroBanner from '../assets/hero_banner.png';
import bannerJewelry from '../assets/banner_jewelry.jpg';
import allProductsBanner from '../assets/all_products_banner.jpg';
import imgMeditation from '../assets/story_meditation.png';
import imgAarti from '../assets/story_aarti.png';
import whiteHenImg from '../assets/white_hen_isolated.jpg';
import dietChartImg from '../assets/diet_chart.png';
import { CheckCircle2, ShieldCheck, Leaf, Factory, Droplets, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true, margin: "-50px" }
};

// Inline Instagram icon (not available in this version of lucide-react)
function InstagramIcon({ className, style }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.01" fill="currentColor" stroke="currentColor" strokeWidth="3" />
    </svg>
  );
}
// ── Count-up hook (triggers when element enters viewport) ────────────────────
function useCountUp(target, duration = 1800, suffix = '') {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(target);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

// ── Individual stat tile ─────────────────────────────────────────────────────
function StatTile({ icon: Icon, target, prefix = '', suffix = '', label, link, color = '#D4AF37', decimals = 0 }) {
  const { count, ref } = useCountUp(Math.round(target * Math.pow(10, decimals)), 2000);
  const displayVal = decimals > 0
    ? (count / Math.pow(10, decimals)).toFixed(decimals)
    : count;

  const inner = (
    <div ref={ref} className="flex flex-col items-center gap-2 group cursor-default">
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-1 shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}18`, border: `1.5px solid ${color}50` }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none">
        {prefix}{displayVal}{suffix}
      </div>
      <div className="text-[11px] md:text-xs font-semibold text-white/60 text-center leading-snug max-w-[100px]">{label}</div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="contents">
        <div ref={ref} className="flex flex-col items-center gap-2 group cursor-pointer">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mb-1 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:ring-2 ring-offset-2 ring-offset-[#0d1f3f]"
            style={{ background: `${color}25`, border: `1.5px solid ${color}80`, ringColor: color }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none group-hover:underline underline-offset-2">
            {prefix}{displayVal}{suffix}
          </div>
          <div className="text-[11px] md:text-xs font-semibold text-white/60 text-center leading-snug max-w-[100px] group-hover:text-white/90 transition-colors">{label}</div>
        </div>
      </a>
    );
  }
  return inner;
}

// ── Stats banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const stats = [
    { icon: InstagramIcon, target: 12.6, decimals: 1, suffix: 'K', label: 'Instagram Family', color: '#E1306C', link: 'https://www.instagram.com/uptraders?igsh=c2llNGRzM2RpbHZ3&utm_source=qr' },
    { icon: Package, target: 10, suffix: 'K+', label: 'Groceries Delivered', color: '#D4AF37' },
    { icon: MapPin, target: 500, suffix: '+', label: 'Store Pickups', color: '#60a5fa' },
    { icon: Globe, target: 50, suffix: '+', label: 'Neighborhoods Served', color: '#34d399' },
    { icon: Users, target: 5, suffix: 'K+', label: 'Happy Customers', color: '#f472b6' },
    { icon: Store, target: 5000, suffix: '+', label: 'Fresh Products', color: '#a78bfa' },
  ];

  return (
    <div className="animate-section md:px-8 mb-4 md:mb-10">
      {/* <div
        className="relative md:rounded-2xl rounded-[24px] md:overflow-hidden py-10 px-2 md:px-10 mx-4 md:mx-0"
        style={{
          background: 'linear-gradient(135deg, #D32F2F 0%, #B81633 60%, #D32F2F 100%)',
          boxShadow: '0 8px 40px rgba(214,26,60,0.35), inset 0 1px 0 rgba(255,255,255,0.15)'
        }}
      > */}
        {/* Decorative gold top border */}
        {/* <div className="hidden md:block absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} /> */}
        {/* Subtle pattern */}
        {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '28px 28px' }} /> */}

        {/* <div className="relative z-10"> */}
          {/* Heading */}
          {/* <div className="text-center mb-8">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-brand-secondary mb-1">Serving Our Community</p>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-white">Trusted by Thousands Every Day</h2>
          </div> */}

          {/* Stats grid */}
          {/* <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-4">
            {stats.map((s, i) => (
              <StatTile key={i} {...s} />
            ))}
          </div>
        </div> */}

        {/* Decorative gold bottom border
        <div className="hidden md:block absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)' }} />
      </div>  */}
   </div>
  );
}

// ── New Info Sections ────────────────────────────────────────────────────────
function WhyAbhiEggs() {
  const points = [
    { text: "Fresh Eggs. Directly Delivered from Farm", icon: <Package className="w-5 h-5" /> },
    { text: "Nutri Enriched Feed", icon: <CheckCircle2 className="w-5 h-5" /> },
    { text: "Modern Farm", icon: <Factory className="w-5 h-5" /> },
    { text: "No to Antibiotics", icon: <ShieldCheck className="w-5 h-5" /> },
    { text: "No Bad Odour", icon: <Wind className="w-5 h-5" /> },
    { text: "No Chemical and Heavy Metal Residuals", icon: <Shield className="w-5 h-5" /> },
    { text: "Vegan diet", icon: <Leaf className="w-5 h-5" /> },
    { text: "Ozonized Water", icon: <Droplets className="w-5 h-5" /> },
    { text: "Hens Grown in Clean Environment", icon: <Cloud className="w-5 h-5" /> },
  ];

  return (
    <motion.section variants={staggerContainer} initial="initial" whileInView="whileInView" className="py-20 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <motion.h2 variants={fadeUp} className="text-sm font-bold tracking-widest text-[#D32F2F] uppercase mb-3">Why SIDDIPET Eggs</motion.h2>
          <motion.h3 variants={fadeUp} className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            What makes SIDDIPET Eggs India's best organic eggs brand
          </motion.h3>
          <motion.p variants={fadeUp} className="text-gray-600 text-lg leading-relaxed mb-8 text-justify">
            Our Hen Story starts on one farm, not a supply chain. Our hens are laid with love, raised in a clean environment, and fed on a scientifically formulated, nutri-rich diet plan: premium grade corn, soya meal, til cake, rice bran, sunflower seeds, flaxseed, and organically sourced supplements like selenium, omega DHA from algae, and vitamin D3. They’re also kept well hydrated with ozonized water. This ensures the eggs are healthier and tastier, making them a reliable source of high protein eggs for everyday nutrition. As a chemical free eggs brand, we follow controlled farming to ensure safe and natural quality, and it’s why we call ourselves an organic eggs brand in the truest sense.
          </motion.p>
        </div>
        <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
          {points.map((pt, i) => (
            <motion.div key={i} variants={fadeUp} className="flex items-center gap-3 bg-[#FDF8F0] p-4 rounded-2xl border border-[#D32F2F]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-[#D32F2F] shrink-0 bg-white p-2 rounded-full shadow-sm">
                {pt.icon}
              </div>
              <span className="font-semibold text-gray-800 text-sm">{pt.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function UniqueDietChart() {
  return (
    <motion.section variants={fadeUp} initial="initial" whileInView="whileInView" className="py-20 px-6 md:px-12 bg-[#FAF9F6] border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-sm font-bold tracking-widest text-[#D32F2F] uppercase mb-3">Our Hen Story</h2>
          <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">Our Unique Diet Chart</h3>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Our hens are fed on a scientifically formulated nutri-rich diet plan. It includes premium grade corn, soya meal, til cake, rice bran, sunflower seeds, flaxseed & organically sourced supplements like selenium, omega DHA (from algae), and vitamin D3. They are also kept well hydrated with ozonized water. This ensures the eggs are healthier and tastier, making them a reliable source of high protein eggs for everyday nutrition. As a chemical free eggs brand, we follow controlled farming to ensure safe and natural quality.
          </p>
        </div>
        <div className="flex justify-center w-full max-w-5xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
          <img src={dietChartImg} alt="Hen Diet Chart: Corn, Organic Nutrients, Till Cake, Sunflower, Soya Meal, Flax Seeds, Rice Bran, Ozone treated Water" className="w-full h-auto object-contain" />
        </div>
      </div>
    </motion.section>
  );
}

function CompareEggRanges() {
  const ranges = [
    { name: "D.O.S.E", tag: "DOSE", fortified: "Vit D3, Omega DHA, Immunity boosters", bestFor: "All-round premium nutrition for the whole family", color: "#F1C40F" },
    { name: "Gold+", tag: "G+", fortified: "Multivitamins, Micronutrients", bestFor: "A broad daily multivitamin top-up", color: "#D4AF37" },
    { name: "Vitamin D3", tag: "D3", fortified: "Vit D3, Immunity boosters", bestFor: "Bone strength & immune support", color: "#60a5fa" },
    { name: "Nutri+", tag: "N+", fortified: "Immunity boosters", bestFor: "Everyday nutrition at an accessible price", color: "#34d399" }
  ];

  return (
    <motion.section variants={staggerContainer} initial="initial" whileInView="whileInView" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Compare our organic egg ranges</motion.h2>
          <motion.p variants={fadeUp} className="text-gray-600 text-lg max-w-2xl mx-auto">
            All four ranges start from the same free-range, antibiotic-free farm — the difference is in the fortification.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {ranges.map((range, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/0 to-current opacity-10 rounded-bl-full pointer-events-none" style={{ color: range.color }}></div>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl mb-6 shadow-sm text-white" style={{ backgroundColor: range.color }}>
                {range.tag}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{range.name}</h3>
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Fortified with</p>
                <p className="text-sm font-semibold text-gray-800">{range.fortified}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">Best for</p>
                <p className="text-sm text-gray-600 leading-snug">{range.bestFor}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={fadeUp} className="text-center">
          <Link to="/products" className="inline-flex items-center gap-2 bg-[#D32F2F] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-[#b72424] transition-colors">
            Explore Our Egg Ranges <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function DeliveryTimeline() {
  const steps = [
    { num: "1", title: "Raised with Care", desc: "Hens live in a clean, spacious, pollution-free environment and are fed a nutrient-rich diet daily." },
    { num: "2", title: "Checked for Quality", desc: "Every batch is inspected for shell strength, freshness, and consistency before packing." },
    { num: "3", title: "Packed Fresh", desc: "Packed at the farm to lock in freshness and delivered without prolonged cold storage." },
    { num: "4", title: "Delivered Near You", desc: "Available at stores across 18+ cities, with online delivery and quick commerce options for doorstep delivery." }
  ];

  return (
    <motion.section variants={staggerContainer} initial="initial" whileInView="whileInView" className="py-24 px-6 md:px-12 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D32F2F]/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-serif font-bold mb-16 text-center text-white">How our eggs reach you</motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-gray-700 -z-10"></div>
          
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center relative">
              <div className="w-16 h-16 rounded-full bg-[#D32F2F] flex items-center justify-center text-2xl font-black text-white shadow-[0_0_0_8px_rgba(17,24,39,1)] border border-[#D32F2F] mb-6">
                {step.num}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed px-4">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div variants={fadeUp} className="text-center mt-16">
          <Link to="/products" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
            Explore Our Egg Ranges <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

export function HomePage() {
  const container = useRef(null);
  const { products, categories, loading } = useStoreData();
  const [banners, setBanners] = React.useState([]);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const reviewTrackRef = useRef(null);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

  React.useEffect(() => {
    fetch(`${BACKEND_URL}/general/banners`)
      .then(r => r.json())
      .then(d => { if (d.banners) setBanners(d.banners); })
      .catch(e => console.error(e));

    fetch(`${BACKEND_URL}/general/reviews`)
      .then(r => r.json())
      .then(d => { if (d.reviews) setReviews(d.reviews.filter(r => r.is_active !== false)); })
      .catch(e => console.error(e));
  }, []);

  // Auto-scroll reviews
  React.useEffect(() => {
    const track = reviewTrackRef.current;
    if (!track || reviews.length === 0) return;
    let animFrame;
    let pos = 0;
    const speed = 0.5;
    const step = () => {
      pos += speed;
      const half = track.scrollWidth / 2;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animFrame = requestAnimationFrame(step);
    };
    animFrame = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animFrame);
    const resume = () => { animFrame = requestAnimationFrame(step); };
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('touchstart', pause);
    track.addEventListener('touchend', resume);
    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener('mouseenter', pause);
      track.removeEventListener('mouseleave', resume);
      track.removeEventListener('touchstart', pause);
      track.removeEventListener('touchend', resume);
    };
  }, [reviews]);

  React.useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);
  useGSAP(() => {
    if (!loading) {
      gsap.from('.animate-section', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'all'
      });
      gsap.from('.hero-text-elem', {
        x: -40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', clearProps: 'all', delay: 0.1
      });
      gsap.from('.hero-gfx-elem', {
        scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)', clearProps: 'all', delay: 0.2
      });
    }
  }, { scope: container, dependencies: [loading] });

  const featuredProducts = products.slice(0, 5);

  return (
    <div ref={container} className="bg-brand-beige flex-grow w-full flex flex-col pb-8">
      <Header variant="home" />

      {/* ── CUSTOM EGG HERO SECTION ── */}
      <section className="relative w-full min-h-[600px] bg-white pt-[120px] pb-20 overflow-hidden md:mt-0">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center relative z-10">
          
          {/* LEFT SIDE: Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start pr-0 md:pr-10 z-20 order-2 md:order-1">
            <div className="hero-text-elem bg-gray-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full mb-6 mt-4 md:mt-0">
              Awesome Eggs
            </div>
            
            <h1 className="hero-text-elem text-[40px] md:text-5xl lg:text-6xl font-sans text-gray-900 mb-8 leading-[1.1] tracking-tight">
              Eggs-clusively For You!
            </h1>
            
            <div className="hero-text-elem bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 max-w-lg border border-gray-100 relative">
              <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                Laid with love by healthy hens raised in a clean environment & fed with a nutri-rich vegetarian diet, delivering farm fresh eggs in India with a focus on quality and care.
              </p>
            </div>
            
            <div className="hero-text-elem flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
              <Link to="/store-locator" className="bg-[#F5B041] text-gray-900 font-bold text-[13px] px-8 py-3.5 rounded-full hover:bg-[#e09e33] transition-colors shadow-sm">
                Find a Store Near You
              </Link>
              <Link to="/products" className="bg-white border-2 border-[#F5B041] text-[#F5B041] font-bold text-[13px] px-8 py-3.5 rounded-full hover:bg-[#F5B041]/5 transition-colors">
                Shop Eggs
              </Link>
            </div>
            
            <div className="hero-text-elem flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] md:text-xs font-semibold text-gray-500">
              <span className="flex items-center gap-1.5"><span className="text-[#F5B041] text-lg leading-none">&bull;</span> Antibiotic-Free</span>
              <span className="flex items-center gap-1.5"><span className="text-[#F5B041] text-lg leading-none">&bull;</span> Chemical-Free</span>
              <span className="flex items-center gap-1.5"><span className="text-[#F5B041] text-lg leading-none">&bull;</span> 18+ Cities Across India</span>
            </div>
          </div>
          
          {/* RIGHT SIDE: Graphics */}
          <div className="w-full md:w-1/2 relative h-[450px] md:h-[600px] mb-16 md:mb-0 md:mt-0 flex justify-center md:justify-end order-1 md:order-2">
            {/* Yellow Graphic Shape */}
            <div className="hero-gfx-elem absolute top-[10%] md:top-[5%] right-0 md:right-[15%] w-[85%] md:w-[70%] h-[80%] md:h-[90%] bg-[#F5D020] rounded-tl-[200px] rounded-bl-[40px] z-0 overflow-hidden">
            </div>
            
            {/* Egg Basket Image */}
            <img src="https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?q=80&w=800&auto=format&fit=crop" alt="Farm Fresh Eggs" className="hero-gfx-elem absolute top-[35%] md:top-[45%] left-4 md:left-0 -translate-y-1/2 w-[55%] md:w-[50%] aspect-square rounded-[40px] md:rounded-full object-cover z-10 shadow-[0_20px_50px_rgb(0,0,0,0.15)] border-[6px] border-white" />
            
            {/* White Hen Image */}
            <img src={whiteHenImg} alt="White Hen" className="hero-gfx-elem absolute bottom-[5%] md:bottom-[15%] right-4 md:right-0 w-[45%] md:w-[45%] aspect-square object-cover object-bottom rounded-[30px] md:rounded-[40px] z-20 shadow-[0_20px_50px_rgb(0,0,0,0.15)] border-[6px] border-white bg-white" />
          </div>
        </div>
      </section>

      {/* Content wrapper for rest of page */}
      <div className="md:max-w-full mx-auto w-full pb-20 bg-white relative z-10 pt-16">

        {/* Products Grid */}
        <div className="animate-section px-4 md:px-24 mb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-serif text-xl md:text-2xl text-gray-900">Our Premium Eggs</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* ── Stats Banner (Moved here for mobile) ─────────────────────────────────────── */}
        <StatsBanner />

        <WhyAbhiEggs />
        <UniqueDietChart />
        <CompareEggRanges />
        <DeliveryTimeline />
        
        {/* Customer Reviews — auto-scroll */}
        {reviews.length > 0 && (
          <section className="mb-4 overflow-hidden">
            <div className="px-4 md:px-24 mb-6">
              <h3 className="font-serif font-bold text-2xl text-gray-900">What Our Clients Say</h3>
            </div>

            <div className="overflow-hidden w-full">
              <div
                ref={reviewTrackRef}
                className="flex gap-5 will-change-transform"
                style={{ width: 'max-content' }}
              >
                {/* Duplicate for seamless loop */}
                {[...reviews, ...reviews].map((rev, idx) => (
                  <div key={idx} className="w-[260px] md:w-[300px] p-6 shrink-0 bg-white border border-brand-primary/10 rounded-[20px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[200px]">
                    <div>
                      <div className="flex text-[#FFC107] mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (rev.rating || 5) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <p className="text-gray-700 italic text-sm line-clamp-3">"{rev.comment || 'Great experience with the products and fast delivery!'}"</p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                        {(rev.name || 'G').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{rev.name || 'Guest User'}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">Verified Buyer</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </div>

    </div>
  );
}
