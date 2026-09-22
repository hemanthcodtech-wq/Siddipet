import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send, Plus, Minus, ArrowRight } from 'lucide-react';
import contactImage from '../assets/splash_bg_clean_eggs.jpg';

const WHATSAPP_NUMBER = '919505483786';

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
