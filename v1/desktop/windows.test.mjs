import assert from 'node:assert/strict';
import test from 'node:test';
import { createWindowState } from './windows.mjs';

function open(state, id) {
  const win = { id, minimized: false, resources: new AbortController() };
  state.windows.set(id, win);
  state.activate(id);
  return win;
}

test('closing the last visible window leaves minimized windows minimized', () => {
  const state = createWindowState();
  open(state, 'computer');
  const notepad = open(state, 'notepad');
  state.minimize('notepad');
  assert.equal(state.focused, 'computer');
  state.close('computer');
  assert.equal(state.focused, null);
  assert.equal(notepad.minimized, true);
  state.activate('notepad');
  assert.equal(state.focused, 'notepad');
  assert.equal(notepad.minimized, false);
});

test('focus returns to the frontmost visible window in stacking order', () => {
  const state = createWindowState();
  open(state, 'computer');
  open(state, 'notepad');
  open(state, 'paint');
  state.activate('computer');
  state.activate('notepad');
  state.minimize('notepad');
  assert.equal(state.focused, 'computer');
  state.close('paint');
  assert.equal(state.focused, 'computer');
});

test('minimizing keeps window resources alive and closing aborts them once', () => {
  const state = createWindowState();
  const win = open(state, 'minesweeper');
  let cleanupCount = 0;
  win.resources.signal.addEventListener('abort', () => { cleanupCount++; });
  state.minimize(win.id);
  assert.equal(cleanupCount, 0);
  state.close(win.id);
  state.close(win.id);
  assert.equal(cleanupCount, 1);
  assert.equal(state.windows.size, 0);
});
