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

  const filterEntries = () => {
    if (!entryCards.length) return;
    const query = (dictionarySearch?.value || '').toLowerCase().trim();
    const pos = posFilter?.value || 'all';
    const domain = domainFilter?.value || 'all';
    let visible = 0;

    entryCards.forEach((card) => {
      const haystack = (card.getAttribute('data-search') || card.textContent).toLowerCase();
      const cardPos = card.getAttribute('data-pos') || '';
      const cardDomain = card.getAttribute('data-domain') || '';
      const matches = (!query || haystack.includes(query)) && (pos === 'all' || cardPos === pos) && (domain === 'all' || cardDomain === domain);
      card.hidden = !matches;
      if (matches) visible += 1;
    });

    if (resultCount) resultCount.textContent = `${visible} ${visible === 1 ? 'entry' : 'entries'} shown`;
    if (emptyState) emptyState.style.display = visible ? 'none' : 'block';
  };

  [dictionarySearch, posFilter, domainFilter].forEach((control) => {
    if (control) control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', filterEntries);
  });

  const corpusSearch = document.querySelector('[data-corpus-search]');
  const corpusDomain = document.querySelector('[data-corpus-domain]');
  const sentences = [...document.querySelectorAll('[data-sentence]')];

  const filterSentences = () => {
    if (!sentences.length) return;
    const query = (corpusSearch?.value || '').toLowerCase().trim();
    const domain = corpusDomain?.value || 'all';
    sentences.forEach((sentence) => {
      const text = (sentence.getAttribute('data-search') || sentence.textContent).toLowerCase();
      const sentenceDomain = sentence.getAttribute('data-domain') || '';
      sentence.hidden = !((!query || text.includes(query)) && (domain === 'all' || sentenceDomain === domain));
    });
  };

  [corpusSearch, corpusDomain].forEach((control) => {
    if (control) control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', filterSentences);
  });
})();
