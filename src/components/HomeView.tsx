/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, CheckCircle2, AlertCircle, Play, 
  ShieldAlert, BadgePercent, Check, Share2, Star, 
  MessageSquare, Volume2, Image as ImageIcon, Send, FileText 
} from 'lucide-react';

interface HomeViewProps {
  onOpenModal: (type: 'trial' | 'demo') => void;
  setActiveTab: (tab: string) => void;
}

export default function HomeView({ onOpenModal, setActiveTab }: HomeViewProps) {
  // Playground text parsing state
  const [playgroundText, setPlaygroundText] = useState("Gupta Hardware ka bill banao: 10 fluorescent bulbs rate 150 each, and 4 switch boxes rate 600 each");
  const [parsedInvoice, setParsedInvoice] = useState<any>(null);
  const [loadingPlayground, setLoadingPlayground] = useState(false);

  const samplePrompts = [
    "Gupta Hardware ka bill banao: 10 bulbs rate 150, 4 switches rate 600",
    "Sharma Electricals ka bill: 5 modular board at 1200 each, 18% GST lagao",
    "Verma Paints ka ₹15,000 ka order set karo, 10% cash discount do"
  ];

  const handleRunPlayground = async (textToRun: string) => {
    setLoadingPlayground(true);
    try {
      const res = await fetch("/api/parse-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToRun })
      });
      const data = await res.json();
      if (data.invoice) {
        setParsedInvoice(data.invoice);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPlayground(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="font-sans text-slate-800 pb-16 bg-slate-50/50" id="home-view-container">
      
      {/* 1. Hero Section */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full select-none">
                <Star className="w-3.5 h-3.5 fill-emerald-800" />
                No App Download Required — Works inside WhatsApp
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] font-black text-slate-900 tracking-tight leading-tight font-sans">
                WhatsApp se <span className="text-emerald-600 relative inline-block">bill banao,</span> payment reminder bhejo — <span className="underline decoration-emerald-500 decoration-3">bina koi software seekhe</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Hardware, electrical, sanitary, distributors aur service businesses ke liye WhatsApp billing assistant. Voice, text ya photo se bill banao, PDF bhejo aur automatic due payment follow-up karo — sab WhatsApp pe.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  id="hero-primary-cta"
                  onClick={() => onOpenModal('demo')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  Book WhatsApp Demo
                </button>
                <button
                  id="hero-secondary-cta"
                  onClick={() => onOpenModal('trial')}
                  className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-sm md:text-base cursor-pointer"
                >
                  Start 7-Day Free Trial
                  <ArrowRight className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Micro proof badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-lg mx-auto lg:mx-0 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  10-minute setup
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  No download needed
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Hinglish & Hindi Support
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Free support forever
                </div>
              </div>
            </div>

            {/* Right Column Visual Mockups */}
            <div className="lg:col-span-5 relative">
              <div className="absolute inset-0 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
              
              {/* WhatsApp Interface Mockup */}
              <div className="bg-slate-900 text-slate-100 rounded-3xl p-4 shadow-2xl border-4 border-slate-800 max-w-sm mx-auto select-none overflow-hidden relative">
                
                {/* Header phone info */}
                <div className="bg-emerald-800 -mx-4 -mt-4 px-4 py-3 flex items-center justify-between border-b border-emerald-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">KB</div>
                    <div>
                      <h4 className="text-xs font-bold leading-none">KhataBhai Assistant</h4>
                      <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" /> Online
                      </span>
                    </div>
                  </div>
                  <MessageSquare className="w-4.5 h-4.5 text-emerald-200 fill-emerald-200" />
                </div>

                {/* Conversation bubbles */}
                <div className="space-y-3.5 py-4 min-h-[300px] text-[12px] overflow-y-auto">
                  
                  {/* User message */}
                  <div className="flex justify-end">
                    <div className="bg-emerald-600 text-white p-2.5 rounded-2xl rounded-tr-none max-w-[85%] shadow-xs">
                      <p className="leading-relaxed">Gupta Hardware ka bill banao: 10 light bulbs rate 120 each, aur 5 fans rate 1500 each</p>
                      <span className="text-[9px] text-emerald-200 block text-right mt-1">09:24 AM</span>
                    </div>
                  </div>

                  {/* Assistant Typings */}
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-200 p-2.5 rounded-2xl rounded-tl-none max-w-[85%] shadow-xs space-y-1">
                      <p className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Aapka invoice taiyar hai!
                      </p>
                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 space-y-1 font-mono text-[10px]">
                        <p className="flex justify-between border-b border-slate-800 pb-1 font-sans text-slate-400">
                          <span>Invoice No: KB-9811</span>
                          <span>25-06-2026</span>
                        </p>
                        <p className="text-slate-300 font-sans font-bold">Gupta Hardware</p>
                        <p className="text-slate-400">10 x Bulbs @ ₹120 = ₹1,200</p>
                        <p className="text-slate-400">5 x Fans @ ₹1500 = ₹7,500</p>
                        <p className="flex justify-between border-t border-slate-800 pt-1 font-sans font-bold text-white text-[11px]">
                          <span>Total Amount (with GST)</span>
                          <span className="text-emerald-400">₹10,266</span>
                        </p>
                      </div>
                      <span className="text-[9px] text-slate-500 block mt-1">09:24 AM</span>
                    </div>
                  </div>

                  {/* PDF Share Action bubble */}
                  <div className="flex justify-start">
                    <div className="bg-slate-800 text-slate-200 p-2 rounded-xl max-w-[80%] border border-slate-700/50 flex gap-2 items-center">
                      <div className="p-1.5 bg-rose-500/10 text-rose-500 rounded-lg shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold truncate">Bill_Gupta_Hardware.pdf</p>
                        <p className="text-[9px] text-slate-500">142 KB &bull; PDF Bill</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer mock input */}
                <div className="bg-slate-950 -mx-4 -mb-4 p-2 px-4 flex gap-2 items-center border-t border-slate-800">
                  <div className="flex-1 bg-slate-800 text-slate-400 px-3 py-1.5 rounded-full text-xs">
                    Type a message...
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white cursor-pointer">
                    <Send className="w-3.5 h-3.5 fill-white" />
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Trust bar */}
      <section className="bg-slate-900 text-slate-400 py-6 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center select-none font-mono text-[11px] uppercase tracking-widest">
          <span>⚡ growing Indian businesses use KhataBhai</span>
          <span className="hidden md:inline-block text-slate-700">|</span>
          <span>⚡ create invoices in 3 seconds</span>
          <span className="hidden md:inline-block text-slate-700">|</span>
          <span>⚡ automated payment follow-ups</span>
          <span className="hidden md:inline-block text-slate-700">|</span>
          <span>⚡ works on Android, iOS & Desktop (via WhatsApp)</span>
        </div>
      </section>

      {/* 3. Problem Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">
              Aapka billing aur payment follow-up abhi bhi manual hai?
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
              Notebook, calculator, excel, aur alag-alag tools ke beech fas kar aapka kitna samay aur nuksaan hota hai?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            
            <div className="bg-rose-50/40 p-6 rounded-2xl border border-rose-100 flex gap-4 items-start">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Bill banane me time lagta hai</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Har bar dukan chhod ke billing software kholna padta hai ya manual book par likhna padta hai, jisse customers ka line lag jata hai.</p>
              </div>
            </div>

            <div className="bg-rose-50/40 p-6 rounded-2xl border border-rose-100 flex gap-4 items-start">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Reminders manually likhne padte hain</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Udhari ka follow-up manually diary me dekh kar call karna padta hai. Bahut sare payments yaad na rakhne ke karan phas jate hain.</p>
              </div>
            </div>

            <div className="bg-rose-50/40 p-6 rounded-2xl border border-rose-100 flex gap-4 items-start">
              <div className="p-2.5 bg-rose-100 text-rose-600 rounded-xl shrink-0">
                <BadgePercent className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900 text-sm">Complicated software chalana mushkil</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Traditional billing system ko seekhne ke liye alag se training chahiye aur aapka staff ya family use nahi kar paati.</p>
              </div>
            </div>

          </div>

          <div className="bg-emerald-50 rounded-2xl p-4 md:p-6 mt-10 border border-emerald-100 text-center flex flex-col md:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
            <span className="text-xs sm:text-sm text-emerald-800 font-bold">
              💡 KhataBhai aapka billing aur reminder workflow WhatsApp pe laata hai — simple aur fast.
            </span>
            <button
              onClick={() => setActiveTab('demo')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1 cursor-pointer shrink-0"
            >
              See interactive demo
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Active Playground (Quick-Taste AI) */}
      <section className="py-16 md:py-20 bg-slate-100/60 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
              Free Live Assistant Playground
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Apna pehla bill yahi bana kar dekhiye
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Neeche diye commands me se kisi ek par click karein ya apna custom text likhein, aur dekhiye kaise hamara AI structured bill generate karta hai!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12 max-w-5xl mx-auto">
            
            {/* Input Area */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-white p-5 rounded-2xl shadow-md border border-slate-200">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">
                  Kuch bhi billing instruction likhein (Hinglish/Hindi/English)
                </label>
                <textarea
                  value={playgroundText}
                  onChange={(e) => setPlaygroundText(e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-500 transition-all font-sans leading-relaxed"
                  placeholder="e.g. Gupta Hardware: 5 pipes at 450, 10 elbows at 80 each, 10% discount do..."
                />

                <div className="flex justify-between items-center mt-3">
                  <span className="text-[10px] text-slate-500 font-mono">Real-time parser active</span>
                  <button
                    onClick={() => handleRunPlayground(playgroundText)}
                    disabled={loadingPlayground}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-5 rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/10 cursor-pointer"
                  >
                    {loadingPlayground ? (
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Parse & Create Invoice
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Sample commands selection */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Ya inme se click karein:</span>
                <div className="space-y-2">
                  {samplePrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPlaygroundText(prompt);
                        handleRunPlayground(prompt);
                      }}
                      className="w-full text-left bg-white hover:bg-emerald-50/50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium hover:border-emerald-300 transition-all block cursor-pointer truncate"
                    >
                      💡 "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Structured Invoice Result Output */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="bg-slate-900 text-slate-200 px-5 py-3 flex justify-between items-center border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold uppercase tracking-wider">PDF Bill Live Preview</span>
                  </div>
                  {parsedInvoice && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded">
                      Calculated
                    </span>
                  )}
                </div>

                <div className="p-6 min-h-[280px] flex flex-col justify-between">
                  {parsedInvoice ? (
                    <div className="space-y-4 text-xs font-sans">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                        <div>
                          <h4 className="font-bold text-slate-950 text-sm uppercase">{parsedInvoice.businessName || 'KhataBhai Store'}</h4>
                          <p className="text-slate-400 text-[10px]">{parsedInvoice.businessAddress || 'India'}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-700">INVOICE</p>
                          <p className="text-[10px] text-slate-500">{parsedInvoice.invoiceNumber}</p>
                          <p className="text-[10px] text-slate-500">Date: {parsedInvoice.date}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-slate-400 text-[10px] font-bold">BILLED TO:</p>
                        <p className="font-bold text-slate-800 uppercase">{parsedInvoice.customerName}</p>
                      </div>

                      {/* Items table */}
                      <div className="space-y-1.5 border-t border-b border-slate-100 py-3">
                        <div className="grid grid-cols-12 gap-1 text-[10px] text-slate-400 font-bold uppercase mb-1">
                          <span className="col-span-6">Item Description</span>
                          <span className="col-span-2 text-center">Qty</span>
                          <span className="col-span-2 text-right">Rate</span>
                          <span className="col-span-2 text-right">Total</span>
                        </div>
                        {parsedInvoice.items?.map((item: any, idx: number) => (
                          <div key={idx} className="grid grid-cols-12 gap-1 text-slate-700 font-medium">
                            <span className="col-span-6 font-semibold">{item.name}</span>
                            <span className="col-span-2 text-center">{item.quantity}</span>
                            <span className="col-span-2 text-right">₹{item.rate}</span>
                            <span className="col-span-2 text-right font-bold text-slate-900">₹{item.total}</span>
                          </div>
                        ))}
                      </div>

                      {/* Summary calculations */}
                      <div className="space-y-1 text-right max-w-xs ml-auto">
                        <p className="flex justify-between text-[11px] text-slate-600">
                          <span>Subtotal:</span>
                          <span>₹{parsedInvoice.subtotal}</span>
                        </p>
                        {parsedInvoice.discountAmount > 0 && (
                          <p className="flex justify-between text-[11px] text-emerald-600">
                            <span>Discount ({parsedInvoice.discountPercent}%):</span>
                            <span>-₹{parsedInvoice.discountAmount}</span>
                          </p>
                        )}
                        {parsedInvoice.taxAmount > 0 && (
                          <p className="flex justify-between text-[11px] text-slate-600">
                            <span>GST ({parsedInvoice.taxPercent}%):</span>
                            <span>+₹{parsedInvoice.taxAmount}</span>
                          </p>
                        )}
                        <p className="flex justify-between text-sm font-bold text-slate-900 border-t border-slate-100 pt-1">
                          <span>Grand Total:</span>
                          <span className="text-emerald-700">₹{parsedInvoice.total}</span>
                        </p>
                      </div>

                      {parsedInvoice.dueDays && (
                        <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-xl text-[10px] font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Payment reminder set to trigger automatically in {parsedInvoice.dueDays} days.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col justify-center items-center text-center py-10 text-slate-400 space-y-3">
                      <FileText className="w-12 h-12 text-slate-300 stroke-1" />
                      <div>
                        <h4 className="font-bold text-slate-700 text-sm">Waiting for parsing input...</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto mt-0.5">
                          Upar diye kisi sample prompt par click karein ya text daal kar "Parse & Create Invoice" button dbayein.
                        </p>
                      </div>
                    </div>
                  )}

                  {parsedInvoice && (
                    <div className="pt-4 border-t border-slate-100 flex gap-3">
                      <button
                        onClick={() => onOpenModal('demo')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-emerald-600/10"
                      >
                        <MessageSquare className="w-4.5 h-4.5 fill-white" />
                        Send PDF Invoice on WhatsApp
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Benefits / Outcomes Section */}
      <section className="py-20 md:py-24 bg-white" id="solution-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
              Business Benefits
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              KhataBhai aapke business me kya solve karta hai
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Hamara WhatsApp-first billing assistant aapka samay bacha kar dukan ki efficiency ko 3 guna badha deta hai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Bill 3x Faster</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Voice, text, ya photo se bill instruction bhein — bina computer khole dukan ke kisi bhi hisse se invoice taiyar karein.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Payment on Autopilot</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                KhataBhai due dates track karke auto payment reminders bhejega. WhatsApp par direct links se payment collect karein.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Professional PDF Invoices</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Har invoice dukan ke custom formatting, logo aur colors me professional PDF ki tarah customer ko WhatsApp par share ho jata hai.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Zero Software Training</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aapko ya aapke family-staff ko koi software seekhne ki jarurat nahi hai. WhatsApp par jaise chat karte hain, bas waise hi use karein.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Comparison Section */}
      <section className="py-16 bg-slate-100/40 border-y border-slate-200/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">Manual Billing vs KhataBhai</h2>
            <p className="text-xs sm:text-sm text-slate-500">Kyun traditional tareeke chhod kar aapko KhataBhai par switch karna chahiye?</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-12 gap-1 bg-slate-900 text-white p-4 font-sans text-xs font-bold uppercase tracking-wider">
              <span className="col-span-4">Feature Comparison</span>
              <span className="col-span-4 text-slate-400">Manual / Scattered Tools</span>
              <span className="col-span-4 text-emerald-400 flex items-center gap-1">KhataBhai Assistant</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="grid grid-cols-12 gap-1 p-4 items-center">
                <span className="col-span-4 font-semibold text-slate-800">Invoice Creation</span>
                <span className="col-span-4 text-slate-500">Slow, manual, repetitive</span>
                <span className="col-span-4 text-emerald-800 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Fast Text / Voice / Photo
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1 p-4 items-center">
                <span className="col-span-4 font-semibold text-slate-800">Payment Reminders</span>
                <span className="col-span-4 text-slate-500">Manual diary, repeated calls</span>
                <span className="col-span-4 text-emerald-800 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Autopilot reminders
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1 p-4 items-center">
                <span className="col-span-4 font-semibold text-slate-800">Software Learning</span>
                <span className="col-span-4 text-slate-500">High training & setup needed</span>
                <span className="col-span-4 text-emerald-800 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Works inside WhatsApp
                </span>
              </div>
              <div className="grid grid-cols-12 gap-1 p-4 items-center">
                <span className="col-span-4 font-semibold text-slate-800">Invoice Sharing</span>
                <span className="col-span-4 text-slate-500">Manual scanning, messy photo</span>
                <span className="col-span-4 text-emerald-800 font-semibold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" /> One-click PDF dispatch
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials & Mini Case Study */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
              Customer Reviews
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              Business owners KhataBhai ko kyun pasand kar rahe hain
            </h2>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Pehle har bill computer pe Vyapar khol ke banana padta tha. Ab dukan me customers ki bheed me bas WhatsApp pe 'Sharma ji ka ₹4200 ka bill' voice note bhejta hu aur bill turant chala jata hai!"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">AK</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Amit Kumar</h5>
                  <p className="text-[10px] text-slate-500">Kumar Electricals &bull; Patna</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Udhari ka follow up mere dukan me sabse bada sir-dard tha. KhataBhai se automated reminders lagane ke baad umeed se zyada jaldi payments clear ho rahe hain. Kamaal ka tool hai!"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">RG</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Rajesh Gupta</h5>
                  <p className="text-[10px] text-slate-500">Gupta Sanitary Store &bull; Indore</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                "Mujhe aur mere staff ko koi complex software chalana nahi aata tha. KhataBhai ka simple WhatsApp workflow mere pure staff ne 5 minute me samajh liya. Ab billing hamara game lagta hai."
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200/60">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">SS</div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Sanjay Sharma</h5>
                  <p className="text-[10px] text-slate-500">Sharma Plywoods &bull; Gurgaon</p>
                </div>
              </div>
            </div>

          </div>

          {/* Mini Case Study block */}
          <div className="bg-emerald-950 text-emerald-100 rounded-3xl p-6 md:p-10 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-emerald-900 shadow-xl">
            <div className="space-y-4">
              <span className="text-[10px] bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono">
                Mini Success Story
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                Agarwal Traders ne bachaya mahine ka ₹18,000 aur 40 ghante
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed">
                Noida ke ek bade Plywood Wholesaler, Agarwal Traders ko daily 40+ bills manually generate karne padte the aur payment reminders bhejane me pure 2 bande busy rehte the.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-lg font-black text-white">85%</p>
                  <p className="text-[10px] text-emerald-300 uppercase tracking-widest">Udhari Collection on-time</p>
                </div>
                <div>
                  <p className="text-lg font-black text-white">40 Hrs</p>
                  <p className="text-[10px] text-emerald-300 uppercase tracking-widest">Time Saved Monthly</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-5 rounded-2xl border border-emerald-800/50 space-y-3.5 text-xs">
              <div className="flex justify-between border-b border-emerald-800/40 pb-2">
                <span className="font-bold text-emerald-300">BUSINESS TYPE:</span>
                <span className="text-white">Wholesale Plywood Dealer</span>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-rose-300">PROBLEM BEFORE:</span>
                <p className="text-emerald-200/80 leading-relaxed text-[11px]">Bill likhne me galti hoti thi, aur bheed lagne ke karan customers gussa hote the. Payment follow-up karne ka dhang ka system nahi tha.</p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-emerald-400">WHAT CHANGED:</span>
                <p className="text-emerald-200/80 leading-relaxed text-[11px]">Har staff ne WhatsApp par 'voice command' dekar bilkul sahi format me bills generate karna shuru kiya. Due dates lagate hi reminders automated ho gaye.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Pricing teaser */}
      <section className="py-16 bg-slate-100/40 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight">Simple plans for growing businesses</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Ghar baithe setup, free onboarding assistance, aur launch offer ke sath dukan ko digitally chalayein.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-10">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 text-left space-y-4 relative flex flex-col justify-between shadow-xs">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Starter Plan</span>
                <h3 className="text-2xl font-black text-slate-900">₹999<span className="text-xs font-normal text-slate-500">/mo</span></h3>
                <p className="text-xs text-slate-500 leading-relaxed">Chhote vyapariyon ke liye jo WhatsApp billing shuru karna chahte hain.</p>
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> WhatsApp billing & reminders</p>
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Professional PDF invoices</p>
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Guided onboarding support</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('pricing')}
                className="w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors mt-4"
              >
                Plan Details Dekhein
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-500 text-left space-y-4 relative flex flex-col justify-between shadow-sm">
              <span className="absolute -top-3 right-4 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </span>
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">Growth Plan</span>
                <h3 className="text-2xl font-black text-slate-900">₹1999<span className="text-xs font-normal text-slate-500">/mo</span></h3>
                <p className="text-xs text-slate-500 leading-relaxed">Bade vyapariyon, wholesalers aur high billing volume wale distributors ke liye.</p>
                <div className="border-t border-slate-100 pt-3 space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> High-volume billing support</p>
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Priority 24/7 dedicated call help</p>
                  <p className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Advanced custom bill layouts</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('pricing')}
                className="w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-colors mt-4"
              >
                Plan Details Dekhein
              </button>
            </div>

          </div>

          <p className="text-xs text-slate-500 pt-4 font-semibold">
            🎁 Launch offer: **Free Setup + 7-Day Guided Onboarding Assistance** hamari technical team dwara.
          </p>
        </div>
      </section>

      {/* 9. Objection Card Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-sans tracking-tight">Common doubts aur questions</h2>
            <p className="text-xs sm:text-sm text-slate-500">Hum jante hain ki aapko kuch doubts ho sakte hain. Humne sabka solution nikala hai:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">"Mujhe zyada tech nahi aati hai..."</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Aapko dukan pe baithe koi billing computer chalana ya mushkil website seekhna hi nahi hai. Jaise normal WhatsApp pe voice message bheje hain, bas waise hi use karein.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">"Setup karne me time lagega?"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Bilkul nahi! Signup karte hi humari active customer team WhatsApp call par aapse connect karke aapke custom template ke anusar setup 10 min me live kardegi.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">"Kya mera dukan ka data safe rahega?"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Ha, aapka data bilkul safe aur cloud server par secure rehta hai. Isse sirf aap ya aapka authorised family/staff member hi dekh sakte hain.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">"Udhari reminders me bezzati toh nahi hogi?"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Bilkul nahi! Reminders bilkul professional aur respect wale soft tone (Jaise "Aapka Gupta Hardware ka ₹1,200 payment due hai...") me hi share kiya jata hai.</p>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Final CTA Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-emerald-600/20">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-3xl mix-blend-overlay" />
          <div className="relative space-y-6 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Aapke dukan ke liye KhataBhai ka live demo dekhna chahte hain?
            </h2>
            <p className="text-sm text-emerald-100 max-w-md mx-auto leading-relaxed">
              Bas 10 minute me hamari support team se call par connect ho kar WhatsApp billing ka live chamatkar dekhein!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <button
                onClick={() => onOpenModal('demo')}
                className="bg-white hover:bg-slate-50 text-emerald-800 font-bold px-8 py-3 rounded-xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-emerald-600 fill-emerald-600/10" />
                Book WhatsApp Demo Now
              </button>
              <button
                onClick={() => onOpenModal('trial')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white border border-emerald-500/50 font-bold px-8 py-3 rounded-xl transition-all text-sm cursor-pointer"
              >
                Start 7-Day Free Trial
              </button>
            </div>
            <p className="text-[11px] text-emerald-200 font-medium">
              Join thousands of other smart traders in Patna, Bihar, Patna City, Patna, Patna Wholesalers.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
