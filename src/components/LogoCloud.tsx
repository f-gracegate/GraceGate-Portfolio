/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TRUSTED_BRANDS } from '../data';

export default function LogoCloud() {
  return (
    <div className="bg-brand-bg-section py-10 border-y border-brand-border px-4 sm:px-8 select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Banner small text */}
        <div className="text-center">
          <span className="text-[10px] tracking-[0.4em] font-bold text-purple-400 uppercase">
            TRUSTED BY BUSINESSES WORLDWIDE
          </span>
        </div>

        {/* Brand Logos Slider */}
        <div className="relative flex overflow-hidden group">
          <div className="flex space-x-12 sm:space-x-20 items-center justify-between mx-auto flex-wrap gap-y-4 pt-1">
            {TRUSTED_BRANDS.map((brand, idx) => (
              <span 
                key={idx} 
                className="text-brand-text-dim/50 hover:text-brand-text-white font-mono font-bold text-xs cursor-default transition-colors tracking-widest uppercase"
              >
                [{brand}]
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
