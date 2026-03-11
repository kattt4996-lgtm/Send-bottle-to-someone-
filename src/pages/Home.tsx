import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Send, Search } from "lucide-react";

export function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-200">
          Send a message in a bottle.
        </h1>
        <p className="text-lg md:text-xl text-slate-300 mb-12 font-light max-w-2xl mx-auto">
          Write a letter, roll it up, put it in a glass bottle, and throw it into the digital ocean. 
          Maybe someone will find it. Maybe the person you meant it for will read it.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/create">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-8 py-4 rounded-full text-lg font-medium text-cyan-100 flex items-center gap-3 w-full sm:w-auto justify-center bg-cyan-900/30 border-cyan-500/30 hover:bg-cyan-800/40"
            >
              <Send className="w-5 h-5" />
              Send a Bottle
            </motion.button>
          </Link>
          
          <Link to="/browse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-button px-8 py-4 rounded-full text-lg font-medium text-slate-200 flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <Search className="w-5 h-5" />
              Find a Bottle
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Decorative floating bottles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            initial={{ 
              y: "100vh", 
              x: Math.random() * 100 + "vw",
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: "-20vh",
              rotate: Math.random() * 360 + 360
            }}
            transition={{ 
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            <svg width="40" height="100" viewBox="0 0 40 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0H25V20C25 25 35 30 35 40V90C35 95 30 100 20 100C10 100 5 95 5 90V40C5 30 15 25 15 20V0Z" fill="url(#paint0_linear)" fillOpacity="0.5" stroke="white" strokeWidth="2"/>
              <rect x="13" y="2" width="14" height="6" rx="2" fill="#8B4513"/>
              <defs>
                <linearGradient id="paint0_linear" x1="20" y1="0" x2="20" y2="100" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E0F2FE" stopOpacity="0.8"/>
                  <stop offset="1" stopColor="#0284C7" stopOpacity="0.2"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
