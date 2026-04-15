import { useEffect, useRef, useState } from 'react';

export const useAudioAnalyzer = (audioUrl: string) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const [intensities, setIntensities] = useState({ low: 0, mid: 0, high: 0 });

  const initAudio = () => {
    if (!audioRef.current) return;
    
    const context = new AudioContext();
    const source = context.createMediaElementSource(audioRef.current);
    const analyzer = context.createAnalyser();
    
    source.connect(analyzer);
    analyzer.connect(context.destination);
    analyzer.fftSize = 256;
    analyzerRef.current = analyzer;

    const dataArray = new Uint8Array(analyzer.frequencyBinCount);
    
    const update = () => {
      analyzer.getByteFrequencyData(dataArray);
      
      // Mapeamento simplificado de frequências:
      // dataArray[0-10] = Graves (Bateria/Baixo)
      // dataArray[20-50] = Médios (Sax/Violão)
      // dataArray[80+] = Agudos (Flauta)
      setIntensities({
        low: dataArray[5],
        mid: dataArray[30],
        high: dataArray[90]
      });
      requestAnimationFrame(update);
    };
    update();
  };

  return { audioRef, intensities, initAudio };
};