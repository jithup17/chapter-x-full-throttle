const drivers = {
  rohit:    { name: 'Rohit',    number: '13', tagline: 'Boost Bandit',    ticket: 'assets/tickets/rohit.png' },
  siva:     { name: 'Siva Ram', number: '30', tagline: 'Lap Legend',      ticket: 'assets/tickets/siva.png' },
  shashank: { name: 'Shashank', number: '44', tagline: 'V8 Outlaw',       ticket: 'assets/tickets/shashank.png' },
  vijay:    { name: 'Vijay',    number: '08', tagline: 'Swedish Missile', ticket: 'assets/tickets/vijay.png' },
  omkar:    { name: 'Omkar',    number: '09', tagline: 'Wagon Weapon',    ticket: 'assets/tickets/omkar.png' },
  likith:   { name: 'Likith',   number: '04', tagline: 'Bavarian Bullet', ticket: 'assets/tickets/likith.png' }
};

const stageOrder = ['cover', 'poster', 'letter', 'ticket'];
const stages = [...document.querySelectorAll('[data-stage]')];
const progressButtons = [...document.querySelectorAll('[data-jump]')];
const envelope = document.getElementById('envelope');
const openCta = document.getElementById('openCta');
const restart = document.getElementById('restart');
let currentStage = 0;
let opening = false;

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

document.title = `${driver.name} // Chapter X: Full Throttle`;
document.getElementById('headerDriver').textContent = `DRIVER ${driver.number}`;
document.getElementById('heroNumber').textContent = driver.number;
document.getElementById('heroName').textContent = driver.name.toUpperCase();
document.getElementById('heroTag').textContent = `“${driver.tagline.toUpperCase()}”`;
document.getElementById('paperDriver').textContent = `${driver.name.toUpperCase()} // ${driver.number}`;
document.getElementById('railDriver').textContent = `${driver.name.toUpperCase()} // ${driver.number}`;
document.getElementById('driverTitle').textContent = `${driver.name.toUpperCase()} #${driver.number} // “${driver.tagline.toUpperCase()}”`;

const ticketImage = document.getElementById('ticketImage');
const downloadTicket = document.getElementById('downloadTicket');
ticketImage.src = driver.ticket;
ticketImage.alt = `${driver.name} #${driver.number} — ${driver.tagline} — Chapter X driver pass`;
downloadTicket.href = driver.ticket;
downloadTicket.download = `Chapter-X-${driver.name.replace(/\s+/g, '-')}-${driver.number}.png`;

['assets/invite-poster.png', 'assets/race-control-letter.png', driver.ticket].forEach(src => {
  const img = new Image();
  img.src = src;
});

function showStage(target) {
  const index = typeof target === 'number' ? target : stageOrder.indexOf(target);
  if (index < 0) return;
  currentStage = Math.max(0, Math.min(stageOrder.length - 1, index));
  stages.forEach((stage, i) => stage.classList.toggle('is-active', i === currentStage));
  progressButtons.forEach((btn, i) => btn.classList.toggle('is-current', i === currentStage));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function openEnvelope() {
  if (opening || currentStage !== 0) return;
  opening = true;
  envelope.classList.add('is-opening');
  openCta.textContent = 'ACCESSING RACE CONTROL…';
  await new Promise(resolve => setTimeout(resolve, 1050));
  showStage('poster');
  envelope.classList.remove('is-opening');
  openCta.innerHTML = '<span class="cta-icon">▶</span> BREAK SEAL // OPEN INVITATION';
  opening = false;
}

envelope.addEventListener('click', openEnvelope);
openCta.addEventListener('click', openEnvelope);

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => showStage(btn.dataset.next));
});
document.querySelectorAll('[data-prev]').forEach(btn => {
  btn.addEventListener('click', () => showStage(currentStage - 1));
});
progressButtons.forEach(btn => btn.addEventListener('click', () => showStage(btn.dataset.jump)));
restart.addEventListener('click', () => showStage('cover'));

document.addEventListener('keydown', event => {
  if ((event.key === 'Enter' || event.key === ' ') && currentStage === 0) openEnvelope();
  if (event.key === 'ArrowRight' && currentStage < stageOrder.length - 1) showStage(currentStage + 1);
  if (event.key === 'ArrowLeft' && currentStage > 0) showStage(currentStage - 1);
});
