/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, ShieldCheck } from 'lucide-react';

interface FaqViewProps {
  onOpenModal: (type: 'trial' | 'demo') => void;
}

export default function FaqView({ onOpenModal }: FaqViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: "Onboarding & Setup",
      q: "Kya mujhe koi software ya mobile app download karna padega?",
      a: "Bilkul nahi! KhataBhai ka sabse bada fayda yahi hai ki ye directly aapke personal ya business WhatsApp handle par chalta hai. Aapko dukan ke mobile me space khali karne ya heavy apps chalana seekhne ki koi jarurat nahi hai."
    },
    {
      category: "Onboarding & Setup",
      q: "Humara first custom bill format kaise setup hoga?",
      a: "Signup karne ke baad, hamari technical support team WhatsApp par aapse connect karegi. Aap bas apna purana bill paper ya shop details share karein, aur hum dukan ka customized layout (logo, GSTIN, UPI scanner) absolutely free me set up karke denge."
    },
    {
      category: "Onboarding & Setup",
      q: "Kya main pehle trial ya demo le sakta hoon?",
      a: "Haan! Hum har dukan-dar ko fully guided 7-day free trial aur free technical setup support dete hain taaki aap acche se trust hone ke baad hi pay karein."
    },
    {
      category: "Billing Workflow",
      q: "KhataBhai voice messages ko kaise samajhta hai?",
      a: "Humara backend AI highly advanced Natural Language Processing engine se loaded hai. Jab aap bolte hain: 'Pandey hardware ko 10 bulbs rate 120 bhejo', toh AI shabdo ko parse karke correct client profile, description, quantities aur total calculation ke sath automatic PDF generate kar deta hai."
    },
    {
      category: "Billing Workflow",
      q: "Hinglish ya local language support hai?",
      a: "Haan! KhataBhai completely Hindi, Hinglish (Hindi-English mix text/voice) aur English samajhta hai. Isse dukan ka koi bhi non-technical staff ya family member bina computer seekhe aasani se chala sakta hai."
    },
    {
      category: "Security & Safety",
      q: "Kya mera customer aur transaction data safe rahega?",
      a: "Ha! KhataBhai zero-trust architecture par kaam karta hai. Aapka dukan ka records, client contact details aur transactions safe rehne ke liye standard encrypted databases me backup rehte hain. Isse aapke alawa koi dusra access nahi kar sakta."
    },
    {
      category: "Payments & Reminders",
      q: "Payment reminders automatic kaise trigger hote hain?",
      a: "Jab aap bill banate hain tab bas due dates select kar sakte hain (jaise reminder set for 10 days). KhataBhai system exact date par customer ko respect-ful professional format me WhatsApp reminder bhej dega."
    }
  ];

  const handleToggle = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(
    faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans" id="faq-view-container">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-10">
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          FAQ Section
        </span>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">
          Aapke sabhi sawaalo ke jawaab yaha hain
        </h1>
        <p className="text-sm text-slate-600">
          Agar aapko dukan me billing or udhari automation ko lekar koi bhi doubts hain, toh yaha check karein.
        </p>

        {/* Search Input bar */}
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Kush bhi sawal search karein..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-500 bg-white shadow-xs"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
              >
                {/* Accordion header clicker */}
                <button
                  onClick={() => handleToggle(idx)}
                  className="w-full text-left p-4 md:p-5 flex justify-between items-start gap-4 cursor-pointer hover:bg-slate-50/50"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] bg-slate-100 text-slate-500 font-extrabold px-2 py-0.5 rounded-md uppercase font-mono tracking-wider">
                      {faq.category}
                    </span>
                    <h4 className="font-extrabold text-slate-950 text-xs sm:text-sm md:text-base flex gap-1.5 items-start">
                      <HelpCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      {faq.q}
                    </h4>
                  </div>
                  <div className="text-slate-400 shrink-0 mt-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm border-t border-slate-50 leading-relaxed font-sans bg-slate-50/20">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
            <h4 className="font-bold text-slate-700">Koi sawaal nahi mila!</h4>
            <p className="text-xs text-slate-500">Kripya koi aur keyword search karke dekhein.</p>
          </div>
        )}
      </div>

      {/* Trust contact footer */}
      <div className="bg-emerald-950 text-emerald-100 rounded-2xl p-6 md:p-8 mt-12 text-center space-y-4 border border-emerald-900">
        <ShieldCheck className="w-10 h-10 text-emerald-400 mx-auto stroke-1" />
        <h4 className="font-bold text-white text-base">Kya aapka sawal yaha listed nahi hai?</h4>
        <p className="text-xs text-emerald-200/80 max-w-md mx-auto leading-relaxed">
          Chinta mat karein! Hamein direct WhatsApp par connect karein aur humari friendly support team aapke dukan ka workflow set up karne me help karegi.
        </p>
        <button
          onClick={() => onOpenModal('demo')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs inline-flex items-center gap-2 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          Chat on WhatsApp Support
        </button>
      </div>

    </div>
  );
}
