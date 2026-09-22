import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, ShieldCheck, MapPin, Phone, ArrowRight, Building2, TrendingUp, Handshake, Check } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import heroImage from '../assets/hero_poultry.jpg';
import logo from '../assets/logo.png';
import farmQualityImage from '../assets/about_farm_quality.jpg';
import eggPackagingImage from '../assets/about_egg_packaging.jpg';
import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-gray-900 overflow-hidden">
      <Header title="About Us" />

      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Beautiful Poultry Farm at Sunset" 
            className="w-full h-full object-cover object-center"
          />
          {/* Elegant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-full p-2 shadow-xl">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <p className="text-brand-secondary font-bold tracking-widest uppercase text-sm">Siddipet Poultry Eggs</p>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Premium Egg Supply & Packaging
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 border-l-4 border-brand-primary pl-4">
              We are a leading provider of high-quality bulk eggs and professional packaging services, dedicated to supporting corporate businesses, hotels, and institutional buyers with reliable, daily supply.
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:bg-red-700 transition-all"
            >
              Partner With Us
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 2. OUR CORE SERVICES (Animated Cards) */}
      <section className="py-20 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <motion.div 
          variants={fadeIn}
          initial="initial"
          whileInView="whileInView"
          className="text-center mb-16"
        >
          <h2 className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">What We Do</h2>
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Core Services</h3>
          <div className="w-24 h-1 bg-brand-secondary mx-auto rounded-full"></div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-red-50 text-brand-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
              <Building2 className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Bulk Egg Supply</h4>
            <p className="text-gray-600 leading-relaxed">
              Consistent, large-volume supply of fresh eggs tailored for corporate companies, supermarkets, hotels, and restaurants. We ensure you never run out of inventory.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-yellow-50 text-brand-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-secondary group-hover:text-white transition-colors duration-300">
              <Package className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Professional Packaging</h4>
            <p className="text-gray-600 leading-relaxed">
              Safe and secure transit is our priority. We provide custom, high-quality packaging solutions to ensure minimal breakage and maximum freshness during transport.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={fadeIn} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:-translate-y-2 transition-transform duration-300 group">
            <div className="w-14 h-14 bg-gray-50 text-gray-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-800 group-hover:text-white transition-colors duration-300">
              <Handshake className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">Wholesale Distribution</h4>
            <p className="text-gray-600 leading-relaxed">
              We build long-term corporate partnerships based on trust, reliable supply chains, and highly competitive pricing for institutional buyers and distributors.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. HOW WE WORK (Timeline with Images) */}
      <section className="py-20 md:py-32 bg-white px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-sm font-bold text-brand-secondary uppercase tracking-widest mb-2">Our Process</h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              From Farm to Your Corporate Shelf.
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
              The everyday details are where our promise lives. We manage the entire supply chain with rigorous quality control to ensure you receive the best product, every single time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20 md:mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 space-y-6"
            >
              <div className="inline-block p-4 bg-brand-primary/10 rounded-2xl mb-2">
                <ShieldCheck className="w-8 h-8 text-brand-primary" />
              </div>
              <h4 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">1. Quality Sourcing & Care</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                We partner exclusively with reliable, healthy poultry farms. Our state-of-the-art, hygienic farming environments are rigorously monitored to source fresh, high-quality eggs daily, ensuring the highest standards of animal welfare and product safety.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                  <p className="text-gray-700 text-base"><strong>Advanced Climate Control:</strong> Constant monitoring of temperature and humidity for optimal hen health.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                  <p className="text-gray-700 text-base"><strong>Nutritional Excellence:</strong> Premium, balanced feed programs designed to maximize egg quality and yolk richness.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                  <p className="text-gray-700 text-base"><strong>Daily Health Inspections:</strong> Veterinary experts routinely check flocks to guarantee disease-free produce.</p>
                </li>
              </ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img src={farmQualityImage} alt="Clean Poultry Farm" className="w-full h-[300px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-brand-secondary/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                <img src={eggPackagingImage} alt="Premium Egg Packaging" className="w-full h-[300px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block p-4 bg-brand-secondary/10 rounded-2xl mb-2">
                <Package className="w-8 h-8 text-brand-secondary" />
              </div>
              <h4 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">2. Professional Packaging</h4>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our team ensures safe, secure, and professional packaging tailored to your specific bulk order needs. From high-quality cardboard cartons to robust wholesale crates, we present your eggs perfectly while preventing breakage during transit.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                  <p className="text-gray-700 text-base"><strong>Eco-Friendly Materials:</strong> We utilize sustainable, biodegradable cartons that protect both the product and the planet.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                  <p className="text-gray-700 text-base"><strong>Shock-Absorbent Design:</strong> Specialized crate structures drastically minimize transit shock and breakage.</p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4" /></div>
                  <p className="text-gray-700 text-base"><strong>Custom Labeling:</strong> Corporate branding and custom label applications available for wholesale partners.</p>
                </li>
              </ul>
            </motion.div>
          </div>

        </div>
      </section>

      {/* 4. PREMIUM CTA SECTION */}
      <section className="py-20 px-6 md:px-12 lg:px-20 mb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden relative shadow-2xl"
        >
          {/* Abstract background shapes */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-brand-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20 text-center flex flex-col items-center">
            <TrendingUp className="w-12 h-12 text-brand-secondary mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Ready to elevate your supply chain?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              Join dozens of corporate partners, supermarkets, and hotels who trust Siddipet Poultry Eggs for their daily bulk supply needs. Let's discuss a custom partnership today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-brand-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                <MapPin className="w-5 h-5" />
                Find Our Location
              </Link>
              <a href="https://wa.me/919505483786" className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Contact Sales
              </a>
            </div>
          </div>
        </motion.div>
      </section>


    </div>
  );
}
