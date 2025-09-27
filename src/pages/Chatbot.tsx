import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCurrentUser } from "@/lib/auth";
import { Loader2, Bot, User } from "lucide-react";

type Message = { id: string; role: "user" | "assistant"; text: string; isLoading?: boolean };

const langs = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "mr", name: "मराठी" },
];

// Fallback responses for when API is not available
function getFallbackResponse(text: string, lang: string): string {
  const lower = text.toLowerCase();
  const answers = {
    en: {
      greeting: "Namaste! I'm your Ayurveda guide. Ask about Panchakarma, diet, herbs, or lifestyle.",
      diet: "Favor warm, light, freshly cooked foods. Avoid cold and processed items.",
      panchakarma: "Panchakarma includes therapies like Vamana, Virechana, Basti, Nasya, and Raktamokshana.",
      safety: "Always consult your practitioner before herbal remedies, especially if pregnant or on medication.",
    },
    hi: {
      greeting: "नमस्ते! मैं आपका आयुर्वेद मार्गदर्शक हूँ। पंचकर्म, आहार, जड़ी-बूटियाँ या जीवनशैली पूछें।",
      diet: "गर्म, हल्का, ताज़ा भोजन लें। ठंडा और प्रोसेस्ड भोजन से बचें।",
      panchakarma: "पंचकर्म में वमन, विरेचन, बस्ती, नस्य और रक्तमोक्षण शामिल हैं।",
      safety: "जड़ी-बूटियाँ लेने से पहले अपने वैद्य से परामर्श करें, खासकर गर्भावस्था या दवाइयों में।",
    },
    mr: {
      greeting: "नमस्ते! मी तुमचा आयुर्वेद मार्गदर्शक आहे. पंचकर्म, आहार, औषधी किंवा जीवनशैली विचारा.",
      diet: "उबदार, हलके, ताजे अन्न घ्या. थंड आणि प्रक्रियायुक्त पदार्थ टाळा.",
      panchakarma: "पंचकर्मात वमन, विरेचन, बस्ती, नस्य आणि रक्तमोक्षण यांचा समावेश होतो.",
      safety: "औषधी घेण्यापूर्वी वैद्यांचा सल्ला घ्या, विशेषतः गर्भधारणा किंवा औषधे चालू असल्यास.",
    },
  } as const;

  const a = answers[lang as keyof typeof answers] || answers.en;
  if (lower.includes("diet") || lower.includes("food") || lower.includes("आहार") || lower.includes("आहार")) return a.diet;
  if (lower.includes("panchakarma") || lower.includes("therapy") || lower.includes("पंचकर्म")) return a.panchakarma;
  if (lower.includes("safe") || lower.includes("pregnan") || lower.includes("दवा") || lower.includes("औषध")) return a.safety;
  return a.greeting;
}

// Gemini API integration
async function getGeminiResponse(prompt: string, language: string): Promise<string> {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!API_KEY) {
    console.warn("Gemini API key not found, using fallback responses");
    return getFallbackResponse(prompt, language);
  }

  try {
    const systemPrompt = `You are a helpful AI assistant with expertise in Ayurveda and general knowledge. 
    Respond in ${language === 'en' ? 'English' : language === 'hi' ? 'Hindi' : 'Marathi'}.
    
    Guidelines:
    - Answer any question the user asks, whether about Ayurveda, general health, technology, science, or any other topic
    - For Ayurveda-related questions, provide detailed, accurate information
    - For medical/health questions, always recommend consulting healthcare professionals
    - For general questions, provide helpful, accurate information
    - Keep responses informative but concise (2-3 paragraphs max)
    - Be friendly and conversational
    - If you don't know something, say so honestly`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser question: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || getFallbackResponse(prompt, language);
  } catch (error) {
    console.error("Gemini API error:", error);
    return getFallbackResponse(prompt, language);
  }
}

const Chatbot = () => {
  const user = getCurrentUser();
  const [lang, setLang] = useState("en");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", role: "assistant", text: "Namaste! I'm your AI assistant with expertise in Ayurveda and general knowledge. Ask me anything - about Panchakarma, health, technology, science, or any other topic!" },
  ]);

  const ayurvedaQuestions = [
    "What is Panchakarma therapy?",
    "What are the benefits of Abhyanga massage?",
    "How does Shirodhara help with stress?",
    "What is the Ayurvedic diet for Vata dosha?",
    "What herbs are good for digestion?",
    "How to balance Pitta dosha?",
    "What is Basti therapy?",
    "What are the side effects of Panchakarma?",
    "How long does a Panchakarma treatment take?",
    "What should I eat during Panchakarma?",
    "What is the difference between Vamana and Virechana?",
    "How does Nasya therapy work?",
    "What is Raktamokshana used for?",
    "What are the contraindications for Panchakarma?",
    "How to prepare for Panchakarma therapy?"
  ];
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || isLoading) return;
    
    const userMsg: Message = { id: Math.random().toString(36), role: "user", text };
    const loadingMsg: Message = { id: Math.random().toString(36), role: "assistant", text: "", isLoading: true };
    
    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(text, lang);
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === loadingMsg.id 
            ? { ...msg, text: response, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error("Error getting response:", error);
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === loadingMsg.id 
            ? { ...msg, text: getFallbackResponse(text, lang), isLoading: false }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Assistant {user ? `· Welcome, ${user.name}` : ""}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <Label className="font-semibold">Language</Label>
            <select
              className="h-10 rounded-xl border border-slate-300 bg-background px-3 focus:border-emerald-500 focus:ring-emerald-500"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              {langs.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ayurveda Question Suggestions */}
          <div className="mb-4">
            <Label className="text-sm font-semibold text-slate-700 mb-2 block">Try these Ayurveda questions:</Label>
            <div className="flex flex-wrap gap-2">
              {ayurvedaQuestions.slice(0, 6).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInput(question)}
                  className="text-xs rounded-full border-slate-300 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          <div className="h-[50vh] overflow-y-auto border rounded-2xl p-4 space-y-4 bg-slate-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex items-start space-x-3 max-w-[80%] ${m.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`p-2 rounded-full ${m.role === "user" ? "bg-emerald-100" : "bg-slate-200"}`}>
                    {m.role === "user" ? <User className="w-4 h-4 text-emerald-600" /> : <Bot className="w-4 h-4 text-slate-600" />}
                  </div>
                  <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                    m.role === "user" 
                      ? "bg-emerald-600 text-white" 
                      : "bg-white border border-slate-200"
                  }`}>
                    {m.isLoading ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-slate-600">Thinking...</span>
                      </div>
                    ) : (
                      <p className="text-sm font-medium whitespace-pre-wrap">{m.text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="mt-4 flex gap-3">
            <Input
              placeholder="Ask me anything - Ayurveda, health, technology, science, or any topic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !isLoading && send()}
              disabled={isLoading}
              className="flex-1 rounded-xl border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <Button 
              onClick={send} 
              disabled={isLoading || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Send"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;


