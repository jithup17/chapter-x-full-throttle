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
    portrait: "assets/drivers/rohit.jpg",
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
    portrait: "assets/drivers/siva.jpg",
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
    portrait: "assets/drivers/shashank.jpg",
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
    portrait: "assets/drivers/vijay.jpg",
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
    portrait: "assets/drivers/omkar.jpg",
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
    portrait: "assets/drivers/likith.jpg",
    ticket: "assets/tickets/likith.png"
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
ticketImage.src = `${visitor.ticket}?v=4`;
ticketImage.alt = `${visitor.name} #${visitor.number} — Chapter X driver pass`;

const downloadTicket = $("#downloadTicket");
downloadTicket.href = visitor.ticket;
downloadTicket.download =
  `Chapter-X-${visitor.name.replace(/\s+/g, "-")}-${visitor.number}.png`;


/* =========================================================
   BUILD THE GRID
========================================================= */

const grid = $("#driverGrid");

grid.innerHTML = Object.entries(DRIVERS)
  .sort((a, b) => a[1].order - b[1].order)
  .map(([key, d]) => {
    const ownGarage = key === visitorKey;

    return `
      <button
        class="driver-card${ownGarage ? " is-you" : ""}"
        type="button"
        data-driver-card="${safe(key)}"
        aria-expanded="false"
        aria-label="Open profile for ${safe(d.name)}"
      >
        <span class="driver-card__portrait">
          <img src="${safe(d.portrait)}?v=4"
               alt="${safe(d.name)} — car ${safe(d.number)}">
        </span>

        <span class="driver-card__gradient"></span>

        <span class="driver-card__number">${safe(d.number)}</span>

        ${ownGarage ? `<span class="your-garage">YOUR GARAGE</span>` : ""}

        <span class="driver-card__front">
          <small>DRIVER ${String(d.order).padStart(2, "0")}</small>
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

          <span class="profile-row">
            <label>RACE CONTROL</label>
            <em>${safe(d.control)}</em>
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
            DRIVER CLEARED FOR COMPETITION
          </span>
        </span>
      </button>
    `;
  })
  .join("");

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
  "assets/invite-poster.png?v=4",
  "assets/race-control-letter.png?v=4",
  `${visitor.ticket}?v=4`,
  ...Object.values(DRIVERS).map(d => `${d.portrait}?v=4`)
].forEach(src => {
  const img = new Image();
  img.src = src;
});
