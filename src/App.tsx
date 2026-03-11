import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Home } from "./pages/Home";
import { Browse } from "./pages/Browse";
import { Create } from "./pages/Create";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Full SVG Beach Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <svg className="w-full h-full object-cover" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" />
                <stop offset="40%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#831843" />
              </linearGradient>
              <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f766e" />
                <stop offset="50%" stopColor="#115e59" />
                <stop offset="100%" stopColor="#042f2e" />
              </linearGradient>
              <linearGradient id="sandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Sky */}
            <rect width="1920" height="1080" fill="url(#skyGrad)" />
            
            {/* Stars */}
            <g fill="#ffffff" opacity="0.6">
              <circle cx="200" cy="150" r="1.5" />
              <circle cx="500" cy="80" r="2" />
              <circle cx="800" cy="200" r="1" />
              <circle cx="1200" cy="100" r="2.5" />
              <circle cx="1600" cy="250" r="1.5" />
              <circle cx="1800" cy="120" r="2" />
            </g>

            {/* Moon */}
            <circle cx="1500" cy="250" r="80" fill="#fef08a" filter="url(#glow)" opacity="0.9" />
            
            {/* Ocean Base */}
            <path d="M0,550 Q480,530 960,560 T1920,540 L1920,1080 L0,1080 Z" fill="url(#oceanGrad)" />
            
            {/* Ocean Waves */}
            <path d="M0,580 Q480,560 960,590 T1920,570 L1920,1080 L0,1080 Z" fill="#0d9488" opacity="0.2" />
            <path d="M0,620 Q480,590 960,630 T1920,600 L1920,1080 L0,1080 Z" fill="#0f766e" opacity="0.4" />
            <path d="M0,680 Q480,650 960,690 T1920,660 L1920,1080 L0,1080 Z" fill="#115e59" opacity="0.6" />
            
            {/* Sand / Beach */}
            <path d="M0,850 Q480,800 960,880 T1920,820 L1920,1080 L0,1080 Z" fill="url(#sandGrad)" />
            <path d="M0,880 Q480,840 960,900 T1920,850 L1920,1080 L0,1080 Z" fill="#451a03" opacity="0.5" />
          </svg>
        </div>
        
        <Navigation />
        
        <main className="flex-grow z-10 container mx-auto px-4 py-8 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/create" element={<Create />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
