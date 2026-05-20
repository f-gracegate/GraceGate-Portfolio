/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { LayoutGrid, ShoppingBag, Code, Search } from 'lucide-react';

export default function FloatingOrbits() {
  return (
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden">
      {/* Radiant Background Glows */}
      <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-purple-600/10 rounded-full blur-[80px]" />
      <div className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bg-indigo-500/10 rounded-full blur-[60px] translate-x-12 -translate-y-8" />

      {/* Orbits Lines */}
      <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] rounded-full border border-purple-950/40 animate-[spin_50s_linear_infinite]" />
      <div className="absolute w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] rounded-full border border-dashed border-purple-900/40 animate-[spin_30s_linear_infinite_reverse]" />

      {/* Watermark Logo "GG" text in the center */}
      <div className="absolute select-none pointer-events-none">
        <span className="text-8xl sm:text-[13rem] font-black tracking-tighter text-purple-950/20 font-sans block select-none">
          GG
        </span>
      </div>

      {/* Orbit center tracker indicator */}
      <div className="absolute w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
      <div className="absolute w-2.5 h-2.5 bg-[#06040a] rounded-full" />

      {/* Floating Badges */}
      
      {/* 1. WordPress — Top Right */}
      <motion.div 
        className="absolute top-[10%] right-[10%] sm:right-[15%] z-10"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="bg-[#110926]/90 border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex items-center space-x-3 w-[150px] sm:w-[175px]">
          <div className="p-2 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-400">
            <LayoutGrid size={20} />
          </div>
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold truncate">WordPress</h4>
            <span className="text-[10px] text-gray-400 font-medium">Website Design</span>
          </div>
        </div>
        {/* Connection point line glow */}
        <div className="absolute -left-2 top-1/2 w-4 h-[1px] bg-gradient-to-r from-purple-500 to-transparent" />
      </motion.div>

      {/* 2. SEO — Center Left */}
      <motion.div 
        className="absolute bottom-[45%] left-[5%] sm:left-[10%] z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="bg-[#110926]/90 border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex items-center space-x-3 w-[140px] sm:w-[160px]">
          <div className="p-2 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-400">
            <Search size={20} />
          </div>
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold truncate">SEO</h4>
            <span className="text-[10px] text-gray-400 font-medium">Digital Marketing</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Webflow — Bottom Center */}
      <motion.div 
        className="absolute bottom-[8%] left-[25%] sm:left-[35%] z-10"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <div className="bg-[#110926]/90 border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex items-center space-x-3 w-[150px] sm:w-[170px]">
          <div className="p-2 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-400">
            <Code size={20} />
          </div>
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold truncate">Webflow</h4>
            <span className="text-[10px] text-gray-400 font-medium">Website Design</span>
          </div>
        </div>
      </motion.div>

      {/* 4. Shopify — Bottom Right */}
      <motion.div 
        className="absolute bottom-[25%] right-[5%] sm:right-[12%] z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="bg-[#110926]/90 border border-purple-500/30 rounded-2xl p-3 sm:p-4 shadow-xl backdrop-blur-md flex items-center space-x-3 w-[140px] sm:w-[160px]">
          <div className="p-2 rounded-xl bg-purple-900/50 border border-purple-500/30 text-purple-400">
            <ShoppingBag size={20} />
          </div>
          <div>
            <h4 className="text-white text-xs sm:text-sm font-bold truncate">Shopify</h4>
            <span className="text-[10px] text-gray-400 font-medium">Store Design</span>
          </div>
        </div>
      </motion.div>

      {/* Accent Orbital particles */}
      <div className="absolute top-[28%] left-[25%] w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
      <div className="absolute bottom-[35%] right-[32%] w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
    </div>
  );
}
