# Food Maths — Practice Quizzes

Gentle, calculator-friendly maths practice for food business owners who don't feel
confident with numbers. Two quizzes, worked explanations for every answer.

**Live:** https://amelabrs.github.io/food-maths/

## The quizzes

**Food Business Maths — Starter Quiz** (28 questions, 5 parts)
Everyday shop numbers: sales, food cost, wastage and stock, rent and salaries,
pricing and profit thinking.

**Food Cost Maths — Practice Quiz** (26 questions, 6 levels)
Builds from simple multiplication up to full food-cost and menu-pricing
calculations: warm-up, ingredient cost, totals & wastage, menu pricing,
stock & monitoring, full scenario.

## How it works

- Pick a quiz, then pick any combination of its parts or levels.
- Type a rupee amount, a percentage or a count — `₹`, `%` and commas are ignored,
  so `2,100` and `2100` both work.
- Get it wrong and you get a second try with a hint before the answer is shown.
- **Show me how** reveals the working whenever you're stuck.
- Results break the score down by part, and list every question worth a second look
  with its working. **Practise the ones I missed** re-runs just those.
- Best score per quiz is remembered in the browser.

## Shuffling the numbers

**🎲 Shuffle the numbers** on the setup screen regenerates every figure in the quiz
each time you start, so the questions stay the same but the answers can't be
memorised. It is ordinary arithmetic in [variants.js](variants.js) — no AI, no
server, nothing fetched.

Each quiz has a *scenario generator* that picks one self-consistent set of numbers
per run, and a *recipe* per question that rebuilds the wording, the answer and the
working from it. Because every question draws on the same scenario, the ones that
share a story stay in step — a shuffled Part 5 still has Q27 subtracting Q26's
ingredient cost from Q25's sales.

The generators pick numbers that keep the maths teachable: ingredient costs are a
clean percentage of the selling price, rent divides evenly by 30, sales targets
divide exactly by the average bill, and the food-cost chain is built backwards from
the percentage so the shop is always over target, never under. A tie in "which item
leaves more?" is ruled out by resampling.

All 54 questions are templated. To add a recipe, give it `text`, `answer` and
`working` (a string, or an array of steps); anything it omits — unit, tag, hint —
is inherited from the original question.

## Editing the questions

The JSON files in `data/` are the source of truth. The `.js` quiz files are
generated — don't edit them by hand.

```bash
node tools/build-business.js    # data/business-maths.json + business-extras.json -> quiz-business.js
node tools/build-food-cost.js   # data/food-cost.json                             -> quiz-food-cost.js
```

Both scripts validate as they go: unknown units, an unplaced question, a
multiple-choice answer that isn't one of its options, or a missing explanation all
stop the build with a message.

| File | Purpose |
| --- | --- |
| `data/business-maths.json` | Quiz 1 questions, answers, options, formula hints |
| `data/business-extras.json` | Quiz 1 parts, hints and worked explanations |
| `data/food-cost.json` | Quiz 2 — questions, hints and solution steps in one file |
| `quiz-business.js`, `quiz-food-cost.js` | Generated quiz data |
| `questions.js` | The `QUIZZES` registry — add a quiz here to list it on the home screen |
| `variants.js` | Scenario generators and per-question recipes for number shuffling |
| `app.js` | Quiz engine: flow, answer checking, scoring |
| `index.html`, `style.css` | Screens and styling |

Answer checking supports a `tolerance` (a ± margin) or an explicit `acceptedRange`
with a `min` and `max`, both taken straight from the source JSON.

## Running locally

No build step for the site itself, no dependencies — plain HTML, CSS and JavaScript.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
