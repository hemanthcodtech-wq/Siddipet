import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send, Plus, Minus, ArrowRight } from 'lucide-react';
import contactImage from '../assets/splash_bg_clean_eggs.jpg';

const WHATSAPP_NUMBER = '919505483786';


/* ─── Enhanced India Map ─────────────────────────────────────────────────────
   Uses accurate India SVG outline. Siddipet = origin beacon.
   Curved bezier delivery routes, animated dash, glow effects.
────────────────────────────────────────────────────────────────────────────── */

// Siddipet, Telangana — accurate projected SVG position
const ORIGIN = { x: 191, y: 329 };

// Cities with accurate geographic SVG positions + delivery metadata
const CITIES = [
  { x: 185, y: 340, label: 'Hyderabad',     state: 'Telangana',      time: 'Same Day',  color: '#34D399' },
  { x: 202, y: 331, label: 'Warangal',      state: 'Telangana',      time: 'Same Day',  color: '#34D399' },
  { x: 172, y: 409, label: 'Bengaluru',     state: 'Karnataka',      time: '1 Day',     color: '#60A5FA' },
  { x: 212, y: 408, label: 'Chennai',       state: 'Tamil Nadu',     time: '1 Day',     color: '#60A5FA' },
  { x: 116, y: 322, label: 'Pune',          state: 'Maharashtra',    time: '2 Days',    color: '#F59E0B' },
  { x: 101, y: 314, label: 'Mumbai',        state: 'Maharashtra',    time: '2 Days',    color: '#F59E0B' },
  { x: 96,  y: 250, label: 'Ahmedabad',     state: 'Gujarat',        time: '2 Days',    color: '#F59E0B' },
  { x: 164, y: 155, label: 'Delhi',         state: 'NCR',            time: '2 Days',    color: '#F472B6' },
  { x: 256, y: 336, label: 'Visakhapatnam', state: 'Andhra Pradesh', time: 'Next Day',  color: '#60A5FA' },
  { x: 334, y: 257, label: 'Kolkata',       state: 'West Bengal',    time: '3 Days',    color: '#C084FC' },
  { x: 285, y: 207, label: 'Patna',         state: 'Bihar',          time: '2 Days',    color: '#C084FC' },
  { x: 120, y: 373, label: 'Goa',           state: 'Goa',            time: '2 Days',    color: '#F59E0B' },
  { x: 222, y: 186, label: 'Lucknow',       state: 'Uttar Pradesh',  time: '2 Days',    color: '#F472B6' },
  { x: 145, y: 185, label: 'Jaipur',        state: 'Rajasthan',      time: '2 Days',    color: '#F472B6' },
];

const MAP_STYLES = `
  @keyframes routeDraw {
    from { stroke-dashoffset: 600; opacity: 0; }
    to   { stroke-dashoffset: 0;   opacity: 1; }
  }
  @keyframes cityPulse {
    0%,100% { opacity: 0.85; transform: scale(1); }
    50%      { opacity: 0.4;  transform: scale(1.6); }
  }
  @keyframes originBeacon {
    0%,100% { r: 18; opacity: 0.25; }
    50%      { r: 30; opacity: 0.07; }
  }
  @keyframes originBeacon2 {
    0%,100% { r: 10; opacity: 0.5; }
    50%      { r: 20; opacity: 0.15; }
  }
  @keyframes flowDot {
    0%   { opacity: 0; offset-distance: 0%;   }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { opacity: 0; offset-distance: 100%; }
  }
  @keyframes shimmer {
    0%   { stop-color: rgba(251,191,36,0.0); }
    50%  { stop-color: rgba(251,191,36,0.6); }
    100% { stop-color: rgba(251,191,36,0.0); }
  }
  .route-path { animation: routeDraw 2s ease forwards; stroke-dasharray: 600; }
  .city-outer { animation: cityPulse 2.8s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }
  .origin-ring1 { animation: originBeacon  2.2s ease-in-out infinite; }
  .origin-ring2 { animation: originBeacon2 2.2s ease-in-out infinite 0.4s; }
`;

