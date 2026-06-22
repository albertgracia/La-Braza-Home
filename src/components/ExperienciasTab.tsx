/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { EXPERIENCES_DATA, BODEGAS_DATA } from '../data.ts';
import { Calendar, Clock, Sparkles, Users, Compass, DollarSign, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ExperienciasTab() {
  const [selectedExperience, setSelectedExperience] = useState<any>(null);
  const [bookingFormData, setBookingFormData] = useState({
    guests: 2,
    date: '2026-07-15',
    timeSlot: '11:00 - Sabores Crianza',
    name: '',
    email: '',
  });
  const [bookingSuccessPass, setBookingSuccessPass] = useState<any>(null);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mockCode = `RQ-TOUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingSuccessPass({
      code: mockCode,
      experience: clockExperienceData(selectedExperience),
      ...bookingFormData,
    });
    setSelectedExperience(null);
  };

  const clockExperienceData = (exp: any) => exp;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 text-left" id="experiencias-tab-root">
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#c5a880] text-xs font-mono uppercase tracking-widest">
            ENOTURISMO DE ÉLITE
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
            Experiencias de Cata Privadas
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Sienta el latido del roble, asista a trasiegas nocturnas a la luz de las velas o saboree menús diseñados por renombrados chefs riojanos en comedores de barricas señoriales.
          </p>
        </div>

        {/* Experience catalog grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="experience-catalog-grid">
          {EXPERIENCES_DATA.map((exp) => {
            const bodega = BODEGAS_DATA.find((b) => b.id === exp.bodegaId);

            return (
              <div
                key={exp.id}
                className="bg-[#14100e] border border-[#c5a880]/15 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row hover:border-[#c5a880]/50 transition-all group"
              >
                {/* Visual */}
                <div className="md:w-2/5 relative shrink-0 min-h-[220px]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover saturate-[0.8] brightness-75 group-hover:scale-102 transition-transform duration-700 h-[220px] md:h-full"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Price sticker */}
                  <div className="absolute bottom-4 left-4 bg-black/80 border border-[#c5a880]/30 font-serif text-base text-[#c5a880] px-3.5 py-1.5 rounded font-bold">
                    {exp.price.toFixed(2)}€ / pers.
                  </div>
                </div>

                {/* Info side */}
                <div className="md:w-3/5 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-[#c5a880] font-mono">
                      <span>{bodega?.name || 'Bodegas Riojanas'}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {exp.duration}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg text-white font-semibold leading-snug group-hover:text-[#c5a880] transition-colors">
                      {exp.title}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans">
                      {exp.description}
                    </p>

                    {/* Features list bullet previews */}
                    <div className="space-y-1.5 pt-2">
                      {exp.inclusions.slice(0, 2).map((inc, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300 font-sans">
                          <Check className="w-3 h-3 text-[#c5a880] shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#c5a880]/15 flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono text-gray-500 tracking-wider">
                      Valoración {exp.rating} ★
                    </span>

                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className="bg-transparent border border-[#c5a880] text-[#c5a880] hover:bg-[#c5a880] hover:text-black font-sans font-medium text-xs px-4 py-2 rounded transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Reservar Plaza
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Modal booking form */}
        <AnimatePresence>
          {selectedExperience && (
            <div className="fixed inset-0 z-50 overflow-y-auto" id="booking-modal-portal">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedExperience(null)}
                className="fixed inset-0 bg-black cursor-pointer"
              />

              <div className="flex min-h-screen items-center justify-center p-4">
                <motion.div
                  initial={{ transform: 'scale(0.95)', opacity: 0 }}
                  animate={{ transform: 'scale(1)', opacity: 1 }}
                  exit={{ transform: 'scale(0.95)', opacity: 0 }}
                  className="relative bg-[#14100e] border-2 border-[#c5a880]/40 max-w-md w-full rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden z-10 space-y-6"
                >
                  <div className="text-left space-y-2">
                    <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block">FORMULARIO DE SOLICITUD VIP</span>
                    <h4 className="font-serif text-xl text-white leading-tight">Solicitud de Reserva</h4>
                    <p className="text-xs text-gray-400 font-sans">{selectedExperience.title}</p>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4 font-sans text-xs">
                    <div>
                      <label className="block text-gray-400 uppercase tracking-widest text-[9px] mb-1 font-mono">Nombre del Titular</label>
                      <input
                        required
                        type="text"
                        value={bookingFormData.name}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                        className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c5a880]"
                        placeholder="ej. Marqués de Heredia"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-widest text-[9px] mb-1 font-mono">Email de Contacto</label>
                      <input
                        required
                        type="email"
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                        className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c5a880]"
                        placeholder="correo@sumiller.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 uppercase tracking-widest text-[9px] mb-1 font-mono">Fecha Visita</label>
                        <input
                          required
                          type="date"
                          value={bookingFormData.date}
                          onChange={(e) => setBookingFormData({ ...bookingFormData, date: e.target.value })}
                          className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-[#c5a880]"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 uppercase tracking-widest text-[9px] mb-1 font-mono">Nº de Comensales</label>
                        <div className="relative flex items-center">
                          <Users className="w-3.5 h-3.5 text-gray-500 absolute left-2.5" />
                          <select
                            value={bookingFormData.guests}
                            onChange={(e) => setBookingFormData({ ...bookingFormData, guests: Number(e.target.value) })}
                            className="w-full bg-black/40 border border-[#c5a880]/30 rounded pl-8 pr-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-[#c5a880]"
                          >
                            {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                              <option key={num} value={num} className="bg-[#14100e]">
                                {num} {num === 1 ? 'Persona' : 'Personas'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 uppercase tracking-widest text-[9px] mb-1 font-mono">Turno Horario Seleccionado</label>
                      <select
                        value={bookingFormData.timeSlot}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, timeSlot: e.target.value })}
                        className="w-full bg-black/40 border border-[#c5a880]/30 rounded px-3 py-2 text-white font-sans text-xs focus:outline-none focus:border-[#c5a880]"
                      >
                        <option value="11:00 - Sabores Crianza">11:00 - Turno de Mañana con Cata</option>
                        <option value="13:30 - Maridaje Oficial">13:30 - Almuerzo & Maridaje Oficial</option>
                        <option value="17:00 - Atardecer en Viñedo">17:00 - Tour Extraordinario Atardecer</option>
                      </select>
                    </div>

                    <div className="pt-4 flex justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setSelectedExperience(null)}
                        className="w-1/2 border border-gray-600 hover:border-white text-gray-400 hover:text-white py-2 px-3 rounded text-[11px] uppercase tracking-wider font-semibold transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        className="w-1/2 bg-gradient-to-r from-[#d9be96] to-[#af9368] text-black font-semibold py-2 px-3 rounded text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow"
                      >
                        Reservar {bookingFormData.guests * selectedExperience.price}€
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* Booking success overlay ticket pass */}
        <AnimatePresence>
          {bookingSuccessPass && (
            <div className="fixed inset-0 z-50 overflow-y-auto" id="ticket-success-portal">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setBookingSuccessPass(null)}
                className="fixed inset-0 bg-black cursor-pointer"
              />

              <div className="flex min-h-screen items-center justify-center p-4">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="bg-[#1c1613] border-2 border-[#c5a880] w-[340px] md:w-[480px] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col z-10"
                >
                  
                  {/* Gold ticket top banner */}
                  <div className="bg-gradient-to-r from-[#d9be96] to-[#af9368] p-4 text-center text-black font-mono text-xs font-semibold uppercase tracking-widest relative">
                    Pase de Reserva de Enoturismo VIP
                    <div className="absolute -bottom-1.5 left-0 right-0 h-1.5 flex justify-between px-4 overflow-hidden">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 bg-[#1c1613] rounded-full shrink-0" />
                      ))}
                    </div>
                  </div>

                  {/* Ticket Body details */}
                  <div className="p-6 md:p-8 space-y-6 text-left text-xs font-mono text-gray-400">
                    <div className="text-center space-y-1 py-1">
                      <span className="text-[10px] text-[#c5a880] uppercase tracking-widest block font-bold">Código de Confirmación</span>
                      <h4 className="font-sans text-xl text-white font-bold tracking-wider">{bookingSuccessPass.code}</h4>
                    </div>

                    <div className="border-t border-b border-dashed border-[#c5a880]/30 py-4 space-y-3">
                      <div>
                        <span className="text-[10px] text-gray-500 block uppercase">Experiencia Escogida</span>
                        <span className="text-sm text-white font-serif tracking-normal block">{bookingSuccessPass.experience.title}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-gray-500 block uppercase">Fecha Visita</span>
                          <span className="text-xs text-gray-200 block">{bookingSuccessPass.date}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 block uppercase">Turno / Horario</span>
                          <span className="text-xs text-gray-200 block">{bookingSuccessPass.timeSlot.split(' - ')[0]} h</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[10px] text-gray-500 block uppercase">Nº de Asistentes</span>
                          <span className="text-xs text-gray-200 block">{bookingSuccessPass.guests} {bookingSuccessPass.guests === 1 ? 'Persona' : 'Personas'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-500 block uppercase">Titular VIP</span>
                          <span className="text-xs text-gray-200 block truncate">{bookingSuccessPass.name}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center bg-black/40 border border-[#c5a880]/15 p-3 rounded-lg text-[10px]">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase block">Total Garantizado</span>
                        <span className="text-xs text-emerald-400 font-sans font-bold">{(bookingSuccessPass.guests * bookingSuccessPass.experience.price).toFixed(2)}€</span>
                      </div>
                      <div className="text-emerald-400 font-semibold uppercase tracking-wider flex items-center gap-1.5 font-sans">
                        <Check className="w-3.5 h-3.5" /> CONFIRMADA
                      </div>
                    </div>

                    <button
                      onClick={() => setBookingSuccessPass(null)}
                      className="w-full bg-[#110e0c] hover:bg-black border border-[#c5a880]/30 hover:border-[#c5a880] text-gray-300 hover:text-white py-2 px-4 rounded transition-all uppercase tracking-widest text-[10px] text-center cursor-pointer font-sans"
                    >
                      Entendido, Guardar Pase
                    </button>
                  </div>

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
