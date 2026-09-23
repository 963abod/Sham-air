'use client';

import React, { useState } from 'react';
import { Bot, Sparkles, Send, X, MessageSquare, ChevronUp } from 'lucide-react';
import { useDirection } from '@/hooks/useDirection';

export function AskShamConcierge({ locale }: { locale: string }) {
  const { isRTL, fontClass } = useDirection(locale);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: isRTL
        ? 'مرحباً بك في المساعد الملكي لشام للطيران. كيف يمكنني إثراء رحلتك اليوم؟'
        : 'Welcome to ASK SHAM Luxury AI Concierge. How may I refine your journey today?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const prompts = [
    isRTL ? 'ما هي خيارات وجبة العشاء في الدرجة الأولى؟' : 'What are First Suite dining options?',
    isRTL ? 'معلومات صالة الفيحاء بدمشق' : 'Damascus Al-Fayhaa Lounge details',
    isRTL ? 'أريد ترقية مقعدي إلى جناح الياسمين' : 'How can I upgrade to Jasmine Suite?',
  ];

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || query;
    if (!text.trim() || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, locale }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: isRTL
            ? 'عذراً، أواجه صعوبة في الاتصال الآن. يرجى المحاولة لاحقاً.'
            : 'Apologies, my luxury concierge link is temporarily offline. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-gradient-to-r from-sham-cardDark to-sham-basalt border border-sham-brass text-sham-brass px-4 py-3 rounded-full shadow-luxury hover:border-sham-brassHover transition-all transform hover:scale-105"
      >
        <Sparkles className="w-5 h-5 text-sham-brass animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-sham-ivory hidden sm:inline">
          {isRTL ? 'اسأل شام (الذكاء الاصطناعي)' : 'ASK SHAM AI'}
        </span>
      </button>

      {/* Drawer Container */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-8 z-50 w-[92vw] sm:w-[420px] max-h-[80vh] flex flex-col glass-panel-gold rounded-2xl border border-sham-brass/40 shadow-luxury overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-sham-dark/90 border-b border-sham-brass/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sham-brass/20 border border-sham-brass flex items-center justify-center">
                <Bot className="w-4 h-4 text-sham-brass" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-sham-ivory">ASK SHAM CONCIERGE</h3>
                <p className="text-[10px] text-sham-brass">2026 Ultra-Luxury AI Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-sham-stone hover:text-sham-ivory">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[350px]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] text-xs p-3 rounded-xl leading-relaxed ${fontClass} ${
                    m.role === 'user'
                      ? 'bg-sham-brass text-sham-dark font-medium rounded-tr-none'
                      : 'bg-sham-cardDark/90 text-sham-ivory border border-sham-brass/20 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-sham-brass animate-pulse flex items-center gap-1.5 p-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRTL ? 'جاري تجهيز الإجابة الملكية...' : 'Preparing luxury response...'}</span>
              </div>
            )}
          </div>

          {/* Prompt Recommendations */}
          <div className="px-4 py-2 border-t border-sham-borderDark/60 bg-sham-dark/50 flex flex-wrap gap-1.5">
            {prompts.map((p, i) => (
              <button
                key={i}
                onClick={() => handleSend(p)}
                className="text-[10px] bg-sham-cardDark/80 hover:bg-sham-brass/20 text-sham-stone hover:text-sham-brass px-2.5 py-1 rounded border border-sham-brass/20 transition-colors text-start"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-sham-dark border-t border-sham-brass/30 flex items-center gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isRTL ? 'اسأل المساعد الملكي عن رحلتك...' : 'Ask concierge about menus, lounge, seats...'}
              className="flex-1 bg-sham-cardDark text-xs text-sham-ivory px-3 py-2 rounded border border-sham-borderDark focus:outline-none focus:border-sham-brass"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !query.trim()}
              className="p-2 bg-sham-brass text-sham-dark rounded hover:bg-sham-brassHover disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
