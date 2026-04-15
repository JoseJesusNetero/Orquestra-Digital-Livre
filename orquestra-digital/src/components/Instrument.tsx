import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

interface InstrumentProps {
  name: string;
  img: string;
  isActive: boolean;
  notes: string[];
}

export const Instrument = ({ name, img, isActive, notes }: InstrumentProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '20px' }}>
      {/* Coluna de Notas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {notes.map((note, i) => (
          <div key={i} style={{
            background: 'white', color: 'black', padding: '4px',
            fontSize: '10px', fontWeight: 'bold', borderRadius: '2px',
            display: 'flex', alignItems: 'center'
          }}>
            <Music size={10} /> {note}
          </div>
        ))}
      </div>

      {/* Imagem com Animação */}
      <motion.img 
        src={img} 
        alt={name}
        animate={isActive ? { scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] } : {}}
        transition={{ repeat: Infinity, duration: 0.5 }}
        style={{ width: '80px', height: '80px', objectFit: 'contain' }}
      />
    </div>
  );
};