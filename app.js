/* =========================================================
   THE ROSTER

   TO ADD ANOTHER DRIVER — three steps, nothing else:

   1. Add a block below. `order` controls grid position.
   2. Drop the portrait in assets/drivers/<key>.png  (720x900,
      head roughly in the top third — the card crops to 4:5).
      .jpg also works; the loader falls back automatically.
   3. Copy any existing folder (e.g. /omkar/index.html) to
      /<key>/index.html and change the driver name in the
      redirect so <site>/<key>/ opens their personalized page.

   The grid re-flows its column count on its own — 6, 7, 8 or
   more rivals all lay out without touching the CSS.
========================================================= */

const DRIVERS = {
  rohit: {
    order: 1,
    name: "Rohit",
    surname: "Vedachalam",
    number: "13",
    tagline: "Boost Bandit",
    paddock: "Main Character Energy",
    threat: "QUESTIONABLE",
    control: "Do not underestimate.",
    note: "Claims this is “just for fun.” Race Control has reviewed that statement and remains unconvinced.",
    stats: [
      ["CONFIDENCE", "140%"],
      ["BRAKING", "OPTIONAL"],
      ["APEX HIT RATE", "SELF-REPORTED"],
      ["EXCUSES PRE-LOADED", "7"]
    ],
    portrait: "assets/drivers/rohit.png",
    ticket: "assets/tickets/rohit.png"
  },

  siva: {
    order: 2,
    name: "Siva Ram",
    surname: "Tallapalli",
    number: "30",
    tagline: "Lap Legend",
    paddock: "Smooth Operator",
    threat: "CALM BUT CONCERNING",
    control: "Smooth is still fast.",
    note: "Minimal drama. Maximum possibility of quietly appearing on the podium.",
    stats: [
      ["SMOOTHNESS", "9.4/10"],
      ["DRAMA", "0.0"],
      ["OVERTAKES", "QUIET BUT REAL"],
      ["PODIUM ODDS", "AWKWARDLY HIGH"]
    ],
    portrait: "assets/drivers/siva.png",
    ticket: "assets/tickets/siva.png"
  },

  shashank: {
    order: 3,
    name: "Shashank",
    surname: "Shivarudrappa",
    number: "44",
    tagline: "V8 Outlaw",
    paddock: "Corner Specialist",
    threat: "UNCONFIRMED",
    control: "Telemetry remains inconclusive.",
    note: "Could be here to win. Could be here for snacks. Either way, the apexes have been warned.",
    stats: [
      ["CORNER ENTRY", "COMMITTED"],
      ["CORNER EXIT", "PENDING"],
      ["ENGINE NOISES MADE", "212"],
      ["SNACK BREAKS", "4"]
    ],
    portrait: "assets/drivers/shashank.png",
    ticket: "assets/tickets/shashank.png"
  },

  vijay: {
    order: 4,
    name: "Vijay",
    surname: "Malagi",
    number: "08",
    tagline: "Swedish Missile",
    paddock: "Victory Mode",
    threat: "DECEPTIVELY HIGH",
    control: "Do not trust the casual approach.",
    note: "Arrived with “Victory Mode” already enabled. Race Control has questions.",
    stats: [
      ["LAUNCH", "INSTANT"],
      ["CASUAL ACT", "10/10"],
      ["VICTORY MODE", "PRE-ENABLED"],
      ["HUMILITY", "BUFFERING"]
    ],
    portrait: "assets/drivers/vijay.png",
    ticket: "assets/tickets/vijay.png"
  },

  omkar: {
    order: 5,
    name: "Omkar",
    surname: "Kulkarni",
    number: "09",
    tagline: "Wagon Weapon",
    paddock: "Strategy Pending",
    threat: "DEVELOPING",
    control: "Keep under observation.",
    note: "Strategy pending. Confidence, however, appears fully deployed.",
    stats: [
      ["STRATEGY", "LOADING…"],
      ["CONFIDENCE", "FULLY DEPLOYED"],
      ["WAGON ENERGY", "MAXIMUM"],
      ["PLAN B", "ALSO PLAN A"]
    ],
    portrait: "assets/drivers/omkar.png",
    ticket: "assets/tickets/omkar.png"
  },

  likith: {
    order: 6,
    name: "Likith",
    surname: "Gowda",
    number: "04",
    tagline: "Bavarian Bullet",
    paddock: "Velocity Mode",
    threat: "UNKNOWN",
    control: "Proceed with unnecessary caution.",
    note: "No useful telemetry. Somehow that makes this worse.",
    stats: [
      ["TELEMETRY", "NOT FOUND"],
      ["MYSTERY", "11/10"],
      ["SUNGLASSES", "INDOORS"],
      ["KNOWN WEAKNESS", "STILL LOOKING"]
    ],
    portrait: "assets/drivers/likith.png",
    ticket: "assets/tickets/likith.png"
  },

  karthik: {
    order: 7,
    name: "Karthik",
    surname: "Raghu",
    number: "03",
    tagline: "Seoul Streak",
    paddock: "Launch Control",
    threat: "QUIETLY SERIOUS",
    control: "Watch the late braking.",
    note: "Calm on the grid. Telemetry suggests considerably more pace than advertised.",
    stats: [
      ["LATE BRAKING", "ALARMING"],
      ["ADVERTISED PACE", "MODEST"],
      ["ACTUAL PACE", "NOT MODEST"],
      ["CALM UNDER FIRE", "97%"]
    ],
    portrait: "assets/drivers/karthik.jpg",
    ticket: "assets/tickets/karthik.png"  },

  srivatsa: {
    order: 8,
    name: "Srivatsa",
    surname: "GR",
    number: "10",
    tagline: "Manual Maverick",
    paddock: "Three-Pedal Purist",
    threat: "MANUALLY ELEVATED",
    control: "He will bring up gear ratios.",
    note: "Refuses to accept that paddle shifters are real. Race Control stopped arguing and simply handed him the keys.",
    stats: [
      ["PEDALS USED", "ALL THREE"],
      ["HEEL-TOE", "UNPROMPTED"],
      ["AUTOMATICS INSULTED", "46"],
      ["CLUTCH CONTROL", "SMUG"]
    ],
    portrait: "assets/drivers/srivatsa.png",
    ticket: "assets/tickets/srivatsa.png"
  }
};

