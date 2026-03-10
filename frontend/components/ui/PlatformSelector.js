import { useState, useEffect } from 'react';
import { 
  platformConfig, 
  getPlatformUrl, 
  openPlatform, 
  platformPreference 
} from '../../utils/platformRedirects';

export default function PlatformSelector({ platformLinks = {}, topic = '' }) {
  const [preferredPlatform, setPreferredPlatform] = useState('leetcode');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setPreferredPlatform(platformPreference.get());
  }, []);

  const handleSetPreference = (platformId) => {
    platformPreference.set(platformId);
    setPreferredPlatform(platformId);
  };

  const platforms = Object.entries(platformConfig).map(([id, config]) => ({
    id,
    ...config
  }));

  const currentPlatform = platformConfig[preferredPlatform] || platformConfig.leetcode;

  return (
    <div 
      className="flex flex-col gap-3 p-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-wrap items-center gap-2">
        {/* Premium Platform Dropdown */}
        <div className="relative group/select">
          <div className="absolute inset-0 bg-primary/5 rounded-xl blur-md group-hover/select:blur-lg transition-all opacity-0 group-hover/select:opacity-100"></div>
          <select 
            value={preferredPlatform}
            onChange={(e) => handleSetPreference(e.target.value)}
            className="relative appearance-none pl-10 pr-10 py-2.5 text-xs font-bold rounded-xl border border-gray-200 dark:border-gray-700/50 bg-white/80 dark:bg-dark-light/80 backdrop-blur-md hover:border-primary transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-primary/10 w-full sm:w-auto z-10 shadow-sm"
          >
            {platforms.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          
          {/* Platform Icon Overlay */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 transition-transform group-hover/select:scale-110">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${currentPlatform.baseUrl}&sz=64`} 
              alt=""
              className="w-4 h-4 rounded-sm"
            />
          </div>

          {/* Chevron Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 z-20">
            <svg className="w-4 h-4 transition-transform group-hover/select:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Premium Solve Button */}
        <button 
          onClick={() => openPlatform(preferredPlatform, topic)}
          className="relative group/btn px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-white transition-all transform hover:-translate-y-1 active:translate-y-0.5 flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-primary/30 overflow-hidden"
          style={{ backgroundColor: currentPlatform.color }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
          <span className="relative z-10 flex items-center gap-2">
            Solve on {currentPlatform.name}
            <svg className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          
          {/* Animated Shine Effect */}
          <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/btn:animate-shine"></div>
        </button>
      </div>

      {/* Quick Access Bar */}
      <div className={`flex flex-wrap items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50/50 dark:bg-gray-800/30 backdrop-blur-sm border border-gray-100 dark:border-gray-700/30 transition-all duration-500 origin-top ${isHovered ? 'scale-100 opacity-100 mt-0' : 'scale-95 opacity-0 -mt-8 pointer-events-none'}`}>
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Fast Route:</span>
        <div className="flex gap-2.5">
          {platforms.map(p => (
            <button
              key={p.id}
              onClick={() => openPlatform(p.id, topic)}
              className={`group/quick flex items-center gap-1.5 p-1 rounded-lg transition-all hover:bg-white dark:hover:bg-gray-700 shadow-none hover:shadow-sm ${p.id === preferredPlatform ? 'hidden' : ''}`}
              title={`Directly open in ${p.name}`}
            >
              <div className="w-6 h-6 rounded-md bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600 group-hover/quick:border-primary/30 transition-colors">
                <img 
                  src={`https://www.google.com/s2/favicons?domain=${p.baseUrl}&sz=48`} 
                  alt={p.name}
                  className="w-3.5 h-3.5 grayscale group-hover/quick:grayscale-0 transition-all"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 group-hover/quick:text-primary transition-colors">{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          100% {
            left: 125%;
          }
        }
        .animate-shine {
          animation: shine 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


