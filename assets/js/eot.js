(() => {
  const data = window.EOT;
  const catBox = document.querySelector('[data-eot-categories]');
  const listBox = document.querySelector('[data-eot-list]');
  if (!data || !catBox || !listBox) return;

  const searchInput = document.querySelector('[data-eot-search]');
  const countLabel = document.querySelector('[data-eot-count]');
  const emptyBox = document.querySelector('[data-eot-empty]');
  const totalLabel = document.querySelector('[data-eot-total]');

  const categories = data.categories || [];
  const entries = (data.entries || []).filter((e) => e && e.title && e.summary);
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));
  let active = 'all';

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const countFor = (id) => entries.filter((e) => e.category === id).length;

  if (totalLabel) {
    totalLabel.textContent = entries.length === 1 ? '1 checked entry' : entries.length + ' checked entries';
  }

  const renderCategories = () => {
    catBox.textContent = '';
    const tiles = [{ id: 'all', name: 'All entries', blurb: 'Every category' }, ...categories];
    tiles.forEach((c, i) => {
      const n = c.id === 'all' ? entries.length : countFor(c.id);
      const btn = make('button', 'cat-tile' + (c.id === active ? ' active' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(c.id === active));
      btn.appendChild(make('span', 'cat-tile-no', c.id === 'all' ? '★' : String(i).padStart(2, '0')));
      const body = make('span', 'cat-tile-body');
      body.appendChild(make('strong', '', c.name));
      body.appendChild(make('small', '', c.blurb || ''));
      btn.appendChild(body);
      btn.appendChild(make('span', 'cat-tile-count', n ? String(n) : 'Soon'));
      btn.addEventListener('click', () => { active = c.id; renderCategories(); renderList(); });
      catBox.appendChild(btn);
    });
  };

  const renderList = () => {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const shown = entries.filter((e) => {
      if (active !== 'all' && e.category !== active) return false;
      if (!query) return true;
      return [e.title, e.summary, e.kokborok || ''].join(' ').toLowerCase().includes(query);
    });
    listBox.textContent = '';
    shown.forEach((e) => {
      const card = make('article', 'sentence-card');
      const cat = byId[e.category];
      card.appendChild(make('div', 'sentence-number', cat ? cat.name : 'Entry'));
      card.appendChild(make('div', 'sentence-en', e.title));
      if (e.kokborok) card.appendChild(make('div', 'sentence-roman', e.kokborok));
      card.appendChild(make('div', 'card-note', e.summary));
      if (e.url) {
        const link = make('a', 'text-link', 'Read the entry ');
        link.href = e.url;
        link.appendChild(make('span', 'icon-arrow', '→'));
        const wrap = make('div', 'card-note');
        wrap.appendChild(link);
        card.appendChild(wrap);
      }
      listBox.appendChild(card);
    });

    if (countLabel) {
      countLabel.textContent = shown.length === 1 ? '1 entry' : shown.length + ' entries';
    }
    if (emptyBox) {
      const title = emptyBox.querySelector('[data-empty-title]');
      const text = emptyBox.querySelector('[data-empty-text]');
      if (shown.length) {
        emptyBox.style.display = 'none';
      } else {
        emptyBox.style.display = 'block';
        if (query) {
          title.textContent = 'No entry matches your search.';
          text.textContent = 'Try another word, or choose a different category.';
        } else if (active === 'all') {
          title.textContent = 'The first entries are on their way.';
          text.textContent = 'Entries are added only after they have been checked against their sources.';
        } else {
          title.textContent = 'This category is still empty.';
          text.textContent = 'Entries appear here once they have been checked against their sources.';
        }
      }
    }
  };

  if (searchInput) searchInput.addEventListener('input', renderList);
  renderCategories();
  renderList();
})();
