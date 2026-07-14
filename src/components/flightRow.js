import { formatFlightTime } from '../utils/datetime.js';
import { logoUrlFor, attachLogoFallback } from '../services/logoCache.js';

function statusClass(statusPt) {
  const map = {
    'Previsto': 'status--scheduled',
    'Check-in': 'status--checkin',       // ADICIONADO para novos status
    'Embarque': 'status--boarding',
    'Portão Fechado': 'status--gate-closed',
    'Decolado': 'status--departed',
    'Atrasado': 'status--delayed',
    'Cancelado': 'status--canceled',
    'Desviado': 'status--diverted',      // Mantido em concordância com seu dicionário
    'A Confirmar': 'status--uncertain',   // ADICIONADO para novos status
    'Em Rota': 'status--enroute',         // ADICIONADO para novos status
    'Aproximação': 'status--approaching', // ADICIONADO para novos status
    'Pousou': 'status--arrived',          // ADICIONADO para novos status
    'Aguardando': 'status--unknown',
  };
  return map[statusPt] || 'status--unknown';
}

export function createFlightRow(flight) {
  const row = document.createElement('div');
  row.className = 'flight-row';

  // Verifica se o portão está indefinido para aplicar a classe de cor neutra
  const isUndefined = flight.gate.pt === 'Indefinido';
  const gateClass = isUndefined ? 'gate--undefined' : '';

  row.innerHTML = `
    <div class="flight-row__logo">
      <img src="${logoUrlFor(flight.airlineIata)}" alt="${flight.airlineName}" />
    </div>
    <div class="flight-row__number">${flight.flightNumber}</div>
    <div class="flight-row__airline">${flight.airlineName}</div>
    <div class="flight-row__destination">${flight.destination}</div>
    <div class="flight-row__time">${formatFlightTime(flight.scheduledTime)}</div>
    
    <!-- ALTERADO: Estrutura bilíngue idêntica à do status -->
    <div class="flight-row__gate ${gateClass}">
      <span class="gate__pt">${flight.gate.pt}</span>
      <span class="gate__en">${flight.gate.en}</span>
    </div>
    
    <div class="flight-row__status ${statusClass(flight.status.pt)}">
      <span class="status__pt">${flight.status.pt}</span>
      <span class="status__en">${flight.status.en}</span>
    </div>
  `;

  attachLogoFallback(row.querySelector('img'));
  return row;
}