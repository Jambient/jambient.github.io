const games = [
    { name: "Wordle", url: "https://www.nytimes.com/games/wordle", img: "img/wordle.webp" },
    { name: "Connections", url: "https://www.nytimes.com/games/connections", img: "img/connections.png" },
    { name: "Raddle", url: "https://raddle.quest", img: "img/raddle.jpg" },
    { name: "Colorfle", url: "https://colorfle.com", img: "img/colorfle.jpg" },
    { name: "Kinda Hard Golf", url: "https://kindahardgolf.com/", img: "img/kinda_hard_golf.webp" },
    { name: "Songless", url: "https://lessgames.com/songless", img: "img/songless.png" },
    { name: "Bandle", url: "https://bandle.app/menu", img: "img/bandle.png" },
    { name: "Flagle", url: "https://flagle-game.com/daily", img: "img/flagle.jpg" },
    { name: "Linkedin Tango", url: "https://www.linkedin.com/games/tango", img: "img/tango.webp" },
    { name: "Linkedin Crossclimb", url: "https://www.linkedin.com/games/crossclimb", img: "img/crossclimb.webp" },
    { name: "Nerdle", url: "https://nerdlegame.com/", img: "img/nerdle.png" },
    { name: "Metazooa", url: "https://metazooa.com/", img: "img/metazooa.png" },
    { name: "Globle", url: "https://globle-game.com/", img: "img/globle.png" },
    { name: "Peekpedia", url: "https://www.peekpedia.com/", img: "img/peekpedia.png" },
    { name: "Timdle Classic", url: "https://www.timdle.com/daily", img: "img/timdle.png" },
    { name: "Timdle Music", url: "https://www.timdle.com/music", img: "img/timdle.png" },
];

const whiteout = document.getElementById("whiteout");
let isLaunching = false;
let pendingResetCard = null;

const carousel = document.getElementById("carousel");
const range = 2;
let index = 0;

const cards = [];
const dotsContainer = document.getElementById("dots");
const dots = [];

const bgA = document.getElementById("bgA");
const bgB = document.getElementById("bgB");

let activeBg = bgA;
let inactiveBg = bgB;

const progressEl = document.getElementById("progress");

function updateProgress() {
  const completedCount = Object.keys(completions.completed).length;
  progressEl.textContent = `${completedCount} / ${games.length} completed`;
}

const STORAGE_KEY = "daily-game-completions";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadCompletions() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { date: todayKey(), completed: {} };
  }

  const data = JSON.parse(raw);

  // Reset if day changed
  if (data.date !== todayKey()) {
    return { date: todayKey(), completed: {} };
  }

  return data;
}

function saveCompletions(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let completions = loadCompletions();

function launchGame(card, game) {
  if (isLaunching) return;
  isLaunching = true;

  // Mark as completed immediately
  completions.completed[game.name] = true;
  saveCompletions(completions);

  pendingResetCard = card;

  // Animate card
  card.classList.add("launching");

  // White flash
  setTimeout(() => {
    whiteout.classList.add("active");
  }, 100);

  // Open site during whiteout
  setTimeout(() => {
    window.open(game.url, "_blank");
  }, 500);

  // Reset UI in background
//   setTimeout(() => {
//     card.classList.remove("launching");
//     whiteout.classList.remove("active");
//     isLaunching = false;
//     update();
//   }, 900);
}

games.forEach((game, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${game.img}" />
        <div class="title">${game.name}</div>`;

    card.onclick = (e) => {
        if (i !== index) {
            index = i;
            update();
            return;
        }

        launchGame(card, game);
    };

    carousel.appendChild(card);
    cards.push(card);

    const dot = document.createElement("div");
    dot.className = "dot";

    dot.onclick = () => {
        index = i;
        update();
    };

    dotsContainer.appendChild(dot);
    dots.push(dot);
});

function updateBackground() {
  inactiveBg.style.backgroundImage = `url(${games[index].img})`;

  inactiveBg.classList.add("active");
  activeBg.classList.remove("active");

  // swap references
  [activeBg, inactiveBg] = [inactiveBg, activeBg];
}

function update() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });

    updateBackground();
    updateProgress();

    cards.forEach((card, i) => {
        if (card.classList.contains("launching")) {
            card.style.transform = '';
            return;
        }

        let offset = i - index;

        const half = Math.floor(games.length / 2);

        // wrap logic
        if (offset > half) offset -= games.length;
        if (offset < -half) offset += games.length;

        const visible = Math.abs(offset) <= range;

        if (!visible) {
            // Instantly teleport invisible cards
            card.classList.add("no-anim");
            card.style.opacity = 0;
            card.style.transform = `
                translate(-50%, -50%)
                translateX(${offset * 360}px)
                translateZ(-1200px)
                scale(0.3)
            `;

            // Force browser to apply styles
            card.offsetHeight;

            // Re-enable animation for next move
            card.classList.remove("no-anim");
            return;
        }

        const x = offset * 420;
        const z = offset === 0 ? 0 : -420;
        // const scale = offset === 0 ? 1 : 0.65;
        const scale = Math.max(0.65, 1 - Math.abs(offset) * 0.2);
        const opacity = offset === 0 ? 1 : 0.25;
        const rotateY = offset * -12;

        card.style.opacity = opacity;
        card.style.pointerEvents = offset === 0 ? "auto" : "none";

        const game = games[i];
            card.classList.toggle(
            "completed",
            !!completions.completed[game.name]
        );

        card.style.transform = `
            translate(-50%, -50%)
            translateX(${x}px)
            translateZ(${z}px)
            rotateY(${rotateY}deg)
            scale(${scale})
        `;
    });
}

function next() {
    index = (index + 1) % games.length;
    update();
}

function prev() {
    index = (index - 1 + games.length) % games.length;
    update();
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowDown") {
        // Manual toggle
        if (completions.completed[games[index].name]) {
            delete completions.completed[games[index].name];
        } else {
            completions.completed[games[index].name] = true;
        }

        saveCompletions(completions);
        update();
        return;
    }
    if (e.key === "Enter") {
        launchGame(cards[index], games[index]);
        update();
    }
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden && pendingResetCard) {
    // user came back
    pendingResetCard.classList.remove("launching");
    whiteout.classList.remove("active");
    pendingResetCard = null;
    isLaunching = false;
    update();
  }
});

update();
activeBg.style.backgroundImage = `url(${games[0].img})`;
activeBg.classList.add("active");