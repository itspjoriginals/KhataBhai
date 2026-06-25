/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Wrench, Truck, ShieldAlert, Award, ArrowRight, Check,
  MessageSquare, Volume2, Sparkles, Star, ChevronRight
} from 'lucide-react';
import { UseCase } from '../types';

interface UseCasesViewProps {
  onOpenModal: (type: 'trial' | 'demo') => void;
  setActiveTab: (tab: string) => void;
}

export default function UseCasesView({ onOpenModal, setActiveTab }: UseCasesViewProps) {
  const [activeUseCase, setActiveUseCase] = useState<string>("hardware");

  const useCases: UseCase[] = [
    {
      id: "hardware",
      title: "Hardware, Sanitary & Electrical Shops",
      icon: "Wrench",
      description: "Fast-moving retail items, complex product descriptions (Modular switches, PVC pipes, sanitary fittings), and frequent walk-in customers.",
      painPoint: "Dukan me bheed hone par computer billing system chalana dushkil hai. Traditional softwre seekhna aur staff ko samjhana bahut messy hai.",
      outcome: "KhataBhai WhatsApp system se bas 'voice instruction' dalkar 3 seconds me customized bill generate ho jata hai. Grahak dukan par zyada wait nahi karega.",
      exampleCommand: "Gupta Hardware ka ₹18,450 ka bill bana do: 10 light bulbs rate 120, 5 ceiling fans rate 1500",
      sampleInvoiceItems: [
        { name: "Modular Switches Box", quantity: 5, rate: 450, total: 2250 },
        { name: "Heavy Copper Wire Bundle", quantity: 2, rate: 1850, total: 3700 }
      ]
    },
    {
      id: "distributor",
      title: "Local Wholesalers & Distributors",
      icon: "Truck",
      description: "Frequent bulk orders, repetitive buyer lists, credit (udhari) tracking, and quotation dispatches.",
      painPoint: "Buyer ko bill manually scan karke WhatsApp bhejna padta hai. Udhari payment follow-up manually diary me dekh kar call karna padta hai.",
      outcome: "KhataBhai automatically due items aur buyers list track karega. Automated due reminders trigger hote hain respecting complete buyer-seller relation.",
      exampleCommand: "Agarwal Wholesalers ko payment reminder bhejo kal ke plywood bill ka",
      sampleInvoiceItems: [
        { name: "Plywood Sheets (18mm)", quantity: 50, rate: 1200, total: 60000 },
        { name: "Laminate Adhesives Box", quantity: 5, rate: 3500, total: 17500 }
      ]
    },
    {
      id: "pharma",
      title: "Medical Stores & Pharma Dealers",
      icon: "Award",
      description: "Batch numbers, expiry listings, urgent invoice tracking, and repetitive doctor prescription billing.",
      painPoint: "Excel me entries maintain karne me ghanto waste ho jate hain. Multi-store outlets are hard to synchronize without heavy ERP tools.",
      outcome: "KhataBhai parses prescription text or images to structured PDF invoice templates automatically inside the staff's personal WhatsApp handle.",
      exampleCommand: "Mehta Medicos ka bill: Paracetamol strip of 15 rate 45, and Syrup rate 120",
      sampleInvoiceItems: [
        { name: "Paracetamol 650 Tablets", quantity: 15, rate: 35, total: 525 },
        { name: "Amoxycillin capsules box", quantity: 2, rate: 850, total: 1700 }
      ]
    },
    {
      id: "service",
      title: "Service Providers & Agencies",
      icon: "ShieldAlert",
      description: "Consultation bills, heavy construction item quotations, and one-off customized service bills.",
      painPoint: "Professional looking PDF quotation banana mushkil hai bina designing team ke. Payments track karne me bahut aalsi-pan aata hai.",
      outcome: "Convert custom raw scope instructions into high-fidelity PDF Quotations with payment scanning QR codes within minutes.",
      exampleCommand: "Client ke liye ₹25,000 ka consultancy quotation PDF me bhejo",
      sampleInvoiceItems: [
        { name: "Site Heavy Installation Service", quantity: 1, rate: 15000, total: 15000 },
        { name: "Electrical Consultancy Charge", quantity: 1, rate: 4500, total: 4500 }
      ]
    }
  ];

  const currentCase = useCases.find(uc => uc.id === activeUseCase) || useCases[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans" id="use-cases-view-container">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          Industry Solutions
        </span>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">
          KhataBhai kin businesses ke liye sabse best hai?
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Apni industry select karein aur dekhein kaise KhataBhai aapke daily dukan-dari workflows ko completely simple kar deta hai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        
        {/* Left Hand: vertical selection buttons */}
        <div className="lg:col-span-4 space-y-3">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setActiveUseCase(uc.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all flex justify-between items-center cursor-pointer ${
                activeUseCase === uc.id
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  activeUseCase === uc.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {uc.id === 'hardware' && <Wrench className="w-4.5 h-4.5" />}
                  {uc.id === 'distributor' && <Truck className="w-4.5 h-4.5" />}
                  {uc.id === 'pharma' && <Award className="w-4.5 h-4.5" />}
                  {uc.id === 'service' && <ShieldAlert className="w-4.5 h-4.5" />}
                </div>
                <span className="text-xs sm:text-sm font-bold truncate max-w-[200px]">{uc.title}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Right Hand: Detailed view card with layouts */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-950 text-lg md:text-xl">{currentCase.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed max-w-lg">{currentCase.description}</p>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full uppercase shrink-0">
                Optimized Layout
              </span>
            </div>

            {/* Pain Points comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs leading-relaxed">
              <div className="bg-rose-50/40 p-4 rounded-xl border border-rose-100 space-y-1">
                <span className="font-black text-rose-800 uppercase tracking-widest text-[9px] font-mono">Daily Friction</span>
                <p className="text-slate-700">{currentCase.painPoint}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-black text-emerald-800 uppercase tracking-widest text-[9px] font-mono">KhataBhai Solution</span>
                <p className="text-slate-700">{currentCase.outcome}</p>
              </div>
            </div>

            {/* Voice Command mock ticker */}
            <div className="bg-slate-900 text-slate-100 p-4 rounded-xl flex gap-3 items-center">
              <div className="p-2 bg-emerald-600/20 text-emerald-400 rounded-lg">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9px] text-slate-500 uppercase font-mono tracking-widest block">Voice instruction example:</span>
                <p className="text-xs font-semibold text-emerald-300 italic truncate">"{currentCase.exampleCommand}"</p>
              </div>
            </div>

            {/* Structured Invoice Mini Preview inside case */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider block mb-2">Item table representation:</span>
              <div className="space-y-1.5 font-sans">
                {currentCase.sampleInvoiceItems.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/60">
                    <span className="font-bold text-slate-800">{item.name}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{item.quantity} x ₹{item.rate} = <strong className="text-slate-900">₹{item.total}</strong></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action inside UseCases */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setActiveTab('demo');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs text-center cursor-pointer"
              >
                Try live simulated voice parser
              </button>
              <button
                onClick={() => onOpenModal('trial')}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs text-center cursor-pointer flex items-center justify-center gap-1 shadow-md shadow-emerald-600/10"
              >
                Start free trial
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
