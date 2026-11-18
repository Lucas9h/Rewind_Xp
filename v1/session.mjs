const screens = Object.fromEntries(
  ['boot', 'profiles', 'desktop', 'powered-off'].map(screen => [screen, document.getElementById(screen)]),
);
const allowedTransitions = {
  boot: ['profiles'],
  profiles: ['desktop', 'powered-off'],
  desktop: ['profiles', 'powered-off', 'boot'],
  'powered-off': ['boot'],
};
let currentScreen = 'boot';
const desktopFrame = document.getElementById('desktop-frame');
const crtPreferenceKey = 'rewind-v1-crt-mode';

function applyCrtMode(mode) {
  document.body.dataset.crtMode = mode === 'light' ? 'light' : 'crt';
}

try {
  applyCrtMode(localStorage.getItem(crtPreferenceKey));
} catch {
  applyCrtMode('crt');
}
window.addEventListener('rewind:crt-mode', event => applyCrtMode(event.detail));

function showScreen(nextScreen) {
  if (!allowedTransitions[currentScreen].includes(nextScreen)) return;
  screens[currentScreen].hidden = true;
  screens[nextScreen].hidden = false;
  currentScreen = nextScreen;
  screens[nextScreen].querySelector('h1').focus();
}

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let bootTimer;

function startBoot() {
  bootTimer = window.setTimeout(finishBoot, motion.matches ? 0 : 2200);
}

function finishBoot() {
  window.clearTimeout(bootTimer);
  showScreen('profiles');
}

function restartSession() {
  showScreen('boot');
  document.getElementById('skip-boot').focus();
  startBoot();
}

document.getElementById('skip-boot').addEventListener('click', finishBoot);
document.getElementById('power-off').addEventListener('click', () => showScreen('powered-off'));
document.getElementById('power-on').addEventListener('click', restartSession);
startBoot();
function openDesktop(profile) {
  desktopFrame.src = './desktop/?' + new URLSearchParams({ profil: profile });
  showScreen('desktop');
}

const profileName = document.getElementById('profile-name');
profileName.addEventListener('input', () => profileName.setCustomValidity(''));
document.getElementById('profile-form').addEventListener('submit', event => {
  event.preventDefault();
  const name = profileName.value.trim();
  if (!name) {
    profileName.setCustomValidity('Saisis ton nom pour te connecter.');
    profileName.reportValidity();
    return;
  }
  openDesktop(name);
});
document.getElementById('guest-session').addEventListener('click', () => openDesktop('Invité'));
const sessionDestinations = new Map([
  ['logoff', 'profiles'],
  ['stop', 'powered-off'],
  ['restart', 'boot'],
]);
window.addEventListener('rewind:session-command', event => {
  const destination = sessionDestinations.get(event.detail);
  if (currentScreen !== 'desktop' || !destination) return;
  if (destination === 'boot') restartSession();
  else showScreen(destination);
  desktopFrame.removeAttribute('src');
});
