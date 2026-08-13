#!/usr/bin/env node
/* Regenerates quiz-concepts.js from data/concepts.json.
   Run from the project root:  node tools/build-concepts.js
   Edit the JSON, not the generated file. */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = JSON.parse(fs.readFileSync(path.join(root, "data/concepts.json"), "utf8"));

const TOPIC_META = {
  "Unit Economics & Delegation":        { icon: "🧠", blurb: "Why the numbers per unit come first." },
  "Financial Metrics Framework":        { icon: "📊", blurb: "Revenue, gross margin, EBITDA and what sits between them." },
  "Food Cost Fundamentals":             { icon: "🥘", blurb: "What food cost is, and what moves it." },
  "Menu Pricing Strategy":              { icon: "🏷️", blurb: "Setting a price that covers more than the recipe." },
  "Building & Using the Calculator":    { icon: "🧮", blurb: "Getting your own costs into a sheet that works." },
  "Daily & Weekly Monitoring":          { icon: "📆", blurb: "The habits that catch a problem in week one." },
  "The Operating Cycle & Key Formulas": { icon: "🔁", blurb: "How stock, sales and cash move round." },
  "Special Topics: Inventory & GST":    { icon: "📦", blurb: "Inventory valuation and the tax on top." }
};

// Keep the correct option off a fixed position — the source has it second in 28 of 36.
function rotate(options, correctIndex, id) {
  const k = (id % (options.length - 1)) + 1;
  return {
    options: options.slice(k).concat(options.slice(0, k)),
    answer: (correctIndex - k + options.length) % options.length
  };
}

const sections = src.topics.map((topic, i) => {
  const meta = TOPIC_META[topic];
  if (!meta) throw new Error(`no icon/blurb for topic "${topic}" — add one to TOPIC_META`);

  const questions = src.questions.filter(q => q.topic === topic).map(q => {
    if (!Array.isArray(q.options) || q.options.length < 2) throw new Error(`Q${q.id}: needs at least two options`);
    const correctIndex = q.options.indexOf(q.correct_answer);
    if (correctIndex === -1) throw new Error(`Q${q.id}: correct_answer is not one of the options`);
    if (!q.explanation) throw new Error(`Q${q.id}: no explanation`);

    const out = {
      n: q.id,
      text: q.question,
      type: "choice",
      working: q.explanation
    };

    if (q.type === "true_false") {
      // True/False reads in that order — leave it alone, here and at runtime
      out.options = q.options;
      out.answer = correctIndex;
      out.fixedOrder = true;
      out.tag = "True or false";
    } else {
      const r = rotate(q.options, correctIndex, q.id);
      out.options = r.options;
      out.answer = r.answer;
    }
    return out;
  });

  if (!questions.length) throw new Error(`topic "${topic}" has no questions`);
  return { id: i + 1, title: topic, blurb: meta.blurb, icon: meta.icon, questions };
});

const placed = sections.reduce((n, s) => n + s.questions.length, 0);
if (placed !== src.questions.length) {
  const known = new Set(src.topics);
  const strays = [...new Set(src.questions.filter(q => !known.has(q.topic)).map(q => q.topic))];
  throw new Error(`${src.questions.length - placed} question(s) have a topic not listed in "topics": ${strays.join(", ")}`);
}
if (src.question_count && src.question_count !== placed) {
  console.warn(`warning: question_count says ${src.question_count}, found ${placed}`);
}

const quiz = {
  id: "concepts",
  title: "Food Cost Concepts",
  tagline: "Revision quiz",
  blurb: src.description,
  icon: "📚",
  sectionWord: "Topic",
  sections
};

const out = `/* Quiz 3 — GENERATED FILE. Do not edit by hand.
   Source: data/concepts.json (${src.source})
   Rebuild: node tools/build-concepts.js */

const QUIZ_CONCEPTS = ${JSON.stringify(quiz, null, 2)};
`;

fs.writeFileSync(path.join(root, "quiz-concepts.js"), out);
console.log(`wrote quiz-concepts.js — ${sections.length} topics, ${placed} questions`);
