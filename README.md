# Food Business Maths — Starter Quiz

A gentle, calculator-friendly practice quiz for food business owners who don't feel
confident with numbers. 28 questions across five parts, with worked explanations for
every answer.

**Live:** https://amelabrs.github.io/food-maths/

## Parts

1. **Everyday Sales Maths** — adding up what came in today
2. **Ingredient and Food-Cost Maths** — what the food itself costs you
3. **Wastage and Stock** — money that leaves without being sold
4. **Rent, Salaries, and Other Fixed Costs** — the bills that arrive whether you sell or not
5. **Pricing and Profit Thinking** — deciding what a price has to cover

## How it works

- Pick any combination of parts, or do all 28 questions.
- Type a rupee amount, a percentage, or a count — `₹`, `%` and commas are all ignored,
  so `2,100` and `2100` both work.
- Get it wrong and you get a second try with a nudge before the answer is shown.
- **Show me how** reveals the working whenever you're stuck.
- The results page breaks the score down by part and lists every question worth
  a second look, with its working. **Practise the ones I missed** re-runs just those.
- Percentage answers accept a small margin (Q22 is "about 23.3%").

## Running locally

No build step, no dependencies — plain HTML, CSS and JavaScript.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The three screens: start, quiz, results |
| `questions.js` | All 28 questions, answers, formulas and worked explanations |
| `app.js` | Quiz flow, answer checking, scoring |
| `style.css` | Styling |

To edit or add questions, only `questions.js` needs touching.
