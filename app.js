/* Food Business Maths — Starter Quiz */

const $ = (id) => document.getElementById(id);
const STORE_KEY = "foodMaths.v1";

const state = {
  selectedParts: new Set(PARTS.map(p => p.id)),
  queue: [],        // questions for this run
  index: 0,
  attempts: 0,      // attempts on the current question
  results: {},      // question number -> "clean" | "second" | "missed"
  chosen: null      // selected option index for choice questions
};

/* ---------------- helpers ---------------- */

// Indian digit grouping: 1,20,000
function groupIndian(numStr) {
  const [whole, frac] = numStr.split(".");
  if (whole.length <= 3) return frac ? `${whole}.${frac}` : whole;
  const last3 = whole.slice(-3);
  const rest = whole.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  const out = `${rest},${last3}`;
  return frac ? `${out}.${frac}` : out;
}

function formatAnswer(q) {
  const v = q.answer;
  const num = groupIndian(String(Number.isInteger(v) ? v : v.toFixed(1)));
  if (q.unit === "rupees") return `₹${num}`;
  if (q.unit === "percent") return `${q.tolerance ? "about " : ""}${num}%`;
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

function allQuestions() {
  return PARTS.flatMap(p => p.questions.map(q => ({ ...q, partId: p.id, partTitle: p.title })));
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

/* ---------------- start screen ---------------- */

function renderParts() {
  const list = $("part-list");
  list.innerHTML = "";
  PARTS.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "part-item" + (state.selectedParts.has(p.id) ? " on" : "");
    btn.innerHTML = `
      <span class="part-icon">${p.icon}</span>
      <span>
        <span class="part-name">Part ${p.id}: ${p.title}</span><br>
        <span class="part-meta">${p.questions.length} questions · ${p.blurb}</span>
      </span>
      <span class="part-check">✓</span>`;
    btn.addEventListener("click", () => {
      if (state.selectedParts.has(p.id)) {
        if (state.selectedParts.size === 1) return; // keep at least one
        state.selectedParts.delete(p.id);
      } else {
        state.selectedParts.add(p.id);
      }
      renderParts();
      updateStartBtn();
    });
    list.appendChild(btn);
  });
}

function selectedQuestions() {
  return allQuestions().filter(q => state.selectedParts.has(q.partId));
}

function updateStartBtn() {
  const n = selectedQuestions().length;
  $("start-btn").textContent = n === 28
    ? "Start the quiz → 28 questions"
    : `Start → ${n} question${n === 1 ? "" : "s"}`;
}

function renderResumeNote() {
  const saved = load();
  const note = $("resume-note");
  if (saved.best != null && saved.bestOf) {
    note.textContent = `Your best so far: ${saved.best} out of ${saved.bestOf}.`;
    note.classList.remove("hidden");
  } else {
    note.classList.add("hidden");
  }
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

  $("q-part").textContent = `Question ${q.n} · ${q.partTitle}`;
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
  $("check-btn").textContent = "Check my answer";
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

function setFeedback(kind, head, working) {
  const fb = $("feedback");
  fb.className = `feedback ${kind}`;
  $("feedback-head").textContent = head;
  $("feedback-working").textContent = working;
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
      `${formatAnswer(q)} — ${q.working}`);
    $("feedback").classList.remove("hidden");
    lockQuestion(q);
    return;
  }

  if (state.attempts === 1) {
    setFeedback("no", "Not quite — have another go",
      q.formula ? `Try the formula: ${q.formula}` : "Read the question once more and check each number.");
    $("feedback").classList.remove("hidden");
    if (q.type !== "choice") { $("answer-input").select(); $("answer-input").focus(); }
    return;
  }

  state.results[q.n] = "missed";
  setFeedback("no", `The answer is ${formatAnswer(q)}`, q.working);
  $("feedback").classList.remove("hidden");
  lockQuestion(q);
}

function showMeHow() {
  const q = state.queue[state.index];
  state.results[q.n] = "missed";
  setFeedback("no", `The answer is ${formatAnswer(q)}`, q.working);
  $("feedback").classList.remove("hidden");
  lockQuestion(q);
}

function nextQuestion() {
  if (state.index === state.queue.length - 1) return finish();
  state.index++;
  renderQuestion();
}

/* ---------------- results ---------------- */

function finish() {
  const total = state.queue.length;
  const correct = state.queue.filter(q => state.results[q.n] === "clean" || state.results[q.n] === "second").length;
  const clean = state.queue.filter(q => state.results[q.n] === "clean").length;

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

  // per-part breakdown
  const bd = $("breakdown");
  bd.innerHTML = "";
  PARTS.forEach(p => {
    const qs = state.queue.filter(q => q.partId === p.id);
    if (!qs.length) return;
    const got = qs.filter(q => state.results[q.n] !== "missed" && state.results[q.n]).length;
    const row = document.createElement("div");
    row.className = "bd-row";
    row.innerHTML = `
      <span class="part-icon">${p.icon}</span>
      <span class="bd-name">${p.title}</span>
      <span class="bd-bar"><i style="width:${(got / qs.length) * 100}%"></i></span>
      <span class="bd-score">${got}/${qs.length}</span>`;
    bd.appendChild(row);
  });

  // review anything not answered correctly first time
  const shaky = state.queue.filter(q => state.results[q.n] !== "clean");
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
        <p class="review-work"><strong>${formatAnswer(q)}</strong> — ${q.working}</p>`;
      list.appendChild(item);
    });
  }
  $("retry-missed-btn").classList.toggle("hidden", shaky.length === 0);
  state.shaky = shaky;

  // best score, only for a full 28-question run
  if (total === 28) {
    const saved = load();
    if (saved.best == null || correct > saved.best) save({ ...saved, best: correct, bestOf: 28 });
  }

  show("screen-results");
}

/* ---------------- wiring ---------------- */

$("start-btn").addEventListener("click", () => startQuiz(selectedQuestions()));
$("check-btn").addEventListener("click", checkAnswer);
$("next-btn").addEventListener("click", nextQuestion);
$("skip-btn").addEventListener("click", showMeHow);
$("quit-btn").addEventListener("click", () => { renderResumeNote(); show("screen-start"); });
$("restart-btn").addEventListener("click", () => { renderResumeNote(); show("screen-start"); });
$("retry-missed-btn").addEventListener("click", () => startQuiz(state.shaky.map(q => ({ ...q }))));

$("answer-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation(); // don't let the document handler skip straight to the next question
    checkAnswer();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !$("next-btn").classList.contains("hidden") && $("screen-quiz").classList.contains("active")) {
    e.preventDefault();
    nextQuestion();
  }
});

renderParts();
updateStartBtn();
renderResumeNote();
