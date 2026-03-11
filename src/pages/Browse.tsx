import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Music, User, Clock, MessageCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Bottle {
  id: number;
  recipient: string;
  message: string;
  song_url: string | null;
  sender: string | null;
  created_at: string;
}

export function Browse() {
  const [bottles, setBottles] = useState<Bottle[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedBottle, setSelectedBottle] = useState<Bottle | null>(null);
  const [openingStep, setOpeningStep] = useState(0); // 0: none, 1: bottle opening, 2: paper reading

  useEffect(() => {
    fetchBottles();
  }, []);

  const fetchBottles = async (query = "") => {
    setLoading(true);
    try {
      const res = await fetch(`/api/bottles${query ? `?search=${encodeURIComponent(query)}` : ""}`);
      if (res.ok) {
        const data = await res.json();
        setBottles(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBottles(search);
  };

  const handleOpenBottle = (bottle: Bottle) => {
    setSelectedBottle(bottle);
    setOpeningStep(1);
    // Move to reading step after animation
    setTimeout(() => {
      setOpeningStep(2);
    }, 2500);
  };

  const handleClose = () => {
    setSelectedBottle(null);
    setOpeningStep(0);
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl mb-12 relative z-10"
      >
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 text-center text-cyan-100">
          Find a Bottle
        </h2>
        
        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-cyan-300/50 group-focus-within:text-cyan-300 transition-colors" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input rounded-full py-4 pl-12 pr-32 text-lg shadow-lg"
            placeholder="Search by recipient name..."
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 glass-button px-6 rounded-full text-sm font-medium text-cyan-100 bg-cyan-900/40 hover:bg-cyan-800/60"
          >
            Search
          </button>
        </form>
      </motion.div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {loading ? (
          <div className="col-span-full flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
          </div>
        ) : bottles.length > 0 ? (
          bottles.map((bottle, index) => (
            <motion.div
              key={bottle.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleOpenBottle(bottle)}
              className="glass-panel p-6 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group flex flex-col h-64"
            >
              <div className="flex items-center gap-3 mb-4 text-cyan-200">
                <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center border border-cyan-500/30 group-hover:bg-cyan-800/50 transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-400">To</p>
                  <h3 className="font-serif text-xl font-bold truncate">{bottle.recipient}</h3>
                </div>
              </div>
              
              <div className="flex-1 overflow-hidden relative">
                <p className="font-script text-2xl text-slate-200 leading-relaxed opacity-80 line-clamp-4">
                  {bottle.message}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1e293b]/50 to-transparent" />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(bottle.created_at), { addSuffix: true })}
                </span>
                {bottle.song_url && (
                  <span className="flex items-center gap-1 text-cyan-400">
                    <Music className="w-3 h-3" />
                    Song attached
                  </span>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 text-slate-400">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-xl">No bottles found in this part of the ocean.</p>
          </div>
        )}
      </div>

      {/* Modal for viewing a bottle */}
      <AnimatePresence>
        {selectedBottle && openingStep > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm perspective-[1000px]"
          >
            {openingStep === 1 && (
              <div className="relative w-64 h-96 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* The Bottle */}
                <motion.div
                  initial={{ y: 200, opacity: 0, scale: 0.5 }}
                  animate={{ y: 0, opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute z-10"
                >
                  <svg width="80" height="200" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 0H25V20C25 25 35 30 35 40V90C35 95 30 100 20 100C10 100 5 95 5 90V40C5 30 15 25 15 20V0Z" fill="url(#bottle_glass_open)" fillOpacity="0.6" stroke="white" strokeWidth="2"/>
                    
                    {/* Cork popping off */}
                    <motion.rect 
                      initial={{ y: 2, x: 13, rotate: 0 }}
                      animate={{ y: -100, x: 50, rotate: 120, opacity: 0 }}
                      transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                      width="14" height="10" rx="2" fill="#8B4513"
                    />
                    
                    {/* Rolled letter inside - slides up and out */}
                    <motion.rect 
                      initial={{ y: 45, opacity: 0.9 }}
                      animate={{ y: -150, opacity: 0, scale: 2 }}
                      transition={{ delay: 1.5, duration: 1, ease: "easeIn" }}
                      x="15" width="10" height="40" rx="5" fill="#f4e4bc" transform="rotate(5 20 65)" 
                    />
                    
                    <defs>
                      <linearGradient id="bottle_glass_open" x1="20" y1="0" x2="20" y2="100" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E0F2FE" stopOpacity="0.9"/>
                        <stop offset="1" stopColor="#0284C7" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>
            )}

            {openingStep === 2 && (
              <motion.div
                initial={{ scale: 0.1, rotateX: 90, opacity: 0 }}
                animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl aged-paper p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-slate-600 transition-colors z-20"
                >
                  ✕
                </button>

                <div className="text-[#2c1e16] relative z-10">
                  <div className="mb-8 border-b border-[#8b4513]/20 pb-4">
                    <p className="text-sm text-[#5c4033] uppercase tracking-widest mb-1 font-sans">Dear</p>
                    <h2 className="font-serif text-4xl font-bold">{selectedBottle.recipient},</h2>
                  </div>

                  <div className="min-h-[200px] mb-12">
                    <p className="font-script text-3xl md:text-4xl leading-relaxed whitespace-pre-wrap">
                      {selectedBottle.message}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-t border-[#8b4513]/20 pt-6">
                    <div className="w-full md:w-auto">
                      <p className="text-sm text-[#5c4033] uppercase tracking-widest mb-1 font-sans">From</p>
                      <p className="font-serif text-2xl font-bold">
                        {selectedBottle.sender || "Anonymous"}
                      </p>
                      <p className="text-xs text-[#5c4033] mt-2 font-sans">
                        Found on {new Date(selectedBottle.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    {selectedBottle.song_url && (
                      <a 
                        href={selectedBottle.song_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full md:w-auto flex items-center gap-3 px-6 py-3 rounded-full bg-[#3e2723] text-[#f4e4bc] hover:bg-[#2c1e16] transition-colors font-sans text-sm font-medium group shadow-lg"
                      >
                        <Music className="w-4 h-4 group-hover:animate-bounce" />
                        Listen to attached song
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