const STAGES = ["cover", "invite", "racecontrol", "grid"];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function safe(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function resolveDriverKey() {
  const params = new URLSearchParams(location.search);
  const query = (params.get("driver") || "").trim().toLowerCase();

  if (DRIVERS[query]) return query;

  const parts = location.pathname.split("/").filter(Boolean);
  const last = (parts.at(-1) || "").toLowerCase();

  return DRIVERS[last] ? last : "rohit";
}

const visitorKey = resolveDriverKey();
const visitor = DRIVERS[visitorKey];

let currentStageIndex = 0;
let envelopeBusy = false;
let currentDocument = "letter";

const stageEls = $$("[data-stage]");
const navEls = $$("[data-stage-nav]");

/* =========================================================
   PERSONALIZATION
========================================================= */

document.title = `${visitor.name} // Chapter X: Full Throttle`;

$("#headerDriver").textContent = `DRIVER ${visitor.number}`;
$("#heroNumber").textContent = visitor.number;
$("#heroName").textContent = visitor.name.toUpperCase();
$("#heroTag").textContent = `“${visitor.tagline.toUpperCase()}”`;
$("#paperDriver").textContent = `${visitor.name.toUpperCase()} // ${visitor.number}`;
$("#railDriver").textContent = `${visitor.name.toUpperCase()} // ${visitor.number}`;
$("#ticketHeading").textContent =
  `${visitor.name.toUpperCase()} #${visitor.number} // “${visitor.tagline.toUpperCase()}”`;
$("#ticketPaddock").textContent = `PADDOCK // ${visitor.paddock.toUpperCase()}`;

const ticketImage = $("#ticketImage");
ticketImage.src = `${visitor.ticket}?v=12`;
ticketImage.alt = `${visitor.name} #${visitor.number} — Chapter X driver pass`;

const downloadTicket = $("#downloadTicket");
downloadTicket.href = visitor.ticket;
downloadTicket.download =
  `Chapter-X-${visitor.name.replace(/\s+/g, "-")}-${visitor.number}.png`;


/* =========================================================
   BUILD THE GRID
========================================================= */

const grid = $("#driverGrid");

const rivals = Object.entries(DRIVERS)
  .filter(([key]) => key !== visitorKey)
  .sort((a, b) => a[1].order - b[1].order);

const rivalCount = rivals.length;
const railRivalCount = $("#railRivalCount");
const scoutingRivalCount = $("#scoutingRivalCount");
if (railRivalCount) railRivalCount.textContent = `${rivalCount} RIVALS CONFIRMED`;
if (scoutingRivalCount) scoutingRivalCount.textContent = `SCOUTING REPORT // ${rivalCount} RIVALS CONFIRMED`;

grid.innerHTML = rivals
  .map(([key, d]) => {
    return `
      <button
        class="driver-card"
        type="button"
        data-driver-card="${safe(key)}"
        aria-expanded="false"
        aria-label="Open profile for ${safe(d.name)}"
      >
        <span class="driver-card__portrait">
          <img src="${safe(d.portrait)}?v=12"
               alt="${safe(d.name)} — car ${safe(d.number)}">
        </span>

        <span class="driver-card__gradient"></span>

        <span class="driver-card__number">${safe(d.number)}</span>

        <span class="driver-card__front">
          <small>RIVAL // CAR ${safe(d.number)}</small>
          <strong>${safe(d.name)}</strong>
          <span>${safe(d.surname)}</span>
          <em>“${safe(d.tagline)}”</em>
          <b>VIEW RIVAL PROFILE →</b>
        </span>

        <span class="driver-card__profile">
          <small>RIVAL PROFILE // ${safe(d.number)}</small>

          <strong>${safe(d.name)}</strong>
          <span class="profile-surname">${safe(d.surname)}</span>

          <span class="profile-row">
            <label>THREAT LEVEL</label>
            <b>${safe(d.threat)}</b>
          </span>

          <span class="profile-stats">
            <label>TELEMETRY</label>
            <span class="profile-stats__grid">
              ${(d.stats || [])
                .map(([statLabel, statValue]) => `
                  <span class="stat">
                    <i>${safe(statLabel)}</i>
                    <b>${safe(statValue)}</b>
                  </span>
                `)
                .join("")}
            </span>
          </span>

          <span class="profile-note">
            <label>PADDOCK NOTE</label>
            <span>${safe(d.note)}</span>
          </span>

          <span class="profile-paddock">
            <label>PADDOCK STATUS</label>
            <b>${safe(d.paddock).toUpperCase()}</b>
          </span>

          <span class="profile-cleared">
            <i></i>
            ${safe(d.control)}
          </span>
        </span>
      </button>
    `;
  })
  .join("");

/* ---------------------------------------------------------
   Column count follows the roster size, so adding a driver
   never leaves a lonely orphan card on its own row.
   Tablet/mobile counts stay under CSS control.
--------------------------------------------------------- */

function idealColumns(n) {
  if (n <= 4) return n;   //  up to 4 -> single starting row
  if (n === 5) return 3;  //  3 + 2
  if (n === 6) return 3;  //  3 + 3
  if (n === 7) return 4;  //  4 + 3
  if (n === 8) return 4;  //  4 + 4
  if (n === 9) return 3;  //  3 x 3
  return 4;
}

/*
  data-cols must match what actually renders, not just the roster,
  or the narrow-card type tweaks leak onto wide phone/tablet cards.
*/
function applyGridColumns() {
  const width = window.innerWidth;

  const cols = width <= 650
    ? 1
    : width <= 1180
      ? Math.min(2, rivalCount)
      : idealColumns(rivalCount);

  grid.style.setProperty("--grid-cols", cols);
  grid.dataset.cols = String(cols);
}

applyGridColumns();

let gridResizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(gridResizeTimer);
  gridResizeTimer = setTimeout(applyGridColumns, 120);
});


