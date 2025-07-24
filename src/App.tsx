import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Telegram WebApp types
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand: () => void;
      };
    };
  }
}

const App = () => {
  const [brainExpanded, setBrainExpanded] = useState(false);

  useEffect(() => {
    // Telegram Mini App initialization
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  const handleBrainClick = () => {
    setBrainExpanded(!brainExpanded);
    if (!brainExpanded) {
      // Neural brain activation sound effect
      try {
        const utterance = new SpeechSynthesisUtterance('Orbitrum');
        utterance.rate = 0.8;
        utterance.pitch = 0.7;
        speechSynthesis.speak(utterance);
      } catch (e) {
        console.log('Voice not available');
      }
    }
  };

  const professionals = [
    { id: 1, name: "Carlos Silva", emoji: "👨‍💼", ring: 1 },
    { id: 2, name: "Ana Costa", emoji: "👩‍💻", ring: 1 },
    { id: 3, name: "João Santos", emoji: "👨‍🔧", ring: 1 },
    { id: 4, name: "Maria Lima", emoji: "👩‍⚕️", ring: 1 },
    { id: 5, name: "Pedro Souza", emoji: "👨‍🎨", ring: 2 },
    { id: 6, name: "Julia Ramos", emoji: "👩‍🏫", ring: 2 },
    { id: 7, name: "Bruno Alves", emoji: "👨‍🍳", ring: 2 },
    { id: 8, name: "Carla Dias", emoji: "👩‍⚖️", ring: 2 },
    { id: 9, name: "Rafael Cruz", emoji: "👨‍🚀", ring: 2 },
    { id: 10, name: "Lucia Melo", emoji: "👩‍🔬", ring: 3 },
    { id: 11, name: "Diego Nunes", emoji: "👨‍📷", ring: 3 },
    { id: 12, name: "Beatriz Moura", emoji: "👩‍🎤", ring: 3 },
    { id: 13, name: "Thiago Lopes", emoji: "👨‍🌾", ring: 3 },
    { id: 14, name: "Fernanda Rocha", emoji: "👩‍✈️", ring: 3 },
    { id: 15, name: "Gabriel Ferreira", emoji: "👨‍🚒", ring: 3 },
    { id: 16, name: "Amanda Ribeiro", emoji: "👩‍💼", ring: 3 },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-cyan-400 text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          ORBITRUM CONNECT
        </motion.h1>

        {/* Orbital System */}
        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
          {/* Orbital Rings */}
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute border border-cyan-400/30 rounded-full"
              style={{
                width: `${ring * 120}px`,
                height: `${ring * 120}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{ rotate: ring % 2 === 0 ? -360 : 360 }}
              transition={{
                duration: 10 + ring * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Professional Orbs */}
              {professionals
                .filter(p => p.ring === ring)
                .map((prof, index) => {
                  const angle = (360 / professionals.filter(p => p.ring === ring).length) * index;
                  const radius = ring * 60;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  
                  return (
                    <motion.div
                      key={prof.id}
                      className="absolute w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center cursor-pointer text-xl shadow-lg shadow-cyan-400/50"
                      style={{
                        left: `calc(50% + ${x}px - 24px)`,
                        top: `calc(50% + ${y}px - 24px)`,
                      }}
                      whileHover={{ scale: 1.2, boxShadow: "0 0 20px #00ffff" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => alert(`Conectando com ${prof.name}...`)}
                    >
                      {prof.emoji}
                    </motion.div>
                  );
                })}
            </motion.div>
          ))}

          {/* Neural Brain Central */}
          <motion.div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full border-4 border-white cursor-pointer flex items-center justify-center text-4xl shadow-xl"
            animate={{
              boxShadow: [
                "0 0 20px #00ffff",
                "0 0 40px #00ffff, 0 0 60px #00ffff",
                "0 0 20px #00ffff"
              ],
              scale: brainExpanded ? 1.3 : 1,
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity },
              scale: { duration: 0.3 }
            }}
            whileHover={{ scale: brainExpanded ? 1.4 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleBrainClick}
          >
            🧠
          </motion.div>
        </div>

        {/* Instructions */}
        <motion.div
          className="text-center mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="text-lg text-cyan-400">
            Conecte-se com profissionais próximos
          </p>
          <p className="text-sm text-gray-400">
            Clique no Cérebro Neural para começar
          </p>
        </motion.div>

        {/* Status */}
        <motion.div
          className="absolute bottom-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="text-green-400 text-sm">
            ✅ Sistema Neural Ativo
          </div>
          <div className="text-cyan-400 text-xs">
            🚀 Deploy Vercel Funcionando
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default App;