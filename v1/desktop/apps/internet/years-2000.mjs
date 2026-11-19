const wikipediaArticle = 'https://fr.wikipedia.org/wiki/Ann%C3%A9es_2000';

const overview = [
  ['evenements', 'Événements majeurs', 'Les attentats du 11 septembre 2001, les guerres en Afghanistan et en Irak, puis le tsunami de 2004 dans l’océan Indien marquent la décennie.', ['euro', 'crise']],
  ['sante', 'Enjeux sanitaires et sociaux', 'La population mondiale augmente. La crise alimentaire de 2007–2008 et la pandémie de grippe A(H1N1) en 2009 mettent deux enjeux mondiaux au premier plan.', []],
  ['environnement', 'Environnement', 'La déforestation fragilise les habitats. La canicule européenne de 2003 rend les épisodes de chaleur extrême particulièrement visibles.', []],
  ['societe', 'Phénomènes de société', 'Les blogs et la vidéo en ligne élargissent les possibilités de publication, tandis que la téléréalité s’installe à la télévision.', ['youtube']],
  ['inventions', 'Inventions et découvertes', 'Le haut débit et le Wi-Fi accompagnent la diffusion des usages numériques, de la publication collaborative à la consultation du Web sur téléphone.', ['wikipedia', 'iphone']],
  ['sport', 'Sport', 'Les Jeux olympiques d’été se tiennent à Sydney, Athènes et Pékin. Le Brésil remporte la Coupe du monde de football en 2002, puis l’Italie en 2006.', []],
  ['culture', 'Culture', 'Harry Potter et Le Seigneur des anneaux marquent le cinéma populaire. Côté jeux vidéo, la PlayStation 2 et la Wii illustrent deux moments de la décennie.', ['ipod']],
  ['politique', 'Personnalités politiques', 'Angela Merkel devient chancelière allemande en 2005. Barack Obama est élu président des États-Unis en 2008.', []],
];

const chapters = [
  {
    id: 'wikipedia', year: '2001', title: 'Le lecteur prend la plume',
    scene: 'Imaginez une encyclopédie qui change entre deux visites. En janvier 2001, Wikipédia ouvre ses articles à la contribution. Une correction, une source ajoutée ou un paragraphe réécrit peuvent rejoindre la même page.',
    analysis: 'Les liens bleus prolongent la lecture d’un article à l’autre. L’historique rend le travail d’écriture visible. Cette façon de lire et d’écrire ensemble donne une nouvelle fonction à la page web.',
    source: ['Wikimedia Foundation, 20 ans de Wikipédia', 'https://wikimediafoundation.org/wikipedia20/'],
  },
  {
    id: 'ipod', year: '2001', title: 'Une discothèque dans la poche',
    scene: 'Face à un lecteur qui promet mille chansons, le problème change : comment retrouver le bon morceau ? Sur le premier iPod, présenté en octobre 2001, Apple associe une molette à des listes pour parcourir la bibliothèque d’une seule main.',
    analysis: 'La pochette et le boîtier laissent place, le temps du choix, au nom de l’artiste, au titre et à la liste de lecture. Le graphisme de l’interface aide à s’orienter dans une collection devenue invisible.',
    source: ['Apple, présentation du premier iPod', 'https://www.apple.com/newsroom/2001/10/23Apple-Presents-iPod/'],
  },
  {
    id: 'euro', year: '2002', title: 'De nouveaux signes au fond des poches',
    scene: 'Le 1er janvier 2002, les billets et les pièces en euros entrent en circulation dans douze pays, dont la France. Il faut apprendre à reconnaître de nouvelles coupures au moment de payer ou de rendre la monnaie.',
    analysis: 'La couleur, le format et les chiffres d’un billet participent à la même tâche : identifier sa valeur au premier regard. Le changement de monnaie fait du graphisme une question quotidienne.',
    source: ['Banque centrale européenne, passage à l’euro fiduciaire', 'https://www.ecb.europa.eu/euro/changeover/2002/html/index.ga.html'],
  },
  {
    id: 'youtube', year: '2005', title: 'Une visite au zoo devient une première',
    scene: 'Le 23 avril 2005, la première vidéo publiée sur YouTube montre Jawed Karim devant des éléphants. Une scène ordinaire suffit pour inaugurer un site où les visiteurs peuvent mettre leurs propres vidéos en ligne.',
    analysis: 'Le titre, la miniature et le bouton de lecture deviennent autant d’indices pour décider quoi regarder. L’habillage d’une vidéo compte dès la page qui la présente, avant même sa première image.',
    source: ['YouTube, histoire de la première vidéo', 'https://blog.youtube/news-and-events/youtube-to-z-happybirthdayyoutube/'],
  },
  {
    id: 'iphone', year: '2007', title: 'L’écran passe sous le doigt',
    scene: 'En janvier 2007, Apple présente un appareil qui combine téléphone, lecteur de musique et navigateur web. Sur l’iPhone, le doigt agit directement sur le contenu affiché.',
    analysis: 'Une interface tactile doit donner envie de toucher au bon endroit et rendre le résultat du geste visible. La taille d’une cible et la réponse de l’écran deviennent des choix de conception aussi importants que le dessin des icônes.',
    source: ['Apple, présentation de l’iPhone', 'https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/'],
  },
  {
    id: 'crise', year: '2008', title: 'La crise devient visible',
    scene: 'En septembre 2008, la faillite de Lehman Brothers marque une étape de la crise financière. La récession américaine, commencée en décembre 2007, se poursuit jusqu’en juin 2009.',
    analysis: 'Pour raconter une crise, une courbe de prix, de chômage ou de production répond à des questions différentes. La période choisie, l’échelle et la légende changent ce que l’on comprend d’un même événement.',
    source: ['Federal Reserve History, la Grande Récession et ses suites', 'https://www.federalreservehistory.org/essays/great-recession-and-its-aftermath'],
  },
];