/* ---------------------------------------------------------
   Portraits are .png; a couple are still .jpg. Rather than
   showing a broken image, try the other extension once.
--------------------------------------------------------- */

$$(".driver-card__portrait img", grid).forEach(img => {
  img.addEventListener("error", () => {
    if (img.dataset.triedFallback) return;
    img.dataset.triedFallback = "1";

    const swapped = img.getAttribute("src").replace(
      /\.(png|jpe?g)(\?.*)?$/i,
      (_, ext, query) =>
        (ext.toLowerCase() === "png" ? ".jpg" : ".png") + (query || "")
    );

    if (swapped !== img.getAttribute("src")) img.src = swapped;
  });
});


$$("[data-driver-card]").forEach(card => {
  card.addEventListener("click", () => {
    const opening = !card.classList.contains("is-open");

    $$("[data-driver-card]").forEach(other => {
      other.classList.remove("is-open");
      other.setAttribute("aria-expanded", "false");
    });

    if (opening) {
      card.classList.add("is-open");
      card.setAttribute("aria-expanded", "true");
    }
  });
});


/* =========================================================
   RACE CONTROL: LETTER / DRIVER PASS TABS
========================================================= */

function showDocument(name) {
  currentDocument = name === "ticket" ? "ticket" : "letter";

  $$("[data-doc-tab]").forEach(button => {
    button.classList.toggle(
      "is-current",
      button.dataset.docTab === currentDocument
    );
  });

  $$("[data-doc-view]").forEach(view => {
    view.classList.toggle(
      "is-current",
      view.dataset.docView === currentDocument
    );
  });

  const ticketMode = currentDocument === "ticket";

  $("#raceHeading").textContent =
    ticketMode ? "OFFICIAL DRIVER PASS" : "FROM RACE CONTROL";

  downloadTicket.classList.toggle("is-hidden", !ticketMode);
}

