import { createFlightRow } from './flightRow.js';
import { createPageCycler } from '../utils/pagination.js';
import { preloadLogos } from '../services/logoCache.js';
import { fetchUpcomingDepartures } from '../services/flightApi.js';
import { CONFIG } from '../config.js';

export function mountFlightBoard(container) {
  container.innerHTML = `
    <div class="board-header">
      <span></span> <!-- Coluna vazia reservada para o alinhamento do Logo -->
      <span>Voo / Flight</span>
      <span>Companhia / Airline</span>
      <span>Destino / Destination</span>
      <span>Horário / Time</span>
      <span>Portão / Gate</span> <!-- ADICIONADO: Cabeçalho da nova coluna -->
      <span>Status</span>
    </div>
    <div class="board-body" id="board-body"></div>
    <div class="board-footer" id="board-footer"></div>
  `;

  const body = container.querySelector('#board-body');
  const footer = container.querySelector('#board-footer');

  const cycler = createPageCycler(CONFIG.pageIntervalMs, (pageItems, pageIndex, pageCount) => {
    body.innerHTML = '';
    if (!pageItems.length) {
      body.innerHTML = '<div class="board-empty">Nenhum voo previsto no momento.</div>';
    } else {
      pageItems.forEach((flight) => body.appendChild(createFlightRow(flight)));
    }
    footer.textContent = `Página ${pageIndex + 1} de ${pageCount}`;
  });

  cycler.start();

  async function refresh() {
    try {
      const flights = await fetchUpcomingDepartures();
      await preloadLogos(flights.map((f) => f.airlineIata));
      cycler.setItems(flights, CONFIG.pageSize);
    } catch (err) {
      body.innerHTML = `<div class="board-error">Erro ao carregar dados: ${err.message}</div>`;
      console.error(err);
    }
  }

  refresh();
  setInterval(refresh, CONFIG.refreshIntervalMs);
}