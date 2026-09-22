import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { useStoreData } from '../store/useStoreData';
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

export function AllProductsPage() {
  const { products } = useStoreData();

  return (
    <div className="min-h-screen bg-[#FDF8F0] flex flex-col">
      <Header />

      {/* Hero Banner */}
      <motion.div 
        variants={fadeUp} initial="initial" animate="whileInView"
        className="bg-[#D32F2F] pt-24 pb-14 px-4 md:px-12 text-white text-center"
      >
        <span className="inline-block bg-white/20 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
          Our Collection
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Premium Egg Range</h1>
        <p className="text-white/80 text-base max-w-xl mx-auto">
          Farm-fresh, scientifically fortified eggs crafted for health, taste, and quality — delivered straight to your door.
        </p>
      </motion.div>

      {/* Products Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-10 py-14">
        {products.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No products available yet.</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7"
          >
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Visual Benefits Graphic */}
      <div className="bg-white py-16 overflow-hidden">
        <div className="max-w-6xl mx-auto relative px-4 md:px-8">
          
          {/* Half-circle background */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[120%] md:w-[1000px] h-[500px] bg-gray-50 rounded-t-[500px] -z-10 border-t border-gray-100"></div>

          {/* Title Area */}
          <div className="text-center relative mb-16 md:mb-24 pt-12">
            <h2 className="text-7xl md:text-9xl font-black text-[#F1C40F] opacity-90 uppercase tracking-tight">
              BENEFITS
            </h2>
            <div className="absolute inset-0 flex items-center justify-center pt-12">
              <span className="text-3xl md:text-5xl font-medium text-gray-800 tracking-tight">SIDDIPET Eggs</span>
            </div>
          </div>

          {/* Icons & Egg Layout */}
          <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between min-h-[300px]">
            
            {/* Left Column */}
            <motion.div 
              variants={staggerContainer} initial="initial" whileInView="whileInView"
              className="flex flex-col gap-10 md:gap-16 w-full md:w-1/3 z-10 text-right pr-4 mb-10 md:mb-0"
            >
              <motion.div variants={fadeUp} className="flex items-center justify-end gap-4">
                <span className="text-xs md:text-sm font-bold text-gray-800">Boosts Immunity</span>
                <div className="w-14 h-14 rounded-full border-2 border-[#F1C40F] bg-white flex items-center justify-center p-2.5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center justify-end gap-4 -mr-0 md:-mr-8">
                <span className="text-xs md:text-sm font-bold text-gray-800">Helps Weight Loss</span>
                <div className="w-14 h-14 rounded-full border-2 border-[#F1C40F] bg-white flex items-center justify-center p-2.5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"></path><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path><path d="m15.5 8.5-3.5 3.5"></path></svg>
                </div>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center justify-end gap-4">
                <span className="text-xs md:text-sm font-bold text-gray-800">Prevention of Cancer</span>
                <div className="w-14 h-14 rounded-full border-2 border-[#F1C40F] bg-white flex items-center justify-center p-2.5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 21.5v-9"></path><path d="M12 12.5a4.5 4.5 0 1 0-9 0c0 4.5 9 9 9 9"></path><path d="M12 12.5a4.5 4.5 0 1 1 9 0c0 4.5-9 9-9 9"></path></svg>
                </div>
              </motion.div>
            </motion.div>

            {/* Center Egg */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
              className="relative w-48 h-64 md:w-64 md:h-80 mx-auto md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-[40%] z-20"
            >
              {/* Outer circle lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[110%] rounded-full border-[3px] border-gray-200 -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[110%] rounded-full border-[3px] border-[#F1C40F] -z-10 clip-bottom-half" style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}></div>
              
              <img src="https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?auto=format&fit=crop&w=300&q=80" alt="White Egg" className="w-full h-full object-cover object-center rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-2xl brightness-110" />
            </motion.div>

            {/* Right Column */}
            <motion.div 
              variants={staggerContainer} initial="initial" whileInView="whileInView"
              className="flex flex-col gap-10 md:gap-16 w-full md:w-1/3 z-10 pl-4 mt-10 md:mt-0"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#F1C40F] bg-white flex items-center justify-center p-2.5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.002 6.5A3 3 0 0 1 5.603 5.125"></path></svg>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-800">Brain Development</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-4 -ml-0 md:-ml-8">
                <div className="w-14 h-14 rounded-full border-2 border-[#F1C40F] bg-white flex items-center justify-center p-2.5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66"></path></svg>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-800">Maintains Heart Health</span>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-2 border-[#F1C40F] bg-white flex items-center justify-center p-2.5 shadow-sm">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F1C40F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M18 10h3a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-3"></path><path d="M4 22h16"></path><path d="M9 14h6"></path><path d="M14 6h.01"></path><path d="M6 10H3a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3"></path><path d="M10 6h.01"></path></svg>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-800">Muscle & Bone Strength</span>
              </motion.div>
            </motion.div>
            
          </div>
        </div>
      </div>

      {/* Informational Section */}
      <div className="bg-white py-16 px-4 md:px-12 border-t border-brand-primary/10">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Intro */}
          <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#D32F2F]">Why SIDDIPET Eggs?</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
              Every SIDDIPET Egg is fortified with high quality protein, Omega DHA, Vitamin D3, Selenium, Vitamin E, and Zinc, the exact nutrients your immune system, heart, and brain run on daily. Unlike a standard egg, ours is built from a scientifically formulated, nutri rich hen diet, so the benefit isn’t a claim on a label, it’s a result of what our hens eat. Whether you’re raising kids, training for a race, or just trying to eat better, here’s precisely what you’re getting.
            </p>
          </motion.div>

          {/* 4 Core Benefits */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">The 4 Core Benefits of SIDDIPET Eggs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeUp} className="bg-[#FDF8F0] p-6 rounded-2xl border border-[#D32F2F]/10">
                <div className="text-[#D32F2F] font-bold text-3xl mb-2">3X</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Immunity Support</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Selenium, Vitamin E, and Zinc work together to strengthen your body’s natural defences. An SIDDIPET Egg carries 3x more Selenium and 3.4x more Vitamin E than a standard egg, making it a daily, food first way to support immunity rather than relying on a supplement.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0] p-6 rounded-2xl border border-[#D32F2F]/10">
                <div className="text-[#D32F2F] font-bold text-3xl mb-2">2</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Heart & Brain Health</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Omega DHA, sourced organically from algae, supports healthy cardiac function and brain development. Paired with Choline, it’s one of the few whole foods that supports both organs at once, which is why it’s a staple recommendation for growing children and working professionals alike.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0] p-6 rounded-2xl border border-[#D32F2F]/10">
                <div className="text-[#D32F2F] font-bold text-3xl mb-2">10x</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Bone & Metabolic Health</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Most Indian diets fall short on Vitamin D, and an SIDDIPET Egg helps close that gap directly: up to 10x more Vitamin D3 than a standard egg (1075.4 IU), which supports calcium absorption, stronger bones, and healthy metabolic function.
                </p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0] p-6 rounded-2xl border border-[#D32F2F]/10">
                <div className="text-[#D32F2F] font-bold text-3xl mb-2">9/9</div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Complete Protein for Growth & Recovery</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Every SIDDIPET Egg delivers high quality, complete protein, meaning it contains all nine essential amino acids your body needs for muscle repair, daily energy, and recovery after exercise. That makes it as useful for a growing child as it is for an athlete.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Who Benefits Most */}
          <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">Who Benefits Most</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div variants={fadeUp} className="bg-[#FDF8F0]/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Growing children</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Vitamin D3 and Omega DHA support bone development and cognitive growth during the years it matters most.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0]/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Working professionals</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Selenium and Vitamin E provide daily immune support without adding another supplement to your routine.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0]/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Athletes and active adults</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Complete protein and Omega DHA aid muscle recovery and sustained energy.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0]/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Pregnant and lactating mothers</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Choline and Omega DHA support foetal brain development, always in consultation with your doctor.</p>
              </motion.div>
              <motion.div variants={fadeUp} className="bg-[#FDF8F0]/50 p-5 rounded-xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-1">Seniors</h4>
                <p className="text-xs text-gray-600 leading-relaxed">Vitamin D3 and Selenium support bone strength and immune resilience as nutrient needs shift with age.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Our Farm to Egg Process */}
          <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="bg-[#D32F2F] text-white p-8 md:p-10 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-serif font-bold mb-4">Our Farm to Egg Process</h3>
            <p className="text-sm md:text-base leading-relaxed text-white/90">
              Every SIDDIPET Egg starts on one farm, not a supply chain. Our fully modernised, 20 acre farmland sits in a pollution free environment at Ravulapalem, Andhra Pradesh, known locally as the Gateway of Konaseema. Our hens are fed a scientifically formulated diet of premium corn, soya meal, til cake, rice bran, sunflower seeds, and flaxseed, hydrated with ozonized water, and raised without antibiotics or hormones at any stage. Read the full story on our <Link to="/about" className="underline font-bold hover:text-white">About Us</Link> page.
            </p>
          </motion.div>
        </div>
      </div>
      

    </div>
  );
}
