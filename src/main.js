import './style.css';
import { mountClock } from './components/clock.js';
import { mountFlightBoard } from './components/flightBoard.js';

document.querySelector('#app').innerHTML = `
  <header class="app-header">
    <h1 class="app-header__title">RIO GALEÃO (GIG) <span>· Partidas / Departures</span></h1>
    <div id="clock"></div>
  </header>
  <main class="board" id="board"></main>
`;

mountClock(document.querySelector('#clock'));
mountFlightBoard(document.querySelector('#board'));