import { useState } from 'react';
// IMPORTANTE: Verifique se os nomes dos arquivos na pasta 'components' estão idênticos a estes
import { Header } from './components/Header.tsx';
import { Visualizer } from './components/Visualizer';
import { Instrument } from './components/Instrument.tsx';
import { AudioVisualizer } from './components/AudioVisualizer.tsx';
import { useAudioAnalyzer } from './hooks/useAudioAnalizer.tsx';
import { fetchImages } from './services/imageService.ts';

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
  
  // URL de trilha épica para teste
  const audioUrl = "https://mp3l.jamendo.com/?trackid=1890835&format=mp31&from=app-97b28c9a";
  
  // Hook de análise de áudio
  const { audioRef, intensities, initAudio } = useAudioAnalyzer(audioUrl);

  const handleSearch = async () => {
    if (!search) return;
    try {
      const results = await fetchImages(search);
      setPhotos(results);
    } catch (err) {
      console.error("Erro na busca:", err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(circle, #0a0a0a 0%, #001f3f 100%)', color: 'white' }}>
      <Header />

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Ex: Red Dead Redemption 2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '12px', borderRadius: '8px 0 0 8px', border: '1px solid #D4AF37', width: '300px', background: '#111', color: 'white' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '12px 20px', borderRadius: '0 8px 8px 0', border: 'none', background: '#D4AF37', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
        >
          Sincronizar
        </button>
      </div>

      <div style={{ display: 'flex', gap: '30px', padding: '0 40px' }}>
        {/* LADO ESQUERDO */}
        <div style={{ flex: 1 }}>
          <Visualizer photos={photos} />
        </div>

        {/* LADO DIREITO */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Instrument name="Bateria" img={ICONS.bateria} isActive={intensities.low > 150} notes={['BUM', 'CAI', 'PRT']} />
          <Instrument name="Guitarra" img={ICONS.guitarra} isActive={intensities.mid > 140} notes={['MI', 'LA', 'SOL']} />
          <Instrument name="Violão" img={ICONS.violao} isActive={intensities.mid > 90 && intensities.mid < 140} notes={['RE', 'FA#', 'LA']} />
          <Instrument name="Flauta" img={ICONS.flauta} isActive={intensities.high > 130} notes={['DO', 'RE', 'MI']} />

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
             <AudioVisualizer analyzer={null} />
             <br />
             <audio ref={audioRef} src={audioUrl} controls onPlay={initAudio} style={{ marginTop: '10px', filter: 'invert(1)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}