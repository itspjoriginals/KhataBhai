/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare, Heart, Shield, Landmark, PhoneCall } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenModal: (type: 'trial' | 'demo') => void;
}

export default function Footer({ setActiveTab, onOpenModal }: FooterProps) {
  const handleTabLink = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans" id="app-footer">
      {/* Upper footer trust signals */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-3 items-start">
            <Shield className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">100% Safe & Secure</h4>
              <p className="text-xs text-slate-400 mt-1">Aapka customer and transaction data bilkul encrypted aur protected rehta hai.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Landmark className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">Made for Indian Small Businesses</h4>
              <p className="text-xs text-slate-400 mt-1">Sabhie types ke traders, wholesalers, distributors, aur retail stores ke liye customized format.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <PhoneCall className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-semibold text-sm">Dedicated Onboarding Support</h4>
              <p className="text-xs text-slate-400 mt-1">WhatsApp call ya chat par humari team aapko pehla bill set up karke degi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4.5 h-4.5 text-white fill-white/10" />
            </div>
            <span className="text-lg font-black text-white tracking-tight">KhataBhai <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-md uppercase">AI</span></span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            WhatsApp-first billing and payment reminder assistant for Indian small businesses. Create invoices, share PDFs, and track payments easily without installing heavy ERP software.
          </p>
          <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/30">
            <span className="text-[10px] bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded-md uppercase">LAUNCH OFFER</span>
            <p className="text-xs text-emerald-200 mt-1 font-semibold">Free Onboarding + 7-Day Guided Trial. Start immediately!</p>
          </div>
        </div>

        {/* Product navigation */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><button onClick={() => handleTabLink('home')} className="hover:text-emerald-400 transition-colors">Home Features</button></li>
            <li><button onClick={() => handleTabLink('demo')} className="hover:text-emerald-400 transition-colors font-medium text-emerald-300">💡 Try Live Demo</button></li>
            <li><button onClick={() => handleTabLink('use-cases')} className="hover:text-emerald-400 transition-colors">Use Cases & Industries</button></li>
            <li><button onClick={() => handleTabLink('compare')} className="hover:text-emerald-400 transition-colors">KhataBhai vs Others</button></li>
            <li><button onClick={() => handleTabLink('pricing')} className="hover:text-emerald-400 transition-colors">Plans & Pricing</button></li>
            <li><button onClick={() => handleTabLink('faq')} className="hover:text-emerald-400 transition-colors">FAQs</button></li>
          </ul>
        </div>

        {/* Industry verticals */}
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Suitable For</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Hardware & Sanitary Shops</li>
            <li>Electrical & Lighting Suppliers</li>
            <li>Local Wholesalers & Distributors</li>
            <li>Plywood & Wood Dealers</li>
            <li>Medical & Pharma Distributorships</li>
            <li>Service Providers & Freelancers</li>
          </ul>
        </div>

        {/* Contact info and Trust */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Get in Touch</h4>
          <p className="text-xs text-slate-400 leading-normal">
            Sawaal hain? Hamein WhatsApp par message karein! Hum aapke custom bill templates free me setup karke denge.
          </p>
          <button
            onClick={() => onOpenModal('demo')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-emerald-600/10 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            Talk to Support (WhatsApp)
          </button>
          <p className="text-[10px] text-slate-500 text-center md:text-left">
            Support timings: 9:00 AM - 9:00 PM (Monday - Saturday)
          </p>
        </div>

      </div>

      {/* Footer bottom banner */}
      <div className="bg-slate-950 py-6 border-t border-slate-800/60 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            &copy; 2026 KhataBhai. All rights reserved. Registered for Indian SMB Traders and Distributors.
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Indian Businesses
          </div>
        </div>
      </div>
    </footer>
  );
}
