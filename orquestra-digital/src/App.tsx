import { useState } from 'react';
import { Header } from './components/Header';
import { Visualizer } from './components/Visualizer';
import { Instrument } from './components/Instrument';
import { AudioVisualizer } from './components/AudioVisualizer';
import { useAudioAnalyzer } from './hooks/useAudioAnalyzer';
import { fetchImages } from './services/imageService';

// URLs de ícones (Podem ser trocados por arquivos locais na pasta assets)
const ICONS = {
  bateria: "https://cdn-icons-png.flaticon.com/512/1703/1703277.png",
  guitarra: "https://cdn-icons-png.flaticon.com/512/2905/2905103.png",
  sax: "https://cdn-icons-png.flaticon.com/512/2905/2905139.png",
  violao: "https://cdn-icons-png.flaticon.com/512/3843/3843930.png",
  flauta: "https://cdn-icons-png.flaticon.com/512/2905/2905118.png"
};

export default function App() {
  const [search, setSearch] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  
  // URL de exemplo (Trilha de aventura épica)
  const audioUrl = "https://mp3l.jamendo.com/?trackid=1890835&format=mp31&from=app-97b28c9a";
  
  // Hook de análise de áudio
  const { audioRef, intensities, initAudio } = useAudioAnalyzer(audioUrl);

  const handleSearch = async () => {
    if (!search) return;
    const results = await fetchImages(search);
    setPhotos(results);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Barra de Pesquisa */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <input 
          type="text" 
          placeholder="Ex: Red Dead Redemption 2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ 
            padding: '12px', borderRadius: '8px 0 0 8px', border: '1px solid #D4AF37',
            width: '350px', background: '#111', color: 'white' 
          }}
        />
        <button 
          onClick={handleSearch}
          style={{ 
            padding: '12px 25px', borderRadius: '0 8px 8px 0', border: 'none', 
            background: '#D4AF37', color: 'black', fontWeight: 'bold', cursor: 'pointer' 
          }}
        >
          INVOCAR IMAGENS
        </button>
      </div>

      {/* Container Principal (Dividido em 2) */}
      <div className="main-container" style={{ display: 'flex', flex: 1, gap: '30px', padding: '0 40px' }}>
        
        {/* LADO ESQUERDO: SLIDESHOW */}
        <div style={{ flex: 1 }}>
          <Visualizer photos={photos} />
        </div>

        {/* LADO DIREITO: ORQUESTRA */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          
          <Instrument 
            name="Bateria" 
            img={ICONS.bateria} 
            isActive={intensities.low > 160} 
            notes={['BUM', 'CAI', 'XIS', 'PRT']} 
          />
          <Instrument 
            name="Guitarra" 
            img={ICONS.guitarra} 
            isActive={intensities.mid > 150} 
            notes={['MI', 'LA', 'RE', 'SOL']} 
          />
          <Instrument 
            name="Saxophone" 
            img={ICONS.sax} 
            isActive={intensities.mid > 120 && intensities.mid < 150} 
            notes={['SOL', 'LA', 'SI', 'DO']} 
          />
          <Instrument 
            name="Violão" 
            img={ICONS.violao} 
            isActive={intensities.mid > 80 && intensities.mid < 120} 
            notes={['RE', 'FA#', 'LA', 'RE']} 
          />
          <Instrument 
            name="Flauta" 
            img={ICONS.flauta} 
            isActive={intensities.high > 140} 
            notes={['DO', 'RE', 'MI', 'FA']} 
          />

          {/* Player e Visualizador Gráfico */}
          <div style={{ marginTop: 'auto', padding: '20px', textAlign: 'center' }}>
            <AudioVisualizer analyzer={null} /> {/* O analyzerRef pode ser passado aqui */}
            <br />
            <audio 
              ref={audioRef} 
              src={audioUrl} 
              controls 
              onPlay={initAudio}
              style={{ filter: 'invert(1) hue-rotate(180deg)', marginTop: '10px' }} 
            />
          </div>
        </div>

      </div>
      
      <footer style={{ textAlign: 'center', padding: '20px', color: '#555', fontSize: '0.8rem' }}>
        &copy; 2026 Orquestra Digital Livre - Projeto Full Stack
      </footer>
    </div>
  );
}