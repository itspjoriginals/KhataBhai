/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, Info, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface PricingViewProps {
  onOpenModal: (type: 'trial' | 'demo') => void;
}

export default function PricingView({ onOpenModal }: PricingViewProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('annual');
  const [invoiceEstimate, setInvoiceEstimate] = useState<number>(150);

  const starterPrice = billingPeriod === 'monthly' ? 999 : 799;
  const growthPrice = billingPeriod === 'monthly' ? 1999 : 1599;

  // Pricing FAQs
  const pricingFaqs = [
    {
      q: "Kya trial period ke baad automatic credit card charge hoga?",
      a: "Nahi, KhataBhai me koi automatic hidden charge nahi hai. Aap trial bilkul free me bina card details ke shuru kar sakte hain."
    },
    {
      q: "Kya main dukan ke multiple staff members ko add kar sakta hoon?",
      a: "Haan, Growth plan ke sath aap dukan ke up to 5 employees ya partners ko WhatsApp trigger access de sakte hain."
    },
    {
      q: "Kya custom PDF bill layout ka extra charge hoga?",
      a: "Nahi, aapka first bill format (logo, business address, bank detailed scanner, GST No) humari team absolutely free me set up karegi."
    },
    {
      q: "Agar main beech me cancel karna chahu toh refund milega?",
      a: "Haan, humari 15-day no questions asked money-back guarantee hai agar aap workflow se santusht nahi hain."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans" id="pricing-view-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          Transparent Pricing
        </span>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">
          Sasta aur simple plans aapki dukan ke liye
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Apna plan select karein aur automatic WhatsApp billing ka laabh uthayein. Setup me humari team complete help karegi.
        </p>

        {/* Toggle billing period */}
        <div className="inline-flex items-center gap-2.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/60 mt-4 select-none">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              billingPeriod === 'monthly' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingPeriod('annual')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              billingPeriod === 'annual' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500'
            }`}
          >
            Annual (Save 20%)
            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase">Save</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-8 items-stretch">
        
        {/* Starter Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 relative flex flex-col justify-between shadow-xs">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Starter Plan</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-950">₹{starterPrice}</span>
                <span className="text-xs text-slate-400">/mo {billingPeriod === 'annual' && 'billed annually'}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Chhote dukan-dar aur traders ke liye jo basic bill aur quotations WhatsApp pe lana chahte hain.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3 text-xs text-slate-600 font-medium">
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Up to 300 Invoices per month</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Voice-to-Invoice automatic parsing</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Professional PDF Share formats</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Soft payment reminders auto-dispatch</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Complete Hindi / Hinglish translation</p>
            </div>
          </div>

          <div className="pt-8">
            <button
              id="starter-plan-btn"
              onClick={() => onOpenModal('trial')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              Start 7-Day Free Trial
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Growth Plan */}
        <div className="bg-white rounded-3xl p-8 border-2 border-emerald-500 relative flex flex-col justify-between shadow-md">
          <span className="absolute -top-3.5 right-6 bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
            Best Value &bull; Popular
          </span>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">Growth Plan</span>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-950">₹{growthPrice}</span>
                <span className="text-xs text-slate-400">/mo {billingPeriod === 'annual' && 'billed annually'}</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Wholesalers, distributors, aur heavy billing frequency dukan-daron ke liye.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-5 space-y-3 text-xs text-slate-600 font-medium">
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Unlimited Invoices & Quotations</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Multi-user trigger (up to 5 staff members)</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Advanced custom bills with UPI scanners</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Priority 24/7 technical call support</p>
              <p className="flex items-center gap-2"><Check className="w-4.5 h-4.5 text-emerald-600" /> Premium payment status reporting logs</p>
            </div>
          </div>

          <div className="pt-8">
            <button
              id="growth-plan-btn"
              onClick={() => onOpenModal('demo')}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/10"
            >
              <Sparkles className="w-4 h-4 fill-white" />
              Book Growth Demo
            </button>
          </div>
        </div>

      </div>

      {/* Interactive Pricing Estimator Calculator */}
      <section className="bg-slate-100 p-6 md:p-10 rounded-3xl mt-16 max-w-4xl mx-auto border border-slate-200/60 font-sans">
        <div className="text-center space-y-2 mb-8">
          <h3 className="font-extrabold text-slate-900 text-lg">Mera Dukan Calculator</h3>
          <p className="text-xs text-slate-500">Estimates your monthly time and money savings with KhataBhai billing workflow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Main daily lagbhag kitne invoices banata hoon?
            </label>
            <div className="space-y-2">
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={invoiceEstimate}
                onChange={(e) => setInvoiceEstimate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>10 bills</span>
                <span className="text-emerald-700 font-bold">{invoiceEstimate} bills monthly</span>
                <span>500 bills</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 bg-white p-5 rounded-2xl border border-slate-200/80 text-center space-y-2">
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">Savings Estimator</span>
            <p className="text-xs text-slate-400">Aap bacha sakte hain lagbhag:</p>
            <p className="text-3xl font-black text-emerald-700">₹{Math.round(invoiceEstimate * 35)} <span className="text-xs font-normal text-slate-400">/mo</span></p>
            <p className="text-[10px] text-slate-500 leading-normal">
              Calculated on 5 mins saved per bill + reduction of 15% in lost payments via auto-reminders.
            </p>
          </div>

        </div>
      </section>

      {/* Pricing Accordion FAQs */}
      <section className="mt-16 max-w-3xl mx-auto">
        <h3 className="font-extrabold text-slate-900 text-lg text-center mb-8">Frequently asked questions about billing</h3>
        <div className="space-y-4">
          {pricingFaqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h5 className="font-bold text-slate-900 text-sm flex gap-1.5 items-start">
                <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                {faq.q}
              </h5>
              <p className="text-xs text-slate-600 mt-1.5 ml-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
