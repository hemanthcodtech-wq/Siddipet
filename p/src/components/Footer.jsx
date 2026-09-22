import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import logoUrl from '../assets/logo.png';
import footerBg from '../assets/footer_farm_bg.jpg';

export function Footer() {
  return (
    <footer 
      className="w-full relative mt-16 md:mt-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      {/* Yellow Overlay */}
      <div className="absolute inset-0 bg-[#F5B041]/90"></div>

      {/* Wave Top Mask (White) to hide the bg and make a wave shape */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%] z-10">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12 md:h-24 block">
          {/* This path fills the TOP area, acting as a mask if colored white */}
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="#FFFFFF"></path>
        </svg>
      </div>

      <div className="relative z-20 w-full mx-auto px-4 md:px-12 lg:px-20 pt-8 pb-20 text-center flex flex-col items-center gap-6">
        
        {/* Brand Info */}
        <div className="flex flex-col items-center">
          <div className="h-28 w-28 bg-white rounded-full p-2 flex items-center justify-center shadow-md mb-3">
            <img src={logoUrl} alt="Siddipet Poultry Eggs" className="h-full w-auto object-contain" />
          </div>
          <h2 className="text-2xl font-bold uppercase tracking-wider text-white drop-shadow-md">Siddipet Poultry Eggs</h2>
          <p className="text-sm font-bold mt-1 text-white drop-shadow-md">A HEALTHY DAY BEGINS WITH US</p>
        </div>

        {/* Our Farm's Tale */}
        <div className="max-w-3xl mx-auto mt-4">
          <h3 className="text-3xl font-serif mb-4 text-white drop-shadow-md">Our Farm's Tale</h3>
          <p className="text-sm leading-relaxed text-gray-900 font-medium">
            We are engaged in egg trading, bulk egg supply, and professional egg packaging services. We source quality eggs from poultry farms and supply them to corporate companies, retailers, distributors, hotels, restaurants, and institutional buyers. Our focus is on reliable supply, quality packaging, competitive pricing, and long-term corporate partnerships.
          </p>
        </div>

        {/* Horizontal Nav */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold text-gray-900 mt-4">
          <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
          <span className="opacity-50">|</span>
          <Link to="/about" className="hover:text-brand-primary transition-colors">About Us</Link>
          <span className="opacity-50">|</span>
          <Link to="/category/all" className="hover:text-brand-primary transition-colors">Products</Link>
          <span className="opacity-50">|</span>
          <Link to="/contact#faq-section" className="hover:text-brand-primary transition-colors">FAQ's</Link>
          <span className="opacity-50">|</span>
          <Link to="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link>
        </div>

        {/* Contact info row 1 */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-2 text-sm font-semibold text-gray-900">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span>+91 9505483786</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>siddipetpoultryeggs12@gmail.com</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-900 mt-1 max-w-2xl mx-auto text-center">
          <MapPin className="w-5 h-5 shrink-0" />
          <span>SYNO.1927 PLOT NO. 338 RAGHAVENDRA NAGAR BURUGUPALLY SIDDIPET TELANGANA 502103</span>
        </div>

        {/* Available Areas */}
        <div className="max-w-4xl mx-auto mt-4">
          <p className="text-sm leading-relaxed text-gray-900 font-medium">
            We supply fresh eggs in bulk, along with egg packing and packaging services for our clients. 
            For bulk inquiries <Link to="/contact" className="text-brand-primary hover:underline">Contact Us</Link>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <a href="#" className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white transition-colors shadow-sm">
            {/* FB SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white transition-colors shadow-sm">
            {/* Insta SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white transition-colors shadow-sm">
            {/* Youtube SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center hover:bg-[#D32F2F] hover:text-white transition-colors shadow-sm">
            {/* WhatsApp SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.383 0 0 5.385 0 12.035c0 2.125.553 4.195 1.604 6.012L.114 23.518l5.63-1.478A11.96 11.96 0 0 0 12.031 24c6.647 0 12.034-5.384 12.034-12.033C24.065 5.385 18.678 0 12.031 0zm.003 21.996c-1.782 0-3.526-.479-5.056-1.388l-.362-.214-3.754.985.999-3.66-.235-.374a9.96 9.96 0 0 1-1.523-5.31C2.099 6.49 6.517 2.073 12.034 2.073c5.517 0 9.932 4.417 9.932 9.932.001 5.518-4.415 9.991-9.933 9.991z"/></svg>
          </a>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/919505483786" className="absolute bottom-24 right-4 md:right-12 bg-[#25D366] text-white px-5 py-2.5 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:bg-green-500 transition-colors z-50">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.383 0 0 5.385 0 12.035c0 2.125.553 4.195 1.604 6.012L.114 23.518l5.63-1.478A11.96 11.96 0 0 0 12.031 24c6.647 0 12.034-5.384 12.034-12.033C24.065 5.385 18.678 0 12.031 0zm.003 21.996c-1.782 0-3.526-.479-5.056-1.388l-.362-.214-3.754.985.999-3.66-.235-.374a9.96 9.96 0 0 1-1.523-5.31C2.099 6.49 6.517 2.073 12.034 2.073c5.517 0 9.932 4.417 9.932 9.932.001 5.518-4.415 9.991-9.933 9.991z"/></svg>
        Message Us
      </a>

      {/* Bottom Bar */}
      <div className="relative z-20 bg-[#1F2937] text-white py-4 px-4 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs md:text-sm font-medium gap-4">
          <p className="text-gray-400">
            Copyright © {new Date().getFullYear()} Siddipet Poultry Eggs. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-white/80">
            <Link to="/terms-of-service" className="hover:text-brand-secondary transition-colors">Terms & Conditions</Link>
            <Link to="/privacy-policy" className="hover:text-brand-secondary transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
