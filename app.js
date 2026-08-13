/* Food Maths — quiz engine (drives every quiz in QUIZZES) */

const $ = (id) => document.getElementById(id);
const STORE_KEY = "foodMaths.v2";

const state = {
  quiz: null,
  selected: new Set(),   // selected section ids
  queue: [],             // questions for this run
  index: 0,
  attempts: 0,           // attempts on the current question
  results: {},           // question number -> "clean" | "second" | "missed"
  chosen: null,          // selected option index for choice questions
  shaky: []
};

/* ---------------- number helpers ---------------- */

// Indian digit grouping: 1,20,000
function groupIndian(numStr) {
  const neg = numStr.startsWith("-");
  const body = neg ? numStr.slice(1) : numStr;
  const [whole, frac] = body.split(".");
  let out;
  if (whole.length <= 3) {
    out = whole;
  } else {
    const last3 = whole.slice(-3);
    const rest = whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    out = `${rest},${last3}`;
  }
  if (frac) out += `.${frac}`;
  return neg ? `-${out}` : out;
}

// Keep the decimals the answer actually has (0.0875 stays 0.0875), max 4.
function niceNumber(v) {
  const rounded = Math.round(v * 10000) / 10000;
  return groupIndian(String(rounded));
}

function formatAnswer(q) {
  const num = niceNumber(q.answer);
  if (q.unit === "rupees") return `₹${num}`;
  if (q.unit === "percent") return `${num}%`;
  if (q.unit === "points") return `${num} percentage points`;
  return num;
}

function parseNumber(raw) {
  const cleaned = String(raw).replace(/[,\s₹%]/g, "").replace(/[^0-9.\-]/g, "");
  if (cleaned === "" || cleaned === "." || cleaned === "-") return null;
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? null : n;
}

function toleranceFor(q) {
  if (q.tolerance != null) return q.tolerance;
  return q.unit === "percent" ? 0.15 : 0.005;
}

function workingText(q) {
  return q.steps ? q.steps.join("  ") : q.working;
}

/* ---------------- data helpers ---------------- */

function quizQuestions(quiz) {
  return quiz.sections.flatMap(s =>
    s.questions.map(q => ({ ...q, sectionId: s.id, sectionTitle: s.title })));
}

function selectedQuestions() {
  return quizQuestions(state.quiz).filter(q => state.selected.has(q.sectionId));
}

function load() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
  catch { return {}; }
}
function save(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch { /* private mode */ }
}

function show(screenId) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(screenId).classList.add("active");
  window.scrollTo(0, 0);
}

/* ---------------- home: choose a quiz ---------------- */

function renderHome() {
  const saved = load();
  const list = $("quiz-list");
  list.innerHTML = "";
  QUIZZES.forEach(quiz => {
    const total = quizQuestions(quiz).length;
    const best = saved.best && saved.best[quiz.id];
    const card = document.createElement("button");
    card.className = "quiz-card";
    card.innerHTML = `
      <span class="quiz-icon">${quiz.icon}</span>
      <span class="quiz-body">
        <span class="quiz-title">${quiz.title}</span>
        <span class="quiz-blurb">${quiz.blurb}</span>
        <span class="quiz-meta">${total} questions · ${quiz.sections.length} ${quiz.sectionWord.toLowerCase()}s${
          best != null ? ` · best ${best}/${total}` : ""}</span>
      </span>
      <span class="quiz-go">→</span>`;
    card.addEventListener("click", () => openQuiz(quiz));
    list.appendChild(card);
  });
  show("screen-home");
}

/* ---------------- setup: choose sections ---------------- */

function openQuiz(quiz) {
  state.quiz = quiz;
  state.selected = new Set(quiz.sections.map(s => s.id));
  $("setup-icon").textContent = quiz.icon;
  $("setup-title").textContent = quiz.title;
  $("setup-tagline").textContent = quiz.tagline;
  $("setup-blurb").textContent = quiz.blurb;
  $("setup-section-label").textContent = `Choose what to practise`;
  renderSections();
  show("screen-setup");
}

function renderSections() {
  const quiz = state.quiz;
  const list = $("section-list");
  list.innerHTML = "";
  quiz.sections.forEach(s => {
    const btn = document.createElement("button");
    btn.className = "part-item" + (state.selected.has(s.id) ? " on" : "");
    btn.innerHTML = `
      <span class="part-icon">${s.icon}</span>
      <span>
        <span class="part-name">${quiz.sectionWord} ${s.id}: ${s.title}</span><br>
        <span class="part-meta">${s.questions.length} questions${s.blurb ? ` · ${s.blurb}` : ""}</span>
      </span>
      <span class="part-check">✓</span>`;
    btn.addEventListener("click", () => {
      if (state.selected.has(s.id)) {
        if (state.selected.size === 1) return; // keep at least one
        state.selected.delete(s.id);
      } else {
        state.selected.add(s.id);
      }
      renderSections();
      updateStartBtn();
    });
    list.appendChild(btn);
  });
  updateStartBtn();
}

