/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem } from '../types.ts';
import { ShoppingBag, X, Plus, Minus, CreditCard, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartSliderProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (wineId: string, quantity: number) => void;
  onRemoveItem: (wineId: string) => void;
  onClearCart: () => void;
}

export default function CartSlider({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSliderProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const total = cartItems.reduce((acc, item) => acc + item.wine.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    setTimeout(() => {
      onClearCart();
      setIsCheckingOut(false);
      setCheckoutStep('form');
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 transition-opacity"
            id="cart-overlay"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-[#110e0c] border-l border-[#c5a880]/30 shadow-2xl z-50 flex flex-col"
            id="cart-slider-panel"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#c5a880]/20 flex items-center justify-between bg-[#181411]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
                <h3 className="font-serif text-xl text-white tracking-wide">Su Cesta</h3>
                <span className="bg-[#c5a880]/20 text-[#c5a880] text-xs px-2.5 py-0.5 rounded-full font-mono">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
                id="close-cart-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List or Form content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {isCheckingOut ? (
                checkoutStep === 'form' ? (
                  /* Formulario de Pago */
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4" id="checkout-form">
                    <h4 className="font-serif text-lg text-[#c5a880] mb-4">Información de Envío y Pago</h4>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Nombre Completo</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-[#c5a880]"
                        placeholder="Don Jose Manuel"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Email</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-[#c5a880]"
                        placeholder="jose@rioja.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Dirección de Entrega</label>
                      <input
                        required
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-[#c5a880]"
                        placeholder="Calle Laurel 12, Logroño, La Rioja"
                      />
                    </div>
                    <div className="pt-2 border-t border-[#c5a880]/15">
                      <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Número de Tarjeta</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          pattern="[0-9/ ]{12,19}"
                          maxLength={19}
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                          className="w-full bg-black/40 border border-[#c5a880]/30 rounded pl-10 pr-3 py-2 text-white font-sans text-sm focus:outline-none focus:border-[#c5a880]"
                          placeholder="4000 1234 5678 9010"
                        />
                        <CreditCard className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">Vencimiento</label>
                        <input
                          required
                          type="text"
                          maxLength={5}
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-center text-white font-sans text-sm focus:outline-none focus:border-[#c5a880]"
                          placeholder="MM/AA"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-400 mb-1">CVV</label>
                        <input
                          required
                          type="password"
                          maxLength={4}
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-center text-white font-sans text-sm focus:outline-none focus:border-[#c5a880]"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#d9be96] to-[#af9368] text-black font-sans font-semibold py-3 px-4 rounded text-center tracking-wide hover:from-[#e3ccaa] hover:to-[#bd9f75] transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
                      id="confirm-checkout-btn"
                    >
                      Pagar {total.toFixed(2)}€
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-full py-2 bg-transparent text-gray-400 hover:text-white font-sans text-xs uppercase tracking-widest text-center mt-2 transition-colors cursor-pointer"
                      id="cancel-checkout-btn"
                    >
                      Volver a la Cesta
                    </button>
                  </form>
                ) : (
                  /* Éxito de Compra */
                  <div className="text-center py-12 flex flex-col items-center justify-center space-y-4" id="success-checkout-view">
                    <div className="w-16 h-16 rounded-full border border-[#c5a880] flex items-center justify-center bg-[#c5a880]/10 mb-2">
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-[#c5a880] text-3xl font-serif font-bold"
                      >
                        ✓
                      </motion.div>
                    </div>
                    <h4 className="font-serif text-xl text-white">¡Pedido Registrado con Éxito!</h4>
                    <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                      Muchas gracias, <strong>{formData.name}</strong>. Hemos reservado sus vinos en las bodegas asociadas y enviado la confirmación a su correo de sumiller <strong>{formData.email}</strong>.
                    </p>
                    <div className="bg-black/30 p-4 border border-[#c5a880]/15 rounded text-left w-full space-y-1 font-mono text-[11px] text-gray-400">
                      <div>ID PEDIDO: #RQ-{Math.floor(100000 + Math.random() * 900000)}</div>
                      <div>ENVÍO: Calle Laurel 12, Logroño</div>
                      <div>MÉTODO: Envío Climatizado Especializado</div>
                    </div>
                    <p className="text-[11px] text-gray-500 animate-pulse pt-4">
                      Procesando envío... Cerrando panel de cesta...
                    </p>
                  </div>
                )
              ) : cartItems.length === 0 ? (
                <div className="text-center py-20 text-gray-500 space-y-4" id="empty-cart-view">
                  <ShoppingBag className="w-12 h-12 stroke-1 text-[#c5a880]/40 mx-auto" />
                  <p className="font-serif italic text-base">La cesta está vacía</p>
                  <p className="text-xs max-w-xs mx-auto text-gray-600">
                    Explore la pestaña "Vinos" o pida recomendaciones a nuestro Sumiller Virtual de IA para descorchar botellas históricas.
                  </p>
                  <button
                    onClick={onClose}
                    className="border border-[#c5a880]/30 hover:bg-[#c5a880]/10 text-xs tracking-wider uppercase text-[#c5a880] px-4 py-2 mt-4 rounded-sm transition-all cursor-pointer font-sans"
                  >
                    Explorar Vinos
                  </button>
                </div>
              ) : (
                /* Lista de Productos */
                <div className="space-y-4" id="cart-item-list">
                  {cartItems.map((item) => (
                    <div
                      key={item.wine.id}
                      className="flex gap-4 p-3 bg-black/30 border border-[#c5a880]/10 rounded-lg hover:border-[#c5a880]/20 transition-all group"
                    >
                      <div className="w-14 h-20 bg-[#16120f] border border-[#c5a880]/15 rounded flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={item.wine.image}
                          alt={item.wine.name}
                          className="h-full object-contain filter drop-shadow-[0_2px_5px_rgba(0,0,0,0.8)]"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h5 className="font-serif text-sm text-white group-hover:text-[#c5a880] transition-colors leading-snug">
                              {item.wine.name}
                            </h5>
                            <button
                              onClick={() => onRemoveItem(item.wine.id)}
                              className="text-gray-500 hover:text-red-400 p-0.5 rounded transition-colors cursor-pointer"
                              title="Quitar"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="text-[11px] text-gray-500 block">{item.wine.bodega}</span>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center space-x-1.5 bg-black/40 border border-[#c5a880]/20 rounded p-1 scale-90 origin-left">
                            <button
                              onClick={() => onUpdateQuantity(item.wine.id, item.quantity - 1)}
                              className="text-gray-400 hover:text-white p-0.5 hover:bg-white/5 rounded transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono text-white px-2.5">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.wine.id, item.quantity + 1)}
                              className="text-gray-400 hover:text-white p-0.5 hover:bg-white/5 rounded transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-serif text-sm text-[#c5a880] font-semibold">
                            {(item.wine.price * item.quantity).toFixed(2)}€
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary / Checkout triggering */}
            {cartItems.length > 0 && !isCheckingOut && (
              <div className="p-6 border-t border-[#c5a880]/20 bg-[#181411] space-y-4">
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Subtotal</span>
                    <span>{(total / 1.21).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>IVA (21% Incluido)</span>
                    <span>{(total - total / 1.21).toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Gastos de Envío</span>
                    <span className="text-xs text-emerald-400">Gratuito</span>
                  </div>
                  <div className="flex justify-between font-serif text-lg text-white font-semibold pt-2 border-t border-dashed border-[#c5a880]/15">
                    <span>Total del Pedido</span>
                    <span className="text-[#c5a880]">{total.toFixed(2)}€</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full bg-gradient-to-r from-[#d9be96] to-[#af9368] text-black font-sans font-semibold py-3 px-4 rounded text-center tracking-wide hover:from-[#e3ccaa] hover:to-[#bd9f75] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="start-checkout-btn"
                >
                  Tramitar Pedido Seguro
                  <ChevronRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
                  Envío climatizado premium en 24/48 h
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
