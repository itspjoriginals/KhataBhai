/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { X, CheckCircle, ArrowRight, MessageSquare, Landmark, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Lead } from '../types';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  ctaType: 'trial' | 'demo' | 'founder';
  initialBusinessSeg?: string;
}

export default function LeadModal({ isOpen, onClose, ctaType, initialBusinessSeg = '' }: LeadModalProps) {
  const [formData, setFormData] = useState<Lead>({
    name: '',
    phone: '',
    businessName: '',
    businessType: initialBusinessSeg || 'Hardware',
    currentMethod: 'Notebook / Diary'
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.businessName) {
      alert('Kripya sabhi fields fill karein!');
      return;
    }

    setLoading(true);

    // Simulate database write / webhook delivery
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const getPrefilledWhatsAppUrl = () => {
    const baseText = ctaType === 'trial'
      ? `Namaste KhataBhai! Mera naam *${formData.name}* hai, meri dukan *${formData.businessName}* (${formData.businessType}) hai. Main abhi *${formData.currentMethod}* se billing karta hoon. Mujhe KhataBhai ka *7-Day Free Trial* shuru karna hai. Kripya setup mein help karein.`
      : `Namaste KhataBhai! Mera naam *${formData.name}* hai, mera business *${formData.businessName}* (${formData.businessType}) hai. Mujhe KhataBhai ka personalized billing demo dekhna hai. Mera primary follow-up method *${formData.currentMethod}* hai.`;
    
    return `https://wa.me/919876543210?text=${encodeURIComponent(baseText)}`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-100"
          id="lead-capture-modal"
        >
          {/* Header Banner */}
          <div className="bg-emerald-600 px-6 py-4 text-white relative">
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 text-emerald-100 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500 text-emerald-100 text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                {ctaType === 'trial' ? '7-Day Free Trial' : ctaType === 'founder' ? 'Founder Demo' : 'WhatsApp Demo'}
              </span>
            </div>
            <h3 className="text-xl font-bold font-sans">
              {ctaType === 'trial' ? 'Apna Free Trial Shuru Karein' : 'WhatsApp Demo Book Karein'}
            </h3>
            <p className="text-emerald-100 text-xs mt-1">
              No credit card required. Hum 10 mins me setup karne me help karenge!
            </p>
          </div>

          <div className="p-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Aapka Naam *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Business/Dukan Ka Naam *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Hardware"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Business Type
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    >
                      <option value="Hardware">Hardware / Sanitary</option>
                      <option value="Electrical">Electricals</option>
                      <option value="Distributor">Local Wholesaler / Distributor</option>
                      <option value="Pharma">Medical / Pharma Store</option>
                      <option value="Service">Service / Agency / Consultant</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                      Abhi Billing Kaise Karte Hain?
                    </label>
                    <select
                      value={formData.currentMethod}
                      onChange={(e) => setFormData({ ...formData, currentMethod: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 bg-white text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    >
                      <option value="Notebook / Diary">Notebook / Khata Diary</option>
                      <option value="Excel / Word">Excel / MS Word</option>
                      <option value="Vyapar / Khatabook">Vyapar / Khatabook App</option>
                      <option value="No Billing / Parche">Sirf Kaagaj / Parche pe</option>
                      <option value="Others">Koi aur Billing Software</option>
                    </select>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex gap-2.5 items-start">
                  <Landmark className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-slate-800">KhataBhai Active Onboarding</h5>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">
                      Submit karne ke baad, aapka registration request WhatsApp pe direct hamari support team ke paas chala jaega, jo aapko set up karne me madad karegi.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all mt-4 text-sm"
                  id="submit-lead-btn"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {ctaType === 'trial' ? 'Trial Start Karein' : 'Book WhatsApp Demo'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-2">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Congratulations, {formData.name}!
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Aapki details submit ho chuki hain. Ab last step bacha hai: **Neeche diye WhatsApp Button pe click karein** taaki aapka account instantly activate ho sake!
                </p>

                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-left max-w-sm mx-auto space-y-2">
                  <div className="flex gap-2 items-center text-emerald-800 text-xs font-bold">
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Activation Key Generated</span>
                  </div>
                  <p className="text-xs text-slate-700 italic bg-white p-2.5 rounded-lg border border-emerald-100">
                    "{ctaType === 'trial' ? 'Namaste KhataBhai! Mujhe KhataBhai ka 7-Day Free Trial shuru karna hai...' : 'Namaste KhataBhai! Mujhe personalized billing demo dekhna hai...'}"
                  </p>
                </div>

                <a
                  href={getPrefilledWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={onClose}
                  className="inline-flex w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/40 transition-all text-sm cursor-pointer"
                  id="whatsapp-redirect-btn"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  WhatsApp Pe Activate Karein
                </a>
                <p className="text-[11px] text-slate-400">
                  Button click karte hi aap direct support chat pe redirect ho jaenge.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
