#!/usr/bin/env node
/* Regenerates quiz-business.js by merging:
     data/business-maths.json   — the questions, answers and options
     data/business-extras.json  — parts, hints and worked explanations
   Run from the project root:  node tools/build-business.js
   Edit the JSON files, not the generated file. */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), "utf8"));

const src = read("data/business-maths.json");
const extra = read("data/business-extras.json");

// answerUnit in the source -> how the engine formats and adorns the answer
const UNITS = {
  "INR": { unit: "rupees" },
  "INR per day": { unit: "rupees", suffix: "per day" },
  "percent": { unit: "percent" },
  "cups": { unit: "count", suffix: "cups" },
  "customer bills": { unit: "count", suffix: "customer bills" }
};

const byId = new Map(src.questions.map(q => [q.id, q]));

// Keep the correct option off the top of the list, deterministically.
function rotateOptions(q, correctIndex) {
  const k = (q.id % (q.options.length - 1)) + 1;
  const options = q.options.slice(k).concat(q.options.slice(0, k));
  return { options, answer: (correctIndex - k + q.options.length) % q.options.length };
}

function convert(id) {
  const q = byId.get(id);
  if (!q) throw new Error(`extras reference question ${id}, which is not in business-maths.json`);

  const working = extra.working[String(id)];
  if (!working) throw new Error(`Q${id}: no worked explanation in business-extras.json`);

  const out = {
    n: q.id,
    text: q.question,
    tag: extra.categoryLabels[q.category] || q.category,
    working
  };
  if (q.formulaHint) out.formula = q.formulaHint;
  const hint = extra.hints[String(id)];
  if (hint) out.hint = hint;

  if (q.type === "multiple_choice") {
    const correctIndex = q.options.indexOf(q.answer);
    if (correctIndex === -1) throw new Error(`Q${id}: answer is not one of the options`);
    const { options, answer } = rotateOptions(q, correctIndex);
    return { ...out, type: "choice", options, answer };
  }

  if (typeof q.answer !== "number") throw new Error(`Q${id}: numeric question needs a numeric answer`);
  const u = UNITS[q.answerUnit];
  if (!u) throw new Error(`Q${id}: unknown answerUnit ${JSON.stringify(q.answerUnit)}`);

  const numeric = { ...out, type: "number", unit: u.unit, answer: q.answer };
  if (u.suffix) numeric.suffix = u.suffix;
  if (q.acceptedRange) {
    numeric.min = q.acceptedRange.min;
    numeric.max = q.acceptedRange.max;
  }
  return numeric;
}

const sections = extra.sections.map(s => ({
  id: s.id,
  title: s.title,
  blurb: s.blurb,
  icon: s.icon,
  questions: s.questions.map(convert)
}));

const placed = sections.flatMap(s => s.questions.map(q => q.n));
const missing = src.questions.map(q => q.id).filter(id => !placed.includes(id));
if (missing.length) throw new Error(`questions not placed in any part: ${missing.join(", ")}`);
if (new Set(placed).size !== placed.length) throw new Error("a question is placed in two parts");

const quiz = {
  id: "business",
  title: "Food Business Maths",
  tagline: "Starter quiz",
  blurb: src.description,
  icon: "🫖",
  sectionWord: "Part",
  sections
};

const out = `/* Quiz 1 — GENERATED FILE. Do not edit by hand.
   Sources: data/business-maths.json + data/business-extras.json
   Rebuild: node tools/build-business.js */

const QUIZ_BUSINESS = ${JSON.stringify(quiz, null, 2)};
`;

fs.writeFileSync(path.join(root, "quiz-business.js"), out);
console.log(`wrote quiz-business.js — ${sections.length} parts, ${placed.length} questions`);
