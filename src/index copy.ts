import puppeteer, { Browser, Page } from 'puppeteer';
import express, { Request, Response } from 'express';

interface SearchResult {
  title: string;
  url: string;
  description: string;
  favicon: string;
  thumbnail: string;
}

// Função para busca no DuckDuckGo
const searchDuckDuckGo = async (companyName: string): Promise<SearchResult[]> => {
  const browser: Browser = await puppeteer.launch({
    headless: "shell",
  });
  const page: Page = await browser.newPage();
  
  const searchQuery: string = `${companyName} site:twitter.com OR site:facebook.com OR site:instagram.com OR site:linkedin.com`;
  await page.goto(`https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`);

  const results: SearchResult[] = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('.result')); // Seleciona cada bloco de resultado
    
    return elements.map(el => {
      const titleElement = el.querySelector('a.result__a') as HTMLAnchorElement | null;
      const urlElement = el.querySelector('a.result__url') as HTMLAnchorElement | null;
      const descriptionElement = el.querySelector('.result__snippet'); 
      const faviconElement = el.querySelector('.result__icon img') as HTMLImageElement | null;
      const thumbnailElement = el.querySelector('.tile--img__img') as HTMLImageElement | null;

      return {
        title: titleElement ? titleElement.textContent || '' : '',
        url: urlElement ? urlElement.href : '',
        description: descriptionElement ? descriptionElement.textContent || '' : '',
        favicon: faviconElement ? faviconElement.src : '',
        thumbnail: thumbnailElement ? thumbnailElement.src : ''
      };
    });
  });

  await browser.close();
  return results;
};

// Função principal que combina resultados de diferentes motores de busca
const searchSocialMedia = async (companyName: string): Promise<SearchResult[]> => {
  try {
    const duckDuckGoResults = await searchDuckDuckGo(companyName);
    return duckDuckGoResults;
  } catch (error) {
    console.error('Erro ao realizar as buscas:', error);
    return [];
  }
};

// Configurando a API com Express
const app = express();
const port = 3000;

app.get('/search', async (req: Request, res: Response) => {
  const companyName = req.query.companyName as string;

  if (!companyName) {
    return res.status(400).json({ error: 'Parâmetro companyName é obrigatório' });
  }

  try {
    const results = await searchSocialMedia(companyName);
    return res.json(results);
  } catch (error) {
    console.error('Erro ao realizar a pesquisa:', error);
    return res.status(500).json({ error: 'Erro interno ao realizar a pesquisa' });
  }
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
