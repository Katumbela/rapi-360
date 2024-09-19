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
const searchGoogleCustom = async (query: string): Promise<SearchResult[]> => {
  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${encodeURIComponent(query)}`;

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

// Função para realizar a busca e analisar o sentimento dos resultados
const searchWithSentiment = async (query: string): Promise<SearchResult[]> => {
  const googleResults = await searchGoogleCustom(query);

  googleResults.forEach(result => {
    const combinedText = `${result.title} ${result.snippet}`;
    result.sentiment = analyzeSentiment(combinedText);
  });

  return googleResults;
};

// Configurando o servidor Express
const app = express();
const port = 3000;

app.get('/search', async (req: Request, res: Response) => {
  const companyName = req.query.companyName as string;

  if (!companyName) {
    return res.status(400).json({ error: 'Parâmetro companyName é obrigatório' });
  }

  try {
    const results = await searchWithSentiment(companyName);
    return res.json(results);
  } catch (error) {
    console.error('Erro ao realizar a pesquisa:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar a pesquisa' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
