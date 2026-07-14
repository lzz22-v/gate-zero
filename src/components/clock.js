import { formatClock, formatDate, nowInAirport } from '../utils/datetime.js';

export function mountClock(container) {
  container.innerHTML = `
    <div class="clock">
      <span class="clock__time" id="clock-time"></span>
      <span class="clock__date" id="clock-date"></span>
    </div>
  `;

  const timeEl = container.querySelector('#clock-time');
  const dateEl = container.querySelector('#clock-date');

  function update() {
    const now = nowInAirport();
    timeEl.textContent = formatClock(now);
    dateEl.textContent = formatDate(now);
  }

  update();
  setInterval(update, 1000);
}