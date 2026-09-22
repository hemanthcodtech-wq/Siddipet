import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, ExternalLink, ArrowRight, CheckCircle2, FileText, Play, Award, Sun, Leaf, ShieldAlert, Search, Heart } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

import heroBg from '../assets/free_range_hero.jpg';
import outdoor1 from '../assets/free_range_outdoor_1.jpg';
import indoor1 from '../assets/free_range_indoor.jpg';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true }
};

const faqs = [
  {
    q: "What are free-range eggs?",
    a: "Free-range eggs are laid by hens that have daily access to outdoor space rather than being kept indoors at all times. SIDDIPET Eggs free-range hens move between open outdoor areas and indoor housing on our certified humane farm."
  },
  {
    q: "What makes Siddipet Poultry free-range eggs organic?",
    a: "Our hens are fed a 100% natural, vegetarian diet that is free from synthetic pesticides and fertilizers. Our entire farming process is built around sustainable, organic principles to ensure the highest quality produce."
  },
  {
    q: "Are Siddipet Poultry free-range eggs farm made?",
    a: "Yes, absolutely. We manage the entire lifecycle from farm to table. The eggs are laid, collected, and graded directly at our own state-of-the-art facility."
  },
  {
    q: "How is this different from regular eggs?",
    a: "Regular eggs often come from caged or highly confined environments. Free-range hens have space to roam, forage, and express natural behaviors, leading to better welfare and often richer, tastier eggs."
  },
  {
    q: "Where can I buy these organic free-range eggs?",
    a: "Our free-range eggs are available across multiple cities and directly through our online store. Check our store locator or contact our sales team for bulk inquiries."
  },
  {
    q: "Are these eggs raised without antibiotics?",
    a: "Yes. Our free-range eggs come from hens raised entirely without antibiotics, verified by independent laboratory reports available on this page."
  }
];

