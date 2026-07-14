import { CONFIG } from '../config.js';
import { toLocalIso } from '../utils/datetime.js';
import { normalizeStatus } from '../utils/statusMap.js';

const BASE_URL = `https://${CONFIG.apiHost}/flights/airports/iata/${CONFIG.airportIata}`;

async function fetchWindow(fromDate, toDate) {
  const from = toLocalIso(fromDate);
  const to = toLocalIso(toDate);

  const url = `${BASE_URL}/${from}/${to}?withLeg=true&direction=Departure&withCancelled=true&withCodeshared=true&withCargo=false&withPrivate=false&withLocation=false`;

  const response = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': CONFIG.apiKey,
      'X-RapidAPI-Host': CONFIG.apiHost,
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao consultar voos (${response.status})`);
  }

  const data = await response.json();
  return data.departures || [];
}

function normalizeFlight(raw) {
  const scheduled = raw.departure?.scheduledTime?.local;
  const estimated = raw.departure?.runwayTime?.local || raw.departure?.revisedTime?.local || scheduled;
  const rawGate = raw.departure?.gate; // Captura o valor bruto do portão

  return {
    id: raw.number || `${raw.airline?.iata}-${scheduled}`,
    flightNumber: raw.number || '—',
    airlineName: raw.airline?.name || 'Companhia',
    airlineIata: raw.airline?.iata || 'XX',
    destination: raw.movement?.airport?.name || raw.arrival?.airport?.name || '—',
    destinationIata: raw.movement?.airport?.iata || raw.arrival?.airport?.iata || '',
    scheduledTime: scheduled,
    estimatedTime: estimated,
    status: normalizeStatus(raw.status, scheduled, estimated),
    // ALTERADO: Agora retorna um objeto bilíngue estruturado
    gate: rawGate 
      ? { pt: `Portão ${rawGate}`, en: `Gate ${rawGate}` } 
      : { pt: 'Indefinido', en: 'Undefined' }
  };
}

// Busca partidas nas próximas 4h
export async function fetchUpcomingDepartures() {
  const now = new Date();
  const in4h = new Date(now.getTime() + 4 * 60 * 60 * 1000);

  const windowA = await fetchWindow(now, in4h);
  const all = windowA.map(normalizeFlight);

  // Só voos com horário de partida futuro em relação ao momento atual
  const futureOnly = all.filter((f) => f.scheduledTime && new Date(f.scheduledTime) > now);

  // Ordena pelo mais próximo do embarque
  futureOnly.sort((a, b) => new Date(a.scheduledTime) - new Date(b.scheduledTime));

  return futureOnly;
}