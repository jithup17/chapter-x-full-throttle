const drivers = {
  rohit:    { name: 'Rohit',    number: '13', tagline: 'Boost Bandit',    ticket: 'assets/tickets/rohit.png' },
  siva:     { name: 'Siva Ram', number: '30', tagline: 'Lap Legend',      ticket: 'assets/tickets/siva.png' },
  shashank: { name: 'Shashank', number: '44', tagline: 'V8 Outlaw',       ticket: 'assets/tickets/shashank.png' },
  vijay:    { name: 'Vijay',    number: '08', tagline: 'Swedish Missile', ticket: 'assets/tickets/vijay.png' },
  omkar:    { name: 'Omkar',    number: '09', tagline: 'Wagon Weapon',    ticket: 'assets/tickets/omkar.png' },
  likith:   { name: 'Likith',   number: '04', tagline: 'Bavarian Bullet', ticket: 'assets/tickets/likith.png' }
};

function driverFromLocation() {
  const params = new URLSearchParams(location.search);
  const query = (params.get('driver') || '').toLowerCase().trim();
  if (drivers[query]) return query;

  const segments = location.pathname.split('/').filter(Boolean);
  const last = (segments.at(-1) || '').toLowerCase();
  return drivers[last] ? last : 'rohit';
}

const key = driverFromLocation();
const driver = drivers[key];

const envelope = document.getElementById('envelope');
const overlay = document.getElementById('briefingOverlay');
const modal = overlay.querySelector('.briefing-modal');
const slides = [...document.querySelectorAll('.slide')];
const dots = [...document.querySelectorAll('[data-slide-to]')];
const prevSlide = document.getElementById('prevSlide');
const nextSlide = document.getElementById('nextSlide');
const briefingStage = document.getElementById('briefingStage');
const ticketImage = document.getElementById('ticketImage');
const downloadTicket = document.getElementById('downloadTicket');
const sliderShell = document.getElementById('sliderShell');

let currentSlide = 0;
let opening = false;
let touchStartX = null;

function applyDriver() {
  document.title = `${driver.name} // Chapter X: Full Throttle`;
  document.getElementById('headerDriver').textContent = `DRIVER ${driver.number}`;
  document.getElementById('heroNumber').textContent = driver.number;
  document.getElementById('heroName').textContent = driver.name.toUpperCase();
  document.getElementById('heroTag').textContent = `“${driver.tagline.toUpperCase()}”`;
  document.getElementById('paperDriver').textContent = `${driver.name.toUpperCase()} // ${driver.number}`;
  document.getElementById('modalDriver').textContent = driver.name.toUpperCase();
  document.getElementById('modalNumber').textContent = driver.number;
  document.getElementById('driverTitle').textContent = `${driver.name.toUpperCase()} #${driver.number} // “${driver.tagline.toUpperCase()}”`;

  ticketImage.src = driver.ticket;
  ticketImage.alt = `${driver.name} #${driver.number} — ${driver.tagline} — Chapter X driver pass`;
  downloadTicket.href = driver.ticket;
  downloadTicket.download = `Chapter-X-${driver.name.replace(/\s+/g, '-')}-${driver.number}.png`;
}

function preload() {
  ['assets/invite-poster.png', 'assets/race-control-letter.png', driver.ticket].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function showSlide(index, direction = 0) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === currentSlide && slides[next].classList.contains('is-active')) return;

  const old = slides[currentSlide];
  const incoming = slides[next];

  old.classList.remove('is-active', 'from-left', 'from-right', 'to-left', 'to-right');
  incoming.classList.remove('is-active', 'from-left', 'from-right', 'to-left', 'to-right');

  if (direction > 0) {
    old.classList.add('to-left');
    incoming.classList.add('from-right');
  } else if (direction < 0) {
    old.classList.add('to-right');
    incoming.classList.add('from-left');
  }

  requestAnimationFrame(() => incoming.classList.add('is-active'));
  currentSlide = next;

  dots.forEach((dot, i) => dot.classList.toggle('is-current', i === currentSlide));
  const label = slides[currentSlide].dataset.label;
  briefingStage.textContent = `${label} // ${String(currentSlide + 1).padStart(2, '0')} OF 03`;
  prevSlide.disabled = currentSlide === 0;
  nextSlide.disabled = currentSlide === slides.length - 1;
  downloadTicket.classList.toggle('is-visible', currentSlide === slides.length - 1);

  window.setTimeout(() => {
    slides.forEach((slide, i) => {
      if (i !== currentSlide) slide.classList.remove('from-left', 'from-right', 'to-left', 'to-right');
    });
  }, 520);
}

function openBriefing() {
  if (opening || overlay.classList.contains('is-open')) return;
  opening = true;
  envelope.classList.add('is-opening');
  document.body.classList.add('is-opening-briefing');

  window.setTimeout(() => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('briefing-open');
    showSlide(0);
    modal.focus?.();
  }, 720);

  window.setTimeout(() => {
    document.body.classList.remove('is-opening-briefing');
    opening = false;
  }, 1250);
}

function closeBriefing() {
  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('briefing-open');
  window.setTimeout(() => {
    envelope.classList.remove('is-opening');
    showSlide(0);
  }, 420);
}

envelope.addEventListener('click', openBriefing);
document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeBriefing));

prevSlide.addEventListener('click', () => showSlide(currentSlide - 1, -1));
nextSlide.addEventListener('click', () => showSlide(currentSlide + 1, 1));
dots.forEach(dot => dot.addEventListener('click', () => {
  const target = Number(dot.dataset.slideTo);
  showSlide(target, target > currentSlide ? 1 : -1);
}));

slides.forEach(slide => {
  slide.querySelector('.media-card').addEventListener('click', () => {
    if (currentSlide < slides.length - 1) showSlide(currentSlide + 1, 1);
  });
});

sliderShell.addEventListener('touchstart', event => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });

sliderShell.addEventListener('touchend', event => {
  if (touchStartX === null) return;
  const delta = event.changedTouches[0].clientX - touchStartX;
  touchStartX = null;
  if (Math.abs(delta) < 42) return;
  if (delta < 0 && currentSlide < slides.length - 1) showSlide(currentSlide + 1, 1);
  if (delta > 0 && currentSlide > 0) showSlide(currentSlide - 1, -1);
}, { passive: true });

document.addEventListener('keydown', event => {
  if (!overlay.classList.contains('is-open')) {
    if (event.key === 'Enter' || event.key === ' ') openBriefing();
    return;
  }

  if (event.key === 'Escape') closeBriefing();
  if (event.key === 'ArrowRight' && currentSlide < slides.length - 1) showSlide(currentSlide + 1, 1);
  if (event.key === 'ArrowLeft' && currentSlide > 0) showSlide(currentSlide - 1, -1);
});

applyDriver();
preload();
showSlide(0);
