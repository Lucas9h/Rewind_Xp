export function createWindowState() {
  const windows = new Map();
  let focused = null;
  let zIndex = 10;

  function selectVisible() {
    let top = null;
    for (const win of windows.values()) {
      if (!win.minimized && (!top || win.zIndex > top.zIndex)) top = win;
    }
    focused = top?.id ?? null;
  }

  return {
    windows,
    get focused() { return focused; },
    activate(id) {
      const win = windows.get(id);
      if (!win) return;
      win.minimized = false;
      win.zIndex = ++zIndex;
      focused = id;
    },
    minimize(id) {
      const win = windows.get(id);
      if (!win) return;
      win.minimized = true;
      if (focused === id) selectVisible();
    },
    close(id) {
      const win = windows.get(id);
      if (!win) return;
      windows.delete(id);
      if (focused === id) selectVisible();
      win.resources.abort();
      return win;
    },
  };
}

export function createWindowManager({ layer, taskbarItems, iconMarkup, escapeHtml, onActivate }) {
  const state = createWindowState();
  const { windows } = state;
  let openedCount = 0;

  function fitPosition(el) {
    el.style.left = Math.max(0, Math.min(el.offsetLeft, layer.clientWidth - el.offsetWidth)) + 'px';
    el.style.top = Math.max(0, Math.min(el.offsetTop, layer.clientHeight - el.offsetHeight)) + 'px';
  }

  function sync() {
    for (const win of windows.values()) {
      const active = state.focused === win.id;
      win.el.style.zIndex = win.zIndex;
      win.el.classList.toggle('inactive', !active);
      win.el.classList.toggle('minimized', win.minimized);
      win.tab.classList.toggle('active', active);
      win.tab.classList.toggle('minimized', win.minimized);
    }
  }

  function focus(id) {
    const win = windows.get(id);
    const wasMinimized = win.minimized;
    state.activate(id);
    sync();
    if (wasMinimized && !win.maximized) fitPosition(win.el);
    onActivate();
  }

  function close(id) {
    const win = state.close(id);
    if (!win) return;
    win.el.remove();
    win.tab.remove();
    sync();
  }

  function minimize(id) {
    state.minimize(id);
    sync();
  }

  function maximize(win) {
    win.maximized = !win.maximized;
    win.el.classList.toggle('maximized', win.maximized);
    const control = win.el.querySelector('[data-control="maximize"]');
    control.classList.toggle('max', !win.maximized);
    control.classList.toggle('restore', win.maximized);
    control.title = win.maximized ? 'Restaurer' : 'Agrandir';
    control.setAttribute('aria-label', control.title);
    focus(win.id);
  }

  function open(id, app) {
    if (windows.has(id)) {
      focus(id);
      return;
    }

    const index = openedCount++;
    const width = Math.min(app.w, layer.clientWidth - 30);
    const height = Math.min(app.h, layer.clientHeight - 35);
    const x = Math.max(4, Math.round((layer.clientWidth - width) / 2 + (index % 5) * 18 - 40));
    const y = Math.max(7, Math.round((layer.clientHeight - height) / 2 + (index % 4) * 14 - 22));
    const title = escapeHtml(app.title);
    const el = document.createElement('section');
    el.className = 'xp-window';
    el.dataset.window = id;
    el.setAttribute('aria-label', app.title);
    el.style.cssText = `width:${width}px;height:${height}px;left:${x}px;top:${y}px`;
    el.innerHTML = `<header class="xp-titlebar">${iconMarkup(app.icon, 'window-icon')}<span class="window-title">${title}</span><div class="window-controls"><button class="window-control min" data-control="minimize" aria-label="Réduire" title="Réduire"></button><button class="window-control max" data-control="maximize" aria-label="Agrandir" title="Agrandir"></button><button class="window-control close" data-control="close" aria-label="Fermer" title="Fermer">×</button></div></header><div class="xp-window-content"></div>`;
    const tab = document.createElement('button');
    tab.className = 'task-tab';
    tab.title = app.title;
    tab.innerHTML = `${iconMarkup(app.icon)}<span>${title}</span>`;

    const resources = new AbortController();
    const win = { id, el, tab, resources, minimized: false, maximized: false };
    windows.set(id, win);
    layer.appendChild(el);
    taskbarItems.appendChild(tab);
    fitPosition(el);
    focus(id);

    tab.addEventListener('click', () => state.focused === id ? minimize(id) : focus(id));
    el.addEventListener('pointerdown', () => {
      if (state.focused !== id) focus(id);
    }, true);
    el.querySelector('.window-controls').addEventListener('click', event => {
      const action = event.target.closest('[data-control]')?.dataset.control;
      if (!action) return;
      event.stopPropagation();
      if (action === 'close') close(id);
      else if (action === 'minimize') minimize(id);
      else maximize(win);
    });

    const titleBar = el.querySelector('.xp-titlebar');
    titleBar.addEventListener('dblclick', event => {
      if (!event.target.closest('button')) maximize(win);
    });
    titleBar.addEventListener('pointerdown', event => {
      if (event.button !== 0 || event.target.closest('button') || win.maximized) return;
      event.preventDefault();
      titleBar.setPointerCapture(event.pointerId);
      const rect = el.getBoundingClientRect();
      const { clientX: x, clientY: y, pointerId } = event;
      const move = event => {
        if (event.pointerId !== pointerId) return;
        el.style.left = Math.max(0, Math.min(layer.clientWidth - 100, rect.left + event.clientX - x)) + 'px';
        el.style.top = Math.max(0, Math.min(layer.clientHeight - 35, rect.top + event.clientY - y)) + 'px';
      };
      titleBar.addEventListener('pointermove', move, { signal: resources.signal });
      titleBar.addEventListener('lostpointercapture', () => {
        titleBar.removeEventListener('pointermove', move);
      }, { once: true, signal: resources.signal });
    });

    try {
      app.mount(win, resources.signal);
    } catch (error) {
      close(id);
      throw error;
    }
  }

  window.addEventListener('resize', () => {
    for (const win of windows.values()) {
      if (!win.maximized && !win.minimized) fitPosition(win.el);
    }
  });

  function setTitle(id, title) {
    const win = windows.get(id);
    win.el.querySelector('.window-title').textContent = title;
    win.el.setAttribute('aria-label', title);
    win.tab.querySelector('span').textContent = title;
    win.tab.title = title;
  }

  return { open, close, setTitle, get: id => windows.get(id), get focused() { return state.focused; } };
}