const illustrations = {
  wikipedia: `
    <figure class="rewind-wiki-figure">
      <details>
        <summary>Comparer deux versions d’une phrase</summary>
        <dl class="rewind-wiki-diff">
          <dt>Version précédente</dt><dd>Wikipédia est lancée <del>au début des années 2000</del>.</dd>
          <dt>Version suivante</dt><dd>Wikipédia est lancée <ins>le 15 janvier 2001</ins>.</dd>
        </dl>
      </details>
      <figcaption>Exemple reconstitué. La comparaison montre exactement ce qu’une personne a modifié.</figcaption>
    </figure>`,
  ipod: `
    <figure class="rewind-wiki-figure">
      <div class="rewind-wiki-player">
        <details open>
          <summary>Musique</summary>
          <details>
            <summary>Artistes</summary>
            <details>
              <summary>Les Satellites</summary>
              <div class="rewind-wiki-track">Titre sélectionné · Nuit blanche</div>
            </details>
          </details>
        </details>
      </div>
      <figcaption>Parcourez Musique → Artistes → Les Satellites. Schéma interactif inspiré du principe de navigation du baladeur, avec un titre fictif.</figcaption>
    </figure>`,
  euro: `
    <figure class="rewind-wiki-figure">
      <div class="rewind-wiki-notes" aria-label="Coupures schématiques de 5, 10 et 20 euros">
        <span>5 €</span><span>10 €</span><span>20 €</span>
      </div>
      <figcaption>Schéma des coupures. Observez comment la taille, la couleur et le chiffre se combinent pour distinguer les valeurs.</figcaption>
    </figure>`,
  youtube: `
    <figure class="rewind-wiki-figure">
      <img src="/desktop/icons/Play%20Video%20File.png" alt="" width="48" height="48">
      <figcaption>Icône du kit Windows XP. Sur le Web, une miniature peut aussi donner un aperçu du contenu avant la lecture.</figcaption>
    </figure>`,
  iphone: `
    <figure class="rewind-wiki-figure">
      <img src="/desktop/icons/Cellular%20Phone.png" alt="" width="48" height="48">
      <figcaption>Icône de téléphone à touches du kit Windows XP. Sur un écran tactile, les commandes sont dessinées par le logiciel.</figcaption>
    </figure>`,
};

