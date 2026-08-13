/* Quiz 1 — GENERATED FILE. Do not edit by hand.
   Sources: data/business-maths.json + data/business-extras.json
   Rebuild: node tools/build-business.js */

const QUIZ_BUSINESS = {
  "id": "business",
  "title": "Food Business Maths",
  "tagline": "Starter quiz",
  "blurb": "A beginner-friendly quiz to help food business owners practise essential sales, costing, stock, pricing, and profit calculations.",
  "icon": "🫖",
  "sectionWord": "Part",
  "sections": [
    {
      "id": 1,
      "title": "Everyday Sales Maths",
      "blurb": "Adding up what came in today.",
      "icon": "🧾",
      "questions": [
        {
          "n": 1,
          "text": "You sell 20 cups of tea at ₹20 each. What are your total sales?",
          "tag": "Sales",
          "working": "20 cups × ₹20 = ₹400.",
          "hint": "Number of cups × price per cup.",
          "type": "number",
          "unit": "rupees",
          "answer": 400
        },
        {
          "n": 2,
          "text": "You sell 35 sandwiches at ₹60 each. What are your total sales?",
          "tag": "Sales",
          "working": "35 × ₹60 = ₹2,100.",
          "hint": "Number of sandwiches × price each.",
          "type": "number",
          "unit": "rupees",
          "answer": 2100
        },
        {
          "n": 3,
          "text": "A customer buys 2 teas at ₹20 each and 1 snack at ₹50. What is their bill?",
          "tag": "Sales",
          "working": "(2 × ₹20) + ₹50 = ₹40 + ₹50 = ₹90.",
          "hint": "Work out the teas first, then add the snack.",
          "type": "number",
          "unit": "rupees",
          "answer": 90
        },
        {
          "n": 4,
          "text": "You earn ₹4,500 on Monday and ₹5,200 on Tuesday. What are your sales across both days?",
          "tag": "Sales",
          "working": "₹4,500 + ₹5,200 = ₹9,700.",
          "hint": "Add the two days together.",
          "type": "number",
          "unit": "rupees",
          "answer": 9700
        },
        {
          "n": 5,
          "text": "Your target for the day is ₹10,000. You have sold ₹7,400. How much more do you need to sell?",
          "tag": "Sales",
          "working": "₹10,000 − ₹7,400 = ₹2,600.",
          "hint": "Target minus what you have already sold.",
          "type": "number",
          "unit": "rupees",
          "answer": 2600
        },
        {
          "n": 6,
          "text": "You sell 80 cups of tea in a day. If each cup is ₹15, what are daily tea sales?",
          "tag": "Sales",
          "working": "80 × ₹15 = ₹1,200.",
          "hint": "Number of cups × price per cup.",
          "type": "number",
          "unit": "rupees",
          "answer": 1200
        }
      ]
    },
    {
      "id": 2,
      "title": "Ingredient and Food-Cost Maths",
      "blurb": "What the food itself costs you.",
      "icon": "🥪",
      "questions": [
        {
          "n": 7,
          "text": "One tea costs ₹7 in ingredients and sells for ₹20. How much money is left per tea before rent, salaries, and other expenses?",
          "tag": "Food cost",
          "working": "₹20 − ₹7 = ₹13 left per tea.",
          "hint": "Selling price minus ingredient cost.",
          "type": "number",
          "unit": "rupees",
          "answer": 13
        },
        {
          "n": 8,
          "text": "You sell 100 teas at ₹20 each. The ingredients for all 100 teas cost ₹700. What are your total sales?",
          "tag": "Food cost",
          "working": "100 × ₹20 = ₹2,000. The ₹700 is a cost, not a sale.",
          "hint": "Sales means what customers paid — the ₹700 is a cost, not a sale.",
          "type": "number",
          "unit": "rupees",
          "answer": 2000
        },
        {
          "n": 9,
          "text": "Using sales of ₹2,000 and ingredient costs of ₹700, what percentage of sales was spent on ingredients?",
          "tag": "Food cost",
          "working": "(₹700 ÷ ₹2,000) × 100 = 35%.",
          "formula": "(Ingredient cost ÷ Sales) × 100",
          "type": "number",
          "unit": "percent",
          "answer": 35
        },
        {
          "n": 10,
          "text": "You buy ingredients worth ₹3,000 and use ₹2,400 of them this week. How much ingredient stock remains?",
          "tag": "Stock",
          "working": "₹3,000 − ₹2,400 = ₹600 of stock left.",
          "hint": "What you bought minus what you used.",
          "type": "number",
          "unit": "rupees",
          "answer": 600
        },
        {
          "n": 11,
          "text": "A sandwich sells for ₹80. Its ingredients cost ₹28. How much money is left from one sandwich before other expenses?",
          "tag": "Food cost",
          "working": "₹80 − ₹28 = ₹52.",
          "hint": "Selling price minus ingredient cost.",
          "type": "number",
          "unit": "rupees",
          "answer": 52
        },
        {
          "n": 12,
          "text": "You sell 50 sandwiches. Each uses ingredients worth ₹28. What is the total ingredient cost?",
          "tag": "Food cost",
          "working": "50 × ₹28 = ₹1,400.",
          "hint": "Number of sandwiches × ingredients for one.",
          "type": "number",
          "unit": "rupees",
          "answer": 1400
        },
        {
          "n": 13,
          "text": "You sell 50 sandwiches at ₹80 each. What are total sales?",
          "tag": "Sales",
          "working": "50 × ₹80 = ₹4,000.",
          "hint": "Number of sandwiches × price each.",
          "type": "number",
          "unit": "rupees",
          "answer": 4000
        },
        {
          "n": 14,
          "text": "Ingredient cost is ₹1,400 and sales are ₹4,000. What is the food-cost percentage?",
          "tag": "Food cost",
          "working": "(₹1,400 ÷ ₹4,000) × 100 = 35%.",
          "formula": "(Ingredient cost ÷ Sales) × 100",
          "type": "number",
          "unit": "percent",
          "answer": 35
        }
      ]
    },
    {
      "id": 3,
      "title": "Wastage and Stock",
      "blurb": "Money that leaves without being sold.",
      "icon": "🗑️",
      "questions": [
        {
          "n": 15,
          "text": "You bought ₹5,000 of stock. ₹300 of it spoiled or was wasted. What percentage of the stock was wasted?",
          "tag": "Wastage",
          "working": "(₹300 ÷ ₹5,000) × 100 = 6%.",
          "formula": "(Wastage ÷ Stock purchased) × 100",
          "type": "number",
          "unit": "percent",
          "answer": 6
        },
        {
          "n": 16,
          "text": "You begin the month with stock worth ₹2,000. You purchase ₹8,000 more. At the end of the month, stock worth ₹1,500 remains. What was the value of stock consumed?",
          "tag": "Stock",
          "working": "₹2,000 + ₹8,000 − ₹1,500 = ₹8,500 consumed.",
          "formula": "Opening stock + Purchases − Closing stock",
          "type": "number",
          "unit": "rupees",
          "answer": 8500
        },
        {
          "n": 17,
          "text": "You make 40 cups of tea, but 3 are spilled or given away accidentally. How many cups can you still sell?",
          "tag": "Wastage",
          "working": "40 − 3 = 37 cups.",
          "hint": "Take the spilled cups off the total you made.",
          "type": "number",
          "unit": "count",
          "answer": 37,
          "suffix": "cups"
        },
        {
          "n": 18,
          "text": "You make 100 snack portions. Five are wasted. If each portion could have sold for ₹40, how much sales value was lost?",
          "tag": "Wastage",
          "working": "5 × ₹40 = ₹200 of sales value lost.",
          "hint": "How many were wasted × what each one would have sold for.",
          "type": "number",
          "unit": "rupees",
          "answer": 200
        }
      ]
    },
    {
      "id": 4,
      "title": "Rent, Salaries, and Other Fixed Costs",
      "blurb": "The bills that arrive whether you sell or not.",
      "icon": "🏪",
      "questions": [
        {
          "n": 19,
          "text": "Monthly rent is ₹30,000. What is the rent per day in a 30-day month?",
          "tag": "Fixed costs",
          "working": "₹30,000 ÷ 30 = ₹1,000 per day.",
          "hint": "Divide the month's rent by the number of days.",
          "type": "number",
          "unit": "rupees",
          "answer": 1000,
          "suffix": "per day"
        },
        {
          "n": 20,
          "text": "You have two staff members. Each earns ₹15,000 per month. What is the monthly salary cost?",
          "tag": "Fixed costs",
          "working": "2 × ₹15,000 = ₹30,000.",
          "hint": "One salary × the number of staff.",
          "type": "number",
          "unit": "rupees",
          "answer": 30000
        },
        {
          "n": 21,
          "text": "Rent is ₹30,000, salaries are ₹30,000, and utilities are ₹10,000 per month. What are total fixed costs?",
          "tag": "Fixed costs",
          "working": "₹30,000 + ₹30,000 + ₹10,000 = ₹70,000.",
          "hint": "Add all three monthly costs together.",
          "type": "number",
          "unit": "rupees",
          "answer": 70000
        },
        {
          "n": 22,
          "text": "Your monthly sales are ₹3,00,000. Your total fixed costs are ₹70,000. What percentage of sales do fixed costs represent?",
          "tag": "Fixed costs",
          "working": "(₹70,000 ÷ ₹3,00,000) × 100 = about 23.3%.",
          "formula": "(Fixed costs ÷ Sales) × 100",
          "type": "number",
          "unit": "percent",
          "answer": 23.33,
          "min": 23.2,
          "max": 23.4
        }
      ]
    },
    {
      "id": 5,
      "title": "Pricing and Profit Thinking",
      "blurb": "Deciding what a price has to cover.",
      "icon": "💭",
      "questions": [
        {
          "n": 23,
          "text": "A tea sells for ₹10 but costs ₹7 to make. Why might this be an unsafe price in a high-rent location?",
          "tag": "Pricing",
          "working": "₹10 − ₹7 = ₹3 per tea before rent, salaries and everything else. On a high rent, ₹3 a cup may never add up to enough.",
          "hint": "Work out what is left per tea, then ask whether that covers a big rent.",
          "type": "choice",
          "options": [
            "High-rent locations do not need profit.",
            "It leaves only ₹3 before rent, salaries, and other expenses.",
            "Tea cannot be sold in high-rent locations.",
            "The ingredient cost is higher than the selling price."
          ],
          "answer": 1
        },
        {
          "n": 24,
          "text": "A snack sells for ₹100 and costs ₹70 to make. A tea sells for ₹25 and costs ₹8 to make. Which item leaves more money per sale before other expenses?",
          "tag": "Pricing",
          "working": "Snack: ₹100 − ₹70 = ₹30. Tea: ₹25 − ₹8 = ₹17. The snack leaves more per sale — though you may sell far more teas.",
          "hint": "Work out what is left on each item, then compare.",
          "type": "choice",
          "options": [
            "The tea, because it leaves ₹17.",
            "Both leave the same amount.",
            "There is not enough information.",
            "The snack, because it leaves ₹30."
          ],
          "answer": 3
        },
        {
          "n": 25,
          "text": "You sell 60 teas at ₹25 and 30 snacks at ₹100. What are your total sales for the day?",
          "tag": "Sales",
          "working": "(60 × ₹25) + (30 × ₹100) = ₹1,500 + ₹3,000 = ₹4,500.",
          "hint": "Work out tea sales and snack sales separately, then add them.",
          "type": "number",
          "unit": "rupees",
          "answer": 4500
        },
        {
          "n": 26,
          "text": "For the same day: tea ingredients cost ₹8 each and snack ingredients cost ₹70 each. What is the total ingredient cost?",
          "tag": "Food cost",
          "working": "(60 × ₹8) + (30 × ₹70) = ₹480 + ₹2,100 = ₹2,580.",
          "hint": "Cost of the teas plus cost of the snacks.",
          "type": "number",
          "unit": "rupees",
          "answer": 2580
        },
        {
          "n": 27,
          "text": "Sales are ₹4,500 and ingredient costs are ₹2,580. How much remains after ingredient costs, before rent, salaries, wastage, commissions, and other expenses?",
          "tag": "Profit",
          "working": "₹4,500 − ₹2,580 = ₹1,920.",
          "hint": "Sales minus ingredient costs.",
          "type": "number",
          "unit": "rupees",
          "answer": 1920
        },
        {
          "n": 28,
          "text": "You want ₹12,000 in daily sales. If your average customer bill is ₹120, how many customer bills do you need in one day?",
          "tag": "Sales target",
          "working": "₹12,000 ÷ ₹120 = 100 customer bills.",
          "formula": "Sales target ÷ Average customer bill",
          "type": "number",
          "unit": "count",
          "answer": 100,
          "suffix": "customer bills"
        }
      ]
    }
  ]
};
