import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface VisualizerProps {
  photos: string[];
}

export const Visualizer = ({ photos }: VisualizerProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 6000); // 6 segundos de duração por foto
    return () => clearInterval(timer);
  }, [photos]);

  if (photos.length === 0) return <div style={{color: '#555'}}>Aguardando pesquisa...</div>;

  return (
    <div style={{ width: '100%', height: '450px', position: 'relative', overflow: 'hidden', borderRadius: '15px' }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={photos[index]}
          src={photos[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }} // Fade In/Out de 0.7s
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            border: '2px solid rgba(212, 175, 55, 0.3)' 
          }}
        />
      </AnimatePresence>
    </div>
  );
};