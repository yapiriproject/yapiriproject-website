(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }

  document.body.classList.add('reveal-ready');
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const rotatingWords = [
    { script: String.fromCodePoint(0xF1CBA,0xF1CA0,0xF1CA7,0xF1CA2,0xF1CB7,0xF1CA2), roman: 'Yapiri', pos: 'proper noun', meaning: 'The name of the modern writing system developed for Kokborok.', example: 'Yapiri sini Kokborok swngnai.' },
    { script: String.fromCodePoint(0xF1CA9,0xF1CA4,0xF1CA9,0xF1CAA,0xF1CA4,0xF1CB7,0xF1CA4,0xF1CA9), roman: 'Kokborok', pos: 'proper noun', meaning: 'The language of the Borok people.', example: 'Ang Kokborok rwchapjak.' },
    { script: String.fromCodePoint(0xF1CAA,0xF1CA3,0xF1CAD,0xF1CA0,0xF1CB5), roman: 'Buphang', pos: 'noun', meaning: 'Tree; a large woody plant.', example: 'Buphang nangsana.' }
  ];

  let wordIndex = 0;
  const nextWordButton = document.querySelector('[data-next-word]');
  const wordScript = document.querySelector('[data-word-script]');
  const wordRoman = document.querySelector('[data-word-roman]');
  const wordPos = document.querySelector('[data-word-pos]');
  const wordMeaning = document.querySelector('[data-word-meaning]');
  const wordExample = document.querySelector('[data-word-example]');

  const renderWord = () => {
    const word = rotatingWords[wordIndex];
    if (wordScript) wordScript.textContent = word.script;
    if (wordRoman) wordRoman.textContent = word.roman;
    if (wordPos) wordPos.textContent = word.pos;
    if (wordMeaning) wordMeaning.textContent = word.meaning;
    if (wordExample) wordExample.textContent = word.example;
  };

  if (nextWordButton) {
    nextWordButton.addEventListener('click', () => {
      wordIndex = (wordIndex + 1) % rotatingWords.length;
      renderWord();
    });
  }

  const translatorInput = document.querySelector('[data-translator-input]');
  const translatorOutput = document.querySelector('[data-translator-output]');
  const sampleMap = {
    'kokborok': String.fromCodePoint(0xF1CA9,0xF1CA4,0xF1CA9,0xF1CAA,0xF1CA4,0xF1CB7,0xF1CA4,0xF1CA9),
    'yapiri': String.fromCodePoint(0xF1CBA,0xF1CA0,0xF1CA7,0xF1CA2,0xF1CB7,0xF1CA2),
    'borok': String.fromCodePoint(0xF1CAA,0xF1CA4,0xF1CB7,0xF1CA4,0xF1CA9),
    'buphang': String.fromCodePoint(0xF1CAA,0xF1CA3,0xF1CAD,0xF1CA0,0xF1CB5)
  };
  if (translatorInput && translatorOutput) {
    translatorInput.addEventListener('input', (event) => {
      const value = event.target.value.trim().toLowerCase();
      translatorOutput.textContent = sampleMap[value] || (value ? 'Yapiri output preview' : 'Type “Kokborok” above');
    });
  }

  const keyboardOutput = document.querySelector('[data-keyboard-output]');
  document.querySelectorAll('[data-key]').forEach((key) => {
    key.addEventListener('click', () => {
      if (!keyboardOutput) return;
      const value = key.getAttribute('data-key');
      if (value === 'backspace') {
        keyboardOutput.textContent = keyboardOutput.textContent.slice(0, -1);
      } else if (value === 'space') {
        keyboardOutput.textContent += ' ';
      } else {
        keyboardOutput.textContent += value;
      }
    });
  });

  const dictionarySearch = document.querySelector('[data-dictionary-search]');
  const posFilter = document.querySelector('[data-pos-filter]');
  const domainFilter = document.querySelector('[data-domain-filter]');
  const entryCards = [...document.querySelectorAll('[data-entry]')];
  const resultCount = document.querySelector('[data-result-count]');
  const emptyState = document.querySelector('[data-empty-state]');

  const PAGE_SIZE = 100;
  // W / schwa rule (v2.1): w is the consonant W at the start of a word and directly after a vowel;
  // after a consonant it is written as the schwa. So a query typed with w should also match the
  // schwa spelling. Text in round brackets is English and is left alone. Mirrors schwa() in the
  // workbench and build tool.
  const SCHWA_VOWELS = new Set(['a','e','i','o','u','A','E','I','O','U','\u0259','\u018f']);
  const toSchwa = (text) => {
    const out = [];
    let depth = 0;
    for (const ch of text) {
      if (ch === '(') { depth++; out.push(ch); continue; }
      if (ch === ')') { depth = Math.max(0, depth - 1); out.push(ch); continue; }
      if (depth || !'wW\u0259\u018f'.includes(ch)) { out.push(ch); continue; }
      let prev = out.length ? out[out.length - 1] : '';
      if (out.length >= 2 && "'\u2019\u2032".includes(prev) && 'nN'.includes(out[out.length - 2])) prev = 'n';
      const upper = (ch === 'W' || ch === '\u018f');
      if (!prev || !/\p{L}/u.test(prev)) out.push(ch);
      else if (SCHWA_VOWELS.has(prev)) out.push(upper ? 'W' : 'w');
      else out.push(upper ? '\u018f' : '\u0259');
    }
    return out.join('');
  };
  const letterButtons = [...document.querySelectorAll('[data-letter-btn]')];
  const pager = document.querySelector('[data-pager]');
  const listEl = document.querySelector('[data-entry-list]');
  const detailEl = document.querySelector('[data-detail]');
  const hasFilter = document.querySelector('[data-has-filter]');
  const wide = window.matchMedia('(min-width: 960px)');
  const modeInputs = [...document.querySelectorAll('[data-search-mode]')];
  let activeLetter = 'all';
  let page = 1;
  let reordered = false;
  const rank = (card, q) => {
    const trs = (card.getAttribute('data-tr') || '').split('|');
    if (trs.includes(q)) return 0;
    if (trs.some((x) => x.startsWith(q + ' ') || x.endsWith(' ' + q) || x.split(/[\s,;]+/).includes(q))) return 1;
    if (trs.some((x) => x.startsWith(q))) return 2;
    return 3;
  };
  let selected = null;
  let pageCards = [];

  const select = (card, focus) => {
    if (selected) { selected.classList.remove('selected'); selected.querySelector('.entry-row')?.removeAttribute('aria-current'); }
    selected = card;
    if (!card || !detailEl) return;
    card.classList.add('selected');
    const row = card.querySelector('.entry-row');
    detailEl.innerHTML = '<div class="detail-body">' + card.querySelector('.entry-body').innerHTML + '</div>';
    detailEl.scrollTop = 0;
    row.setAttribute('aria-current', 'true');
    if (focus) row.focus();
  };

  const toggleOpen = (card) => {
    const open = !card.classList.contains('open');
    card.classList.toggle('open', open);
    card.querySelector('.entry-row').setAttribute('aria-expanded', String(open));
  };

  entryCards.forEach((card) => {
    const row = card.querySelector('.entry-row');
    if (!row) return;
    row.addEventListener('click', () => { wide.matches ? select(card) : toggleOpen(card); });
    row.addEventListener('keydown', (ev) => {
      if (!wide.matches || (ev.key !== 'ArrowDown' && ev.key !== 'ArrowUp')) return;
      const i = pageCards.indexOf(card);
      const next = pageCards[i + (ev.key === 'ArrowDown' ? 1 : -1)];
      if (next) { ev.preventDefault(); select(next, true); }
    });
  });

  const renderPager = (pages) => {
    if (!pager) return;
    pager.innerHTML = '';
    if (pages <= 1) return;
    const add = (label, target, opts = {}) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pager-btn' + (opts.current ? ' current' : '');
      b.textContent = label;
      if (opts.current) b.setAttribute('aria-current', 'page');
      if (opts.disabled) b.disabled = true;
      b.addEventListener('click', () => { page = target; filterEntries(true); });
      pager.appendChild(b);
    };
    add('← Prev', page - 1, { disabled: page === 1 });
    const show = new Set([1, pages, page - 1, page, page + 1]);
    let last = 0;
    for (let i = 1; i <= pages; i++) {
      if (!show.has(i)) continue;
      if (i - last > 1) { const s = document.createElement('span'); s.className = 'pager-gap'; s.textContent = '…'; pager.appendChild(s); }
      add(String(i), i, { current: i === page });
      last = i;
    }
    add('Next →', page + 1, { disabled: page === pages });
  };

  const filterEntries = (keepPage) => {
    if (!entryCards.length) return;
    if (keepPage !== true) page = 1;
    const query = (dictionarySearch?.value || '').toLowerCase().trim();
    const pos = posFilter?.value || 'all';
    const domain = domainFilter?.value || 'all';
    const onlyMeanings = !!(hasFilter && hasFilter.checked);
    const matched = [];
    const engMode = (modeInputs.find((m) => m.checked) || {}).value === 'eng';

    entryCards.forEach((card) => {
      const haystack = (card.getAttribute(engMode ? 'data-eng' : 'data-kok') || card.textContent).toLowerCase();
      const cardPos = card.getAttribute('data-pos') || '';
      const cardDomain = card.getAttribute('data-domain') || '';
      const matches = (!query || haystack.includes(query) || (!engMode && haystack.includes(toSchwa(query)))) &&
        (pos === 'all' || cardPos.split('|').includes(pos)) &&
        (domain === 'all' || cardDomain.split('|').includes(domain)) &&
        (activeLetter === 'all' || card.getAttribute(engMode ? 'data-eletter' : 'data-letter') === activeLetter) &&
        (!onlyMeanings || card.getAttribute('data-has') === '1');
      card.hidden = true;
      if (matches) matched.push(card);
    });

    if (engMode) {
      const idx = new Map(entryCards.map((c, i) => [c, i]));
      if (query) matched.sort((a, b) => rank(a, query) - rank(b, query) || idx.get(a) - idx.get(b));
      else matched.sort((a, b) => (a.dataset.engsort < b.dataset.engsort ? -1 : a.dataset.engsort > b.dataset.engsort ? 1 : idx.get(a) - idx.get(b)));
      matched.forEach((c) => listEl.appendChild(c));
      reordered = true;
    } else if (reordered) {
      entryCards.forEach((c) => listEl.appendChild(c));
      reordered = false;
    }
    const total = matched.length;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    if (page > pages) page = pages;
    const start = (page - 1) * PAGE_SIZE;
    pageCards = matched.slice(start, start + PAGE_SIZE);
    pageCards.forEach((card) => { card.hidden = false; });

    if (resultCount) {
      resultCount.textContent = total
        ? `Showing ${start + 1}–${Math.min(start + PAGE_SIZE, total)} of ${total} ${total === 1 ? 'entry' : 'entries'}`
        : '0 entries shown';
    }
    if (emptyState) emptyState.style.display = total ? 'none' : 'block';
    letterButtons.forEach((btn) => {
      const on = btn.getAttribute('data-letter-btn') === activeLetter;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', String(on));
    });
    renderPager(pages);

    if (listEl) listEl.scrollTop = 0;
    if (wide.matches) {
      if (pageCards.length) select(pageCards[0]);
      else { selected = null; if (detailEl) detailEl.innerHTML = '<div class="detail-empty">No entry to show.</div>'; }
    } else {
      entryCards.forEach((c) => { c.classList.remove('open'); c.querySelector('.entry-row')?.setAttribute('aria-expanded', 'false'); });
      if (keepPage === true && listEl) {
        const y = listEl.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }
  };

  letterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const l = btn.getAttribute('data-letter-btn');
      activeLetter = activeLetter === l ? 'all' : l;
      filterEntries();
    });
  });

  modeInputs.forEach((m) => m.addEventListener('change', () => {
    if (!m.checked) return;
    const eng = m.value === 'eng';
    if (dictionarySearch) dictionarySearch.placeholder = eng ? 'Search an English meaning…' : 'Search a Kokborok word…';
    const split = document.querySelector('.dict-split');
    if (split) split.setAttribute('data-mode', m.value);
    document.querySelectorAll('[data-bar]').forEach((el) => { el.hidden = el.getAttribute('data-bar') !== m.value; });
    document.querySelectorAll('[data-az-note]').forEach((el) => { el.hidden = el.getAttribute('data-az-note') !== m.value; });
    activeLetter = 'all';
    filterEntries();
  }));
  [dictionarySearch, posFilter, domainFilter, hasFilter].forEach((control) => {
    if (control) control.addEventListener(control.tagName === 'INPUT' && control.type !== 'checkbox' ? 'input' : 'change', () => filterEntries());
  });
  if (wide.addEventListener) wide.addEventListener('change', () => filterEntries(true));
  filterEntries();

  // Related-word links inside an entry: open that entry (clearing any filters so it can be found),
  // or, when several entries share the spelling, search for it so they are all listed.
  const resetControls = () => {
    if (dictionarySearch) dictionarySearch.value = '';
    if (posFilter) posFilter.value = 'all';
    if (domainFilter) domainFilter.value = 'all';
    if (hasFilter) hasFilter.checked = false;
    activeLetter = 'all';
    const kokMode = modeInputs.find((m) => m.value === 'kok');
    if (kokMode && !kokMode.checked) { kokMode.checked = true; kokMode.dispatchEvent(new Event('change')); }
  };
  const openEntry = (id) => {
    const card = entryCards.find((c) => c.getAttribute('data-id') === String(id));
    if (!card) return false;
    resetControls();
    page = Math.floor(entryCards.indexOf(card) / PAGE_SIZE) + 1;
    filterEntries(true);
    if (wide.matches) {
      select(card);
      card.scrollIntoView({ block: 'nearest' });
    } else {
      if (!card.classList.contains('open')) toggleOpen(card);
      card.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    return true;
  };
  const searchSpelling = (word) => {
    resetControls();
    if (dictionarySearch) dictionarySearch.value = word;
    filterEntries();
    // the exact spelling first (the search also lists words that merely contain it)
    const same = (c) => (c.querySelector('.entry-roman')?.textContent || '').replace(/\d+$/, '').trim().toLowerCase() === word.toLowerCase();
    const exact = pageCards.find(same);
    if (exact) {
      if (wide.matches) select(exact);
      else { exact.classList.add('open'); exact.querySelector('.entry-row')?.setAttribute('aria-expanded', 'true'); }
    }
    if (dictionarySearch) dictionarySearch.scrollIntoView({ block: 'center', behavior: 'smooth' });
  };
  // pronunciation recordings: one shared player so clips never overlap
  let clip = null, clipBtn = null;
  const resetClip = () => { if (clipBtn) { clipBtn.classList.remove('playing'); clipBtn = null; } };
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest && ev.target.closest('button[data-audio]');
    if (!btn) return;
    ev.stopPropagation();
    const same = clipBtn === btn && clip && !clip.paused;
    if (clip) { clip.pause(); resetClip(); }
    if (same) return;
    clip = new Audio(btn.getAttribute('data-audio'));
    clipBtn = btn; btn.classList.add('playing');
    clip.addEventListener('ended', resetClip);
    clip.addEventListener('error', resetClip);
    clip.play().catch(resetClip);
  });
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest && ev.target.closest('a[data-entry-link], a[data-entry-search]');
    if (!a || !entryCards.length) return;
    ev.preventDefault();
    if (a.hasAttribute('data-entry-link')) {
      const id = a.getAttribute('data-entry-link');
      if (openEntry(id) && history.replaceState) history.replaceState(null, '', '#e-' + id);
    } else {
      searchSpelling(a.getAttribute('data-entry-search') || '');
    }
  });
  const openFromHash = () => {
    const m = /^#e-(\d+)$/.exec(location.hash || '');
    if (m) openEntry(m[1]);
  };
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
