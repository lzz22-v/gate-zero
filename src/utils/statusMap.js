const DICTIONARY = {
  SCHEDULED: { pt: 'Previsto', en: 'Scheduled' },
  BOARDING: { pt: 'Embarque', en: 'Boarding' },
  GATE_CLOSED: { pt: 'Portão Fechado', en: 'Gate Closed' },
  DEPARTED: { pt: 'Decolado', en: 'Departed' },
  DELAYED: { pt: 'Atrasado', en: 'Delayed' },
  CANCELED: { pt: 'Cancelado', en: 'Cancelled' },
  DIVERTED: { pt: 'Desviado', en: 'Diverted' }, // Mantive 'Desviado' como no seu arquivo original
  UNKNOWN: { pt: 'Aguardando', en: 'Pending' },
  
  // Novos status oficiais adicionados ao seu dicionário:
  EN_ROUTE: { pt: 'Em Rota', en: 'En Route' },
  CHECK_IN: { pt: 'Check-in', en: 'Check-in Open' },
  APPROACHING: { pt: 'Aproximação', en: 'Approaching' },
  ARRIVED: { pt: 'Pousou', en: 'Arrived' },
  CANCELED_UNCERTAIN: { pt: 'A Confirmar', en: 'To Be Confirmed' },
};

// Normaliza o status cru retornado pela API em uma chave conhecida do dicionário.
export function normalizeStatus(rawStatus, scheduledIso, estimatedIso) {
  const s = String(rawStatus || '').toLowerCase().trim();

  // 1. Mapeamento direto pelos IDs numéricos/valores exatos da documentação
  if (s === '0' || s === 'unknown') return DICTIONARY.UNKNOWN;
  if (s === '1' || s === 'expected') return DICTIONARY.SCHEDULED;
  if (s === '2' || s === 'enroute') return DICTIONARY.EN_ROUTE;
  if (s === '3' || s === 'checkin') return DICTIONARY.CHECK_IN;
  if (s === '4' || s === 'boarding') return DICTIONARY.BOARDING;
  if (s === '5' || s === 'gateclosed') return DICTIONARY.GATE_CLOSED;
  if (s === '6' || s === 'departed') return DICTIONARY.DEPARTED;
  if (s === '7' || s === 'delayed') return DICTIONARY.DELAYED;
  if (s === '8' || s === 'approaching') return DICTIONARY.APPROACHING;
  if (s === '9' || s === 'arrived') return DICTIONARY.ARRIVED;
  if (s === '10' || s === 'canceled') return DICTIONARY.CANCELED;
  if (s === '11' || s === 'diverted') return DICTIONARY.DIVERTED;
  if (s === '12' || s === 'canceleduncertain') return DICTIONARY.CANCELED_UNCERTAIN;

  // 2. Seu algoritmo original de comparação tolerante por texto (caso venha de outra forma ou string amigável)
  if (s.includes('canceleduncertain') || s.includes('canceled uncertain')) return DICTIONARY.CANCELED_UNCERTAIN;
  if (s.includes('cancel')) return DICTIONARY.CANCELED;
  if (s.includes('divert')) return DICTIONARY.DIVERTED;
  
  // 'enroute' removido daqui e colocado em sua linha própria abaixo
  if (s.includes('depart') || s.includes('gateout')) return DICTIONARY.DEPARTED; 
  
  if (s.includes('enroute') || s.includes('en route')) return DICTIONARY.EN_ROUTE;
  if (s.includes('checkin') || s.includes('check-in')) return DICTIONARY.CHECK_IN;
  if (s.includes('approaching')) return DICTIONARY.APPROACHING;
  if (s.includes('arrived')) return DICTIONARY.ARRIVED;
  if (s.includes('board')) return DICTIONARY.BOARDING;
  if (s.includes('gateclosed') || s.includes('gate closed')) return DICTIONARY.GATE_CLOSED;

  // 3. Sua regra inteligente de cálculo de atraso baseada nos horários (preservada intacta)
  if (scheduledIso && estimatedIso) {
    const diffMin = (new Date(estimatedIso) - new Date(scheduledIso)) / 60000;
    if (diffMin > 10) return DICTIONARY.DELAYED;
  }

  if (s.includes('expected') || s.includes('scheduled') || s === '') return DICTIONARY.SCHEDULED;

  return DICTIONARY.UNKNOWN;
}