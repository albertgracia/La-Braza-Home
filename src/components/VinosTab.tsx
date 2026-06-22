/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Wine } from '../types.ts';
import { WINES_DATA } from '../data.ts';
import { Search, Sparkles, Filter, ShoppingCart, Info, CheckCircle, Droplet, Flame, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface VinosTabProps {
  onAddWineToCart: (wine: Wine) => void;
  openCartDrawer: () => void;
}

export default function VinosTab({ onAddWineToCart, openCartDrawer }: VinosTabProps) {
  const [subView, setSubView] = useState<'vinos' | 'aceites' | 'mieles'>('vinos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('todos');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [selectedWineDetails, setSelectedWineDetails] = useState<Wine | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Filter logic
  const filteredWines = WINES_DATA.filter((wine) => {
    const matchesSearch =
      wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.bodega.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wine.tastingNotes.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Auto sync subview with types
    let matchesType = true;
    if (subView === 'vinos') {
      if (selectedType === 'todos') {
        matchesType = wine.type !== 'Aceite de Oliva' && wine.type !== 'Miel Artesana';
      } else {
        matchesType = wine.type === selectedType;
      }
    } else if (subView === 'aceites') {
      matchesType = wine.type === 'Aceite de Oliva';
    } else if (subView === 'mieles') {
      matchesType = wine.type === 'Miel Artesana';
    }

    const matchesCategory = selectedCategory === 'todos' || wine.category === selectedCategory;
    const matchesPrice = wine.price <= maxPrice;

    return matchesSearch && matchesType && matchesCategory && matchesPrice;
  });

  const handleAddToCartClick = (wine: Wine, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddWineToCart(wine);
    setNotification(`Añadido: ${wine.name}`);
    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 relative" id="vinos-tab-root">
      
      {/* Mini notification banner when adding to cart */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 bg-[#300a12] border border-[#c5a880] text-[#c5a880] px-6 py-3 rounded-full text-xs font-mono flex items-center gap-2.5 shadow-2xl z-50 uppercase tracking-widest pointer-events-none"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-12">
        
        {/* Luxury Sub-Boutique Switcher Ribbon */}
        <div className="max-w-4xl mx-auto" id="market-domain-switcher">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'vinos',
                label: 'Cortes & Vinos de Guarda',
                desc: 'Chuletones Dry-Aged & Tintos de Rioja',
                icon: Flame,
                color: 'from-[#e25822]/20 to-[#300a12]/20',
                borderColor: 'border-[#e25822]/40',
                activeColor: 'bg-[#300a12] text-white border-[#c5a880]/80',
                badge: 'Leyenda'
              },
              {
                id: 'aceites',
                label: 'Aceites de Oliva Virgen Extra',
                desc: 'AOVE de Cultivo Ecológico de Álava',
                icon: Droplet,
                color: 'from-emerald-950/40 to-emerald-900/10',
                borderColor: 'border-emerald-500/30',
                activeColor: 'bg-emerald-950/80 text-white border-emerald-500/80',
                badge: 'Prensado en Frío'
              },
              {
                id: 'mieles',
                label: 'Mieles Puras de Alta Montaña',
                desc: 'Apicultura Ecológica Sierra Cantabria',
                icon: Compass,
                color: 'from-amber-950/40 to-amber-900/10',
                borderColor: 'border-amber-500/30',
                activeColor: 'bg-amber-950/80 text-white border-amber-500/80',
                badge: '100% Cruda'
              }
            ].map((section) => {
              const SectionIcon = section.icon;
              const isSelected = subView === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => {
                    setSubView(section.id as 'vinos' | 'aceites' | 'mieles');
                    // Reset selected filters to todos to show matching subview assets smoothly
                    setSelectedType('todos');
                    setSelectedCategory('todos');
                  }}
                  className={`relative p-4 rounded-xl border text-left transition-all duration-300 hover:scale-[1.02] cursor-pointer group flex flex-col justify-between h-28 overflow-hidden ${
                    isSelected
                      ? `${section.activeColor} shadow-xl ring-1 ring-[#c5a880]/20`
                      : 'bg-[#120e0c]/80 text-gray-400 border-[#c5a880]/15 hover:border-[#c5a880]/40'
                  }`}
                >
                  {/* Decorative background glow */}
                  <div className={`absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-gradient-to-br ${section.color} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                  <div className="flex justify-between items-start z-10 w-full">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#c5a880]/15 text-[#c5a880]' : 'bg-black/40 text-gray-500'}`}>
                      <SectionIcon className="w-4 h-4" />
                    </div>
                    <span className={`text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
                      isSelected ? 'bg-black/50 text-[#c5a880] border-[#c5a880]/30' : 'bg-black/20 text-gray-500 border-white/5'
                    }`}>
                      {section.badge}
                    </span>
                  </div>

                  <div className="z-10 mt-2">
                    <h4 className={`font-serif text-sm font-bold tracking-wide transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                      {section.label}
                    </h4>
                    <p className="text-[10px] text-gray-500 font-sans mt-0.5 font-medium line-clamp-1">
                      {section.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Dynamic View Header based on active Subview (Vinos, Aceites, Mieles) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={subView}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-3 max-w-2xl mx-auto"
            id="dynamic-view-header"
          >
            {subView === 'vinos' && (
              <>
                <span className="text-[#c5a880] text-xs font-mono uppercase tracking-[0.2em] block font-bold">
                  LA BRAZA HOME MARKETPLACE · CORTE & COPA
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide font-bold">
                  Boutique de Cortes & Vinos
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Ordene cortes dry-aged exclusivos y botellas legendarias de Rioja a su domicilio. Entrega en transporte refrigerado certificado a 2ºC y estricta conservación garantizada.
                </p>
              </>
            )}

            {subView === 'aceites' && (
              <>
                <span className="text-[#c5a880] text-xs font-mono uppercase tracking-[0.2em] block font-bold">
                  ALMAZARAS MEDITERRÁNEAS DE RIOJA ALAVESA
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide font-bold">
                  Aceites de Oliva Virgen Extra
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Aceites premium prensados en frío por trujales artesanos locales de Álava. Cosecha temprana con acidez inferior al 0.1% y polifenoles excelsos para maridajes de leyenda gastronómica.
                </p>
              </>
            )}

            {subView === 'mieles' && (
              <>
                <span className="text-[#c5a880] text-xs font-mono uppercase tracking-[0.2em] block font-bold">
                  APICULTURA ECOLÓGICA DE MONTAÑA PROTEGIDA
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide font-bold">
                  Mieles Puras y Crudas de la Sierra
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed font-sans">
                  Exquisiteces cosechadas de colmenares familiares en parajes silvestres a gran altitud de la Sierra de Cantabria. Sin pasterización ni adulterado industrial, pura sintonía floral auténtica.
                </p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Searching & Filter Bar Section */}
        <div className="bg-[#181411]/90 border border-[#c5a880]/20 p-6 md:p-8 rounded-2xl shadow-xl space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
            
            {/* Search Input */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-mono">Buscar Producto / Bodega</label>
              <div className="relative flex items-center">
                <Search className="w-4 h-4 text-gray-500 absolute left-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ej. Muga, Chuletón, Gran Reserva..."
                  className="w-full bg-black/40 border border-[#c5a880]/20 focus:border-[#c5a880] rounded pl-10 pr-4 py-2.5 text-white placeholder-gray-500 font-sans text-sm focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Price Slider */}
            <div className="space-y-1.5 text-left">
              <div className="flex justify-between text-xs uppercase tracking-wider text-gray-400 font-mono">
                <span>Rango de Precio Máx.</span>
                <span className="text-[#c5a880] font-sans font-semibold">{maxPrice}€</span>
              </div>
              <div className="py-2.5">
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#c5a880] bg-[#110e0c] h-1.5 rounded cursor-pointer"
                />
              </div>
            </div>

            {/* Quick Helper Button to check with AI */}
            <div className="text-right">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full bg-[#300a12] border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] hover:text-white px-4 py-2.5 rounded text-xs font-mono uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ height: '46px' }}
              >
                <Sparkles className="w-4 h-4 text-[#c5a880]" />
                Asesorar con el Sumiller IA
              </button>
            </div>
          </div>

          {/* Type filters & Category filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-[#c5a880]/15 text-xs">
            
            {/* Wine & Meat Types filter */}
            <div className="flex flex-wrap items-center gap-2 text-left">
              <span className="text-gray-400 font-mono uppercase mr-2 tracking-wider">Tipo:</span>
              {(subView === 'vinos'
                ? ['todos', 'Corte Premium', 'Pack Gourmet', 'Tinto', 'Blanco', 'Rosado']
                : subView === 'aceites'
                ? ['todos', 'Aceite de Oliva']
                : ['todos', 'Miel Artesana']
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded cursor-pointer font-sans transition-all border uppercase tracking-wider ${
                    selectedType === t
                      ? 'bg-[#c5a880] text-black border-[#c5a880] font-bold shadow'
                      : 'bg-black/30 text-gray-400 border-[#c5a880]/20 hover:text-white hover:border-[#c5a880]/40'
                  }`}
                >
                  {t === 'todos' ? 'Todos' : t}
                </button>
              ))}
            </div>

            {/* Aging and Grading Category filter */}
            <div className="flex flex-wrap items-center gap-2 text-left">
              <span className="text-gray-400 font-mono uppercase mr-1 tracking-wider">Categoría:</span>
              {(subView === 'vinos'
                ? ['todos', 'Madurado', 'Selección Especial', 'Gran Reserva', 'Reserva', 'Crianza', 'Genérico']
                : subView === 'aceites'
                ? ['todos', 'Virgen Extra']
                : ['todos', 'Sierra Cantabria', 'Monofloral']
              ).map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 rounded cursor-pointer font-sans transition-all border uppercase tracking-wider ${
                    selectedCategory === c
                      ? 'bg-[#c5a880] text-black border-[#c5a880] font-bold shadow'
                      : 'bg-black/30 text-gray-400 border-[#c5a880]/20 hover:text-white hover:border-[#c5a880]/40'
                  }`}
                >
                  {c === 'todos' ? 'Todos' : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wine Grid Listing */}
        {filteredWines.length === 0 ? (
          <div className="text-center py-20 bg-[#16120f]/40 border border-[#c5a880]/15 rounded-2xl" id="no-wines-match">
            <span className="text-[#c5a880]/30 text-5xl inline-block mb-3">🍷</span>
            <h4 className="font-serif text-lg text-white">No se encontraron botellas</h4>
            <p className="text-sm text-gray-500 max-w-sm mx-auto mt-2 leading-relaxed">
              Pruebe a modificar los filtros seleccionados, rebajar el precio sugerido o consultar al sumiller de inteligencia artificial.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="wine-cards-grid">
            {filteredWines.map((wine) => (
              <div
                key={wine.id}
                onClick={() => setSelectedWineDetails(wine)}
                className="bg-[#14100e] border border-[#c5a880]/20 hover:border-[#c5a880]/70 rounded-xl overflow-hidden shadow-lg transition-all hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
              >
                
                {/* Wine Visual Frame */}
                <div className="p-8 bg-gradient-to-b from-black/50 to-black/10 flex items-center justify-center relative min-h-[250px]">
                  
                  {/* Category Stamp floating */}
                  <span className="absolute top-4 right-4 bg-[#c5a880]/10 border border-[#c5a880]/30 text-[#c5a880] text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded">
                    {wine.category}
                  </span>

                  {/* Bottle render with Shadow */}
                  <div className="relative h-48 w-16 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    <img
                      src={wine.image}
                      alt={wine.name}
                      className="h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Specs and details */}
                <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-1">
                      <span className="text-xs text-[#c5a880] font-sans font-semibold tracking-wide">
                        {wine.bodega}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">
                        {wine.type === 'Corte Premium' ? `MAD. ${wine.year} DÍAS` : `AÑO ${wine.year}`}
                      </span>
                    </div>
                    <h3 className="font-serif text-base text-white tracking-wide font-medium leading-tight group-hover:text-[#c5a880] transition-colors">
                      {wine.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs pt-1">
                      <span className="text-gray-400 font-sans">{wine.type}</span>
                      <span className="w-1 h-1 bg-gray-600 rounded-full" />
                      <span className="text-gray-400 font-sans">{wine.alcohol}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed h-[36px] font-sans">
                    {wine.tastingNotes}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#c5a880]/15 gap-4">
                    <div className="font-serif text-lg text-white font-bold">
                      {wine.price.toFixed(2)}€
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        title="Ver Ficha Técnica"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWineDetails(wine);
                        }}
                        className="bg-black/30 border border-[#c5a880]/30 text-gray-300 hover:text-white p-2 rounded transition-all cursor-pointer"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={(e) => handleAddToCartClick(wine, e)}
                        className="bg-gradient-to-r from-[#d9be96] to-[#af9368] hover:from-[#e3ccaa] hover:to-[#bd9f75] text-[#110e0c] font-sans font-bold text-xs px-3.5 py-2 rounded-sm uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Wine Details Modal Dialog */}
      <AnimatePresence>
        {selectedWineDetails && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="wine-details-modal">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedWineDetails(null)}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            {/* Modal Body container */}
            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ transform: 'scale(0.95)', opacity: 0 }}
                animate={{ transform: 'scale(1)', opacity: 1 }}
                exit={{ transform: 'scale(0.95)', opacity: 0 }}
                style={{ originY: 'center' }}
                className="relative bg-[#14100e] border-2 border-[#c5a880]/40 max-w-3xl w-full rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row text-left"
              >
                
                {/* Close Button top-right */}
                <button
                  onClick={() => setSelectedWineDetails(null)}
                  className="absolute top-4 right-4 bg-black/40 text-gray-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center border border-[#c5a880]/20 hover:border-[#c5a880]/45 transition-colors cursor-pointer z-25"
                >
                  ✕
                </button>

                {/* Left Part: Wine bottle render */}
                <div className="md:w-2/5 bg-gradient-to-b from-[#211915] to-[#120e0c] p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#c5a880]/20 min-h-[350px]">
                  <div className="h-72 w-28 flex items-center justify-center relative">
                    <img
                      src={selectedWineDetails.image}
                      alt={selectedWineDetails.name}
                      className="h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Quality Stamp inside */}
                    <div className="absolute -bottom-2 bg-black/70 border border-[#c5a880]/45 rounded-full px-4 py-1.5 text-[9px] font-mono uppercase text-[#c5a880]">
                      Estrella {selectedWineDetails.rating} ★
                    </div>
                  </div>
                </div>

                {/* Right Part: Ficha Técnica (Specs sheet) */}
                <div className="md:w-3/5 p-6 md:p-8 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-xs text-[#c5a880] font-sans font-bold uppercase tracking-widest block">
                        {selectedWineDetails.bodega}
                      </span>
                      <h3 className="font-serif text-2xl text-white tracking-wide leading-tight">
                        {selectedWineDetails.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-mono tracking-wider uppercase">
                        {selectedWineDetails.type === 'Corte Premium' 
                          ? `CORTE PREMIUM MADURADO — ${selectedWineDetails.year} DÍAS DRY-AGED`
                          : selectedWineDetails.type === 'Pack Gourmet'
                          ? `EDICIÓN REGALO LIMITADA — SELECCIÓN ESPECIAL`
                          : selectedWineDetails.type === 'Aceite de Oliva'
                          ? `AOVE DE RIOJA ALAVESA — AÑO COSECHA ${selectedWineDetails.year}`
                          : selectedWineDetails.type === 'Miel Artesana'
                          ? `MIEL CRUDA DE MONTAÑA — AÑO COSECHA ${selectedWineDetails.year}`
                          : `COUPAGE DEL AÑO ${selectedWineDetails.year} — CATEGORÍA ${selectedWineDetails.category}`}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-sans">
                      {selectedWineDetails.description}
                    </p>

                    {/* Detailed Specifications list */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#c5a880]/15">
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880]/70 block">
                          {selectedWineDetails.type === 'Corte Premium' 
                            ? 'Raza / Infiltración' 
                            : selectedWineDetails.type === 'Pack Gourmet' 
                            ? 'Componentes' 
                            : selectedWineDetails.type === 'Aceite de Oliva'
                            ? 'Variedades de Oliva'
                            : selectedWineDetails.type === 'Miel Artesana'
                            ? 'Flora del Colmenar'
                            : 'Variedades de Uva'}
                        </span>
                        <p className="text-xs text-white uppercase font-sans font-medium">{selectedWineDetails.varietals.join(', ')}</p>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880]/70 block">
                          {selectedWineDetails.type === 'Corte Premium' 
                            ? 'Tipo de Cría' 
                            : selectedWineDetails.type === 'Pack Gourmet' 
                            ? 'Tipo de Envío' 
                            : selectedWineDetails.type === 'Aceite de Oliva'
                            ? 'Acidez de Extra'
                            : selectedWineDetails.type === 'Miel Artesana'
                            ? 'Certificado Pureza'
                            : 'Graduación Alcohólica'}
                        </span>
                        <p className="text-xs text-white uppercase font-sans font-medium">
                          {selectedWineDetails.type === 'Corte Premium' 
                            ? 'Pasto Certificado / Libre' 
                            : selectedWineDetails.type === 'Pack Gourmet' 
                            ? 'Refrigerado 2ºC Gratis' 
                            : selectedWineDetails.alcohol}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-0.5 pt-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880]/70 block">
                        {selectedWineDetails.type === 'Corte Premium' 
                          ? 'Nota del Maestro Parrillero' 
                          : selectedWineDetails.type === 'Pack Gourmet' 
                          ? 'Nota de Armonía' 
                          : selectedWineDetails.type === 'Aceite de Oliva'
                          ? 'Perfil de Cata del Trujal'
                          : selectedWineDetails.type === 'Miel Artesana'
                          ? 'Aromática Apícola'
                          : 'Nota de Cata Magistral'}
                      </span>
                      <p className="text-xs text-white font-serif italic bg-black/40 border-l-2 border-[#c5a880] p-3 rounded-r-md leading-relaxed">
                        "{selectedWineDetails.tastingNotes}"
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#c5a880]/70 block">
                        {selectedWineDetails.type === 'Corte Premium' 
                          ? 'Sugerencias de Maridaje de Rioja' 
                          : selectedWineDetails.type === 'Pack Gourmet' 
                          ? 'Consejos de Ocasión' 
                          : selectedWineDetails.type === 'Aceite de Oliva'
                          ? 'Maridaje de Cocina sugerido'
                          : selectedWineDetails.type === 'Miel Artesana'
                          ? 'Armonía & Postre sugerido'
                          : 'Sugerencias de Alimentos (Maridaje)'}
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {selectedWineDetails.pairings.map((food, idx) => (
                          <span
                            key={idx}
                            className="bg-[#300a12] text-[#c5a880] border border-[#c5a880]/20 text-[10px] font-sans px-2.5 py-0.5 rounded-sm"
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-[#c5a880]/15 gap-4">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 block">Importe Unitario</span>
                      <span className="font-serif text-2xl text-[#c5a880] font-bold">
                        {selectedWineDetails.price.toFixed(2)}€
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedWineDetails(null)}
                        className="border border-gray-600 hover:border-white text-gray-400 hover:text-white px-4 py-2.5 rounded text-xs uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                      >
                        Cerrar Ficha
                      </button>

                      <button
                        onClick={(e) => {
                          handleAddToCartClick(selectedWineDetails, e);
                          setSelectedWineDetails(null);
                        }}
                        className="bg-gradient-to-r from-[#d9be96] to-[#af9368] hover:from-[#e3ccaa] hover:to-[#bd9f75] text-[#110e0c] font-sans font-bold text-xs px-6 py-2.5 rounded hover:scale-102 transition-transform flex items-center gap-2 cursor-pointer shadow"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Comprar Añada
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