$$("[data-doc-tab]").forEach(button => {
  button.addEventListener("click", () => {
    showDocument(button.dataset.docTab);

    if (button.dataset.docTab === "ticket") {
      const passTab = $(".driver-pass-tab");
      const badge = $(".driver-pass-tab__badge", passTab);

      passTab?.classList.remove("needs-attention");
      passTab?.classList.add("has-been-viewed");

      if (badge) {
        badge.innerHTML = "<i></i> VIEWED";
      }
    }
  });
});


/* =========================================================
   STAGE NAVIGATION
========================================================= */

function showStage(target, updateHash = true) {
  const index = typeof target === "number"
    ? target
    : STAGES.indexOf(target);

  if (index < 0) return;

  currentStageIndex = Math.max(0, Math.min(STAGES.length - 1, index));

  stageEls.forEach((stage, i) => {
    stage.classList.toggle("is-active", i === currentStageIndex);
  });

  navEls.forEach((button, i) => {
    button.classList.toggle("is-current", i === currentStageIndex);
  });

  $$("[data-driver-card]").forEach(card => {
    card.classList.remove("is-open");
    card.setAttribute("aria-expanded", "false");
  });

  if (updateHash) {
    history.replaceState(
      null,
      "",
      `${location.pathname}${location.search}#${STAGES[currentStageIndex]}`
    );
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

$$("[data-stage-nav]").forEach(button => {
  button.addEventListener("click", () => {
    showStage(button.dataset.stageNav);
  });
});

$$("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showStage(button.dataset.go);
  });
});

$$("[data-prev]").forEach(button => {
  button.addEventListener("click", () => {
    showStage(currentStageIndex - 1);
  });
});

$("#replay").addEventListener("click", () => {
  showDocument("letter");
  showStage("cover");
});


/* =========================================================
   ENVELOPE OPENING
========================================================= */

async function openEnvelope() {
  if (envelopeBusy || currentStageIndex !== 0) return;

  envelopeBusy = true;

  const envelope = $("#envelope");
  const openCall = $("#openCall");

  envelope.classList.add("is-opening");
  openCall.classList.add("is-working");
  openCall.innerHTML = `<span>●</span> TRANSMISSION OPENING…`;

  await new Promise(resolve => setTimeout(resolve, 1250));

  showStage("invite");

  await new Promise(resolve => setTimeout(resolve, 250));

  envelope.classList.remove("is-opening");
  openCall.classList.remove("is-working");
  openCall.innerHTML = `<span>▶</span> BREAK SEAL // OPEN INVITATION`;

  envelopeBusy = false;
}

$("#envelope").addEventListener("click", openEnvelope);
$("#openCall").addEventListener("click", openEnvelope);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", event => {
  const tag = document.activeElement?.tagName;
  if (tag === "BUTTON" || tag === "A") return;

  if (event.key === "ArrowRight" && currentStageIndex < STAGES.length - 1) {
    showStage(currentStageIndex + 1);
  }

  if (event.key === "ArrowLeft" && currentStageIndex > 0) {
    showStage(currentStageIndex - 1);
  }

  if ((event.key === "Enter" || event.key === " ") && currentStageIndex === 0) {
    openEnvelope();
  }
});


/* =========================================================
   INITIAL HASH SUPPORT
========================================================= */

const requestedStage = location.hash.replace("#", "").toLowerCase();

if (STAGES.includes(requestedStage)) {
  showStage(requestedStage, false);
} else {
  showStage("cover", false);
}


/* =========================================================
   PRELOAD THE IMPORTANT ART
========================================================= */

[
  "assets/invite-poster.png?v=12",
  "assets/race-control-letter.png?v=12",
  `${visitor.ticket}?v=12`,
  ...Object.values(DRIVERS).map(d => `${d.portrait}?v=12`)
].forEach(src => {
  const img = new Image();
  img.src = src;
});
