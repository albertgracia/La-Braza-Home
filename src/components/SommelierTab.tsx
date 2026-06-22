/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useTransition } from 'react';
import { Wine, Message } from '../types.ts';
import { WINES_DATA } from '../data.ts';
import { Send, GlassWater, Loader2, Sparkles, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface SommelierTabProps {
  onAddWineToCart: (wine: Wine) => void;
  openCartDrawer: () => void;
}

export default function SommelierTab({ onAddWineToCart, openCartDrawer }: SommelierTabProps) {
  // Pre-load Chat list matching the exact screenshot layout initially
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'initial-user',
      sender: 'user',
      text: 'Busco un vino para acompañar un cordero asado.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      id: 'initial-sommelier',
      sender: 'sommelier',
      text: "Para un cordero asado, te recomiendo encarecidamente un vino con carácter. Un Rioja Gran Reserva, como el 'Marqués de Riscal Gran Reserva 2016', es ideal. Sus notas de frutos negros maduros, especias y toques ahumados realzarán la riqueza del plato.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      featuredWineId: 'riscal-gran-reserva-2016',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isPending, startTransition] = useTransition();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll inside chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPending]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isPending) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptToSend = inputText;
    setInputText('');

    startTransition(async () => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: promptToSend,
            history: messages.map((m) => ({
              role: m.sender,
              text: m.text,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error('Servidor offline o error en API');
        }

        const data = await response.json();
        const sommelierMsg: Message = {
          id: `msg-${Date.now()}-sommelier`,
          sender: 'sommelier',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          featuredWineId: data.recommendedWineId || undefined,
        };

        setMessages((prev) => [...prev, sommelierMsg]);
      } catch (err) {
        console.error('Error al contactar al sumiller de IA: ', err);
        // Fallback local robusto
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: `msg-${Date.now()}-fallback`,
              sender: 'sommelier',
              text: 'Disculpe las molestias, caballero o dama. He experimentado una ligera interferencia en la comunicación con la cava. Sin embargo, basándome en su consulta, le sugiero de corazón explorar nuestra selección "Viña Ardanza Selección Especial 2015". Es un coupage sublime con extraordinario aroma a coco, torrefacto y regaliz.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              featuredWineId: 'vina-ardanza-2015',
            },
          ]);
        }, 1000);
      }
    });
  };

  const insertSuggestion = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="relative w-full overflow-hidden" id="sommelier-tab-root">
      {/* Golden Highlight Ring and Gradient Shadows */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80 z-10 pointer-events-none" />

      {/* Floating Widget Container Layout structured with CSS Grid for correct responsive layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-16 lg:gap-y-6 items-start min-h-[calc(100vh-140px)]">
        
        {/* Left Side: Welcoming Editorial Block */}
        <div className="order-1 lg:col-span-7 space-y-4 text-left self-center w-full" id="sommelier-copy-side">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <span className="text-[#c5a880] text-xs font-mono uppercase tracking-widest bg-[#c5a880]/10 px-3.5 py-1 rounded-full border border-[#c5a880]/20 inline-block font-semibold">
              SERVICIOS EXCLUSIVOS DE CONSERJERÍA
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] font-medium">
              El arte de beber <br /> <span className="italic font-normal text-[#c5a880]">con sabiduría</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl font-sans">
              Bienvenido al sumiller virtual de Rioja Marketplace. Recibe recomendaciones precisas para maridajes, regalos, cenas especiales y selecciones profesionales.
            </p>
          </motion.div>
        </div>

        {/* Right Side: The Premium AI Sommelier Chat Panel (Replica of Mockup) */}
        <div className="order-2 lg:order-none lg:col-span-5 lg:row-span-2 w-full lg:max-w-md justify-self-center lg:justify-self-end shrink-0" id="sommelier-panel-frame">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-[#111111]/85 border-2 border-[#c5a880]/50 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md flex flex-col h-[540px] md:h-[600px] overflow-hidden"
          >
            {/* Widget Header */}
            <div className="p-4 border-b border-[#c5a880]/20 bg-gradient-to-r from-[#171412] to-[#120e0c] flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border border-[#c5a880]/40 flex items-center justify-center bg-[#c5a880]/10 text-[#c5a880]">
                  {/* Glass & Grape Logo */}
                  <GlassWater className="w-5 h-5 absolute" />
                  <div className="absolute -top-1 -right-1 text-[10px]">🍇</div>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-black" />
              </div>
              <div className="text-left">
                <h3 className="font-serif text-lg text-white font-medium tracking-wide">AI Sommelier</h3>
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-[#c5a880] rounded-full animate-ping" />
                  Experto de Rioja Marketplace
                </span>
              </div>
            </div>

            {/* Chat Log View */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#c5a880]/20 bg-[#0c0907]/90">
              {messages.map((msg) => {
                const isUser = msg.sender === 'user';
                // Find featured wine if attached
                const wine = msg.featuredWineId ? WINES_DATA.find((w) => w.id === msg.featuredWineId) : null;

                return (
                  <div key={msg.id} className="space-y-3">
                    {/* User Message */}
                    {isUser ? (
                      <div className="flex justify-end">
                        <div className="bg-[#ffffff] text-[#110e0c] text-xs px-4 py-2.5 rounded-[18px] rounded-br-[4px] max-w-[85%] font-sans font-medium text-left shadow-md">
                          {msg.text}
                        </div>
                      </div>
                    ) : (
                      /* Sommelier Message */
                      <div className="flex gap-2.5 items-start">
                        {/* Wine-glass Logo for Bot */}
                        <div className="w-7 h-7 rounded-full border border-[#c5a880]/30 flex items-center justify-center bg-[#c5a880]/20 shrink-0 text-[10px]" title="Sumiller">
                          🍷
                        </div>
                        <div className="space-y-3 flex-1 text-left">
                          {/* Chat Text Bubble */}
                          <div className="bg-[#d9be96] text-[#110e0c] text-xs px-4 py-2.5 rounded-[18px] rounded-bl-[4px] font-sans font-medium leading-relaxed shadow-sm">
                            {msg.text}
                          </div>

                          {/* Featured Wine Recommendation Card (Mockup Feature) */}
                          {wine && (
                            <div className="bg-[#300a12] border border-[#c5a880]/40 p-4 rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex gap-4 pr-3 overflow-hidden transition-all hover:border-[#c5a880]/75 relative group">
                              
                              {/* Wine Bottle Image */}
                              <div className="w-12 h-24 bg-black/40 border border-[#c5a880]/10 rounded flex items-center justify-center p-1 shrink-0">
                                <img
                                  src={wine.image}
                                  alt={wine.name}
                                  className="h-full object-contain filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
                                  referrerPolicy="no-referrer"
                                />
                              </div>

                              {/* Wine Recommendation Specs */}
                              <div className="flex-1 flex flex-col justify-between text-left">
                                <div className="space-y-0.5">
                                  <span className="text-[10px] text-[#c5a880] uppercase tracking-widest font-mono block">
                                    Recomendación Destacada
                                  </span>
                                  <h4 className="font-serif text-sm text-white font-bold leading-tight">
                                    {wine.name}
                                  </h4>
                                  <span className="text-[10px] text-gray-400 font-sans block italic">
                                    {wine.bodega}
                                  </span>
                                </div>

                                <p className="text-[10px] text-gray-300 line-clamp-2 mt-1 leading-normal font-sans">
                                  {wine.tastingNotes}
                                </p>

                                <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#c5a880]/15 gap-2">
                                  <span className="text-xs text-[#c5a880] font-mono font-semibold">
                                    {wine.price.toFixed(2)}€
                                  </span>
                                  
                                  {/* Gold gradient button */}
                                  <button
                                    onClick={() => {
                                      onAddWineToCart(wine);
                                      openCartDrawer();
                                    }}
                                    className="bg-gradient-to-r from-[#d9be96] to-[#af9368] hover:from-[#e3ccaa] hover:to-[#bd9f75] text-[#110e0c] font-sans font-bold text-[10px] px-3.5 py-1.5 rounded-sm uppercase tracking-wide transition-all shadow cursor-pointer active:scale-95"
                                  >
                                    Comprar Ahora
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Waiting state loader */}
              {isPending && (
                <div className="flex gap-2.5 items-start animate-pulse" id="sommelier-loader">
                  <div className="w-7 h-7 rounded-full border border-[#c5a880]/30 flex items-center justify-center bg-[#c5a880]/20 shrink-0">
                    <Loader2 className="w-3.5 h-3.5 text-[#c5a880] animate-spin" />
                  </div>
                  <div className="space-y-1 text-left flex-1">
                    <div className="bg-[#d9be96]/15 border border-[#c5a880]/20 text-[#c5a880] text-[11px] px-4 py-2.5 rounded-[18px] rounded-bl-[4px] font-mono flex items-center gap-2">
                       <span>Sumiller decantando vino y pensando</span>
                      <span className="flex space-x-1">
                        <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-[#c5a880] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#c5a880]/20 bg-[#14100e]" id="sommelier-input-form">
              <div className="relative flex items-center">
                <input
                  type="text"
                  disabled={isPending}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Pregunte a su sumiller virtual... (ej. cordero asado, maridaje pescado tinto)"
                  className="w-full bg-black/40 border border-[#c5a880]/30 focus:border-[#c5a880] rounded-lg pl-3 pr-10 py-2.5 text-white placeholder-gray-500 font-sans text-xs focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isPending}
                  className="absolute right-1.5 p-1.5 rounded-md text-[#c5a880] hover:bg-[#c5a880]/10 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Quick Guide Suggestions Area */}
        <div className="order-3 lg:col-span-7 space-y-3 text-left self-start w-full" id="sommelier-suggestions-box">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#c5a880]/70 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Sugerencias de Consulta
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                '¿Qué vino tinto va bien con un chuletón?',
                'Recomiéndame un blanco para pescado.',
                'Busco un Rioja para regalar.',
                'Necesito una selección para empresa.',
              ].map((sug, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => insertSuggestion(sug)}
                  className="bg-black/40 hover:bg-[#c5a880]/15 border border-[#c5a880]/20 hover:border-[#c5a880]/40 text-gray-300 hover:text-white px-3.5 py-2 rounded-lg transition-all text-left max-w-md truncate cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Benefits Bar spanning full width */}
        <div className="order-4 lg:col-span-12 w-full pt-8 border-t border-[#c5a880]/15 mt-8" id="sommelier-benefits-strip">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#c5a880]/10 border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] shrink-0 font-sans">
                🍇
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-[#c5a880] font-semibold text-sm">Catálogo Real</h4>
                <p className="text-gray-400 text-xs">Vinos y productos con stock actualizado</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#c5a880]/10 border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] shrink-0 font-sans">
                🏰
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-[#c5a880] font-semibold text-sm">Bodegas Seleccionadas</h4>
                <p className="text-gray-400 text-xs">Productores de Rioja Alavesa</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#c5a880]/10 border border-[#c5a880]/20 flex items-center justify-center text-[#c5a880] shrink-0 font-sans">
                ✨
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-[#c5a880] font-semibold text-sm">Consejo Personalizado</h4>
                <p className="text-gray-400 text-xs">Maridajes, regalos y ocasiones especiales</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
