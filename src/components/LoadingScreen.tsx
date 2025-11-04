import { motion } from 'motion/react';
import { Cpu, Zap } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Icon */}
        <motion.div
          className="mb-6"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <Zap size={48} className="text-white" />
          </div>
        </motion.div>

        {/* Title */}
        <h2 className="text-white mb-2">Analyzing Spark Plug</h2>
        <p className="text-slate-400 mb-8">Processing on Raspberry Pi...</p>

        {/* Animated Dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Status Messages */}
        <motion.div
          className="text-slate-500 text-sm flex items-center justify-center gap-2"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Cpu size={16} />
          Running YOLO detection model...
        </motion.div>
      </div>
    </div>
  );
}
