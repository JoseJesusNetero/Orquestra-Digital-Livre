import axios from 'axios';

// Nota: Em um projeto real, a chave ficaria no .env
const UNSPLASH_KEY = 'idt4xdd-Q9miB20NtcUoOOR52osXAkLxuqYkXmf1zRM'; 

export const fetchImages = async (query: string) => {
  try {
    const response = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        query: query,
        per_page: 10,
        orientation: 'landscape',
        client_id: 'R_9S4-X_v_Z8M8W8Z_v_8R9S4-X_v_Z8M8W8Z_v_8' // Exemplo de chave pública
      }
    });
    return response.data.results.map((img: any) => img.urls.regular);
  } catch (error) {
    console.error("Erro ao buscar imagens:", error);
    return [];
  }
};