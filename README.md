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
