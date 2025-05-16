
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const handsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: index => ({
      scale: 1,
      opacity: 1,
      transition: { 
        delay: 0.5 + (index * 0.2),
        type: 'spring',
        stiffness: 200,
        damping: 10
      }
    })
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        delay: 1.2, 
        type: 'spring',
        stiffness: 200,
        damping: 10
      } 
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255, 126, 95, 0.6)",
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div 
      className="min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-purple-500/10 mix-blend-overlay filter blur-[60px]"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-[30%] right-[10%] w-80 h-80 rounded-full bg-game-scissors/10 mix-blend-overlay filter blur-[70px]"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[25%] w-72 h-72 rounded-full bg-game-paper/10 mix-blend-overlay filter blur-[65px]"
          animate={{ 
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 9,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="text-center mb-16 z-10 max-w-3xl px-4"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight font-serif"
          variants={itemVariants}
        >
          <span className="inline-block bg-gradient-to-r from-game-rock via-game-paper to-game-scissors bg-clip-text text-transparent pb-2">
            Rock Paper Scissors
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-gray-300/80 max-w-2xl mx-auto leading-relaxed font-light italic"
          variants={itemVariants}
        >
          Challenge yourself in this timeless game of chance and strategy.
        </motion.p>
      </motion.div>
      
      <motion.div 
        className="relative flex flex-col items-center z-10"
        variants={itemVariants}
      >
        <div className="flex gap-10 mb-16">
          {['✊', '✋', '✌️'].map((hand, index) => (
            <motion.div
              key={hand}
              custom={index}
              variants={handsVariants}
              className="relative"
              whileHover={{ 
                y: -10, 
                rotate: [-5, 5, 0],
                transition: { type: "spring", stiffness: 300 }
              }}
            >
              <span className="text-7xl md:text-8xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{hand}</span>
              <motion.div 
                className="absolute -inset-4 rounded-full opacity-0"
                animate={{
                  boxShadow: [
                    "0 0 0 rgba(255,255,255,0)",
                    "0 0 20px rgba(255,255,255,0.3)",
                    "0 0 0 rgba(255,255,255,0)"
                  ],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 2,
                  delay: index * 0.6
                }}
              />
            </motion.div>
          ))}
        </div>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button 
            onClick={onStart}
            size="lg" 
            className="text-xl px-12 py-7 bg-gradient-to-r from-game-rock/90 via-game-paper/70 to-game-scissors/90 hover:from-game-rock hover:via-game-paper hover:to-game-scissors transition-all duration-500 shadow-lg rounded-xl relative overflow-hidden group font-medium"
          >
            <span className="relative z-10">Start The Battle</span>
            <motion.span 
              className="absolute inset-0 bg-white/20 z-0"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{ x: "100%", opacity: 0.3 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
          </Button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="text-gray-400/80 text-sm tracking-wider flex items-center justify-center gap-2 font-light">
          CREATED WITH <Heart size={14} className="text-game-rock animate-pulse" fill="currentColor" /> BY 
          <span className="bg-gradient-to-r from-game-paper to-game-scissors bg-clip-text text-transparent font-semibold">
            SUPARN SHUKLA
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