export const years2000Article = `
  <div class="wiki-monobook rewind-wiki" data-ie-page="history" hidden>
    <aside class="wiki-sidebar" aria-label="Navigation de l’article">
      <div class="wiki-brand">
        <div class="wiki-emblem" aria-hidden="true"><div class="wiki-ball"><span>W</span><span>Ω</span><span>あ</span><span>中</span><span>Ф</span></div></div>
        <span class="wiki-wordmark">Wikipédia</span>
        <span class="wiki-tagline">Édition Rewind XP</span>
      </div>
      <nav class="wiki-navbox" aria-label="Navigation Wikipédia">
        <p>Navigation</p>
        <a href="rewind://accueil" data-ie-action="home">Accueil Rewind XP</a>
        <a href="#wiki-sommaire" data-wiki-jump>Sommaire</a>
      </nav>
      <nav class="wiki-navbox" aria-label="Références et archives">
        <p>Boîte à outils</p>
        <a href="#wiki-sources" data-wiki-jump>Sources</a>
        <a href="https://www.mediawiki.org/wiki/Skin:MonoBook" target="_blank" rel="noopener noreferrer">Habillage MonoBook ↗</a>
      </nav>
    </aside>
    <div class="wiki-main">
      <nav class="wiki-tabs rewind-wiki-tabs" aria-label="Onglets de l’article">
        <div class="wiki-tab-left">
          <a class="active" href="#wiki-article" aria-current="page" data-wiki-jump>Article</a>
          <a href="#wiki-sources" data-wiki-jump>Sources</a>
        </div>
      </nav>
      <article class="wiki-main-card">
        <h1 id="wiki-article" tabindex="-1">Années 2000</h1>
        <div class="wiki-subtitle">Adaptation de l’article « Années 2000 » de Wikipédia pour Rewind XP</div>
        <aside class="wiki-infobox" aria-label="Repères de la décennie">
          <div class="wiki-infobox-header">Années 2000</div>
          <div class="wiki-infobox-symbol" aria-hidden="true"><img src="/desktop/icons/Internet%20Explorer.png" alt="" width="36" height="36"></div>
          <div class="wiki-info-row"><b>Période</b><span>2000–2009</span></div>
          <div class="wiki-info-row"><b>Thème</b><span>Culture graphique</span></div>
        </aside>
        <p class="wiki-intro">Les années 2000 couvrent la période de 2000 à 2009. Des conflits aux transformations du Web, cette décennie change à la fois le contexte mondial et les gestes du quotidien. Les rubriques ci-dessous donnent les repères historiques, puis des encadrés Rewind XP relient certains événements à la culture graphique.</p>
        <nav class="wiki-toc" id="wiki-sommaire" tabindex="-1" aria-label="Sommaire">
          <div class="wiki-toc-title">Sommaire</div>
          <ol>
            ${overview.map(([id, title, , chapterIds]) => `
              <li><a href="#wiki-${id}" data-wiki-jump>${title}</a>
                ${chapterIds.length ? `<ol>${chapterIds.map(chapterId => {
                  const chapter = chapters.find(item => item.id === chapterId);
                  return `<li><a href="#wiki-${chapter.id}" data-wiki-jump>${chapter.year} · ${chapter.title}</a></li>`;
                }).join('')}</ol>` : ''}
              </li>`).join('')}
            <li><a href="#wiki-sources" data-wiki-jump>Notes et références</a></li>
          </ol>
        </nav>
        ${overview.map(([id, title, summary, chapterIds]) => `
          <section class="wiki-section" id="wiki-${id}" tabindex="-1">
            <h2>${title}</h2>
            <p>${summary}</p>
            ${chapterIds.map(chapterId => {
              const index = chapters.findIndex(item => item.id === chapterId);
              const chapter = chapters[index];
              return `
                <section class="wiki-section rewind-wiki-focus" id="wiki-${chapter.id}" tabindex="-1">
                  <h3>${chapter.year} · ${chapter.title}</h3>
                  <p>${chapter.scene}</p>
                  ${illustrations[chapter.id] ?? ''}
                  <p>${chapter.analysis}</p>
                  <a class="rewind-wiki-reference" href="#wiki-source-${chapter.id}" data-wiki-jump>Source [${index + 1}]</a>
                </section>`;
            }).join('')}
          </section>`).join('')}
        <section class="wiki-section" id="wiki-sources" tabindex="-1">
          <h2>Notes et références</h2>
          <p>Les rubriques historiques s’appuient sur l’article francophone de Wikipédia. Les références numérotées documentent les encadrés Rewind XP.</p>
          <a href="${wikipediaArticle}" target="_blank" rel="noopener noreferrer">Lire l’article « Années 2000 » sur Wikipédia ↗</a>
          <ol>
            ${chapters.map(({ id, source: [label, url] }) => `<li id="wiki-source-${id}" tabindex="-1"><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></li>`).join('')}
          </ol>
        </section>
      </article>
    </div>
  </div>`;
