#!/usr/bin/env node
/* Regenerates quiz-food-cost.js from data/food-cost.json.
   Run from the project root:  node tools/build-food-cost.js
   Edit the JSON, not the generated file. */

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = JSON.parse(fs.readFileSync(path.join(root, "data/food-cost.json"), "utf8"));

const UNITS = { "₹": "rupees", "%": "percent", "points": "points", "": "plain" };

const LEVEL_META = {
  "Warm-up":            { icon: "🌤️", blurb: "Multiplying, and what a percentage really is." },
  "Ingredient cost":    { icon: "⚖️", blurb: "Rate × quantity, one ingredient at a time." },
  "Totals & wastage":   { icon: "➕", blurb: "Adding the parts up, then allowing for waste." },
  "Menu pricing":       { icon: "🏷️", blurb: "Turning a food cost into a menu price." },
  "Stock & monitoring": { icon: "📦", blurb: "Checking the real numbers against your target." },
  "Full scenario":      { icon: "🧮", blurb: "The whole calculation, start to finish." }
};

const sections = src.levels.map((level, i) => {
  const meta = LEVEL_META[level] || { icon: "🔢", blurb: "" };
  const questions = src.questions
    .filter(q => q.level === level)
    .map(q => {
      const unit = UNITS[q.unit];
      if (!unit) throw new Error(`Q${q.id}: unknown unit ${JSON.stringify(q.unit)}`);
      return {
        n: q.id,
        text: q.prompt,
        hint: q.hint,
        type: "number",
        unit,
        answer: q.answer,
        tolerance: q.tolerance,
        steps: q.solution_steps
      };
    });
  if (!questions.length) throw new Error(`level "${level}" has no questions`);
  return { id: i + 1, title: level, blurb: meta.blurb, icon: meta.icon, questions };
});

const covered = sections.reduce((n, s) => n + s.questions.length, 0);
if (covered !== src.questions.length) {
  throw new Error(`${src.questions.length - covered} question(s) have a level not listed in "levels"`);
}
if (src.question_count && src.question_count !== covered) {
  console.warn(`warning: question_count says ${src.question_count}, found ${covered}`);
}

const quiz = {
  id: "foodcost",
  title: "Food Cost Maths",
  tagline: "Practice quiz",
  blurb: src.description,
  icon: "🧮",
  sectionWord: "Level",
  sections
};

const out = `/* Quiz 2 — GENERATED FILE. Do not edit by hand.
   Source: data/food-cost.json (${src.source})
   Rebuild: node tools/build-food-cost.js */

const QUIZ_FOOD_COST = ${JSON.stringify(quiz, null, 2)};
`;

fs.writeFileSync(path.join(root, "quiz-food-cost.js"), out);
console.log(`wrote quiz-food-cost.js — ${sections.length} levels, ${covered} questions`);