export function FreeRangeEggsPage() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-gray-900 overflow-x-hidden">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-start pt-10">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Premium Brown Hen" className="w-full h-full object-cover object-[70%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div 
            initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
            className="max-w-2xl flex flex-col items-start"
          >
            <motion.div 
              variants={{ initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="inline-flex items-center gap-2 bg-[#2E7D32]/90 backdrop-blur-sm text-white px-3 py-1 rounded uppercase tracking-widest text-[10px] font-bold mb-4 -ml-3"
            >
              SIDDIPET POULTRY EGGS • FREE-RANGE
            </motion.div>
            
            <motion.h1 
              variants={{ initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-[1.15] mb-5"
            >
              Different Methods.<br />
              <span className="text-[#F5B041]">The Same Quality,</span><br />
              Every Time.
            </motion.h1>
            
            <motion.p 
              variants={{ initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="text-[10px] text-white/80 uppercase tracking-[0.2em] font-bold mb-4"
            >
              CERTIFIED HUMANE • FARM TO TABLE
            </motion.p>

            <motion.p 
              variants={{ initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              className="text-sm text-gray-200 leading-[1.6] mb-6 max-w-lg"
            >
              Today, people look at more than just the final product — they also consider how it comes together. Free-range is one of the approaches within this broader understanding, where systems include both indoor and outdoor conditions as part of a structured process.
            </motion.p>

            <motion.button 
              variants={{ initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
              onClick={() => document.getElementById('about-approach').scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-[#F5B041] text-[#08183A] font-bold text-sm px-6 py-3 hover:bg-[#e09e33] transition-colors w-fit"
            >
              Explore Free-Range
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR APPROACH TEXT SECTION */}
      <section id="about-approach" className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 variants={fadeIn} initial="initial" whileInView="whileInView" className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Our Approach</motion.h2>
          <motion.h3 variants={fadeIn} initial="initial" whileInView="whileInView" className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-10">
            Indoor and outdoor. One standard.
          </motion.h3>
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="space-y-6 text-lg text-gray-600 leading-relaxed text-justify md:text-center">
            <p>
              At Siddipet Poultry, we've been expanding our range to offer more relevant choices. As we continue our journey towards becoming a more customer-centric brand, we ensure that while methods may differ, the quality standards remain the same.
            </p>
            <p>
              Free-range is an approach where systems are designed to include both indoor and outdoor conditions as part of a structured process. Hens have access to the outdoors, and every aspect of their care — from feed to environment — follows the same standards we apply across our entire range.
            </p>
            <p>
              We serve different needs responsibly, with transparency guiding every step. From our farms to your table, every stage follows aligned processes, so you know exactly where your eggs come from — certified humane farms — and what goes into them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT SETS THEM APART */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={staggerContainer} initial="initial" whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { num: '01', icon: Award, title: 'Certified Humane Standards', desc: 'Our farm and packaging unit are certified by Certified Humane, meeting strict, independently audited standards for how hens are housed, fed, and cared for.' },
              { num: '02', icon: Sun, title: 'Outdoor Access, Every Day', desc: 'Hens raised for our free range eggs move freely between outdoor space and indoor housing as part of their daily routine, not just occasionally.' },
              { num: '03', icon: Leaf, title: 'Natural, Vegetarian Feed', desc: 'Feed is nutrient-rich, fully vegetarian, and produced through our own farming system, so we can trace what goes into every egg.' },
              { num: '04', icon: ShieldAlert, title: 'No Antibiotics', desc: 'Our free-range eggs come from hens raised without antibiotics. Independent lab reports confirming this are available on this page.' },
              { num: '05', icon: Search, title: 'Full Farm to Table Traceability', desc: 'Every stage, from farm to your table, follows the same aligned process, with open visibility into how and where your eggs are produced.' },
              { num: '06', icon: Heart, title: 'Built for Welfare Conscious Buyers', desc: 'Free range is one of the ways we serve customers who consider hen welfare an important factor when choosing organic free range eggs.' }
            ].map((item, idx) => (
              <motion.div key={idx} variants={fadeIn} className="bg-white p-8 lg:p-10 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col">
                <div className="relative inline-flex items-center mb-6 w-fit">
                  {/* Huge Dark Number */}
                  <span className="text-[72px] leading-none font-black text-[#08183A] tracking-tighter">
                    {item.num}
                  </span>
                  {/* Icon perfectly centered with a small white cutout so it doesn't merge with the dark '0' */}
                  <div className="absolute left-[16px] top-[50%] -translate-y-1/2 w-[22px] h-[22px] bg-white rounded-full flex items-center justify-center text-[#08183A]">
                    <item.icon className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                </div>
                <h4 className="text-[19px] font-bold text-[#08183A] mb-3">{item.title}</h4>
                <p className="text-gray-600 text-[15px] leading-[1.7]">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. GALLERY & VIDEO */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Our Farm</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">Life at our Free-Range Farm</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="h-[400px] overflow-hidden group">
              <img src={outdoor1} alt="Outdoor Free Range" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="h-[400px] overflow-hidden group">
              <img src={indoor1} alt="Indoor Housing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </div>

          {/* YouTube Video Section */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">See It Yourself</h2>
              <h3 className="text-3xl font-serif font-bold text-gray-900">Inside our Free-Range Farms</h3>
            </div>
            
            <motion.div 
              variants={fadeIn} initial="initial" whileInView="whileInView"
              className="w-full max-w-4xl mx-auto aspect-video bg-gray-900 relative shadow-2xl overflow-hidden group cursor-pointer"
            >
              <img src={outdoor1} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-16 h-16 bg-[#D32F2F] rounded-full flex items-center justify-center text-white pl-1 shadow-lg">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. CERTIFICATIONS & PRODUCTION */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#FAF9F6] border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Verified & Audited</h2>
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8">Our Certifications</h3>
            
            <div className="space-y-4">
              {[
                "Certified Humane Certificate", 
                "No Antibiotics Report 1", 
                "No Antibiotics Report 2", 
                "Nutri Info Report 1", 
                "Nutri Info Report 2"
              ].map((cert, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-bold text-gray-900">{cert}</span>
                  <a href="#" className="flex items-center gap-2 text-sm text-[#D32F2F] font-semibold hover:underline">
                    <FileText className="w-4 h-4" /> View Report
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <h3 className="text-3xl font-serif font-bold text-gray-900 mb-10">How We Produce Our Organic Free-Range Eggs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
              {[
                { title: "Raised on open, pollution free land", desc: "Our 20 acre farm gives hens daily outdoor access alongside clean indoor housing." },
                { title: "Eggs are collected and graded on site", desc: "Every egg is farm made, collected, and graded at our own facility, not outsourced." },
                { title: "Feed is sourced and managed on farm", desc: "Hens are fed a natural, vegetarian, antibiotic free diet through our own farming system." },
                { title: "Eggs are packed with full traceability", desc: "Packaging follows Certified Humane standards, so each pack can be traced back to the farm." },
                { title: "Health is monitored without antibiotics", desc: "Independent lab reports verify that no antibiotics are used at any stage." },
                { title: "Eggs reach you through our verified store network", desc: "From farm to table, the process stays consistent across every city we serve." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle2 className="w-5 h-5 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Link to="/category/all" className="inline-flex items-center gap-2 text-[#D32F2F] font-bold mt-12 hover:underline">
              Explore Our Egg Ranges <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-serif font-bold text-gray-900">Frequently Asked Questions</h3>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden bg-[#FAF9F6]">
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-lg text-gray-900 pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-500 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#08183A] text-center text-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6">Get Farm Made Free-Range Eggs Near You</h3>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            Siddipet Poultry organic free-range eggs are available across multiple cities. Find your nearest store or reach out directly for bulk orders.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#F5B041] text-[#08183A] font-bold px-8 py-4 hover:bg-[#e09e33] transition-colors">
            <MapPin className="w-5 h-5" />
            Find a Store
          </Link>
        </div>
      </section>


    </div>
  );
}
