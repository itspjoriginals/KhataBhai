/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Menu, X, MessageSquare, BookOpen, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenModal: (type: 'trial' | 'demo') => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'demo', label: 'Interactive Demo' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'compare', label: 'Compare' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div 
            onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
            id="nav-logo"
          >
            <div className="w-9 h-9 bg-emerald-600 rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <MessageSquare className="w-5 h-5 text-white fill-white/10" />
            </div>
            <div>
              <span className="text-lg font-black font-sans text-slate-900 tracking-tight flex items-center gap-1.5">
                KhataBhai <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full uppercase">AI</span>
              </span>
              <p className="text-[9px] text-slate-500 font-medium -mt-1 font-mono uppercase tracking-widest">WhatsApp Billing</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}-btn`}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-secondary-cta"
              onClick={() => onOpenModal('trial')}
              className="px-4 py-2 border border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              Start Free Trial
            </button>
            <button
              id="nav-primary-cta"
              onClick={() => onOpenModal('demo')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Book WhatsApp Demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              id="mobile-nav-cta"
              onClick={() => onOpenModal('demo')}
              className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              Demo
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:bg-slate-50 rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-b border-slate-100 px-4 py-3 space-y-1" id="mobile-nav-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('trial');
              }}
              className="w-full text-center py-2.5 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenModal('demo');
              }}
              className="w-full text-center py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/10"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Book WhatsApp Demo
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
