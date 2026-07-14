const CACHE_NAME = 'gate-zero-logos-v1';
const DEFAULT_LOGO = '/logos/_default.svg';

// Altere para "false" se preferir usar apenas logos locais salvas em public/logos/
const USE_CDN = true; 

// CDN público de alta qualidade que fornece logos de companhias aéreas em SVG
const CDN_URL = 'https://assets.duffel.com/img/airlines/for-light-background/full-color-logo';

export function logoUrlFor(iataCode) {
  if (!iataCode) return DEFAULT_LOGO;

  const code = iataCode.toUpperCase();
  if (USE_CDN) {
    return `${CDN_URL}/${code}.svg`;
  }
  return `/logos/${code}.svg`;
}

// Pré-carrega e guarda os logos das companhias atualmente em exibição usando a Cache API,
// evitando o "flash" de imagem quebrada/ausente quando a tela troca de página.
export async function preloadLogos(iataCodes) {
  if (!('caches' in window)) return;

  const cache = await caches.open(CACHE_NAME);

  await Promise.all(
    [...new Set(iataCodes)].map(async (code) => {
      const url = logoUrlFor(code);
      const cached = await cache.match(url);
      if (cached) return;

      try {
        const res = await fetch(url);
        if (res.ok) {
          await cache.put(url, res.clone());
        }
      } catch {
        // Logo não existe ou deu erro de CORS — o navegador resolverá usando o fallback direto no <img>
      }
    })
  );
}

export function attachLogoFallback(imgElement) {
  // CORREÇÃO DE RACE CONDITION: 
  // Se o navegador já processou o erro de carregamento rápido (comum no localhost)
  // antes do JS anexar o event listener de erro, o trocamos de imediato.
  if (imgElement.complete && imgElement.naturalWidth === 0) {
    imgElement.src = DEFAULT_LOGO;
    return;
  }

  imgElement.addEventListener('error', () => {
    imgElement.src = DEFAULT_LOGO;
  }, { once: true });
}