// Generate a curved quadratic bezier path between two points
function curvePath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2 + (y2 - y1) * 0.25;
  const my = (y1 + y2) / 2 - (x2 - x1) * 0.25;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

function IndiaMap() {
  const [hovered, setHovered] = useState(null);

  // Mathematically accurate India SVG path generated via d3-geo
  const INDIA_PATH = `M175.445,34.035L191.626,55.553L190.103,70.352L196.092,79.565L195.599,88.705L184.794,86.304L189.016,105.887L203.807,117.032L224.732,129.254L215.179,137.136L209.333,153.279L223.918,159.768L238.112,168.146L257.748,177.68L278.385,179.876L287.068,188.47L298.7,190.074L316.813,193.996L329.35,193.715L331.075,187.05L329.093,176.301L330.256,168.98L339.438,165.394L340.702,178.785L341.024,182.176L354.707,188.585L364.173,185.948L376.883,187.08L389.168,186.579L390.225,176.186L384.097,170.764L396.238,168.634L409.942,155.92L427.295,144.963L439.923,149.199L450.656,141.933L457.715,152.652L452.63,159.854L468.864,162.41L470,168.878L464.722,172L465.957,182.433L455.198,179.373L435.708,191.041L436.165,200.65L427.856,214.652L427.094,222.74L420.381,236.356L408.615,232.603L408.03,249.601L404.627,255.165L406.22,262.085L398.792,265.941L390.862,240.028L386.705,240.079L384.245,250.556L376.002,242.064L380.65,232.7L387.385,231.747L394.328,217.74L385.647,214.902L371.685,215.149L357.359,212.867L356.031,201.257L348.844,200.431L336.92,193.178L331.602,204.553L342.468,213.384L333.056,219.576L329.714,225.614L338.981,230.043L336.419,239.968L341.636,252.29L343.98,265.706L341.824,271.629L331.582,271.425L313.022,274.787L313.887,286.928L305.851,296.435L284.185,307.205L267.335,325.927L256.016,335.912L241.015,346.236L240.992,353.47L233.486,357.338L219.926,362.952L212.894,363.779L208.38,375.697L211.514,395.922L212.312,408.761L205.933,423.413L205.864,449.489L198.073,450.23L191.221,461.888L195.803,466.917L182.076,471.239L177.006,481.594L170.965,485.965L156.709,471.754L149.74,450.371L143.965,434.912L138.69,427.644L130.691,412.843L126.956,393.49L124.354,383.785L110.659,362.347L104.421,331.843L99.92,311.519L99.974,292.135L97.054,277.044L75.145,286.7L64.534,284.769L44.867,265.16L52.105,259.279L47.659,252.878L30,238.968L40.026,227.971L73.157,228.014L70.168,213.776L61.71,205.32L59.994,192.416L50.14,184.847L66.732,167.06L84.214,168.356L99.963,150.406L109.401,132.857L124.015,115.328L123.783,102.763L136.62,92.496L124.47,83.68L119.242,71.52L113.907,55.63L121.288,47.75L144.124,52.213L160.906,49.496Z`;

  // Sri Lanka (removed for this map as the projection doesn't include it perfectly)
  const SRI_LANKA = ``;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: 520 }}>
      <style>{MAP_STYLES}</style>

      {/* Outer glow halo behind the map */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '70%', height: '70%', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <svg viewBox="0 0 500 520" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
        <defs>
          {/* Gradient for map fill */}
          <linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
          {/* Gradient for origin glow */}
          <radialGradient id="originGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(251,191,36,0.5)" />
            <stop offset="100%" stopColor="rgba(251,191,36,0)" />
          </radialGradient>
          {/* Clipping mask to keep routes inside map */}
          <clipPath id="indiaClip">
            <path d={INDIA_PATH} />
          </clipPath>
          {/* Route gradient */}
          {CITIES.map((c, i) => (
            <linearGradient key={`rg-${i}`} id={`rg${i}`}
              x1={ORIGIN.x} y1={ORIGIN.y} x2={c.x} y2={c.y}
              gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#F59E0B" stopOpacity="0.9" />
              <stop offset="100%" stopColor={c.color} stopOpacity="0.7" />
            </linearGradient>
          ))}
        </defs>

        {/* ── Grid dots (subtle) ── */}
        {Array.from({ length: 12 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle key={`g-${r}-${c}`}
              cx={80 + c * 35} cy={30 + r * 42} r="1"
              fill="rgba(255,255,255,0.06)" />
          ))
        )}

        {/* ── India Map Body ── */}
        <path d={INDIA_PATH}
          fill="url(#mapFill)"
          stroke="rgba(251,191,36,0.5)"
          strokeWidth="1.8"
          strokeLinejoin="round"
          filter="drop-shadow(0 0 12px rgba(251,191,36,0.2))"
        />

        {/* ── Sri Lanka ── */}
        <path d={SRI_LANKA}
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(251,191,36,0.35)"
          strokeWidth="1.2"
        />

        {/* ── Subtle Telangana region highlight ── */}
        <ellipse cx={ORIGIN.x} cy={ORIGIN.y} rx="40" ry="30"
          fill="rgba(251,191,36,0.06)"
          stroke="rgba(251,191,36,0.18)" strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* ── Delivery curved routes ── */}
        {CITIES.map((city, i) => (
          <g key={`route-${i}`}>
            {/* Glow layer */}
            <path
              d={curvePath(ORIGIN.x, ORIGIN.y, city.x, city.y)}
              fill="none"
              stroke={city.color}
              strokeWidth="3"
              strokeOpacity="0.12"
              className="route-path"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            />
            {/* Main route line */}
            <path
              d={curvePath(ORIGIN.x, ORIGIN.y, city.x, city.y)}
              fill="none"
              stroke={`url(#rg${i})`}
              strokeWidth={hovered === i ? 2.0 : 1.2}
              strokeDasharray="7 5"
              strokeLinecap="round"
              className="route-path"
              style={{
                animationDelay: `${0.3 + i * 0.1}s`,
                transition: 'stroke-width 0.25s',
                opacity: hovered !== null && hovered !== i ? 0.25 : 1,
              }}
            />
          </g>
        ))}

        {/* ── City dots ── */}
        {CITIES.map((city, i) => (
          <g key={city.label}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Outer pulse ring */}
            <circle cx={city.x} cy={city.y}
              r={hovered === i ? 12 : 8}
              fill={city.color}
              opacity={hovered === i ? 0.2 : 0.12}
              className="city-outer"
              style={{ animationDelay: `${i * 0.2}s`, transition: 'r 0.25s, opacity 0.25s' }}
            />
            {/* Main dot */}
            <circle cx={city.x} cy={city.y}
              r={hovered === i ? 6 : 4.5}
              fill={hovered === i ? city.color : 'rgba(255,255,255,0.7)'}
              stroke={city.color}
              strokeWidth="1.5"
              style={{ transition: 'r 0.2s, fill 0.2s' }}
            />
            {/* City label — always show for major cities */}
            {(hovered === i || ['Delhi','Mumbai','Kolkata','Chennai','Bengaluru','Hyderabad'].includes(city.label)) && (
              <text
                x={city.x + (city.x > ORIGIN.x ? 9 : -9)}
                y={city.y + 4}
                textAnchor={city.x > ORIGIN.x ? 'start' : 'end'}
                fill={hovered === i ? city.color : 'rgba(255,255,255,0.75)'}
                fontSize={hovered === i ? '11' : '9.5'}
                fontWeight={hovered === i ? '700' : '500'}
                fontFamily="Inter, sans-serif"
                style={{ transition: 'all 0.2s', pointerEvents: 'none' }}
              >
                {city.label}
              </text>
            )}
            {/* Hover tooltip */}
            {hovered === i && (
              <g>
                <rect
                  x={city.x + (city.x > 260 ? -110 : 12)}
                  y={city.y - 36}
                  width="100" height="30"
                  rx="8"
                  fill="rgba(10,12,30,0.95)"
                  stroke={city.color}
                  strokeWidth="1"
                />
                <text
                  x={city.x + (city.x > 260 ? -60 : 62)}
                  y={city.y - 21}
                  textAnchor="middle"
                  fill="white" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif"
                >{city.label}</text>
                <text
                  x={city.x + (city.x > 260 ? -60 : 62)}
                  y={city.y - 10}
                  textAnchor="middle"
                  fill={city.color} fontSize="8.5" fontFamily="Inter, sans-serif"
                >🚚 {city.time}</text>
              </g>
            )}
          </g>
        ))}

        {/* ── SIDDIPET ORIGIN BEACON ── */}
        {/* Outer rings */}
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="22"
          fill="url(#originGlow)" stroke="none"
          className="origin-ring1" />
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="14"
          fill="rgba(251,191,36,0.2)" stroke="rgba(251,191,36,0.4)" strokeWidth="1"
          className="origin-ring2" />
        {/* Core */}
        <circle cx={ORIGIN.x} cy={ORIGIN.y} r="8"
          fill="#F59E0B" stroke="#FDE68A" strokeWidth="2.5"
          filter="drop-shadow(0 0 8px rgba(251,191,36,0.8))"
        />
        {/* Star */}
        <text x={ORIGIN.x} y={ORIGIN.y + 3.5}
          textAnchor="middle" fill="#1a1a2e"
          fontSize="9" fontWeight="900" fontFamily="sans-serif">★</text>

        {/* Origin label badge */}
        <g>
          <rect x={ORIGIN.x - 44} y={ORIGIN.y + 16} width={88} height={30}
            rx="8"
            fill="#F59E0B"
            filter="drop-shadow(0 4px 10px rgba(251,191,36,0.4))"
          />
          <text x={ORIGIN.x} y={ORIGIN.y + 28}
            textAnchor="middle" fill="#1a1a2e"
            fontSize="9.5" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="0.08em">
            SIDDIPET
          </text>
          <text x={ORIGIN.x} y={ORIGIN.y + 39}
            textAnchor="middle" fill="rgba(0,0,0,0.65)"
            fontSize="7.5" fontFamily="Inter, sans-serif">
            Farm Origin · Telangana
          </text>
        </g>

        {/* ── Legend ── */}
        <g transform="translate(18, 440)">
          {[
            { color: '#34D399', label: 'Same / Next Day' },
            { color: '#60A5FA', label: '1 Day' },
            { color: '#F59E0B', label: '2 Days' },
            { color: '#C084FC', label: '3 Days' },
          ].map((l, i) => (
            <g key={l.label} transform={`translate(${i * 112}, 0)`}>
              <circle cx="6" cy="6" r="5" fill={l.color} opacity="0.85" />
              <text x="15" y="10" fill="rgba(255,255,255,0.65)"
                fontSize="9" fontFamily="Inter, sans-serif">{l.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;
    if (!form.subject.trim()) newErrors.subject = true;
    if (!form.message.trim()) newErrors.message = true;
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    const text = `*New Inquiry via Website*%0A%0A*Name:* ${encodeURIComponent(form.name)}%0A*Email:* ${encodeURIComponent(form.email || 'Not provided')}%0A*Subject:* ${encodeURIComponent(form.subject)}%0A%0A*Message:*%0A${encodeURIComponent(form.message)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    setIsSent(true);
  };

  const inputStyles = (field) => 
    `w-full bg-transparent border-b-2 py-4 outline-none transition-all duration-300 text-gray-900 placeholder:text-gray-400 font-medium ${
      errors[field] 
        ? 'border-red-400 focus:border-red-600' 
        : 'border-gray-200 focus:border-brand-primary'
    }`;

  if (isSent) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex flex-col items-center justify-center text-center py-20"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <Send className="w-8 h-8 text-green-600 ml-1" />
        </div>
        <h3 className="text-3xl font-serif font-medium text-gray-900 mb-4">Request Initiated</h3>
        <p className="text-gray-500 text-lg mb-8 max-w-sm">Please complete the process in WhatsApp to send your message directly to our team.</p>
        <button 
          onClick={() => { setIsSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
          className="text-brand-primary font-bold hover:text-red-700 transition-colors uppercase tracking-widest text-sm"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name <span className="text-red-500">*</span></label>
          <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputStyles('name')} placeholder="Your Name" />
        </div>
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
          <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputStyles('email')} placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Subject <span className="text-red-500">*</span></label>
        <input type="text" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className={inputStyles('subject')} placeholder="How can we help?" />
      </div>
      <div>
        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Message <span className="text-red-500">*</span></label>
        <textarea rows="4" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={`${inputStyles('message')} resize-none`} placeholder="Tell us about your requirements..." />
      </div>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto px-10 h-14 bg-gray-900 hover:bg-brand-primary text-white font-bold rounded-full flex items-center justify-center gap-3 transition-colors text-sm uppercase tracking-widest mt-8"
      >
        <span>Send Message</span>
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </form>
  );
}

const faqs = [
  { q: 'Do you offer bulk delivery for corporate clients?', a: 'Yes. We provide reliable bulk egg delivery and packaging services tailored for corporate companies, supermarkets, and institutional buyers. We ensure timely delivery and consistent supply chains.' },
  { q: 'Are your eggs sourced from healthy poultry farms?', a: 'Absolutely. We ensure strict quality control and source fresh, high-quality eggs from well-maintained poultry farms that adhere to strict hygiene and health standards.' },
  { q: 'Do you supply to hotels and restaurants?', a: 'Yes, we are a trusted supplier for many hotels, restaurants, and food-service companies seeking consistent quality and competitive pricing for their daily culinary needs.' },
  { q: 'Can I request professional egg packaging services?', a: 'Yes, alongside bulk supply, we offer professional egg packing and packaging services to meet retail and distributor requirements, ensuring safe transport and shelf-ready presentation.' },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200">
      {faqs.map((faq, i) => (
        <div key={i} className="py-6">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-start justify-between text-left focus:outline-none group"
          >
            <span className={`text-lg md:text-xl font-serif font-medium pr-8 transition-colors ${openIndex === i ? 'text-brand-primary' : 'text-gray-900 group-hover:text-brand-primary'}`}>
              {faq.q}
            </span>
            <span className="shrink-0 mt-1 text-gray-400 group-hover:text-brand-primary transition-colors">
              {openIndex === i ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
            </span>
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="pt-4 text-gray-500 text-base md:text-lg leading-relaxed pr-12">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export function ContactPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#faq-section') {
      setTimeout(() => {
        const el = document.getElementById('faq-section');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
    }
  }, [hash]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-sans selection:bg-[#D32F2F] selection:text-white">
      <Header title="Contact Us" />

      {/* Hero Section - Clean & Minimal */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={fadeUp} initial="initial" animate="animate" className="max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-brand-primary uppercase tracking-[0.2em] mb-6">Get In Touch</h2>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-gray-900 mb-8 leading-tight">
              Let's build a lasting partnership.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
              Whether you need bulk supply, custom packaging, or wholesale distribution, our team is ready to provide exceptional service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Split Layout - Image & Form */}
      <section className="px-6 pb-24 md:pb-32 relative" id="contact-form">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white/60 backdrop-blur-3xl rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row border border-white p-2 md:p-4 gap-4">
            
            {/* Left side: Premium Image & Info */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-5/12 relative min-h-[550px] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden"
            >
              <img src={contactImage} alt="Fresh Eggs" className="absolute inset-0 w-full h-full object-cover" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end text-white">
                <div className="p-4 md:p-8">
                  <h3 className="text-3xl font-serif font-medium mb-8 text-white drop-shadow-md">Direct Contact</h3>
                  
                  <div className="space-y-8">
                    <a href="https://wa.me/919505483786" target="_blank" rel="noopener noreferrer" className="flex items-start gap-5 hover:bg-white/10 p-2 -ml-2 rounded-2xl transition-colors group">
                      <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-brand-primary transition-colors">
                        <Phone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] text-white/80 uppercase tracking-widest font-bold mb-1.5">CALL US</p>
                        <p className="text-xl font-medium tracking-wide">+91 9505483786</p>
                      </div>
                    </a>
                    
                    <a href="mailto:siddipetpoultryeggs12@gmail.com" className="flex items-start gap-5 hover:bg-white/10 p-2 -ml-2 rounded-2xl transition-colors group">
                      <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white/10 group-hover:bg-brand-primary transition-colors">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] text-white/80 uppercase tracking-widest font-bold mb-1.5">EMAIL</p>
                        <p className="text-lg font-medium tracking-wide">siddipetpoultryeggs12@gmail.com</p>
                      </div>
                    </a>

                    <div className="flex items-start gap-5 p-2 -ml-2 group">
                      <div className="w-12 h-12 shrink-0 rounded-full flex items-center justify-center bg-white/10">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-[13px] text-white/80 uppercase tracking-widest font-bold mb-1.5">LOCATION</p>
                        <p className="text-base leading-[1.8] font-medium max-w-[220px]">
                          SYNO.1927 PLOT NO. 338<br/>
                          RAGHAVENDRA NAGAR<br/>
                          BURUGUPALLY SIDDIPET<br/>
                          TELANGANA 502103
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Clean Form */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:w-7/12 p-8 md:p-12 lg:p-20 bg-transparent flex flex-col justify-center"
            >
              <div className="max-w-xl mx-auto w-full">
                <div className="inline-block py-1.5 px-4 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-xs uppercase tracking-widest mb-6">We Reply Fast</div>
                <h3 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-4">Send an Inquiry</h3>
                <p className="text-gray-500 text-lg mb-12">Fill out the form below and we'll get back to you directly via WhatsApp.</p>
                <ContactForm />
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── INDIA COVERAGE MAP SECTION ──────────────────────────────── */}
      <section className="py-24 px-6 overflow-hidden" style={{ background: 'linear-gradient(160deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-amber-400 mb-4">Pan-India Delivery Network</span>
            <h2 className="text-4xl md:text-6xl font-serif font-medium text-white mb-5 leading-tight">
              Farm to Every Corner<br/>
              <span className="text-amber-400">of India</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto font-light">
              From our farm in Siddipet, Telangana — delivering fresh eggs to homes, hotels & businesses across the nation.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

            {/* India SVG Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="w-full lg:w-3/5 relative flex justify-center"
            >
              <IndiaMap />
            </motion.div>

            {/* City List & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full lg:w-2/5 space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { city: 'Hyderabad', state: 'Telangana', time: 'Same Day' },
                  { city: 'Mumbai', state: 'Maharashtra', time: '2 Days' },
                  { city: 'Delhi', state: 'NCR', time: '2 Days' },
                  { city: 'Bengaluru', state: 'Karnataka', time: '1 Day' },
                  { city: 'Chennai', state: 'Tamil Nadu', time: '1 Day' },
                  { city: 'Kolkata', state: 'West Bengal', time: '3 Days' },
                  { city: 'Pune', state: 'Maharashtra', time: '2 Days' },
                  { city: 'Ahmedabad', state: 'Gujarat', time: '2 Days' },
                  { city: 'Visakhapatnam', state: 'Andhra Pradesh', time: 'Next Day' },
                  { city: 'Warangal', state: 'Telangana', time: 'Same Day' },
                ].map((item, i) => (
                  <motion.div
                    key={item.city}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                    className="group relative rounded-2xl p-4 border border-white/10 hover:border-amber-400/50 transition-all duration-300 cursor-default"
                    style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-white font-semibold text-sm">{item.city}</span>
                    </div>
                    <p className="text-white/40 text-xs">{item.state}</p>
                    <span className="absolute top-3 right-3 text-[10px] font-bold text-amber-400/80 uppercase tracking-wide">{item.time}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { val: '15+', label: 'Cities Served' },
                  { val: '10K+', label: 'Eggs Daily' },
                  { val: '100%', label: 'Farm Fresh' },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="text-center rounded-2xl p-4 border border-white/10"
                    style={{ background: 'rgba(251,191,36,0.08)' }}
                  >
                    <div className="text-2xl font-bold text-amber-400">{s.val}</div>
                    <div className="text-white/50 text-xs mt-1">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Minimalist */}

      <section id="faq-section" className="py-24 px-6 bg-[#FAF9F6] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-4"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-gray-900 mb-6">Frequently <br/>Asked Questions</h2>
              <p className="text-lg text-gray-500 font-light">
                Find quick answers to common queries regarding our services and supply chain.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:col-span-8"
            >
              <FaqSection />
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