function updateStartBtn() {
  const n = selectedQuestions().length;
  const all = quizQuestions(state.quiz).length;
  $("start-btn").textContent = n === all
    ? `Start the quiz → ${all} questions`
    : `Start → ${n} question${n === 1 ? "" : "s"}`;
}

/* ---------------- quiz flow ---------------- */

function startQuiz(questions) {
  state.queue = questions;
  state.index = 0;
  state.results = {};
  show("screen-quiz");
  renderQuestion();
}

function renderQuestion() {
  const q = state.queue[state.index];
  state.attempts = 0;
  state.chosen = null;

  $("progress-count").textContent = `${state.index + 1} / ${state.queue.length}`;
  $("progress-fill").style.width = `${(state.index / state.queue.length) * 100}%`;

  $("q-part").textContent = `Question ${q.n} · ${q.sectionTitle}`;
  $("q-text").textContent = q.text;

  if (q.formula) {
    $("q-formula").innerHTML = `<b>Formula:</b> ${q.formula}`;
    $("q-formula").classList.remove("hidden");
  } else {
    $("q-formula").classList.add("hidden");
  }

  $("feedback").classList.add("hidden");
  $("next-btn").classList.add("hidden");
  $("check-btn").classList.remove("hidden");
  $("skip-btn").classList.remove("hidden");

  if (q.type === "choice") {
    $("answer-number").classList.add("hidden");
    $("answer-choice").classList.remove("hidden");
    const box = $("options");
    box.innerHTML = "";
    q.options.forEach((text, i) => {
      const b = document.createElement("button");
      b.className = "option";
      b.textContent = text;
      b.addEventListener("click", () => {
        if (b.disabled) return;
        state.chosen = i;
        [...box.children].forEach((c, j) => c.classList.toggle("on", j === i));
      });
      box.appendChild(b);
    });
  } else {
    $("answer-choice").classList.add("hidden");
    $("answer-number").classList.remove("hidden");
    const adorn = $("input-adorn");
    if (q.unit === "rupees") { adorn.textContent = "₹"; adorn.classList.remove("hidden"); }
    else if (q.unit === "percent") { adorn.textContent = "%"; adorn.classList.remove("hidden"); }
    else { adorn.classList.add("hidden"); }
    const input = $("answer-input");
    input.value = "";
    input.disabled = false;
    setTimeout(() => input.focus(), 30);
  }
}

function isCorrect(q) {
  if (q.type === "choice") return state.chosen === q.answer;
  const given = parseNumber($("answer-input").value);
  if (given === null) return null; // nothing typed
  return Math.abs(given - q.answer) <= toleranceFor(q);
}

function lockQuestion(q) {
  if (q.type === "choice") {
    [...$("options").children].forEach((c, i) => {
      c.disabled = true;
      c.classList.remove("on");
      if (i === q.answer) c.classList.add("right");
      else if (i === state.chosen) c.classList.add("wrong");
    });
  } else {
    $("answer-input").disabled = true;
  }
  $("check-btn").classList.add("hidden");
  $("skip-btn").classList.add("hidden");
  $("next-btn").classList.remove("hidden");
  $("next-btn").textContent = state.index === state.queue.length - 1
    ? "See my results →"
    : "Next question →";
}

function setFeedback(kind, head, body) {
  const fb = $("feedback");
  fb.className = `feedback ${kind}`;
  $("feedback-head").textContent = head;
  $("feedback-working").textContent = body;
}

function nudgeFor(q) {
  if (q.hint) return q.hint;
  if (q.formula) return `Try the formula: ${q.formula}`;
  return "Read the question once more and check each number.";
}

function checkAnswer() {
  const q = state.queue[state.index];
  const result = isCorrect(q);

  if (result === null) {
    setFeedback("no", "Type a number first", "Any number is fine — a guess still teaches you something.");
    $("feedback").classList.remove("hidden");
    return;
  }

  state.attempts++;

  if (result) {
    state.results[q.n] = state.attempts === 1 ? "clean" : "second";
    setFeedback("ok",
      state.attempts === 1 ? "Correct 🎉" : "Correct on the second go 👍",
      `${formatAnswer(q)} — ${workingText(q)}`);
    $("feedback").classList.remove("hidden");
    lockQuestion(q);
    return;
  }

  if (state.attempts === 1) {
    setFeedback("no", "Not quite — have another go", nudgeFor(q));
    $("feedback").classList.remove("hidden");
    if (q.type !== "choice") { $("answer-input").select(); $("answer-input").focus(); }
    return;
  }

  reveal(q);
}

