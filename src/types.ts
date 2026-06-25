/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InvoiceItem {
  name: string;
  quantity: number;
  rate: number;
  total: number;
}

export interface Invoice {
  invoiceNumber: string;
  customerName: string;
  customerPhone?: string;
  date: string;
  items: InvoiceItem[];
  discountPercent?: number;
  discountAmount?: number;
  taxPercent?: number;
  taxAmount?: number;
  subtotal: number;
  total: number;
  dueDays?: number;
  businessName?: string;
  businessAddress?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
}

export interface Lead {
  name: string;
  phone: string;
  businessName: string;
  businessType: string;
  currentMethod: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  invoice?: Invoice;
  isTyping?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  businessName: string;
  businessType: string;
  location: string;
  quote: string;
  outcome: string;
  avatarUrl?: string;
}

export interface UseCase {
  id: string;
  title: string;
  icon: string;
  description: string;
  painPoint: string;
  outcome: string;
  exampleCommand: string;
  sampleInvoiceItems: InvoiceItem[];
}
