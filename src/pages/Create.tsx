import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Music, User, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Create() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !message) return;

    setIsSending(true);
    setShowAnimation(true);

    try {
      const res = await fetch("/api/bottles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, message, sender, song_url: songUrl }),
      });

      if (res.ok) {
        // Wait for animation to finish before navigating
        setTimeout(() => {
          navigate("/browse");
        }, 3000);
      } else {
        setIsSending(false);
        setShowAnimation(false);
        alert("Failed to send bottle. The sea is rough today.");
      }
    } catch (error) {
      setIsSending(false);
      setShowAnimation(false);
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 relative">
      <AnimatePresence>
        {!showAnimation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="w-full max-w-2xl glass-panel rounded-3xl p-8 md:p-12 shadow-2xl relative z-10"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-100">
              Write your message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <User className="w-4 h-4" /> To (Recipient Name) *
                </label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full glass-input rounded-xl px-4 py-3 text-lg"
                  placeholder="Who is this for?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <PenTool className="w-4 h-4" /> Message *
                </label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full glass-input rounded-xl px-4 py-3 text-lg font-script text-2xl leading-relaxed resize-none"
                  placeholder="Write what's on your mind..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4" /> From (Optional)
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    className="w-full glass-input rounded-xl px-4 py-3"
                    placeholder="Anonymous"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Music className="w-4 h-4" /> Song URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={songUrl}
                    onChange={(e) => setSongUrl(e.target.value)}
                    className="w-full glass-input rounded-xl px-4 py-3"
                    placeholder="Spotify/YouTube link"
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSending || !recipient || !message}
                className="w-full glass-button mt-8 py-4 rounded-xl text-lg font-bold text-cyan-100 flex items-center justify-center gap-3 bg-cyan-900/40 border-cyan-500/50 hover:bg-cyan-800/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                Throw into the Sea
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-50"
          >
            {/* Animation Sequence: Letter rolls up, goes into bottle, bottle drops into sea */}
            <div className="relative w-64 h-96 flex items-center justify-center perspective-[1000px]">
              
              {/* The Letter */}
              <motion.div
                initial={{ width: 200, height: 250, rotateX: 0, y: -50, opacity: 1 }}
                animate={{ 
                  width: [200, 40, 40], 
                  height: [250, 250, 150],
                  rotateX: [0, 720, 720],
                  y: [-50, -50, 50],
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 2, times: [0, 0.6, 1], ease: "easeInOut" }}
                className="absolute bg-[#f4e4bc] shadow-inner border border-[#d4c49c] rounded-sm flex items-center justify-center overflow-hidden z-20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="w-full h-full p-4 opacity-50">
                  <div className="w-full h-2 bg-black/20 mb-2 rounded" />
                  <div className="w-3/4 h-2 bg-black/20 mb-2 rounded" />
                  <div className="w-5/6 h-2 bg-black/20 mb-2 rounded" />
                  <div className="w-full h-2 bg-black/20 mb-2 rounded" />
                </div>
              </motion.div>

              {/* The Bottle */}
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 1.5, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 1, 0],
                  y: [100, 50, 50, -100, 400],
                  rotate: [0, 0, 0, 180, 360],
                  scale: [1.5, 1.5, 1.5, 0.8, 0.3]
                }}
                transition={{ duration: 3.5, times: [0, 0.2, 0.5, 0.7, 1], delay: 0.5, ease: "easeInOut" }}
                className="absolute z-10"
              >
                <svg width="80" height="200" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Bottle Body */}
                  <path d="M15 0H25V20C25 25 35 30 35 40V90C35 95 30 100 20 100C10 100 5 95 5 90V40C5 30 15 25 15 20V0Z" fill="url(#bottle_glass)" fillOpacity="0.6" stroke="white" strokeWidth="2"/>
                  
                  {/* Cork - Animates in */}
                  <motion.rect 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 2, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.3 }}
                    x="13" y="2" width="14" height="10" rx="2" fill="#8B4513"
                  />
                  
                  {/* Rolled letter inside - Appears when letter drops in */}
                  <motion.rect 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 2.2 }}
                    x="15" y="45" width="10" height="40" rx="5" fill="#f4e4bc" transform="rotate(5 20 65)" 
                  />
                  
                  <defs>
                    <linearGradient id="bottle_glass" x1="20" y1="0" x2="20" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#E0F2FE" stopOpacity="0.9"/>
                      <stop offset="1" stopColor="#0284C7" stopOpacity="0.3"/>
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Splash effect */}
              <motion.div
                initial={{ opacity: 0, scale: 0, y: 300 }}
                animate={{ 
                  opacity: [0, 0, 1, 0],
                  scale: [0, 0, 1, 3],
                }}
                transition={{ duration: 3.5, times: [0, 0.85, 0.9, 1], delay: 0.5 }}
                className="absolute w-48 h-16 border-4 border-cyan-300 rounded-[100%] opacity-0"
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="absolute bottom-20 font-serif text-3xl text-cyan-200 drop-shadow-lg"
            >
              Your bottle is drifting away...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