function reveal(q) {
  state.results[q.n] = "missed";
  setFeedback("no", `The answer is ${formatAnswer(q)}`, workingText(q));
  $("feedback").classList.remove("hidden");
  lockQuestion(q);
}

function showMeHow() { reveal(state.queue[state.index]); }

function nextQuestion() {
  if (state.index === state.queue.length - 1) return finish();
  state.index++;
  renderQuestion();
}

/* ---------------- results ---------------- */

function finish() {
  const quiz = state.quiz;
  const total = state.queue.length;
  const correct = state.queue.filter(q => ["clean", "second"].includes(state.results[q.n])).length;
  const clean = state.queue.filter(q => state.results[q.n] === "clean").length;

  $("results-quiz-name").textContent = quiz.title;
  $("score-num").textContent = correct;
  $("score-of").textContent = `/ ${total}`;

  const pct = correct / total;
  $("score-emoji").textContent = pct === 1 ? "🏆" : pct >= 0.75 ? "🎉" : pct >= 0.5 ? "👍" : "🌱";
  $("score-line").textContent = pct === 1
    ? "Every one right. Your numbers are in safe hands."
    : pct >= 0.75
      ? `${clean} of those came first time. Strong work — look at the few below and you're there.`
      : pct >= 0.5
        ? "Solid start. The ones below are worth a second pass — they get easier fast."
        : "This is exactly what practice is for. Work through the notes below, then run it again.";

  // per-section breakdown
  const bd = $("breakdown");
  bd.innerHTML = "";
  $("breakdown-label").textContent = `How each ${quiz.sectionWord.toLowerCase()} went`;
  quiz.sections.forEach(s => {
    const qs = state.queue.filter(q => q.sectionId === s.id);
    if (!qs.length) return;
    const got = qs.filter(q => ["clean", "second"].includes(state.results[q.n])).length;
    const row = document.createElement("div");
    row.className = "bd-row";
    row.innerHTML = `
      <span class="part-icon">${s.icon}</span>
      <span class="bd-name">${s.title}</span>
      <span class="bd-bar"><i style="width:${(got / qs.length) * 100}%"></i></span>
      <span class="bd-score">${got}/${qs.length}</span>`;
    bd.appendChild(row);
  });

  // review anything not answered correctly first time
  const shaky = state.queue.filter(q => state.results[q.n] !== "clean");
  state.shaky = shaky;
  const block = $("review-block");
  const list = $("review-list");
  list.innerHTML = "";
  if (shaky.length === 0) {
    block.classList.add("hidden");
  } else {
    block.classList.remove("hidden");
    shaky.forEach(q => {
      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = `
        <p class="review-q"><span class="review-num">Q${q.n}.</span> ${q.text}</p>
        <p class="review-work"><strong>${formatAnswer(q)}</strong> — ${workingText(q)}</p>`;
      list.appendChild(item);
    });
  }
  $("retry-missed-btn").classList.toggle("hidden", shaky.length === 0);

  // best score, only for a full run of the quiz
  if (total === quizQuestions(quiz).length) {
    const saved = load();
    const best = saved.best || {};
    if (best[quiz.id] == null || correct > best[quiz.id]) {
      best[quiz.id] = correct;
      save({ ...saved, best });
    }
  }

  show("screen-results");
}

/* ---------------- wiring ---------------- */

$("start-btn").addEventListener("click", () => startQuiz(selectedQuestions()));
$("check-btn").addEventListener("click", checkAnswer);
$("next-btn").addEventListener("click", nextQuestion);
$("skip-btn").addEventListener("click", showMeHow);
$("setup-back-btn").addEventListener("click", renderHome);
$("quit-btn").addEventListener("click", () => show("screen-setup"));
$("again-btn").addEventListener("click", () => show("screen-setup"));
$("home-btn").addEventListener("click", renderHome);
$("retry-missed-btn").addEventListener("click", () => startQuiz(state.shaky.map(q => ({ ...q }))));

$("answer-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation(); // don't let the document handler skip straight to the next question
    checkAnswer();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && $("screen-quiz").classList.contains("active")
      && !$("next-btn").classList.contains("hidden")) {
    e.preventDefault();
    nextQuestion();
  }
});

renderHome();
