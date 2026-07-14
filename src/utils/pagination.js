export function paginate(items, pageSize) {
  const pages = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  return pages.length ? pages : [[]];
}

export function createPageCycler(pageIntervalMs, onPageChange) {
  let pages = [[]];
  let currentPage = 0;
  let timer = null;

  function render() {
    onPageChange(pages[currentPage] || [], currentPage, pages.length);
  }

  function tick() {
    currentPage = pages.length ? (currentPage + 1) % pages.length : 0;
    render();
  }

  return {
    setItems(items, pageSize) {
      pages = paginate(items, pageSize);
      if (currentPage >= pages.length) currentPage = 0;
      render();
    },
    start() {
      if (timer) clearInterval(timer);
      timer = setInterval(tick, pageIntervalMs);
    },
    stop() {
      clearInterval(timer);
    },
  };
}