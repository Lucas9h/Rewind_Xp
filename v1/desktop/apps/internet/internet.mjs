import { years2000Article } from './years-2000.mjs';

const internetIcon = '/desktop/icons/Internet%20Explorer.png';

export function mountInternetExplorer(win, signal) {
  const content = win.el.querySelector('.xp-window-content');
  content.innerHTML = `
    <div class="ie7-navigation" role="group" aria-label="Navigation Internet Explorer">
      <button type="button" data-ie-action="back" title="Précédente" aria-label="Précédente" disabled>
        <span class="ie-navball"><svg class="ie7-arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4L4 12l8 8v-5.1c4.5-.1 6.5.4 8 3.1-.1-6.9-3-9.1-8-9.1V4z"/></svg></span>
      </button>
      <button type="button" data-ie-action="forward" title="Suivante" aria-label="Suivante" disabled>
        <span class="ie-navball"><svg class="ie7-arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4l8 8-8 8v-5.1c-4.5-.1-6.5.4-8 3.1.1-6.9 3-9.1 8-9.1V4z"/></svg></span>
      </button>
      <div class="ie-address-field">
        <img src="${internetIcon}" alt="">
        <input type="text" aria-label="Adresse" value="rewind://accueil" readonly>
      </div>
      <form class="ie7-search" role="search" aria-label="Recherche dans la page">
        <input type="search" placeholder="Rechercher" aria-label="Rechercher dans la page">
        <button type="submit" title="Rechercher" aria-label="Rechercher"><span class="ie7-search-mag" aria-hidden="true"></span></button>
      </form>
    </div>
    <div class="rewind-ie-menubar" role="group" aria-label="Barre de menus">
      <button type="button" data-ie-action="find">Rechercher dans la page</button>
      <button type="button" data-ie-action="view">Affichage</button>
    </div>
    <div class="ie7-tabsbar">
      <div class="ie7-tabs">
        <div class="ie7-tab active">
          <img src="${internetIcon}" alt="" width="16" height="16">
          <span class="ie7-tab-label">Accueil</span>
        </div>
      </div>
      <div class="ie7-commandbar">
        <button type="button" data-ie-action="home" title="Accueil">
          <span class="ie7-home-glyph" aria-hidden="true"></span>Accueil
        </button>
        <button type="button" data-ie-action="tools" aria-expanded="false" aria-controls="rewind-ie-tools">
          <span class="ie7-tools-glyph" aria-hidden="true"></span>Outils <span aria-hidden="true">▾</span>
        </button>
      </div>
    </div>
    <div id="rewind-ie-tools" role="group" aria-label="Outils Internet Explorer" hidden>
      <button type="button" data-ie-action="find">Rechercher dans la page</button>
      <button type="button" data-ie-action="view">Zoom de la page</button>
      <button type="button" data-ie-action="reset-zoom">Rétablir le zoom à 100 %</button>
    </div>
    <div class="ie-layout">
      <div class="browser-content">
        <div class="ie7-homepage" data-ie-page="home">
          <h1 tabindex="-1">Rewind XP</h1>
          <p>Explorez la culture graphique des années 2000.</p>
          <a href="rewind://wikipedia/annees-2000" data-ie-action="history">Lire l’article « Années 2000 » sur Wikipédia</a>
        </div>
        ${years2000Article}
      </div>
    </div>
    <div class="ie-statusbar">
      <span class="ie-statustext" role="status">Terminé</span>
      <span class="ie-security"><img src="${internetIcon}" alt=""> Page locale</span>
      <select class="rewind-ie-zoom" aria-label="Zoom de la page">
        <option value="75">75 %</option>
        <option value="100" selected>100 %</option>
        <option value="125">125 %</option>
        <option value="150">150 %</option>
        <option value="200">200 %</option>
      </select>
    </div>`;

  const page = content.querySelector('.browser-content');
  const views = {
    home: { element: page.querySelector('[data-ie-page="home"]'), title: 'Accueil', address: 'rewind://accueil' },
    history: { element: page.querySelector('[data-ie-page="history"]'), title: 'Années 2000', address: 'rewind://wikipedia/annees-2000' },
  };
  const entries = [{ key: 'home', scrollTop: 0 }];
  let position = 0;
  let activeView = views.home;
  const address = content.querySelector('.ie-address-field input');
  const tabLabel = content.querySelector('.ie7-tab-label');
  const back = content.querySelector('[data-ie-action="back"]');
  const forward = content.querySelector('[data-ie-action="forward"]');
  const search = content.querySelector('.ie7-search');
  const query = search.querySelector('input');
  const status = content.querySelector('.ie-statustext');
  const zoom = content.querySelector('.rewind-ie-zoom');
  const tools = content.querySelector('#rewind-ie-tools');
  const toolsButton = content.querySelector('[data-ie-action="tools"]');
  const searchable = [...page.querySelectorAll('h1, h2, h3, .wiki-intro, .wiki-section > p, .ie7-homepage > p')].map(element => ({
    element,
    text: element.textContent,
  }));

  function showTools(open) {
    tools.hidden = !open;
    toolsButton.setAttribute('aria-expanded', String(open));
  }

  function applyZoom() {
    activeView.element.style.zoom = Number(zoom.value) / 100;
  }

  function showEntry(entry) {
    activeView.element.hidden = true;
    activeView = views[entry.key];
    activeView.element.hidden = false;
    address.value = activeView.address;
    tabLabel.textContent = activeView.title;
    back.disabled = position === 0;
    forward.disabled = position === entries.length - 1;
    query.value = '';
    search.requestSubmit();
    applyZoom();
    activeView.element.querySelector('h1').focus({ preventScroll: true });
    page.scrollTo(0, entry.scrollTop);
  }

  function navigate(key) {
    const entry = entries[position];
    if (entry.key !== key) {
      entry.scrollTop = page.scrollTop;
      entries.splice(++position, entries.length, { key, scrollTop: 0 });
    } else {
      entry.scrollTop = 0;
    }
    showEntry(entries[position]);
  }

  function moveHistory(offset) {
    const next = position + offset;
    if (next < 0 || next >= entries.length) return;
    entries[position].scrollTop = page.scrollTop;
    position = next;
    showEntry(entries[position]);
  }

  search.addEventListener('submit', event => {
    event.preventDefault();
    const term = query.value.trim();
    let firstMatch;
    for (const { element, text } of searchable) {
      element.textContent = text;
      if (!term || !activeView.element.contains(element)) continue;
      const index = text.toLowerCase().indexOf(term.toLowerCase());
      if (index < 0) continue;
      const mark = document.createElement('mark');
      mark.textContent = text.slice(index, index + term.length);
      element.replaceChildren(text.slice(0, index), mark, text.slice(index + term.length));
      firstMatch ??= mark;
    }
    status.textContent = term && !firstMatch ? 'Texte introuvable' : 'Terminé';
    firstMatch?.scrollIntoView({ block: 'nearest' });
  }, { signal });

  for (const link of content.querySelectorAll('[data-ie-action="home"], [data-ie-action="history"]')) {
    link.addEventListener('click', event => {
      event.preventDefault();
      navigate(link.dataset.ieAction);
    }, { signal });
  }
  back.addEventListener('click', () => moveHistory(-1), { signal });
  forward.addEventListener('click', () => moveHistory(1), { signal });
  for (const link of page.querySelectorAll('[data-wiki-jump]')) {
    link.addEventListener('click', event => {
      event.preventDefault();
      const target = page.querySelector(link.hash);
      target.focus({ preventScroll: true });
      target.scrollIntoView({ block: 'start' });
    }, { signal });
  }
  zoom.addEventListener('change', applyZoom, { signal });
  toolsButton.addEventListener('click', () => showTools(tools.hidden), { signal });
  for (const button of content.querySelectorAll('[data-ie-action="find"], [data-ie-action="view"]')) {
    button.addEventListener('click', () => {
      showTools(false);
      (button.dataset.ieAction === 'find' ? query : zoom).focus();
    }, { signal });
  }
  tools.querySelector('[data-ie-action="reset-zoom"]').addEventListener('click', () => {
    zoom.value = '100';
    applyZoom();
    showTools(false);
    toolsButton.focus();
  }, { signal });
  document.addEventListener('pointerdown', event => {
    if (!tools.contains(event.target) && !toolsButton.contains(event.target)) showTools(false);
  }, { signal });
  content.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !tools.hidden) {
      showTools(false);
      toolsButton.focus();
    }
  }, { signal });
}
