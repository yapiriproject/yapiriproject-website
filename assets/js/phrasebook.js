(() => {
  const data = window.PHRASEBOOK;
  const catBox = document.querySelector('[data-phrase-categories]');
  const listBox = document.querySelector('[data-phrase-list]');
  if (!data || !catBox || !listBox) return;

  const searchInput = document.querySelector('[data-phrase-search]');
  const countLabel = document.querySelector('[data-phrase-count]');
  const emptyBox = document.querySelector('[data-phrase-empty]');
  const totalLabel = document.querySelector('[data-phrase-total]');

  const categories = data.categories || [];
  const phrases = (data.phrases || []).filter((p) => p && p.english && p.roman);
  const byId = Object.fromEntries(categories.map((c) => [c.id, c]));
  let active = 'all';

  const make = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  const countFor = (id) => phrases.filter((p) => p.category === id).length;

  if (totalLabel) {
    totalLabel.textContent = phrases.length === 1 ? '1 verified phrase' : phrases.length + ' verified phrases';
  }

  const renderCategories = () => {
    catBox.textContent = '';
    const entries = [{ id: 'all', name: 'All phrases', blurb: 'Every category' }, ...categories];
    entries.forEach((c, i) => {
      const n = c.id === 'all' ? phrases.length : countFor(c.id);
      const btn = make('button', 'phrase-cat' + (c.id === active ? ' active' : ''));
      btn.type = 'button';
      btn.setAttribute('aria-pressed', String(c.id === active));
      btn.appendChild(make('span', 'phrase-cat-no', c.id === 'all' ? '★' : String(i).padStart(2, '0')));
      const body = make('span', 'phrase-cat-body');
      body.appendChild(make('strong', '', c.name));
      body.appendChild(make('small', '', c.blurb || ''));
      btn.appendChild(body);
      btn.appendChild(make('span', 'phrase-cat-count', n ? String(n) : 'Soon'));
      btn.addEventListener('click', () => { active = c.id; renderCategories(); renderList(); });
      catBox.appendChild(btn);
    });
  };

  const renderList = () => {
    const query = (searchInput?.value || '').toLowerCase().trim();
    const shown = phrases.filter((p) => {
      if (active !== 'all' && p.category !== active) return false;
      if (!query) return true;
      return [p.english, p.roman, p.note || ''].join(' ').toLowerCase().includes(query);
    });
    listBox.textContent = '';
    shown.forEach((p, i) => {
      const card = make('article', 'sentence-card');
      const cat = byId[p.category];
      card.appendChild(make('div', 'sentence-number', cat ? cat.name : 'Phrase'));
      card.appendChild(make('div', 'sentence-en', p.english));
      const romanLine = make('div', 'sentence-roman', p.roman);
      if (p.audio) {
        const play = make('button', 'play-btn', '▶');
        play.type = 'button';
        play.setAttribute('data-audio', p.audio);
        play.setAttribute('aria-label', 'Play pronunciation: ' + p.roman);
        romanLine.appendChild(play);
      }
      card.appendChild(romanLine);
      if (p.yapiri) card.appendChild(make('div', 'sentence-script', p.yapiri));
      if (p.note) card.appendChild(make('div', 'phrase-note', p.note));
      listBox.appendChild(card);
    });

    if (countLabel) {
      countLabel.textContent = shown.length === 1 ? '1 phrase' : shown.length + ' phrases';
    }
    if (emptyBox) {
      const title = emptyBox.querySelector('[data-empty-title]');
      const text = emptyBox.querySelector('[data-empty-text]');
      if (shown.length) {
        emptyBox.style.display = 'none';
      } else {
        emptyBox.style.display = 'block';
        if (query) {
          title.textContent = 'No phrase matches your search.';
          text.textContent = 'Try an English word, or choose another category.';
        } else if (active === 'all') {
          title.textContent = 'The first phrases are on their way.';
          text.textContent = 'Phrases are added only after a native speaker has checked them. Greetings, food and travel come first.';
        } else {
          title.textContent = 'This category is still empty.';
          text.textContent = 'Phrases appear here once they have been checked by a native speaker.';
        }
      }
    }
  };

  if (searchInput) searchInput.addEventListener('input', renderList);
  renderCategories();
  renderList();
})();
