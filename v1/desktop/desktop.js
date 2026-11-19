/* Windows XP — browser-based desktop emulation. No network or framework required. */
import { createWindowManager } from './windows.mjs';
import { mountInternetExplorer } from './apps/internet/internet.mjs';

(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const img = name => '/desktop/icons/' + encodeURIComponent(name + '.png');
  const esc = text => String(text).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const desktop = $('#desktop');
  const layer = $('#window-layer');
  const taskbarItems = $('#taskbar-items');
  const startMenu = $('#start-menu');
  const programsMenu = $('#programs-menu');
  const contextMenu = $('#context-menu');
  const dialogLayer = $('#dialog-layer');
  const startButton = $('#start-button');
  const apps = {
    computer: { title:'Poste de travail', icon:'This Computer',w:790,h:555, mount: renderExplorer },
    documents:{ title:'Mes documents', icon:'My Documents',w:775,h:535, mount: renderExplorer },
    pictures: {title:'Mes images',icon:'My Pictures',w:755,h:510, mount: renderExplorer},
    music: {title:'Ma musique',icon:'My Music',w:755,h:510, mount: renderExplorer},
    videos: {title:'Mes vidéos',icon:'My Videos',w:755,h:510, mount: renderExplorer},
    recycle: {title:'Corbeille',icon:'Recycle Bin Empty',w:690,h:475, mount: renderExplorer},
    explorer: {title:'Explorateur Windows',icon:'Windows Explorer',w:790,h:555, mount: renderExplorer},
    internet: {title:'Internet Explorer 7',icon:'Internet Explorer',w:1020,h:690,mount:mountInternetExplorer},
    earth: {title:'Google Earth',icon:'Globe',w:990,h:650},
    notepad: {title:'Sans titre - Bloc-notes',icon:'Nodepad',w:690,h:465, mount: renderNotepad},
    paint: {title:'Sans titre - Paint',icon:'Paint',w:840,h:590, mount: renderPaint},
    calculator: {title:'Calculatrice',icon:'Calculator',w:287,h:340, mount: renderCalculator},
    mediaplayer:{title:'Lecteur Windows Media',icon:'Windows Media Player',w:890,h:625},
    photoshop:{title:'Adobe Photoshop CS2',icon:'Paint',w:1110,h:705},
    minesweeper:{title:'Démineur',icon:'Minesweeper',w:285,h:368, mount: renderMinesweeper},
    control:{title:'Panneau de configuration',icon:'Control Panel',w:770,h:535, mount: renderExplorer},
    run:{title:'Exécuter',icon:'Run',w:383,h:205, mount: renderRun},
    help:{title:'Centre d’aide et de support',icon:'Help',w:685,h:450, mount: renderHelp},
    search:{title:'Rechercher',icon:'Search',w:650,h:440, mount: renderSearch},
    display:{title:'Propriétés de Affichage',icon:'Display Settings',w:455,h:430, mount: renderDisplay},
    about:{title:'À propos de Windows',icon:'Windows Flag',w:465,h:310, mount: renderAbout},
    messenger:{title:'Windows Messenger',icon:'Messenger',w:375,h:490, mount: renderMessenger},
    tour:{title:'Visite guidée de Windows XP',icon:'Windows Guided Tour',w:620,h:455, mount: renderTour},
    transfer:{title:'Assistant Transfert de fichiers et de paramètres',icon:'Transfert Wizzard',w:600,h:420, mount: renderTransfer},
    keyboard:{title:'Clavier visuel',icon:'Visual Keyboard',w:670,h:280, mount: renderKeyboard}
  };
  const desktopShortcuts = [
    {key:'computer',x:15,y:14},
    {key:'documents',x:15,y:106},
    {key:'internet',x:15,y:198},
    {key:'recycle',x:15,y:290},
    {key:'mediaplayer',x:15,y:382},
    {key:'earth',x:108,y:14},
    {key:'photoshop',x:108,y:106},
  ];
  let startOpen = false, programsOpen = false, selectedDesktop = null;
  const iconMarkup=(icon,cls='',alt='')=>`<img class="${cls}" src="${img(icon)}" alt="${esc(alt)}" draggable="false">`;
  const menuEntry=(key,label,icon,sub='',cls='')=>`<button type="button" class="start-item ${cls}" data-open="${key}">${iconMarkup(icon)}<span>${sub?`<strong>${esc(label)}</strong><small>${esc(sub)}</small>`:`<span>${esc(label)}</span>`}</span></button>`;

  function buildStartMenu(){
    startMenu.innerHTML=`
    <div class="start-header"><div class="start-avatar">${iconMarkup('User Account')}</div><span class="start-username">Invit?</span></div>
    <div class="start-columns">
      <div class="start-left">
        ${menuEntry('internet','Internet','Internet Explorer','Internet Explorer','pinned')}
        ${menuEntry('internet','Courrier électronique','Mail','Outlook Express','pinned')}
        <div class="start-line"></div>
        ${menuEntry('mediaplayer','Lecteur Windows Media','Windows Media Player','','program-item')}
        ${menuEntry('photoshop','Adobe Photoshop CS2','Paint','','program-item')}
        ${menuEntry('internet','MSN','Microsoft News','','program-item')}
        ${menuEntry('messenger','Windows Messenger','Messenger','','program-item')}
        ${menuEntry('tour','Visite guidée de Windows XP','Windows Guided Tour','','program-item')}
        ${menuEntry('transfer','Transfert de fichiers et paramètres','Transfert Wizzard','','program-item')}
        ${menuEntry('keyboard','Clavier visuel','Visual Keyboard','','program-item')}
        <button class="start-all" id="all-programs"><span>Tous les programmes</span><i class="green-arrow"></i></button>
      </div>
      <div class="start-right">
        ${menuEntry('documents','Mes documents','My Documents','','strong')}
        ${menuEntry('pictures','Mes images','My Pictures','','strong')}
        ${menuEntry('music','Ma musique','My Music','','strong')}
        ${menuEntry('computer','Poste de travail','This Computer','','strong')}
        <div class="start-line"></div>
        ${menuEntry('control','Panneau de configuration','Control Panel')}
        ${menuEntry('display','Définir les programmes','Default Program Settings')}
        ${menuEntry('control','Imprimantes et télécopieurs','Printer and Faxes')}
        <div class="start-line"></div>
        ${menuEntry('help','Aide et support','Help')}
        ${menuEntry('search','Rechercher','Search')}
        ${menuEntry('run','Exécuter…','Run')}
      </div>
    </div>
    <div class="start-footer">
      <button class="power-menu-button" id="logoff"><span class="power-icon logoff">⇨</span>Fermer la session</button>
      <button class="power-menu-button" id="poweroff"><span class="power-icon">⏻</span>Arrêter</button>
    </div>`;
    programsMenu.innerHTML=[
      ['explorer','Accessoires','Folder Close','›'],
      ['internet','Internet Explorer','Internet Explorer',''],
      ['earth','Google Earth','Globe',''],
      ['photoshop','Adobe Photoshop CS2','Paint',''],
      ['mediaplayer','Lecteur Windows Media','Windows Media Player',''],
      ['notepad','Bloc-notes','Nodepad',''],
      ['paint','Paint','Paint',''],
      ['messenger','Windows Messenger','Messenger',''],
      ['calculator','Calculatrice','Calculator',''],
      ['minesweeper','Jeux : Démineur','Minesweeper',''],
      ['control','Panneau de configuration','Control Panel',''],
    ].map(([key,label,icon,arrow])=>`<div class="program-line" role="button" tabindex="0" data-open="${key}">${iconMarkup(icon)}<span>${label}</span><span class="arrow">${arrow}</span></div>`).join('');
    $('#all-programs').addEventListener('click',e=>{e.stopPropagation();togglePrograms();});
    $('#poweroff').addEventListener('click',()=>{hideStart();showShutdown();});
    $('#logoff').addEventListener('click',()=>{hideStart();showLogoff();});
  }
  function showStart(open=true){startOpen=open;startMenu.hidden=!open;startButton.classList.toggle('open',open);startButton.setAttribute('aria-expanded',String(open));if(!open)hidePrograms();hideContext();}
  function hideStart(){showStart(false)}
  function hidePrograms(){programsOpen=false;programsMenu.hidden=true;$('#all-programs')?.classList.remove('active')}
  function togglePrograms(){programsOpen=!programsOpen;programsMenu.hidden=!programsOpen;$('#all-programs').classList.toggle('active',programsOpen)}
  startButton.addEventListener('click',e=>{e.stopPropagation();showStart(!startOpen)});

  function renderIcons(){
    $('#desktop-icons').innerHTML=desktopShortcuts.map(({key,x,y})=>`<div class="desktop-icon" data-shortcut="${key}" style="left:${x}px;top:${y}px" tabindex="0">${iconMarkup(apps[key].icon)}<span>${esc(apps[key].title)}</span></div>`).join('');
    $$('.desktop-icon').forEach(el=>{
      el.addEventListener('click', e => {
        e.stopPropagation();
        selectDesktop(el);
        if (e.pointerType === 'touch') openApp(el.dataset.shortcut);
      });
      el.addEventListener('dblclick',e=>{e.stopPropagation();openApp(el.dataset.shortcut)});
      el.addEventListener('keydown',e=>{if(e.key==='Enter')openApp(el.dataset.shortcut)});
      el.addEventListener('pointerdown',e=>{
        if(e.button!==0)return;
        const start={x:e.clientX,y:e.clientY,left:parseInt(el.style.left),top:parseInt(el.style.top),moved:false};
        selectDesktop(el);
        const move=ev=>{const dx=ev.clientX-start.x,dy=ev.clientY-start.y;if(Math.abs(dx)+Math.abs(dy)>5){start.moved=true;el.style.left=`${Math.max(0,Math.min(desktop.clientWidth-82,start.left+dx))}px`;el.style.top=`${Math.max(0,Math.min(layer.clientHeight-85,start.top+dy))}px`}};
        const stop=()=>{window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',stop)};
        window.addEventListener('pointermove',move);window.addEventListener('pointerup',stop,{once:true});
      });
      el.addEventListener('contextmenu',e=>{e.preventDefault();e.stopPropagation();selectDesktop(el);showContext(e.clientX,e.clientY,[
        {label:'Ouvrir',action:()=>openApp(el.dataset.shortcut)},
        {separator:true},{label:'Propriétés',action:()=>openApp('display')}
      ])});
    });
  }
  function selectDesktop(el){if(selectedDesktop)selectedDesktop.classList.remove('selected');selectedDesktop=el;el?.classList.add('selected')}

  const windows = createWindowManager({
    layer,
    taskbarItems,
    iconMarkup,
    escapeHtml: esc,
    onActivate() {
      hideStart();
      hideContext();
    },
  });
  const { close: closeWindow } = windows;
  function openApp(id) {
    if (!Object.hasOwn(apps, id)) return;
    const app = apps[id];
    if (!app.mount) {
      hideStart();
      showBalloon(`${app.title} sera ajouté dans une prochaine étape.`);
      return;
    }
    windows.open(id, app);
  }

  function download(name, content, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  const menu=(items=['Fichier','Édition','Affichage','Favoris','Outils','?'])=>`<div class="xp-menubar">${items.map(t=>`<button data-menuname="${t}">${t}</button>`).join('')}</div>`;
  const toolbar=(opts=[])=>`<div class="xp-toolbar">${opts.map(o=>o===null?'<span class="tool-sep"></span>':`<button class="tool-btn" data-open="${o[0]}" ${o[3]?'disabled':''}>${o[1]==='Précédente'||o[1]==='Suivante'?`<span class="nav-arrow ${o[1]==='Précédente'?'back':'forward'}">${o[1]==='Précédente'?'←':'→'}</span>`:iconMarkup(o[2])}<span>${o[1]}</span></button>`).join('')}</div>`;
  const address=(val='Poste de travail')=>`<div class="address-row"><label>Adresse</label><input class="address-input" value="${esc(val)}" aria-label="Adresse" spellcheck="false"><button class="address-go">→</button></div>`;
  const explorerFile=(key,label,icon,desc='')=>`<div class="explorer-file" data-open="${key}" tabindex="0" role="button">${iconMarkup(icon)}<div><b>${esc(label)}</b>${desc?`<small>${esc(desc)}</small>`:''}</div></div>`;
  const group=(title,items)=>`<section class="explorer-group"><h3>⌄ ${esc(title)}</h3><div class="explorer-group-items">${items.map(a=>explorerFile(...a)).join('')}</div></section>`;
  function renderExplorer(win){
    const history = [win.id];
    let index = 0;
    function navigate(id) {
      if (apps[id]?.mount !== renderExplorer) {
        openApp(id);
        return;
      }
      if (history[index] === id) return;
      index++;
      history.splice(index, history.length - index, id);
      renderExplorerLocation(win, id, navigate, go, index, history.length);
    }
    function go(step) {
      const destination = index + step;
      if (destination < 0 || destination >= history.length) return;
      index = destination;
      renderExplorerLocation(win, history[index], navigate, go, index, history.length);
    }
    renderExplorerLocation(win, win.id, navigate, go, index, history.length);
  }

  function renderExplorerLocation(win, kind, navigate, go, index, historyLength) {
    const c=$('.xp-window-content',win.el),path=apps[kind].title;
    windows.setTitle(win.id, path);
    const side = kind==='computer'||kind==='explorer'?[['Afficher les informations système','about','System Informations'],['Ajouter ou supprimer des programmes','control','Programs'],['Modifier un paramètre','control','Control Panel']]:[['Créer un nouveau dossier',kind,'New Folder'],['Partager ce dossier',kind,'Shared Folder']];
    let groups=[];
    if(kind==='computer'||kind==='explorer')groups=[
      ['Fichiers stockés sur cet ordinateur', [['documents','Documents de Utilisateur','My Documents','Dossier de fichiers'],['documents','Documents partagés','Shared Document Folder','Dossier de fichiers']]],
      ['Lecteurs de disque dur', [['computer','Disque local (C:)','Disk Drive','NTFS — 80 Go libres sur 120 Go']]],
      ['Périphériques utilisant des supports amovibles', [['computer','Lecteur de disquettes (A:)','Floppy Disk Drive',''],['computer','Lecteur de CD (D:)','DVD Drive','']]]
    ];
    else if(kind==='documents')groups=[['Fichiers et dossiers', [['pictures','Mes images','My Pictures','Dossier de fichiers'],['music','Ma musique','My Music','Dossier de fichiers'],['videos','Mes vidéos','My Videos','Dossier de fichiers'],['notepad','Lisez-moi.txt','Text','Document texte']]]];
    else if(kind==='pictures')groups=[['Fichiers et dossiers',[['pictures','Échantillons d’images','My Pictures','Dossier de fichiers']]]];
    else if(kind==='music')groups=[['Fichiers et dossiers',[['mediaplayer','Écouter de la musique','My Music','Ouvrir le Lecteur Windows Media']]]];
    else if(kind==='videos')groups=[['Fichiers et dossiers',[['mediaplayer','Ouvrir le Lecteur Windows Media','Windows Media Player','']]]];
    else if(kind==='recycle')groups=[];
    else if(kind==='control')groups=[['Choisissez une catégorie', [['display','Apparence et thèmes','Display',''],['computer','Performances et maintenance','System Informations',''],['control','Réseau et connexions Internet','Internet Network',''],['control','Sons, voix et périphériques audio','Audio and Sound',''],['control','Imprimantes et autres périphériques','Printer and Hardware',''],['control','Comptes d’utilisateurs','User Account','']]]];
    c.innerHTML=menu()+toolbar([['back','Précédente','Folder Open',index === 0],['forward','Suivante','Folder Open',index === historyLength - 1],null,['search','Rechercher','Search'],['explorer','Dossiers','Folder Close'],['computer','Affichages','Display']])+address(path)+`
    <div class="explorer-body"><aside class="explorer-side"><div class="explorer-box"><h3>${kind==='computer'?'Gestion du système':kind==='control'?'Panneau de configuration':'Gestion des fichiers'}</h3><ul>${side.map(([name,key,icon])=>`<li data-open="${key}">${iconMarkup(icon)}${esc(name)}</li>`).join('')}</ul></div>
    <div class="explorer-box"><h3>Autres emplacements</h3><ul>${[['computer','Poste de travail','This Computer'],['documents','Mes documents','My Documents'],['control','Panneau de configuration','Control Panel']].map(([k,t,i])=>`<li data-open="${k}">${iconMarkup(i)}${t}</li>`).join('')}</ul></div><div class="explorer-box"><h3>Détails</h3><ul><li>${esc(path)}</li></ul></div></aside>
    <section class="explorer-main">${groups.length?groups.map(([title,items])=>group(title,items)).join(''):'<div class="empty-explorer">Ce dossier est vide.</div>'}</section></div><footer class="xp-statusbar"><span>${kind==='recycle'?'0 objet':`${groups.reduce((n,g)=>n+g[1].length,0)} objet(s)`}</span><span>${esc(path)}</span></footer>`;
    $('.address-go',c).onclick=()=>{const v=$('.address-input',c).value.toLowerCase();if(v.includes('http')||v.includes('www'))openApp('internet');else if(v.includes('document'))navigate('documents');else if(v.includes('image'))navigate('pictures');else navigate('computer')};
    $('.address-input',c).addEventListener('keydown',e=>{if(e.key==='Enter')$('.address-go',c).click()});
    $$('[data-open]:not(.explorer-file)', c).forEach(el => el.addEventListener('click', event => {
      event.stopPropagation();
      const { open: id } = el.dataset;
      if (id === 'back') go(-1);
      else if (id === 'forward') go(1);
      else navigate(id);
    }));
    // Icon selection is distinct from opening (double-click), as in Explorer.
    $$('.explorer-file',c).forEach(el=>{el.addEventListener('click',e=>{e.stopPropagation();$$('.explorer-file.selected',c).forEach(a=>a.classList.remove('selected'));el.classList.add('selected');if(e.pointerType==='touch')navigate(el.dataset.open)});el.addEventListener('dblclick',()=>navigate(el.dataset.open));el.addEventListener('keydown',e=>{if(e.key==='Enter')navigate(el.dataset.open)})});
  }

  function renderNotepad(win){const c=$('.xp-window-content',win.el);c.innerHTML=menu(['Fichier','Édition','Format','Affichage','Aide'])+`<textarea class="notepad-text" spellcheck="false" aria-label="Texte du Bloc-notes"></textarea><footer class="xp-statusbar"><span>Ligne 1, Colonne 1</span><span>UTF-8</span></footer>`;
    const area=$('.notepad-text',c);area.addEventListener('input',()=>{const pre=area.value.slice(0,area.selectionStart),rows=pre.split('\n');$('.xp-statusbar span',c).textContent=`Ligne ${rows.length}, Colonne ${rows.at(-1).length+1}`});area.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();download('Sans titre.txt',area.value,'text/plain;charset=utf-8')}});
    area.focus();
  }
  function renderPaint(win){const c=$('.xp-window-content',win.el);const colors=['#000000','#7d7d7d','#810000','#ff0000','#e77700','#ffff00','#008000','#00ff00','#008080','#00ffff','#000080','#0000ff','#800080','#ff00ff','#ffffff','#c0c0c0','#ff99aa','#ffe7ca','#dec4ac','#ffff99','#a6e3bb','#a8f3ff','#b3baff','#dcaaff'];
    c.innerHTML=menu(['Fichier','Édition','Affichage','Image','Couleurs','Aide'])+`<div class="paint-area"><div class="paint-tools"><button data-tool="brush" class="active" title="Pinceau">🖌</button><button data-tool="pencil" title="Crayon">✎</button><button data-tool="eraser" title="Gomme">▰</button><button data-tool="line" title="Ligne">╱</button><button data-tool="clear" title="Effacer">⌫</button><button data-tool="save" title="Enregistrer">▣</button></div><div class="paint-desk"><canvas width="680" height="430" aria-label="Dessin Paint"></canvas></div></div><div class="paint-colors"><span class="paint-swatch" style="background:#000"></span><div class="paint-palette">${colors.map(col=>`<button style="background:${col}" data-color="${col}" aria-label="Couleur ${col}"></button>`).join('')}</div></div>`;
    const canvas=$('canvas',c),ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.lineCap='round';ctx.lineJoin='round';let drawing=false,tool='brush',color='#000',start=null;
    $$('.paint-tools button',c).forEach(b=>b.onclick=()=>{const v=b.dataset.tool;if(v==='clear'){ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);return}if(v==='save'){canvas.toBlob(blob=>download('Dessin.png',blob,'image/png'));return}tool=v;$$('.paint-tools button',c).forEach(k=>k.classList.remove('active'));b.classList.add('active')});
    $$('.paint-palette button',c).forEach(b=>b.onclick=()=>{color=b.dataset.color;$('.paint-swatch',c).style.background=color});
    const pos=e=>{const r=canvas.getBoundingClientRect();return {x:(e.clientX-r.left)*canvas.width/r.width,y:(e.clientY-r.top)*canvas.height/r.height}};
    canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);start=pos(e);ctx.strokeStyle=tool==='eraser'?'#fff':color;ctx.lineWidth=tool==='eraser'?18:tool==='pencil'?1:3;ctx.beginPath();ctx.moveTo(start.x,start.y)});
    canvas.addEventListener('pointermove',e=>{if(!drawing)return;let p=pos(e);if(tool!=='line'){ctx.lineTo(p.x,p.y);ctx.stroke();ctx.beginPath();ctx.moveTo(p.x,p.y)}});
    canvas.addEventListener('pointerup',e=>{if(!drawing)return;if(tool==='line'){const p=pos(e);ctx.lineTo(p.x,p.y);ctx.stroke()}drawing=false});
  }
  function renderCalculator(win){const c=$('.xp-window-content',win.el);let display='0',stored=null,operator=null,justCalculated=false;const keys=['Back','CE','C','±','√','7','8','9','/','%','4','5','6','*','1/x','1','2','3','-','= ','0','.','+','MC','MR','MS','M+'];
    c.innerHTML=menu(['Édition','Affichage','Aide'])+`<div class="calc-container"><div class="calc-display">0</div><div class="calc-buttons">${keys.map(k=>`<button data-key="${esc(k.trim())}" class="${'/ * - + = %'.includes(k.trim())?'op':''}">${esc(k)}</button>`).join('')}</div></div>`;
    const disp=$('.calc-display',c);const redraw=()=>{disp.textContent=display};let memory=0;
    const apply=(a,b,op)=>op==='+'?a+b:op==='-'?a-b:op==='*'?a*b:op==='/'?a/b:b;
    function keyPress(k){if(/^\d$/.test(k)){if(display==='0'||justCalculated){display=k;justCalculated=false}else display+=k}
      else if(k==='.'){if(!display.includes('.'))display+='.'}
      else if(k==='C'||k==='CE'){display='0';if(k==='C'){stored=null;operator=null}}
      else if(k==='Back'){display=display.length>1?display.slice(0,-1):'0'}
      else if(k==='±'){display=String(-Number(display))}else if(k==='√'){display=String(Math.sqrt(+display))}
      else if(k==='1/x'){display=String(1/+display)}else if(k==='%'){display=String((+display)/100)}
      else if(k==='MC')memory=0;else if(k==='MR')display=String(memory);else if(k==='MS')memory=+display;else if(k==='M+')memory+=(+display);
      else if(['+','-','*','/'].includes(k)){if(operator!==null&&!justCalculated&&stored!==null)stored=apply(stored,+display,operator);else stored=+display;operator=k;justCalculated=true}
      else if(k==='='||k==='Enter'){if(operator&&stored!==null){const n=apply(stored,+display,operator);display=Number.isFinite(n)?String(Number(n.toPrecision(12))):'Erreur';operator=null;stored=null;justCalculated=true}}
      redraw()}
    $$('.calc-buttons button',c).forEach(b=>b.onclick=()=>keyPress(b.dataset.key));c.addEventListener('keydown',e=>{if(/[0-9.+\-*/=]/.test(e.key)&&e.key.length===1||e.key==='Enter'||e.key==='Backspace'){keyPress(e.key==='Backspace'?'Back':e.key)}})
  }
  function renderMinesweeper(win, signal){const c=$('.xp-window-content',win.el);c.innerHTML=menu(['Jeu','Aide'])+`<div class="mines-container"><div class="mines-head"><span class="mines-display" id="mine-count">010</span><button id="mine-reset">🙂</button><span class="mines-display" id="mine-timer">000</span></div><div class="mine-board"></div></div>`;
    const board=$('.mine-board',c);let mines=new Set(),revealed=new Set(),flags=new Set(),lost=false,started=false,timer=0,clock=null;const neighbors=i=>{const x=i%9,y=Math.floor(i/9),res=[];for(let yy=y-1;yy<=y+1;yy++)for(let xx=x-1;xx<=x+1;xx++)if(xx>=0&&xx<9&&yy>=0&&yy<9&&(xx!==x||yy!==y))res.push(yy*9+xx);return res};
    function reset(){if(clock)clearInterval(clock);mines=new Set();while(mines.size<10)mines.add(Math.floor(Math.random()*81));revealed=new Set();flags=new Set();lost=false;started=false;timer=0;$('#mine-reset',c).textContent='🙂';$('#mine-count',c).textContent='010';$('#mine-timer',c).textContent='000';board.innerHTML=Array.from({length:81},(_,i)=>`<button class="mine-cell" data-i="${i}"></button>`).join('')}
    function reveal(i){if(lost||flags.has(i)||revealed.has(i))return;if(!started){started=true;clock=setInterval(()=>{$('#mine-timer',c).textContent=String(Math.min(999,++timer)).padStart(3,'0')},1000);if(mines.has(i)){mines.delete(i);for(let j=0;j<81;j++)if(!mines.has(j)&&j!==i){mines.add(j);break}}}
      revealed.add(i);const cell=$(`.mine-cell[data-i="${i}"]`,board);cell.classList.add('revealed');if(mines.has(i)){lost=true;$('#mine-reset',c).textContent='☹️';cell.textContent='💣';clearInterval(clock);return}const n=neighbors(i).filter(v=>mines.has(v)).length;if(n){cell.textContent=n;cell.style.color=['','blue','green','red','navy','maroon','teal','black','gray'][n]}else neighbors(i).forEach(j=>reveal(j));if(revealed.size===71){lost=true;clearInterval(clock);$('#mine-reset',c).textContent='😎'}}
    signal.addEventListener('abort', () => clearInterval(clock), { once: true });
    board.addEventListener('click',e=>{const b=e.target.closest('.mine-cell');if(b)reveal(+b.dataset.i)});
    board.addEventListener('contextmenu',e=>{const b=e.target.closest('.mine-cell');if(!b)return;e.preventDefault();if(revealed.has(+b.dataset.i))return;if(flags.has(+b.dataset.i)){flags.delete(+b.dataset.i);b.textContent=''}else{flags.add(+b.dataset.i);b.textContent='🚩'}$('#mine-count',c).textContent=String(10-flags.size).padStart(3,'0')});$('#mine-reset',c).onclick=reset;reset();
  }
  function renderRun(win){const c=$('.xp-window-content',win.el);c.innerHTML=`<div class="run-content"><div class="run-intro">${iconMarkup('Run')}<span>Tapez le nom d’un programme, d’un dossier, d’un document ou d’une ressource Internet, et Windows l’ouvrira pour vous.</span></div><div style="display:flex;align-items:center;gap:7px"><label for="run-input">Ouvrir :</label><input id="run-input" type="text" autocomplete="off" list="commands"></div><datalist id="commands"><option value="notepad"><option value="calc"><option value="mspaint"><option value="iexplore"><option value="explorer"><option value="winver"></datalist><div class="run-buttons"><button class="xp-btn" id="run-ok">OK</button><button class="xp-btn" id="run-cancel">Annuler</button><button class="xp-btn" id="run-browse">Parcourir…</button></div></div>`;
    const input=$('#run-input',c);function submit(){let v=input.value.trim().toLowerCase(),a={notepad:'notepad','notepad.exe':'notepad',calc:'calculator','calc.exe':'calculator',mspaint:'paint','mspaint.exe':'paint',iexplore:'internet',explorer:'computer',winver:'about',control:'control',cmd:'notepad'}[v];if(!a&&/https?:|www\./.test(v))a='internet';if(a){closeWindow('run');openApp(a)}else showBalloon(`Windows ne trouve pas « ${input.value} ». Vérifiez le nom et réessayez.`)}$('#run-ok',c).onclick=submit;$('#run-cancel',c).onclick=()=>closeWindow('run');$('#run-browse',c).onclick=()=>openApp('computer');input.addEventListener('keydown',e=>{if(e.key==='Enter')submit()});input.focus();
  }
  function renderSearch(win){const c=$('.xp-window-content',win.el);c.innerHTML=menu()+`<div class="folder-pane" style="display:flex;flex-direction:column;gap:16px;background:#f7f8fe;height:100%"><h2>Que voulez-vous rechercher ?</h2><label>Un fichier ou un dossier : <input id="search-input" placeholder="Nom du fichier" style="width:60%;height:24px"></label><button id="search-submit" class="xp-btn" style="align-self:flex-start">Rechercher</button><div id="search-results"></div></div>`;$('#search-submit',c).onclick=()=>{$('#search-results',c).innerHTML=`<p>Résultats de la recherche :</p>${explorerFile('documents','Mes documents','My Documents')}${explorerFile('pictures','Mes images','My Pictures')}`};}
  function renderHelp(win){const c=$('.xp-window-content',win.el);c.innerHTML=menu()+`<div class="browser-home"><h2>Centre d’aide et de support</h2><p>Que souhaitez-vous faire ?</p><p data-open="computer" style="color:blue;cursor:pointer">Explorer les fichiers et dossiers</p><p data-open="display" style="color:blue;cursor:pointer">Changer l’apparence du Bureau</p><p data-open="about" style="color:blue;cursor:pointer">À propos de Windows XP</p></div>`}
  function renderDisplay(win){const c=$('.xp-window-content',win.el);c.innerHTML=`<div style="background:#ece9d8;padding:14px;flex:1"><div style="display:flex;gap:4px;border-bottom:1px solid #aaa"><button class="xp-btn">Thèmes</button><button class="xp-btn">Bureau</button><button class="xp-btn">Écran de veille</button><button class="xp-btn">Apparence</button></div><div style="margin:12px;background:#fff;border:1px solid #aaa;padding:15px;text-align:center"><div style="height:150px;background:url('/assets/wallpaper.jpg') center / cover;border:7px solid #222;border-radius:8px"></div><p>Arrière-plan : Colline verdoyante (Bliss)</p></div><p>Thème actuel : Windows XP (Luna)</p><div style="text-align:right;margin-top:18px"><button class="xp-btn" data-close="display">OK</button><button class="xp-btn" data-close="display">Annuler</button></div></div>`}
  function renderAbout(win){const c=$('.xp-window-content',win.el);c.innerHTML=`<div style="background:#ece9d8;padding:18px 24px;flex:1"><div style="display:flex;align-items:center;gap:12px;border-bottom:1px solid #aaa;padding-bottom:12px">${iconMarkup('Windows Flag')}<span style="font-size:28px;font-style:italic;font-weight:bold;color:#294e8a">Microsoft Windows XP</span></div><p>Microsoft Windows XP</p><p>Version 5.1 (émulation web interactive)</p><p>Cette reconstitution est une interface de démonstration créée en HTML, CSS et JavaScript, et non un système Windows XP réel.</p><div style="text-align:right"><button class="xp-btn" data-close="about">OK</button></div></div>`}

  function renderMessenger(win){
    const c=$('.xp-window-content',win.el);
    c.innerHTML=menu(['Fichier','Contacts','Actions','Outils','Aide'])+`<div style="flex:1;padding:18px;background:linear-gradient(#eff5fb,#d3e8ff);text-align:center"><div style="background:linear-gradient(90deg,#78baff,#2b69c1);padding:8px;margin:-18px -18px 20px;color:#fff;font-weight:bold;text-align:left">${iconMarkup('Messenger')} Windows Messenger</div><h3 style="font-size:14px;color:#174f9b">Bienvenue dans Windows Messenger</h3>${iconMarkup('User Account')}<p>Vous n’êtes pas connecté.</p><label>Adresse de messagerie :<br><input type="email" style="width:220px;height:23px;margin-top:7px"></label><br><button class="xp-btn" style="margin-top:12px" id="messenger-login">Se connecter</button><p style="font-size:10px;color:#666">La connexion au service d’origine n’est plus disponible.</p></div>`;
    $('#messenger-login',c).onclick=()=>showBalloon('Windows Messenger est simulé hors ligne.');
  }
  function renderTour(win){const c=$('.xp-window-content',win.el);c.innerHTML=`<div style="background:linear-gradient(110deg,#e6f5ff,#fff);height:100%;padding:25px;display:flex;gap:20px;align-items:center"><div>${iconMarkup('Windows Guided Tour')}<h2 style="color:#195dc3;font-size:22px">Découvrez Windows XP</h2><p>Explorez le Bureau, le menu Démarrer et les applications de Windows XP.</p><p>Vous pouvez déplacer les fenêtres, les agrandir, les réduire et ouvrir plusieurs programmes simultanément.</p><button class="xp-btn" data-close="tour">Terminer la visite</button></div></div>`}
  function renderTransfer(win){const c=$('.xp-window-content',win.el);c.innerHTML=`<div style="background:#ece9d8;height:100%;display:flex;flex-direction:column"><div style="background:white;padding:19px;border-bottom:1px solid #a7a7a7"><h3>Assistant Transfert de fichiers et de paramètres</h3><p>Bienvenue dans l’Assistant Transfert de fichiers et de paramètres.</p></div><div style="padding:30px;flex:1">${iconMarkup('Transfert Wizzard')}<p>Cette démonstration reproduit la fenêtre d’un assistant classique de Windows XP.</p></div><div style="text-align:right;border-top:1px solid #aaa;padding:12px"><button class="xp-btn" data-close="transfer">Terminer</button></div></div>`}
  function renderKeyboard(win){const c=$('.xp-window-content',win.el);const rows=['1234567890','AZERTYUIOP','QSDFGHJKLM','WXCVBN,.;:'];c.innerHTML=`<div style="height:100%;padding:10px;background:#ece9d8;display:flex;flex-direction:column;gap:7px"><input id="keyboard-input" placeholder="Saisissez du texte à l’aide des touches…" style="height:27px;border:1px solid #7f9db9"/><div class="keyboard-grid">${rows.map(row=>`<div style="display:flex;gap:4px;justify-content:center">${[...row].map(ch=>`<button class="xp-btn" data-letter="${esc(ch)}" style="padding:7px 0;min-width:38px">${esc(ch)}</button>`).join('')}</div>`).join('')}<div style="display:flex;justify-content:center;gap:4px"><button class="xp-btn" data-letter=" " style="width:230px">Espace</button><button class="xp-btn" data-letter="Backspace">Retour arrière</button></div></div></div>`;const input=$('#keyboard-input',c);$$('[data-letter]',c).forEach(btn=>btn.onclick=()=>{let k=btn.dataset.letter;input.value=k==='Backspace'?input.value.slice(0,-1):input.value+k;input.focus()});}
  function showContext(x,y,entries){hideContext();contextMenu.innerHTML=entries.map((item,i)=>item.separator?'<div class="context-separator"></div>':`<div class="context-row ${item.disabled?'disabled':''}" data-row="${i}" role="menuitem">${esc(item.label)}</div>`).join('');contextMenu.hidden=false;
    contextMenu.style.left=Math.max(0,Math.min(x,window.innerWidth-225))+'px';contextMenu.style.top=Math.max(0,Math.min(y,window.innerHeight-35-entries.length*27))+'px';$$('[data-row]',contextMenu).forEach(el=>el.addEventListener('click',e=>{e.stopPropagation();hideContext();entries[+el.dataset.row].action?.()}));}
  function hideContext(){contextMenu.hidden=true}
  let balloonTimer;function showBalloon(message){const el=$('#balloon');el.textContent=message;el.hidden=false;clearTimeout(balloonTimer);balloonTimer=setTimeout(()=>el.hidden=true,3500)}
  function showShutdown(){dialogLayer.innerHTML=`<div class="dialog-mask"><div class="shutdown-panel"><div class="shutdown-header"><span>Arrêter l’ordinateur</span>${iconMarkup('Windows Flag')}</div><div class="shutdown-body"><button class="shutdown-choice" data-power="sleep"><span class="choice-icon">☾</span><span>Mettre en veille</span></button><button class="shutdown-choice" data-power="restart"><span class="choice-icon">↻</span><span>Redémarrer</span></button><button class="shutdown-choice" data-power="stop"><span class="choice-icon">⏻</span><span>Arrêter</span></button></div><div class="dialog-actions"><button class="xp-btn" data-power="cancel">Annuler</button></div></div></div>`;}
  function showLogoff(){dialogLayer.innerHTML=`<div class="dialog-mask"><div class="shutdown-panel"><div class="shutdown-header">Fermer la session</div><div class="shutdown-body"><button class="shutdown-choice" data-power="logoff"><span class="choice-icon">⇨</span><span>Changer d’utilisateur</span></button><button class="shutdown-choice" data-power="cancel"><span class="choice-icon">✕</span><span>Annuler</span></button></div></div></div>`;}
  dialogLayer.addEventListener('click', event => {
    const action = event.target.closest('[data-power]')?.dataset.power;
    if (!action && !event.target.classList.contains('dialog-mask')) return;
    dialogLayer.innerHTML = '';
    if (action === 'sleep') showBalloon('Mise en veille simulée.');
    if (['logoff', 'stop', 'restart'].includes(action)) {
      window.parent.dispatchEvent(new CustomEvent('rewind:session-command', { detail: action }));
    }
  });
  function updateClock(){const now=new Date();$('#clock').textContent=now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});$('#clock').title=now.toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}updateClock();setInterval(updateClock,15000);
  $('#clock').addEventListener('click',()=>showBalloon(new Date().toLocaleString('fr-FR',{dateStyle:'full',timeStyle:'short'})));
  $('#tray-toggle').addEventListener('click',()=>showBalloon('Connexion réseau local — Volume — Horloge'));
  $('#tray-volume').addEventListener('click',()=>showBalloon('Volume du système'));
  document.addEventListener('click',e=>{
    const target=e.target.closest('[data-open]');if(target&&!target.classList.contains('explorer-file')){e.stopPropagation();openApp(target.dataset.open);return}
    const close=e.target.closest('[data-close]');if(close){closeWindow(close.dataset.close);return}
    const menuBtn=e.target.closest('[data-menuname]');if(menuBtn){const name=menuBtn.dataset.menuname;const kind=menuBtn.closest('.xp-window')?.dataset.window;const r=menuBtn.getBoundingClientRect();showContext(r.left,r.bottom,[
      {label:name==='Fichier'?'Nouveau':'Actualiser',action:()=>{if(kind==='notepad')$('.notepad-text',windows.get('notepad').el).value='';else showBalloon('Commande exécutée.')}},
      {label:'Enregistrer sous…',action:()=>{if(kind==='notepad'){download('Sans titre.txt',$('.notepad-text',windows.get('notepad').el).value,'text/plain')}else if(kind==='paint'){$('canvas',windows.get('paint').el).toBlob(blob=>download('Dessin.png',blob,'image/png'))}else showBalloon('Aucun document à enregistrer.')}},
      {separator:true},{label:'Fermer',action:()=>closeWindow(kind)}
    ]);return}
    if(!e.target.closest('#start-menu')&&!e.target.closest('#programs-menu')&&!e.target.closest('#start-button'))hideStart();
    if(!e.target.closest('#context-menu'))hideContext();
    if(e.target===desktop||e.target.id==='desktop-icons')selectDesktop(null);
  });
  desktop.addEventListener('contextmenu',e=>{if(e.target.closest('.desktop-icon,.xp-window,#taskbar,#start-menu'))return;e.preventDefault();hideStart();showContext(e.clientX,e.clientY,[{label:'Réorganiser les icônes',action:()=>{desktopShortcuts.forEach((s,i)=>{const el=$(`.desktop-icon[data-shortcut="${s.key}"]`);el.style.left='15px';el.style.top=(14+i*92)+'px'})}},{label:'Actualiser',action:()=>showBalloon('Le Bureau est à jour.')},{separator:true},{label:'Nouveau dossier',action:()=>showBalloon('La création de dossiers personnalisés sera ajoutée prochainement.')},{separator:true},{label:'Propriétés',action:()=>openApp('display')}] )});
  window.addEventListener('keydown',e=>{
    if((e.ctrlKey&&e.key==='Escape')||e.key==='Meta'){e.preventDefault();showStart(!startOpen)}
    else if(e.key==='Escape'){hideStart();hideContext();if(dialogLayer.innerHTML)dialogLayer.innerHTML=''}
    else if(e.altKey&&e.key==='F4'&&windows.focused){e.preventDefault();closeWindow(windows.focused)}
    else if(e.key==='F5'&&!e.target.matches('input,textarea')){e.preventDefault();showBalloon('Bureau actualisé.')}
  });
  // La zone de notification règle l'intensité du filtre de la session.
  const crtSettings = document.getElementById('crt-settings');
  const crtButton = document.getElementById('crt-settings-button');
  const crtRadios = [...document.querySelectorAll('input[name="crt-mode"]')];
  let savedCrtMode = 'crt';
  try { savedCrtMode = localStorage.getItem('rewind-v1-crt-mode') || 'crt'; } catch (_) {}
  const selectCrtMode = (mode) => {
    const actual = mode === 'light' ? 'light' : 'crt';
    document.body.dataset.crtMode = actual;
    crtRadios.forEach(input => input.checked = input.value === actual);
    try { localStorage.setItem('rewind-v1-crt-mode', actual); } catch (_) {}
    if (window.parent !== window) {
      window.parent.dispatchEvent(new CustomEvent('rewind:crt-mode', { detail: actual }));
    }
  };
  const closeCrtSettings = () => { crtSettings.hidden = true; crtButton.setAttribute('aria-expanded', 'false'); };
  crtButton.addEventListener('click', event => {
    event.stopPropagation();
    crtSettings.hidden = !crtSettings.hidden;
    crtButton.setAttribute('aria-expanded', String(!crtSettings.hidden));
  });
  document.getElementById('crt-settings-close').addEventListener('click', closeCrtSettings);
  crtRadios.forEach(input => input.addEventListener('change', () => selectCrtMode(input.value)));
  document.addEventListener('pointerdown', event => {
    if (!crtSettings.hidden && !crtSettings.contains(event.target) && !crtButton.contains(event.target)) closeCrtSettings();
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeCrtSettings();
  });
  selectCrtMode(savedCrtMode);

  buildStartMenu();renderIcons();
  const profile = new URLSearchParams(location.search).get('profil')?.trim().slice(0, 26);
  $('.start-username').textContent = profile || 'Invité';
  desktop.focus();
})();
