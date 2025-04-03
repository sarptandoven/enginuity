import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  opacity: number;
}

export default function AnimatedBackground({ opacity }: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0B]"
        style={{ opacity }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            initial={{ 
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%"
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%"
              ]
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
    </div>
  );
} 