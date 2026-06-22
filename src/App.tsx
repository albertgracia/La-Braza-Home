/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Wine, CartItem } from './types.ts';
import { RESTAURANT_BG } from './data.ts';

// Component Imports
import InicioTab from './components/InicioTab.tsx';
import SommelierTab from './components/SommelierTab.tsx';
import VinosTab from './components/VinosTab.tsx';
import BodegasTab from './components/BodegasTab.tsx';
import ExperienciasTab from './components/ExperienciasTab.tsx';
import CartSlider from './components/CartSlider.tsx';

// Icons
import { ShoppingBag, Star, User, Compass, GlassWater, Landmark, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'sommelier' | 'vinos' | 'bodegas' | 'experiencias'>('inicio');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('rioja_marketplace_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Sync basket to client storage for persistence
  useEffect(() => {
    localStorage.setItem('rioja_marketplace_cart', JSON.stringify(cart));
  }, [cart]);

  // Shopping Basket Actions
  const handleAddWineToCart = (wine: Wine) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.wine.id === wine.id);
      if (existing) {
        return prev.map((item) =>
          item.wine.id === wine.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { wine, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (wineId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(wineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.wine.id === wineId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveCartItem = (wineId: string) => {
    setCart((prev) => prev.filter((item) => item.wine.id !== wineId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen text-gray-100 flex flex-col relative overflow-hidden bg-[#0c0907] font-sans">
      
      {/* Background Image Layer with smooth scaling and blur */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-[1.01] pointer-events-none"
        style={{
          backgroundImage: `url(${RESTAURANT_BG})`,
          opacity: activeTab === 'sommelier' ? 0.35 : 0.08,
          filter: activeTab === 'sommelier' ? 'blur(1.5px)' : 'blur(4px)',
        }}
      />
      {/* Elegance Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#0c0907]/95 to-black pointer-events-none -z-10" />

      {/* Global Luxury Header (Navbar) */}
      <header className="sticky top-0 bg-[#0c0907]/90 backdrop-blur-md border-b border-[#c5a880]/20 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          
          {/* Top-Left App Title / Logo */}
          <div
            onClick={() => setActiveTab('inicio')}
            className="flex flex-col items-start cursor-pointer group"
            id="brand-logo"
          >
            <span className="font-serif text-base md:text-lg text-[#c5a880] tracking-[0.2em] font-bold leading-none group-hover:text-white transition-colors">
              LA BRAZA HOME
            </span>
            <span className="text-[9px] text-gray-500 font-mono tracking-[0.08em] mt-1.5 uppercase">
              GOURMET & WINE MARKETPLACE
            </span>
          </div>

          {/* Navigation Items (Middle) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2" id="navbar-nav">
            {[
              { id: 'inicio', label: 'Inicio', icon: Flame },
              { id: 'sommelier', label: 'Sumiller IA', icon: GlassWater },
              { id: 'vinos', label: 'Cortes & Vinos', icon: Star },
              { id: 'bodegas', label: 'Bodegas', icon: Landmark },
              { id: 'experiencias', label: 'Experiencias VIP', icon: Compass },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 font-serif text-sm tracking-wide transition-all rounded duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-[#c5a880] bg-[#c5a880]/10 border-b border-[#c5a880]/40'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <TabIcon className="w-3.5 h-3.5 opacity-80" />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* User Status Options & Shopping Basket Icon (Right) */}
          <div className="flex items-center gap-3">
            
            {/* Account toggle */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="text-gray-400 hover:text-[#c5a880] p-2 hover:bg-white/5 rounded-full transition-all cursor-pointer relative"
              title="Mi Cuenta VIP"
              id="account-toggle-btn"
            >
              <User className="w-5 h-5 border border-gray-600 rounded-full p-0.5" />
            </button>

            {/* Shopping cart toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#c5a880]/10 hover:bg-[#c5a880]/20 border border-[#c5a880]/30 hover:border-[#c5a880] text-[#c5a880] hover:text-white p-2.5 rounded-full transition-all flex items-center justify-center relative cursor-pointer"
              title="Ver cesta de compra"
              id="cart-toggle-btn"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#300a12] border border-[#c5a880] text-[#c5a880] font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalCartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile quick navigation band */}
        <div className="flex md:hidden bg-[#110e0c] border-t border-b border-[#c5a880]/10 justify-around py-2.5 px-2 text-[10px] md:text-xs">
          {[
            { id: 'inicio', label: 'Inicio' },
            { id: 'sommelier', label: 'Sumiller' },
            { id: 'vinos', label: 'Cortes & Vinos' },
            { id: 'bodegas', label: 'Bodegas' },
            { id: 'experiencias', label: 'Exp. VIP' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-1.5 font-serif font-medium cursor-pointer transition-colors ${
                activeTab === tab.id ? 'text-[#c5a880] uppercase border-b border-[#c5a880]/60' : 'text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Router */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            {activeTab === 'inicio' && (
              <InicioTab
                onAddWineToCart={handleAddWineToCart}
                openCartDrawer={() => setIsCartOpen(true)}
                onNavigateToTab={(tabId) => setActiveTab(tabId)}
              />
            )}
            {activeTab === 'sommelier' && (
              <SommelierTab onAddWineToCart={handleAddWineToCart} openCartDrawer={() => setIsCartOpen(true)} />
            )}
            {activeTab === 'vinos' && (
              <VinosTab onAddWineToCart={handleAddWineToCart} openCartDrawer={() => setIsCartOpen(true)} />
            )}
            {activeTab === 'bodegas' && <BodegasTab />}
            {activeTab === 'experiencias' && <ExperienciasTab />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Luxury Footer */}
      <footer className="bg-black/90 p-8 md:p-12 border-t border-[#c5a880]/15 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left text-xs text-gray-500">
          <div className="space-y-4">
            <h5 className="font-serif text-[#c5a880] uppercase tracking-widest text-sm font-semibold">La Braza Home</h5>
            <p className="leading-relaxed text-gray-400 font-sans">
              Marketplace gourmet premium que une cortes madurados dry-aged de leyenda con la mayor colección oficial de vinos selectos de La Rioja.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="font-serif text-[#c5a880] uppercase tracking-widest text-sm font-semibold">Navegación</h5>
            <div className="grid grid-cols-2 gap-2 font-sans font-medium">
              <span onClick={() => setActiveTab('inicio')} className="hover:text-white cursor-pointer transition-colors">Inicio La Braza</span>
              <span onClick={() => setActiveTab('vinos')} className="hover:text-white cursor-pointer transition-colors">Cortes & Vinos</span>
              <span onClick={() => setActiveTab('bodegas')} className="hover:text-white cursor-pointer transition-colors">Dehesas & Bodegas</span>
              <span onClick={() => setActiveTab('sommelier')} className="hover:text-white cursor-pointer transition-colors">Sumillería por IA</span>
              <span onClick={() => setActiveTab('experiencias')} className="hover:text-white cursor-pointer transition-colors">Experiencias VIP</span>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-serif text-[#c5a880] uppercase tracking-widest text-sm font-semibold">Garantía de Entrega</h5>
            <p className="leading-relaxed text-gray-400 font-sans">
              Cortes refrigerados a 2ºC con embalajes isotérmicos. Vinos custodiados a 14ºC. Máxima frescura y trazabilidad de origen garantizada.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-600 gap-4">
          <div>© {new Date().getFullYear()} La Braza Home Gourmet Marketplace. Todos los derechos reservados. Rediseño oficial.</div>
          <div className="flex gap-4">
            <span className="hover:text-gray-400 cursor-pointer">Términos del Conservatorio</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Política de Bodegas Climatizadas</span>
          </div>
        </div>
      </footer>

      {/* Shopping Cart Drawer */}
      <CartSlider
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* VIP User Account Info Sheet Drawer (Mi Cuenta popup modal) */}
      <AnimatePresence>
        {isAccountOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="vip-account-modal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountOpen(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />
            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-[#14100e] border-2 border-[#c5a880]/40 max-w-sm w-full rounded-2xl shadow-xl p-6 relative z-10 text-left space-y-4"
              >
                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
                <div className="text-center pb-4 border-b border-[#c5a880]/15 space-y-2">
                  <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/70 flex items-center justify-center mx-auto text-[#c5a880] font-serif text-xl font-bold">
                    AM
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">Don Albert Gracia</h4>
                    <span className="text-[10px] text-[#c5a880] font-mono uppercase tracking-widest pl-1 bg-[#c5a880]/10 px-2 py-0.5 rounded border border-[#c5a880]/15">
                      Miembro de Honor Plata
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-mono text-[11px] text-gray-400">
                  <div className="flex justify-between">
                    <span>CLUB DE CATADORES ID:</span>
                    <span className="text-white">#RQ-429381</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CUPO DISPONIBLE:</span>
                    <span className="text-emerald-400 font-semibold uppercase">Ilimitado (Gama Reserva)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ENVÍOS GRATUITOS:</span>
                    <span className="text-white">Activos</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SUMILLER ASIGNADO:</span>
                    <span className="text-[#c5a880] font-bold">IA Conciérge Especializado</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#c5a880]/15">
                  <h5 className="font-serif text-xs text-white uppercase tracking-wider mb-2">Historial de Reservas</h5>
                  <p className="text-[10.5px] text-gray-500 font-sans italic leading-relaxed">
                    No tiene catas pasadas en las últimas semanas. Explore "Experiencias" para reservar un pase de luz de velas en Haro.
                  </p>
                </div>

                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-full bg-[#c5a880] text-black font-sans font-bold text-xs py-2.5 rounded tracking-wider uppercase hover:bg-[#d5bda0] transition-colors cursor-pointer text-center"
                >
                  Cerrar Cuenta
                </button>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
