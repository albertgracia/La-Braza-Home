/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wine } from '../types.ts';
import { BODEGAS_DATA, WINES_DATA, LA_BRAZA_HERO, RUBIA_GALLEGA_STEAK, PAIRING_IMG } from '../data.ts';
import { Flame, Star, ShoppingCart, ShieldCheck, Heart, Sparkles, Compass, Utensils, Award, Users, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InicioTabProps {
  onAddWineToCart: (wine: Wine) => void;
  openCartDrawer: () => void;
  onNavigateToTab: (tabId: 'sommelier' | 'vinos' | 'bodegas' | 'experiencias') => void;
}

export default function InicioTab({ onAddWineToCart, openCartDrawer, onNavigateToTab }: InicioTabProps) {
  // Simulator State: Selection of prime cut to display recommended wine
  const [selectedSimulatorCut, setSelectedSimulatorCut] = useState<'rubia' | 'tbone'>('rubia');
  
  // Custom toast notification states
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Get products for simulator
  const rubiaBeef = WINES_DATA.find(w => w.id === 'chuleton-rubia-gallega');
  const rubiaWinePair = WINES_DATA.find(w => w.id === 'riscal-gran-reserva-2016');
  
  const tboneBeef = WINES_DATA.find(w => w.id === 'tbone-black-angus');
  const tboneWinePair = WINES_DATA.find(w => w.id === 'vina-ardanza-2015');

  const activeBeef = selectedSimulatorCut === 'rubia' ? rubiaBeef : tboneBeef;
  const activeWine = selectedSimulatorCut === 'rubia' ? rubiaWinePair : tboneWinePair;

  const handleAddSimulatorPairingToCart = () => {
    if (activeBeef && activeWine) {
      onAddWineToCart(activeBeef);
      onAddWineToCart(activeWine);
      showToast(`¡Maridaje Perfecto añadido! ${activeBeef.name} + ${activeWine.name}`);
      openCartDrawer();
    }
  };

  return (
    <div className="space-y-16 md:space-y-24" id="inicio-tab-root">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#300a12] border-2 border-[#c5a880] text-[#f7e8d5] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 font-sans text-xs max-w-sm text-left"
          >
            <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 flex items-center justify-center text-[#c5a880]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider block text-[10px] text-[#c5a880]">Carrito Actualizado</span>
              <p className="leading-snug">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION: LA BRAZA HOME GOURMET MARKETPLACE REDESIGN */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" id="la-braza-hero-section">
        
        {/* Cinematic Backdrop with firey amber overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={LA_BRAZA_HERO}
            alt="La Braza Embers Backdrop"
            className="w-full h-full object-cover scale-[1.03] filter brightness-[0.5] saturate-[1.2] transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Glowing fire sparks and gradient shading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0907] via-black/45 to-black/80" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/25 to-[#0c0907]" />
        </div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10 space-y-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-8 bg-[#c5a880]/40" />
              <span className="text-[#c5a880] text-xs font-mono uppercase tracking-[0.3em] font-semibold flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-[#e25822] animate-pulse" />
                MARKETPLACE DE ALTO NIVEL
              </span>
              <span className="h-[1px] w-8 bg-[#c5a880]/40" />
            </div>

            {/* Glowing Logo redesign header */}
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white tracking-[0.1em] uppercase font-bold leading-none drop-shadow-lg">
              LA BRAZA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e5cfb3] via-[#c5a880] to-[#bda682] font-black italic tracking-normal lowercase font-serif leading-none block">
                home
              </span>
            </h1>

            <p className="font-sans text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-medium tracking-wide leading-relaxed">
              Brasas, carnes de leyenda y vinos de guarda. <br />
              Unimos los cortes madurados más codiciados del mundo y las etiquetas centenarias de La Rioja con asesoramiento inteligente en una sola experiencia sensorial.
            </p>
          </motion.div>

          {/* Luxury CTA elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => onNavigateToTab('vinos')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#d9be96] via-[#c5a880] to-[#af9368] hover:from-[#e3ccaa] hover:to-[#bd9f75] text-black font-sans font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded shadow-2xl transition-all hover:shadow-[0_0_20px_rgba(197,168,128,0.45)] transform hover:-translate-y-0.5"
            >
              Comprar Cortes & Vinos
            </button>
            <button
              onClick={() => onNavigateToTab('sommelier')}
              className="w-full sm:w-auto bg-black/60 hover:bg-black/90 text-white border border-[#c5a880]/50 hover:border-[#c5a880] font-sans font-bold text-xs uppercase tracking-widest px-8 py-4.5 rounded transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              Consultar Sumiller IA
            </button>
          </motion.div>

          {/* Tiny details list at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-16 border-t border-[#c5a880]/15 text-xs text-gray-400 font-mono"
          >
            <div className="flex flex-col items-center">
              <span className="text-[#c5a880] text-sm font-serif font-semibold">Dry-Aged +45 Días</span>
              <span className="text-[10px] uppercase text-gray-500 mt-1">Carnes Auténticas</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#c5a880] text-sm font-serif font-semibold">Cadena de Frío Garantizada</span>
              <span className="text-[10px] uppercase text-gray-500 mt-1">2ºC a Domicilio</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#c5a880] text-sm font-serif font-semibold">Consejo Gastronómico IA</span>
              <span className="text-[10px] uppercase text-gray-500 mt-1">Maridaje Científico</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#c5a880] text-sm font-serif font-semibold">Pago Blindado SSL</span>
              <span className="text-[10px] uppercase text-gray-500 mt-1">100% Certificado</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. INTERACTIVE SIMULATOR SECTION: EL DISPENSADOR MÁGICO DE MARIDALES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8" id="la-braza-simulator-section">
        <div className="bg-gradient-to-br from-[#120e0c] via-[#1a1310] to-[#0c0907] border-2 border-[#c5a880]/30 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Subtle design element */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/2 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Col - Control panel & explanation */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <div className="space-y-2">
                <span className="text-[#c5a880] font-mono text-[10px] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#e25822]" />
                  EL ARTE DE ENLAZAR CARNES Y VINOS
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">
                  Simulador de Maridaje Perfecto
                </h2>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-sans">
                  Las proteínas y la grasa infiltrada de nuestros cortes madurados interactúan de forma científica con los taninos del roble de Rioja. Escoja un corte y descubra su pareja ideal de origen.
                </p>
              </div>

              {/* Selector buttons */}
              <div className="bg-black/40 border border-[#c5a880]/15 p-1.5 rounded-xl flex gap-2">
                <button
                  onClick={() => setSelectedSimulatorCut('rubia')}
                  className={`flex-1 py-3 text-center rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    selectedSimulatorCut === 'rubia'
                      ? 'bg-gradient-to-r from-[#d9be96] to-[#af9368] text-black shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🥩 Rubia Gallega
                </button>
                <button
                  onClick={() => setSelectedSimulatorCut('tbone')}
                  className={`flex-1 py-3 text-center rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    selectedSimulatorCut === 'tbone'
                      ? 'bg-gradient-to-r from-[#d9be96] to-[#af9368] text-black shadow'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  🥩 Black Angus
                </button>
              </div>

              {/* Dynamic explanations */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#c5a880]" />
                  <span className="text-white font-serif text-sm font-semibold">Consejo de Sumiller Especializado:</span>
                </div>
                <p className="text-gray-300 text-xs italic font-sans leading-relaxed">
                  {selectedSimulatorCut === 'rubia'
                    ? '"La Rubia Gallega de 45 días posee un nivel graso suntuoso y mantecoso. Para equilibrar, sugerimos la acidez vibrante y el tanino pulido pero presente de Marqués de Riscal Gran Reserva, creando un balance mágico en boca."'
                    : '"El T-Bone Black Angus ofrece una ternura magra excelsa con una fina capa de grasa externa. El carácter especiado, coco, y los recuerdos a hoja de tabaco de un clásico sutil como Viña Ardanza limpian el paladar elegantemente tras cada bocado."'}
                </p>
              </div>
            </div>

            {/* Middle Col & Right Col - The Visual pairing showcase (The actual cards matched up) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
              
              {/* Product 1: The Cattle Selection (Meat) */}
              <div className="md:col-span-2 bg-[#14100e]/95 border border-[#c5a880]/20 rounded-2xl p-5 shadow-xl text-left space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-[#c5a880]/10">
                  <img
                    src={RUBIA_GALLEGA_STEAK}
                    alt={activeBeef?.name}
                    className="w-full h-full object-cover filter saturate-[0.9] brightness-90 hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 border border-[#c5a880]/40 text-[#c5a880] text-[9px] font-mono px-2 py-1 rounded">
                    CORTE PREMIUM
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#c5a880] font-mono uppercase tracking-wider block">LA BRAZA PREMIUM CUTS</span>
                  <h4 className="font-serif text-base text-white font-semibold line-clamp-1">{activeBeef?.name}</h4>
                  <span className="text-xs text-gray-400 font-sans block">{activeBeef?.category} · Maduración {activeBeef?.year} Días</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-sm font-sans font-bold text-[#c5a880]">{activeBeef?.price.toFixed(2)}€</span>
                  <span className="text-[10px] text-gray-500 font-mono uppercase">En Stock ({activeBeef?.stock})</span>
                </div>
              </div>

              {/* Plus symbol in between */}
              <div className="flex flex-col items-center justify-center md:col-span-1 py-2">
                <div className="w-12 h-12 rounded-full border border-[#c5a880]/40 flex items-center justify-center bg-[#c5a880]/15 text-[#c5a880] font-mono font-bold text-xl shadow animate-pulse">
                  +
                </div>
                <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-2">MARIDAJE</span>
              </div>

              {/* Product 2: The perfect Rioja match (Wine) */}
              <div className="md:col-span-2 bg-[#14100e]/95 border border-[#c5a880]/20 rounded-2xl p-5 shadow-xl text-left space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 border border-[#c5a880]/10 flex items-center justify-center">
                  <img
                    src={activeWine?.image}
                    alt={activeWine?.name}
                    className="h-4/5 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/85 border border-[#c5a880]/40 text-[#c5a880] text-[9px] font-mono px-2 py-1 rounded">
                    VINO RECOMENDADO
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-[#c5a880] font-mono uppercase tracking-wider block">{activeWine?.bodega}</span>
                  <h4 className="font-serif text-base text-white font-semibold line-clamp-1">{activeWine?.name}</h4>
                  <span className="text-xs text-gray-400 font-sans block">{activeWine?.category} · Añada {activeWine?.year}</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-sm font-sans font-bold text-[#c5a880]">{activeWine?.price?.toFixed(2)}€</span>
                  <span className="text-[10px] text-gray-500 font-mono">Calificación {activeWine?.rating} ★</span>
                </div>
              </div>

            </div>

          </div>

          {/* Golden Action Row bottom of the simulator */}
          <div className="mt-8 pt-8 border-t border-[#c5a880]/15 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <span className="text-gray-400 text-xs font-sans">Precio Especial por Bundle Maridaje Completo:</span>
              <div className="flex items-center gap-2">
                <span className="text-xl md:text-2xl font-serif text-[#c5a880] font-bold">
                  {((activeBeef?.price || 0) + (activeWine?.price || 0)).toFixed(2)}€
                </span>
                <span className="text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono uppercase font-bold tracking-wider">
                  Envío Refrigerado Gratis
                </span>
              </div>
            </div>

            <button
              onClick={handleAddSimulatorPairingToCart}
              className="w-full md:w-auto bg-gradient-to-r from-[#d9be96] via-[#c5a880] to-[#af9368] hover:from-[#e3ccaa] hover:to-[#bd9f75] text-black font-sans font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-lg shadow-xl hover:shadow-[0_0_20px_rgba(197,168,128,0.3)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-4 h-4" />
              Añadir Maridaje al Carrito
            </button>
          </div>

        </div>
      </section>

      {/* 3. SHOWCASE CATALOG HIGHLIGHTS: MEATS, WINES, OILS, AND HONEYS */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-10" id="gourmet-showcase-section">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#c5a880] text-xs font-mono uppercase tracking-widest block font-bold">LA SELECCIÓN DE LA TIERRA</span>
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide font-bold">Joyas Gastronómicas del Marketplace</h2>
          <p className="text-gray-400 text-sm leading-relaxed font-sans">
            Una cuidadosa selección que unifica carnes extraordinarias, vinos emblemáticos, aceites de oliva virgen extra y mieles milenarias.
          </p>
        </div>

        {/* Product Cards Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left" id="inicio-grid-cards">
          {WINES_DATA.filter(p => p.id === 'chuleton-rubia-gallega' || p.id === 'pack-gourmet-la-braza' || p.id === 'aove-la-braza-grand-reserva' || p.id === 'miel-milflores-sierra').map((prod) => (
            <div
              key={prod.id}
              className="bg-[#111111] border border-[#c5a880]/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between hover:border-[#c5a880]/40 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Visual block */}
                <div className="relative aspect-[4/3] bg-black/40 overflow-hidden flex items-center justify-center">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className={`w-full h-full object-cover filter saturate-[0.85] brightness-[0.8] group-hover:scale-103 transition-all duration-700 ${
                      prod.type === 'Tinto' ? 'object-contain h-[85%] py-4' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 border border-[#c5a880]/30 font-serif text-xs text-[#c5a880] px-3 py-1 rounded">
                    {prod.type}
                  </div>
                  {prod.category === 'Selección Especial' && (
                    <div className="absolute top-4 right-4 bg-red-950/80 border border-red-500/30 font-mono text-[9px] text-[#f7e8d5] px-2.5 py-1 rounded font-bold uppercase tracking-wider">
                      ★ Élite Crate
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="px-6 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span>{prod.bodega}</span>
                    <span>{prod.category}</span>
                  </div>

                  <h3 className="font-serif text-lg text-white font-bold tracking-wide group-hover:text-[#c5a880] transition-colors leading-snug">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans">
                    {prod.description}
                  </p>

                  {/* Bullet Spec Highlights */}
                  <div className="space-y-1.5 pt-3">
                    {prod.varietals.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-[10.5px] text-gray-300 font-sans">
                        <Check className="w-3.5 h-3.5 text-[#c5a880] shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action bar */}
              <div className="px-6 py-5 mt-6 border-t border-[#c5a880]/10 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-gray-500 block">Total con IVA</span>
                  <span className="text-base font-serif font-bold text-[#c5a880]">{prod.price.toFixed(2)}€</span>
                </div>

                <button
                  onClick={() => {
                    onAddWineToCart(prod);
                    showToast(`Añadido al carrito: ${prod.name}`);
                    openCartDrawer();
                  }}
                  className="bg-transparent border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-black font-sans font-bold text-xs uppercase tracking-wider px-4.5 py-2.5 rounded transition-all cursor-pointer"
                >
                  Pedir Ahora
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* 4. MASTER AND GRILL VIP SERVICES */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-8" id="vip-grill-services">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Visual Showcase (The culinary wood pairing) */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border-2 border-[#c5a880]/20">
            <img
              src={PAIRING_IMG}
              alt="Luxury Grilling and Dining Experience"
              className="w-full h-full object-cover filter brightness-[0.7] saturate-[0.95]"
              referrerPolicy="no-referrer"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 text-left space-y-2">
              <span className="text-[#c5a880] font-mono text-[9px] tracking-widest uppercase block">MUESTRARIO EXCLUSIVO</span>
              <h4 className="font-serif text-2xl text-white font-bold">Uniendo la cocina de brasas y los vinos de alcoba</h4>
              <p className="text-gray-300 text-xs font-sans max-w-lg">
                Nuestros maestros asadores se trasladan a su residencia privada con encina centenaria, robles y cortes dry-aged exclusivos.
              </p>
            </div>
          </div>

          {/* Texts and list */}
          <div className="space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-[#c5a880] font-mono text-xs uppercase tracking-widest block font-bold">GASTRONOMÍA DE ÉLITE</span>
              <h3 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">Servicios de Hospitalidad y Sabor</h3>
              <p className="text-gray-400 text-xs md:text-sm font-sans leading-relaxed">
                Diseñamos banquetes inolvidables donde el fuego y el vino son los grandes narradores de la noche. Consiga el máximo estatus de anfitrión.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Maestro Parrillero a Domicilio',
                  desc: 'Un parrillero profesional traslada nuestra parrilla de hierro fundido, briquetas de encina y cortes madurados para cocinar en directo.',
                  icon: Utensils,
                },
                {
                  title: 'Catas y Maridajes de Guarda',
                  desc: 'Nuestros sumilleres diseñan menús interactivos donde cada corte dry-aged se armoniza perfectamente con vinos Gran Reserva exclusivos.',
                  icon: Compass,
                },
                {
                  title: 'Asesoría Gastronómica por Inteligencia Artificial',
                  desc: 'Consiga respuestas inmediatas de nuestro calado cibernético, afinado con recetas galardonadas y sumilleres campeones.',
                  icon: Sparkles,
                },
              ].map((serv, sIdx) => {
                const Icon = serv.icon;
                return (
                  <div key={sIdx} className="flex gap-4 items-start pb-4 border-b border-[#c5a880]/10 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full border border-[#c5a880]/30 bg-[#c5a880]/5 flex items-center justify-center text-[#c5a880] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-serif text-base text-white font-bold">{serv.title}</h4>
                      <p className="text-gray-400 text-xs font-sans leading-relaxed">{serv.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigateToTab('experiencias')}
                className="inline-flex items-center gap-2 border border-[#c5a880] hover:border-[#c5a880] text-gray-300 hover:text-white px-6 py-3 rounded text-xs uppercase tracking-wider font-sans font-bold transition-all cursor-pointer bg-white/5"
              >
                Ver Experiencias Disponibles
                <ChevronRight className="w-4 h-4 text-[#c5a880]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. GOURMET TRANSPORT PILLARS */}
      <section className="bg-gradient-to-r from-black via-[#110e0c] to-black py-12 border-t border-b border-[#c5a880]/15" id="gourmet-pillars-banner">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-xs font-sans">
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 text-lg">
              ❄️
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-white font-bold uppercase tracking-wider text-sm">Frío Controlado (2ºC-6ºC)</h4>
              <p className="text-gray-400 leading-relaxed font-sans">
                Garantizamos la cadena de frío ininterrumpida para nuestros cortes de vacuno y embutidos premium mediante packaging isotérmico de poliuretano inyectado y hielo de gel hidratado.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#c5a880]/15 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0 text-lg">
              🍷
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-white font-bold uppercase tracking-wider text-sm">Climatización Vinícola (14ºC)</h4>
              <p className="text-gray-400 leading-relaxed font-sans">
                Nuestros vinos de alta gama son custodiados a 14ºC con humedad controlada del 70%. Se transportan en cajas con amortiguación de impacto para preservar los tapones de corcho originales.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#300a12] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#c5a880]" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-serif text-white font-bold uppercase tracking-wider text-sm">Garantía del Consejo Certificado</h4>
              <p className="text-gray-400 leading-relaxed font-sans">
                Todas las botellas cuentan con las tirillas oficiales holográficas del Consejo Regulador de la DOCa Rioja, garantizando su añada y autenticidad indisputable.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
