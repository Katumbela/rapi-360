import puppeteer, { Browser, Page } from 'puppeteer';

interface SearchResult {
  title: string;
  url: string;
}

const searchSocialMedia = async (companyName: string): Promise<SearchResult[]> => {
  const browser: Browser = await puppeteer.launch({ headless: true });
  const page: Page = await browser.newPage();

  // Faz uma pesquisa no Google para a empresa nas redes sociais
  const searchQuery: string = `${companyName} site:twitter.com OR site:facebook.com OR site:instagram.com`;
  await page.goto(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`);

  // Extrai os links dos resultados
  const results: SearchResult[] = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('a'));
    return elements
      .map(link => ({
        title: link.innerText,
        url: link.href
      }))
      .filter(link => link.title);
  });

  await browser.close();
  return results;
};

// Exemplo de uso
searchSocialMedia('Nike').then(results => {
  console.log(results);
});
