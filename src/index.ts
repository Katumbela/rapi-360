import express, { Request, Response } from 'express';
import axios from 'axios';
import Sentiment from 'sentiment';

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  sentiment: string;
}

// Configurações da Google API
const API_KEY = 'AIzaSyCa_ExTewizCy7gANFSKeTV-zROEdmf168'; // Substitua pela sua API Key
const CX = 'a2dea454ed7fb435a'; // Substitua pelo seu CX (Custom Search Engine ID)

// Função para buscar resultados usando Google Custom Search API
const searchGoogleCustom = async (query: string, start: number = 1, country: string = 'ao'): Promise<SearchResult[]> => {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}&num=10&start=${start}&gl=${country}`;

    const response = await axios.get(url);
    const results = response.data.items;

    if (!results) {
      return [];
    }

    return results.map((result: any) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
      sentiment: ''  // O sentimento será adicionado depois
    }));
  } catch (error) {
    console.error('Erro ao buscar no Google Custom Search:', error);
    return [];
  }
};

// Função para analisar o sentimento
const analyzeSentiment = (text: string): string => {
  const sentiment = new Sentiment();
  const result = sentiment.analyze(text);

  if (result.score > 0) {
    return 'positive';
  } else if (result.score < 0) {
    return 'negative';
  } else {
    return 'neutral';
  }
};

// Função para classificar resultados por prioridade de redes sociais
const prioritizeSocialMedia = (results: SearchResult[]): SearchResult[] => {
  const socialMediaDomains = ['twitter.com', 'facebook.com', 'instagram.com', 'linkedin.com'];
  return results.sort((a, b) => {
    const aIsSocial = socialMediaDomains.some(domain => a.link.includes(domain));
    const bIsSocial = socialMediaDomains.some(domain => b.link.includes(domain));
    if (aIsSocial && !bIsSocial) return -1;
    if (!aIsSocial && bIsSocial) return 1;
    return 0; // Se ambos são ou não são redes sociais, mantém a ordem
  });
};

// Função para realizar a busca e analisar o sentimento dos resultados
const searchWithSentiment = async (query: string, country: string = 'ao'): Promise<SearchResult[]> => {
  const allResults: SearchResult[] = [];
  let startIndex = 1;
  let hasMoreResults = true;

  while (hasMoreResults && startIndex <= 90) { // Limite de 90 resultados
    const googleResults = await searchGoogleCustom(query, startIndex, country);
    if (googleResults.length === 0) {
      hasMoreResults = false;
    } else {
      googleResults.forEach(result => {
        const combinedText = `${result.title} ${result.snippet}`;
        result.sentiment = analyzeSentiment(combinedText);
      });
      allResults.push(...googleResults);
      startIndex += 10;
    }
  }

  // Priorizar redes sociais
  return prioritizeSocialMedia(allResults);
};

// Configurando o servidor Express
const app = express();
const port = 3000;

app.get('/search', async (req: Request, res: Response) => {
  const companyName = req.query.companyName as string;
  const country = req.query.country as string || 'ao';

  if (!companyName) {
    return res.status(400).json({ error: 'Parâmetro companyName é obrigatório' });
  }

  try {
    const results = await searchWithSentiment(companyName, country);
    return res.json(results);
  } catch (error) {
    console.error('Erro ao realizar a pesquisa:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar a pesquisa' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
