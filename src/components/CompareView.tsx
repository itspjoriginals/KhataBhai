/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, X, HelpCircle, ArrowRight } from 'lucide-react';

interface CompareViewProps {
  onOpenModal: (type: 'trial' | 'demo') => void;
}

export default function CompareView({ onOpenModal }: CompareViewProps) {
  
  const comparisons = [
    {
      feature: "Invoice creation on mobile",
      khatabhai: "Yes, via simple WhatsApp chat/voice",
      khatabook: "Manual data input required",
      vyapar: "Complex mobile interface required",
      manual: "Slow, pen & paper calculations"
    },
    {
      feature: "Requires app installation",
      khatabhai: "No, works directly on WhatsApp",
      khatabook: "Yes, must download 80MB app",
      vyapar: "Yes, desktop/mobile app setup needed",
      manual: "No, diary books"
    },
    {
      feature: "Voice command billing",
      khatabhai: "Yes, supports Hindi / Hinglish voice",
      khatabook: "No, manual typing only",
      vyapar: "No support",
      manual: "N/A"
    },
    {
      feature: "Automated payment reminders",
      khatabhai: "Yes, triggers automatically on due date",
      khatabook: "No, must click to send manually",
      vyapar: "Manual reminders required",
      manual: "Need to remember & call manually"
    },
    {
      feature: "GST and VAT calculations",
      khatabhai: "Yes, calculated automatically by AI",
      khatabook: "Basic calculations only",
      vyapar: "Yes, manual GST configuration",
      manual: "High chance of calculator error"
    },
    {
      feature: "Employee triggers support",
      khatabhai: "Yes, staff can bill via WhatsApp directly",
      khatabook: "No employee workflows",
      vyapar: "Requires paid multi-user license",
      manual: "N/A"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-sans" id="compare-view-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          Product Comparison
        </span>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">
          KhataBhai vs Vyapar vs Khatabook vs Manual
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Samajhiye kyun KhataBhai local Indian traders aur wholesale distributors ke liye sabse simple aur functional billing option hai.
        </p>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-5xl mx-auto">
        
        {/* Responsive horizontal scroll container for table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            
            {/* Table Head */}
            <thead>
              <tr className="bg-slate-900 text-white font-sans text-xs font-bold uppercase tracking-wider select-none">
                <th className="p-4 pl-6 min-w-[200px]">Capabilities / Feature</th>
                <th className="p-4 bg-emerald-950/80 text-emerald-400 font-extrabold border-x border-slate-800 min-w-[180px]">KhataBhai Assistant</th>
                <th className="p-4 text-slate-400 min-w-[150px]">Khatabook App</th>
                <th className="p-4 text-slate-400 min-w-[150px]">Vyapar ERP</th>
                <th className="p-4 text-slate-400 pr-6 min-w-[150px]">Notebook / Diary</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-xs sm:text-sm divide-y divide-slate-100 font-medium">
              {comparisons.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-slate-800">{row.feature}</td>
                  
                  {/* KhataBhai column */}
                  <td className="p-4 bg-emerald-50/20 text-emerald-900 font-semibold border-x border-slate-100 flex-row items-center gap-1.5">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.khatabhai}</span>
                    </div>
                  </td>

                  {/* Khatabook column */}
                  <td className="p-4 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {row.khatabook}
                    </span>
                  </td>

                  {/* Vyapar column */}
                  <td className="p-4 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {row.vyapar}
                    </span>
                  </td>

                  {/* Manual diary column */}
                  <td className="p-4 pr-6 text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      {row.manual}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

      {/* Trust reassurance banner */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center max-w-4xl mx-auto mt-12 space-y-4">
        <h4 className="font-extrabold text-slate-900 text-base">Humein pure accounting tool ki tarah use nahi karna hai?</h4>
        <p className="text-xs text-slate-500 max-w-xl mx-auto leading-relaxed">
          Zaroori nahi hai! Aap Vyapar ya manual diaries apni tax filing ke liye rakh sakte hain. KhataBhai ko sirf apne **WhatsApp sales, PDF sharing, aur automatic udhari reminders follow-up** ke liye as an add-on assistant use karein!
        </p>
        <button
          onClick={() => onOpenModal('trial')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs inline-flex items-center gap-1 cursor-pointer"
        >
          Activate Free Add-on Trial
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
