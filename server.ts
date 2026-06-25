/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper function to initialize Gemini safely (lazy loading)
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return aiClient;
}

// Full-stack API Endpoints
app.post("/api/parse-invoice", async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== "string") {
    res.status(400).json({ error: "Instruction text is required" });
    return;
  }

  // Fallback fallback generator (to guarantee 100% operational uptime)
  const generateFallbackInvoice = (inputText: string) => {
    // Basic regex parser for offline / missing-key resilience
    const textLower = inputText.toLowerCase();
    let customerName = "Sharma Traders";
    if (textLower.includes("gupta")) customerName = "Gupta Hardware";
    else if (textLower.includes("verma")) customerName = "Verma Electricals";
    else if (textLower.includes("agarwal")) customerName = "Agarwal Wholesalers";
    else if (textLower.includes("mehta")) customerName = "Mehta Medicos";
    
    // Extract items or set up typical items based on keyword
    let items = [
      { name: "LED Light Bulbs (9W)", quantity: 20, rate: 120, total: 2400 },
      { name: "Modular Switches", quantity: 50, rate: 45, total: 2250 },
      { name: "Heavy Duty Wires (100m)", quantity: 2, rate: 1850, total: 3700 }
    ];

    if (textLower.includes("fan")) {
      items = [
        { name: "Premium Ceiling Fan", quantity: 5, rate: 1650, total: 8250 },
        { name: "Exhaust Fan 12 Inch", quantity: 2, rate: 1100, total: 2200 }
      ];
    } else if (textLower.includes("paint") || textLower.includes("putty")) {
      items = [
        { name: "Acrylic Emulsion Paint (20L)", quantity: 3, rate: 3800, total: 11400 },
        { name: "Wall Putty Bags (40kg)", quantity: 10, rate: 450, total: 4500 }
      ];
    } else if (textLower.includes("medicine") || textLower.includes("pharma") || textLower.includes("tablet")) {
      items = [
        { name: "Paracetamol 650mg (Strip of 15)", quantity: 15, rate: 35, total: 525 },
        { name: "Amoxycillin Capsules 500mg", quantity: 8, rate: 120, total: 960 },
        { name: "Multivitamin Active Syrup", quantity: 12, rate: 180, total: 2160 }
      ];
    }

    const subtotal = items.reduce((acc, item) => acc + item.total, 0);
    const discountPercent = textLower.includes("discount") || textLower.includes("off") ? 10 : 0;
    const discountAmount = Math.round((subtotal * discountPercent) / 100);
    const taxPercent = 18; // Standard GST
    const taxAmount = Math.round(((subtotal - discountAmount) * taxPercent) / 100);
    const total = subtotal - discountAmount + taxAmount;

    return {
      invoiceNumber: `KB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName,
      date: new Date().toISOString().split("T")[0],
      items,
      subtotal,
      discountPercent,
      discountAmount,
      taxPercent,
      taxAmount,
      total,
      dueDays: textLower.includes("reminder") || textLower.includes("baad") || textLower.includes("days") ? 7 : undefined,
      businessName: "KhataBhai Demo Store",
      businessAddress: "Sector 62, Noida, Uttar Pradesh"
    };
  };

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // No valid API key, return a resilient parsed fallback response
      const fallback = generateFallbackInvoice(text);
      res.json({ invoice: fallback, isDemoMock: true });
      return;
    }

    const systemInstruction = `You are KhataBhai AI, the world's best WhatsApp-first billing and payment reminder assistant for Indian small businesses.
Your task is to parse unstructured billing instructions (often written in Hinglish, English, or Hindi/Hinglish) into a clean, structured JSON invoice.

Instructions may include:
- Customer Name (e.g., "Gupta Hardware", "Sharma ji", "Mehta Medicals")
- List of items with names, quantities, and rates/prices (e.g., "10 bulbs 120 ke bhav se", "2 boxes fans, rate 1500")
- Discounts (e.g., "10% discount", "₹500 discount")
- Taxes (e.g., "GST apply karo", "18% tax")
- Reminders or payment terms (e.g., "7 days reminder set karo", "payment due in 5 days")

Return ONLY the raw JSON object conforming strictly to the Schema. Do not wrap in markdown code blocks like \`\`\`json. Return just raw JSON text.

JSON Schema format:
{
  "invoiceNumber": "string (generate clean number like KB-XXXX)",
  "customerName": "string (extract customer name or default to 'Regular Customer')",
  "customerPhone": "string or null",
  "date": "string (YYYY-MM-DD format, default to today)",
  "items": [
    {
      "name": "string (clean item name)",
      "quantity": "number (extract quantity, default to 1)",
      "rate": "number (rate per item)",
      "total": "number (quantity * rate)"
    }
  ],
  "subtotal": "number (sum of items total)",
  "discountPercent": "number (optional percentage)",
  "discountAmount": "number (optional calculated or fixed amount)",
  "taxPercent": "number (optional percentage, use 18 for GST if implied, default to 0)",
  "taxAmount": "number (optional tax amount calculated on subtotal - discount)",
  "total": "number (subtotal - discountAmount + taxAmount)",
  "dueDays": "number (optional number of days before payment reminder is sent, extract if mentioned or default to null)",
  "businessName": "string (default to 'KhataBhai Demo Store')",
  "businessAddress": "string (default to 'New Delhi, India')"
}`;

    const prompt = `Convert this user billing instruction into structured invoice JSON:
"${text}"
If details are completely missing, try to generate a realistic set of items and details suitable for a trader based on the context.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.1,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            invoiceNumber: { type: Type.STRING },
            customerName: { type: Type.STRING },
            customerPhone: { type: Type.STRING },
            date: { type: Type.STRING },
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  quantity: { type: Type.NUMBER },
                  rate: { type: Type.NUMBER },
                  total: { type: Type.NUMBER }
                },
                required: ["name", "quantity", "rate", "total"]
              }
            },
            subtotal: { type: Type.NUMBER },
            discountPercent: { type: Type.NUMBER },
            discountAmount: { type: Type.NUMBER },
            taxPercent: { type: Type.NUMBER },
            taxAmount: { type: Type.NUMBER },
            total: { type: Type.NUMBER },
            dueDays: { type: Type.NUMBER },
            businessName: { type: Type.STRING },
            businessAddress: { type: Type.STRING }
          },
          required: ["invoiceNumber", "customerName", "date", "items", "subtotal", "total"]
        }
      }
    });

    const responseText = response.text ? response.text.trim() : "";
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    const invoice = JSON.parse(responseText);
    res.json({ invoice, isDemoMock: false });

  } catch (error) {
    console.error("Gemini parse failed, falling back to rule-based parsing:", error);
    const fallback = generateFallbackInvoice(text);
    res.json({ invoice: fallback, isDemoMock: true, parseError: true });
  }
});

// Serve frontend assets
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
