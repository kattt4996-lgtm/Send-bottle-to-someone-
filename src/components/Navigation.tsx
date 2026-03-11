import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import { Waves } from "lucide-react";

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="z-20 w-full py-6 px-4 md:px-8 flex items-center justify-between glass-panel border-x-0 border-t-0 border-b border-white/10 sticky top-0">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Waves className="w-8 h-8 text-cyan-400" />
        </motion.div>
        <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
          Send Bottle to Someone
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        <Link 
          to="/browse" 
          className={`text-sm md:text-base font-medium transition-colors hover:text-cyan-300 ${location.pathname === '/browse' ? 'text-cyan-400' : 'text-slate-300'}`}
        >
          Find a Bottle
        </Link>
        <Link 
          to="/create" 
          className="glass-button px-4 py-2 rounded-full text-sm md:text-base font-medium text-white flex items-center gap-2"
        >
          Send a Bottle
        </Link>
      </div>
    </nav>
  );
}
