/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BODEGAS_DATA } from '../data.ts';
import { Calendar, MapPin, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function BodegasTab() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 text-left" id="bodegas-tab-root">
      <div className="space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#c5a880] text-xs font-mono uppercase tracking-widest">
            HISTORIAS AFONDADAS DEL VINO
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white tracking-wide">
            Casas y Calados Legendarios
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            La Rioja alberga algunas de las bodegas más admiradas del mundo. Cada una de estas casas custodia secretos ancestrales y barricas centenarias custodiadas en piedra.
          </p>
        </div>

        {/* Bodegas list (Alternate elegant layout) */}
        <div className="space-y-12" id="bodega-list-container">
          {BODEGAS_DATA.map((bodega, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={bodega.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className={`bg-[#14100e] border border-[#c5a880]/15 rounded-2xl overflow-hidden flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } justify-between shadow-xl group`}
              >
                
                {/* Image Section */}
                <div className="lg:w-1/2 relative min-h-[300px] overflow-hidden">
                  <img
                    src={bodega.image}
                    alt={bodega.name}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 min-h-[320px] filter saturate-[0.8] brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Floating Foundation Label */}
                  <div className="absolute top-6 left-6 bg-black/80 border border-[#c5a880]/40 px-4 py-2 rounded font-mono text-xs text-[#c5a880] flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5" />
                    FUNDADA EN {bodega.foundedYear}
                  </div>
                </div>

                {/* Info details side */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#c5a880] font-mono">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{bodega.location}</span>
                      </div>
                      <h3 className="font-serif text-2xl md:text-3xl text-white font-medium group-hover:text-[#c5a880] transition-colors">
                        {bodega.name}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-sm leading-relaxed font-sans">
                      {bodega.description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#c5a880]/15 text-xs text-left">
                      <div className="space-y-1">
                        <div className="text-gray-500 font-mono uppercase tracking-wider">Estilo Vinícola</div>
                        <div className="text-[#c5a880] font-sans font-semibold text-sm">{bodega.style}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-gray-500 font-mono uppercase tracking-wider">Hito de Interés</div>
                        <div className="text-[#c5a880] font-sans font-semibold text-sm">{bodega.experienceHighlight}</div>
                      </div>
                    </div>
                  </div>

                  {/* Actions summary */}
                  <div className="pt-4 flex items-center justify-between border-t border-[#c5a880]/15 gap-4">
                    <span className="text-[11px] text-gray-500 font-mono uppercase">
                      Rioja Denominación de Origen Calificada
                    </span>
                    
                    <button
                      onClick={() => {
                        // Quick scroll back to experiences tab
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="border border-[#c5a880]/30 hover:border-[#c5a880] text-gray-300 hover:text-white px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer font-sans flex items-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                      Ver Ficha Enoturisticas
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
