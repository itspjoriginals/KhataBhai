/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  MessageSquare, Volume2, FileText, Send, CheckCircle2, 
  Layers, ChevronRight, Check, Sparkles, Printer, RefreshCw
} from 'lucide-react';
import { Invoice, Message } from '../types';

interface DemoViewProps {
  onOpenModal: (type: 'trial' | 'demo') => void;
}

export default function DemoView({ onOpenModal }: DemoViewProps) {
  const [activeTab, setActiveTab] = useState<'hardware' | 'distributor' | 'pharma' | 'service'>('hardware');
  
  // Custom prompt input state
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const initialMessages: Message[] = [
    {
      id: "1",
      sender: "assistant",
      text: "Namaste! KhataBhai AI Billing Assistant me aapka swagat hai. Main aapki dukan ke bills, quotations, aur payment reminders WhatsApp par instantly bana sakta hoon. Just type or send voice message!",
      timestamp: "10:00 AM"
    }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  // Industry presets
  const presets = {
    hardware: {
      prompt: "Sharma Hardware ka bill banao: 10 modular boards rate 320 each, 2 bundles thick copper wires rate 1850, and give 5% discount",
      hint: "Hardware and sanitary shop layout example"
    },
    distributor: {
      prompt: "Agarwal Wholesalers ka bill banao: 20 boxes plywood hinges rate 450 per box, 15 tubes laminate adhesive rate 350, with standard 18% GST",
      hint: "Heavy wholesale trading layout example"
    },
    pharma: {
      prompt: "Mehta Medicos: 25 packs multi-vitamin capsules rate 180 each, 15 syrups rate 95, due payment reminder set for 15 days",
      hint: "Medical store and pharma follow up"
    },
    service: {
      prompt: "Client Rajesh Kumar ke liye quotation PDF: 1 day heavy electrical consultancy rate 15000, and standard site installation charge 4500",
      hint: "Contractors & service agencies quotation"
    }
  };

  const handleRunPreset = (type: 'hardware' | 'distributor' | 'pharma' | 'service') => {
    setActiveTab(type);
    setInputText(presets[type].prompt);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    // Typing state mock
    const typingId = "typing-" + Date.now();
    setMessages(prev => [...prev, {
      id: typingId,
      sender: "assistant",
      text: "KhataBhai AI bill taiyar kar raha hai...",
      timestamp: "",
      isTyping: true
    }]);

    try {
      const response = await fetch("/api/parse-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToSend })
      });
      const data = await response.json();

      setMessages(prev => prev.filter(m => m.id !== typingId));

      if (data.invoice) {
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: "assistant",
          text: `Aapka invoice taiyar hai! Customer name: ${data.invoice.customerName}. Bill total ₹${data.invoice.total}. Neeche PDF preview dekhiye.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          invoice: data.invoice
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error("Invalid invoice format received");
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => prev.filter(m => m.id !== typingId));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: "assistant",
        text: "Kripya koshish karein dobara. Internet me thodi samasya lag rahi hai.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Run initial preset to guide user
  useEffect(() => {
    setInputText(presets.hardware.prompt);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans" id="demo-view-container">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1.5 rounded-full tracking-wider uppercase">
          Interactive Walkthrough
        </span>
        <h1 className="text-3xl font-black text-slate-950 tracking-tight">
          KhataBhai kaise kaam karta hai — Live Demo
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Apni industry ke tab par click karein aur dukan ka custom order text/voice message run karke live output dekhiye!
        </p>
      </div>

      {/* Preset Industry Selection Tab Bar */}
      <div className="flex flex-wrap gap-2.5 justify-center mb-8">
        {(['hardware', 'distributor', 'pharma', 'service'] as const).map((type) => (
          <button
            key={type}
            onClick={() => handleRunPreset(type)}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeTab === type
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/15'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {type === 'hardware' && 'Hardware Shop'}
            {type === 'distributor' && 'Wholesale Dealer'}
            {type === 'pharma' && 'Medical / Pharma'}
            {type === 'service' && 'Service Quotation'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
        
        {/* Left Hand: WhatsApp Chat Simulation */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800 relative">
            
            {/* WhatsApp Top Header Bar */}
            <div className="bg-emerald-800 px-4 py-3 flex justify-between items-center text-white border-b border-emerald-900 select-none">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-xs shadow">KB</div>
                <div>
                  <h3 className="text-xs font-bold leading-tight">KhataBhai Assistant</h3>
                  <p className="text-[10px] text-emerald-300 flex items-center gap-1 leading-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" /> Always active
                  </p>
                </div>
              </div>
            </div>

            {/* Conversation Messages area */}
            <div className="p-4 space-y-4 min-h-[380px] max-h-[460px] overflow-y-auto bg-slate-950/40 text-[12px] flex flex-col justify-end">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.isTyping ? (
                      <div className="bg-slate-800 text-slate-300 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                        <span>{msg.text}</span>
                      </div>
                    ) : (
                      <div className={`p-3 rounded-2xl max-w-[85%] shadow-xs space-y-1 ${
                        msg.sender === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-slate-800 text-slate-200 rounded-tl-none'
                      }`}>
                        <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                        
                        {msg.invoice && (
                          <div className="bg-slate-950 text-slate-300 p-2.5 rounded-xl border border-slate-800/80 font-mono text-[10px] mt-2 space-y-1">
                            <p className="flex justify-between border-b border-slate-800 pb-1 font-sans text-slate-400">
                              <span>No: {msg.invoice.invoiceNumber}</span>
                              <span>Date: {msg.invoice.date}</span>
                            </p>
                            <p className="font-bold text-white font-sans text-xs">{msg.invoice.customerName}</p>
                            {msg.invoice.items.slice(0, 2).map((item, idx) => (
                              <p key={idx} className="truncate">{item.quantity} x {item.name} @ ₹{item.rate}</p>
                            ))}
                            {msg.invoice.items.length > 2 && <p className="text-slate-500 font-sans">+ {msg.invoice.items.length - 2} items more...</p>}
                            <p className="flex justify-between border-t border-slate-800 pt-1 font-sans font-bold text-white mt-1">
                              <span>Grand Total</span>
                              <span className="text-emerald-400">₹{msg.invoice.total}</span>
                            </p>
                          </div>
                        )}
                        <span className={`text-[9px] block text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-500'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Input message dispatcher */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2.5 items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                placeholder="Dukan ka instruction likhein yaha..."
                className="flex-1 bg-slate-800 text-slate-100 text-xs px-4 py-2.5 rounded-full focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={loading || !inputText.trim()}
                className="w-9 h-9 bg-emerald-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-md disabled:opacity-50 animate-pulse"
              >
                <Send className="w-4 h-4 fill-white" />
              </button>
            </div>

          </div>

          <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex gap-3 items-start text-xs text-slate-600 leading-normal">
            <Volume2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-800">Voice-to-Invoice active in real KhataBhai</p>
              <p className="mt-0.5">Aap phone par normal voice notes bhejenge like **"Pandey Electricals ka ₹4,500 ka bill, 2 switches box rate 2250"** aur hamara AI structured PDF generate karke send karega.</p>
            </div>
          </div>
        </div>

        {/* Right Hand: Generated PDF Bill Preview Panel */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 text-white px-5 py-3.5 flex justify-between items-center border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-black uppercase tracking-widest font-mono">Invoice Viewer</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Print PDF"
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Real PDF Layout visualization */}
            <div className="p-6 md:p-8 min-h-[420px] flex flex-col justify-between">
              
              {/* If we have a parsed invoice to render */}
              {messages.some(m => m.invoice) ? (
                (() => {
                  const latestInvoice = [...messages].reverse().find(m => m.invoice)?.invoice as Invoice;
                  return (
                    <div className="space-y-6 text-xs font-sans">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-base">{latestInvoice.businessName || 'KhataBhai Demo Store'}</h3>
                          <p className="text-slate-500 text-[10px]">{latestInvoice.businessAddress || 'India'}</p>
                        </div>
                        <div className="text-right">
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                            Original Bill
                          </span>
                          <p className="text-[11px] text-slate-500 mt-1">{latestInvoice.invoiceNumber}</p>
                          <p className="text-[10px] text-slate-400">Date: {latestInvoice.date}</p>
                        </div>
                      </div>

                      {/* Billed info */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Billed To:</p>
                          <p className="font-bold text-slate-800 text-sm mt-0.5">{latestInvoice.customerName}</p>
                          {latestInvoice.customerPhone && <p className="text-slate-500 text-[10px]">{latestInvoice.customerPhone}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">Payment Method:</p>
                          <p className="font-bold text-slate-800 mt-0.5">UPI / Cash / Bank</p>
                        </div>
                      </div>

                      {/* Detailed itemized list */}
                      <div className="border-t border-b border-slate-100 py-4">
                        <div className="grid grid-cols-12 gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <span className="col-span-6">Item details</span>
                          <span className="col-span-2 text-center">Quantity</span>
                          <span className="col-span-2 text-right">Price / Rate</span>
                          <span className="col-span-2 text-right">Amount</span>
                        </div>
                        <div className="divide-y divide-slate-50">
                          {latestInvoice.items.map((item, idx) => (
                            <div key={idx} className="grid grid-cols-12 gap-1 py-2 font-medium text-slate-700">
                              <span className="col-span-6 font-semibold text-slate-800">{item.name}</span>
                              <span className="col-span-2 text-center">{item.quantity}</span>
                              <span className="col-span-2 text-right">₹{item.rate}</span>
                              <span className="col-span-2 text-right font-bold text-slate-900">₹{item.total}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Summary layout */}
                      <div className="space-y-1.5 text-right max-w-xs ml-auto">
                        <div className="flex justify-between text-slate-600 text-[11px]">
                          <span>Subtotal:</span>
                          <span className="font-medium text-slate-900">₹{latestInvoice.subtotal}</span>
                        </div>
                        {latestInvoice.discountAmount && latestInvoice.discountAmount > 0 ? (
                          <div className="flex justify-between text-emerald-600 text-[11px]">
                            <span>Discount ({latestInvoice.discountPercent}%):</span>
                            <span>-₹{latestInvoice.discountAmount}</span>
                          </div>
                        ) : null}
                        {latestInvoice.taxAmount && latestInvoice.taxAmount > 0 ? (
                          <div className="flex justify-between text-slate-600 text-[11px]">
                            <span>GST ({latestInvoice.taxPercent}%):</span>
                            <span>+₹{latestInvoice.taxAmount}</span>
                          </div>
                        ) : null}
                        <div className="flex justify-between text-sm font-black text-slate-950 border-t border-slate-100 pt-2">
                          <span>Grand Total:</span>
                          <span className="text-emerald-700">₹{latestInvoice.total}</span>
                        </div>
                      </div>

                      {/* Reminder terms metadata */}
                      {latestInvoice.dueDays && (
                        <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-100 flex gap-2 items-center text-[10px]">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div>
                            <span className="font-bold">Reminder Set Successfully</span>
                            <p className="text-slate-600 text-[9px] mt-0.5">KhataBhai will automatically trigger due payment reminders to customer in {latestInvoice.dueDays} days if unpaid.</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="flex-1 flex flex-col justify-center items-center text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border border-slate-200">
                    <FileText className="w-8 h-8 stroke-1" />
                  </div>
                  <div className="space-y-1 max-w-xs">
                    <h4 className="font-extrabold text-slate-800 text-sm">Invoice preview is empty</h4>
                    <p className="text-xs text-slate-500">
                      Left side phone screen par **preset run karein** ya chat par apna instruction likh kar **Send button** dabaein.
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom dynamic action bar */}
              <div className="pt-6 border-t border-slate-100 space-y-3 mt-6">
                <button
                  onClick={() => onOpenModal('trial')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <Sparkles className="w-4 h-4 fill-white" />
                  Apni Dukan Ke Liye Setup Karein
                </button>
                <div className="flex justify-between items-center text-[10px] text-slate-400 uppercase tracking-wider font-mono px-1">
                  <span>Calculated with 100% Accuracy</span>
                  <span>GST Ready Invoice</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
