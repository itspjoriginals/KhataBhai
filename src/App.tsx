/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LeadModal from './components/LeadModal';
import HomeView from './components/HomeView';
import DemoView from './components/DemoView';
import PricingView from './components/PricingView';
import UseCasesView from './components/UseCasesView';
import CompareView from './components/CompareView';
import FaqView from './components/FaqView';
import { MessageSquare, Star, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCtaType, setModalCtaType] = useState<'trial' | 'demo'>('demo');

  const handleOpenModal = (type: 'trial' | 'demo') => {
    setModalCtaType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans selection:bg-emerald-500/30 select-none">
      
      {/* 1. Sticky Announcement Bar */}
      <div className="bg-emerald-950 text-emerald-100 py-2.5 px-4 text-center text-xs border-b border-emerald-900 select-none relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-2">
          <span className="font-semibold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
            Limited Launch Offer: Free setup + 7-day guided trial for early businesses!
          </span>
          <button 
            onClick={() => handleOpenModal('trial')}
            className="text-emerald-400 font-bold hover:underline hover:text-white flex items-center gap-0.5 cursor-pointer shrink-0"
          >
            Claim Launch Offer 
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Top Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenModal={handleOpenModal} 
      />

      {/* 3. Main Views Content Container with dynamic route transition layout */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'home' && (
              <HomeView onOpenModal={handleOpenModal} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'demo' && (
              <DemoView onOpenModal={handleOpenModal} />
            )}
            {activeTab === 'pricing' && (
              <PricingView onOpenModal={handleOpenModal} />
            )}
            {activeTab === 'use-cases' && (
              <UseCasesView onOpenModal={handleOpenModal} setActiveTab={setActiveTab} />
            )}
            {activeTab === 'compare' && (
              <CompareView onOpenModal={handleOpenModal} />
            )}
            {activeTab === 'faq' && (
              <FaqView onOpenModal={handleOpenModal} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Brand Trust Footer */}
      <Footer 
        setActiveTab={setActiveTab} 
        onOpenModal={handleOpenModal} 
      />

      {/* 5. Mobile Quick floating Sticky CTA */}
      <div className="fixed bottom-4 right-4 z-40 md:hidden select-none">
        <button
          onClick={() => handleOpenModal('demo')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3.5 rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all cursor-pointer border border-emerald-500/20"
          id="floating-whatsapp-btn"
          title="Book WhatsApp Demo"
        >
          <MessageSquare className="w-6 h-6 fill-white" />
        </button>
      </div>

      {/* 6. Comprehensive Lead Capture Modal flow */}
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        ctaType={modalCtaType} 
      />

    </div>
  );
}
