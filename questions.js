/* Question bank for the Food Business Maths Starter Quiz.
   type: "number"  -> typed answer, checked against `answer` with `tolerance`
   type: "choice"  -> pick one of `options`, correct index in `answer`
   unit: "rupees" | "percent" | "count"
*/

const PARTS = [
  {
    id: 1,
    title: "Everyday Sales Maths",
    blurb: "Adding up what came in today.",
    icon: "🧾",
    questions: [
      {
        n: 1,
        text: "You sell 20 cups of tea at ₹20 each. What are your total sales?",
        type: "number", unit: "rupees", answer: 400,
        working: "20 cups × ₹20 = ₹400."
      },
      {
        n: 2,
        text: "You sell 35 sandwiches at ₹60 each. What are your total sales?",
        type: "number", unit: "rupees", answer: 2100,
        working: "35 × ₹60 = ₹2,100."
      },
      {
        n: 3,
        text: "A customer buys 2 teas at ₹20 each and 1 snack at ₹50. What is their bill?",
        type: "number", unit: "rupees", answer: 90,
        working: "(2 × ₹20) + ₹50 = ₹40 + ₹50 = ₹90."
      },
      {
        n: 4,
        text: "You earn ₹4,500 on Monday and ₹5,200 on Tuesday. What are your sales across both days?",
        type: "number", unit: "rupees", answer: 9700,
        working: "₹4,500 + ₹5,200 = ₹9,700."
      },
      {
        n: 5,
        text: "Your target for the day is ₹10,000. You have sold ₹7,400. How much more do you need to sell?",
        type: "number", unit: "rupees", answer: 2600,
        working: "₹10,000 − ₹7,400 = ₹2,600."
      },
      {
        n: 6,
        text: "You sell 80 cups of tea in a day. If each cup is ₹15, what are daily tea sales?",
        type: "number", unit: "rupees", answer: 1200,
        working: "80 × ₹15 = ₹1,200."
      }
    ]
  },
  {
    id: 2,
    title: "Ingredient and Food-Cost Maths",
    blurb: "What the food itself costs you.",
    icon: "🥪",
    questions: [
      {
        n: 7,
        text: "One tea costs ₹7 in ingredients and sells for ₹20. How much money is left per tea before rent, salaries, and other expenses?",
        type: "number", unit: "rupees", answer: 13,
        working: "₹20 − ₹7 = ₹13 left per tea."
      },
      {
        n: 8,
        text: "You sell 100 teas at ₹20 each. The ingredients for all 100 teas cost ₹700. What are your total sales?",
        type: "number", unit: "rupees", answer: 2000,
        working: "100 × ₹20 = ₹2,000. (The ₹700 is a cost, not a sale.)"
      },
      {
        n: 9,
        text: "Using Question 8, what percentage of sales was spent on ingredients?",
        formula: "(ingredient cost ÷ sales) × 100",
        type: "number", unit: "percent", answer: 35,
        working: "(₹700 ÷ ₹2,000) × 100 = 35%."
      },
      {
        n: 10,
        text: "You buy ingredients worth ₹3,000 and use ₹2,400 of them this week. How much ingredient stock remains?",
        type: "number", unit: "rupees", answer: 600,
        working: "₹3,000 − ₹2,400 = ₹600 of stock left."
      },
      {
        n: 11,
        text: "A sandwich sells for ₹80. Its ingredients cost ₹28. How much money is left from one sandwich before other expenses?",
        type: "number", unit: "rupees", answer: 52,
        working: "₹80 − ₹28 = ₹52."
      },
      {
        n: 12,
        text: "You sell 50 sandwiches. Each uses ingredients worth ₹28. What is the total ingredient cost?",
        type: "number", unit: "rupees", answer: 1400,
        working: "50 × ₹28 = ₹1,400."
      },
      {
        n: 13,
        text: "You sell those 50 sandwiches at ₹80 each. What are total sales?",
        type: "number", unit: "rupees", answer: 4000,
        working: "50 × ₹80 = ₹4,000."
      },
      {
        n: 14,
        text: "Using Questions 12 and 13, what is the food-cost percentage?",
        formula: "(ingredient cost ÷ sales) × 100",
        type: "number", unit: "percent", answer: 35,
        working: "(₹1,400 ÷ ₹4,000) × 100 = 35%."
      }
    ]
  },
  {
    id: 3,
    title: "Wastage and Stock",
    blurb: "Money that leaves without being sold.",
    icon: "🗑️",
    questions: [
      {
        n: 15,
        text: "You bought ₹5,000 of stock. ₹300 of it spoiled or was wasted. What percentage of the stock was wasted?",
        formula: "(wastage ÷ stock purchased) × 100",
        type: "number", unit: "percent", answer: 6,
        working: "(₹300 ÷ ₹5,000) × 100 = 6%."
      },
      {
        n: 16,
        text: "You begin the month with stock worth ₹2,000. You purchase ₹8,000 more. At the end of the month, stock worth ₹1,500 remains. What was the value of stock consumed?",
        formula: "opening stock + purchases − closing stock",
        type: "number", unit: "rupees", answer: 8500,
        working: "₹2,000 + ₹8,000 − ₹1,500 = ₹8,500 consumed."
      },
      {
        n: 17,
        text: "You make 40 cups of tea, but 3 are spilled or given away accidentally. How many cups can you still sell?",
        type: "number", unit: "count", answer: 37,
        working: "40 − 3 = 37 cups."
      },
      {
        n: 18,
        text: "You make 100 snack portions. Five are wasted. If each portion could have sold for ₹40, how much sales value was lost?",
        type: "number", unit: "rupees", answer: 200,
        working: "5 × ₹40 = ₹200 of sales value lost."
      }
    ]
  },
  {
    id: 4,
    title: "Rent, Salaries, and Other Fixed Costs",
    blurb: "The bills that arrive whether you sell or not.",
    icon: "🏪",
    questions: [
      {
        n: 19,
        text: "Monthly rent is ₹30,000. What is the rent per day in a 30-day month?",
        type: "number", unit: "rupees", answer: 1000,
        working: "₹30,000 ÷ 30 = ₹1,000 per day."
      },
      {
        n: 20,
        text: "You have two staff members. Each earns ₹15,000 per month. What is the monthly salary cost?",
        type: "number", unit: "rupees", answer: 30000,
        working: "2 × ₹15,000 = ₹30,000."
      },
      {
        n: 21,
        text: "Rent is ₹30,000, salaries are ₹30,000, and utilities are ₹10,000 per month. What are total fixed costs?",
        type: "number", unit: "rupees", answer: 70000,
        working: "₹30,000 + ₹30,000 + ₹10,000 = ₹70,000."
      },
      {
        n: 22,
        text: "Your monthly sales are ₹3,00,000. Your total fixed costs are ₹70,000. What percentage of sales do fixed costs represent?",
        formula: "(fixed costs ÷ sales) × 100",
        type: "number", unit: "percent", answer: 23.3, tolerance: 0.35,
        working: "(₹70,000 ÷ ₹3,00,000) × 100 = about 23.3%."
      }
    ]
  },
  {
    id: 5,
    title: "Pricing and Profit Thinking",
    blurb: "Deciding what a price has to cover.",
    icon: "💭",
    questions: [
      {
        n: 23,
        text: "A tea sells for ₹10 in a low-rent lane, but your high-street location has much higher rent. If the tea costs ₹7 to make, why might ₹10 be an unsafe selling price?",
        type: "choice",
        options: [
          "It leaves only ₹3 per tea, which may not cover high rent, salaries, and other costs.",
          "Because ₹10 is always too cheap for tea, whatever the location.",
          "Because ingredients always cost more on a high street.",
          "It is safe — sales will simply be higher on a high street."
        ],
        answer: 0,
        working: "₹10 − ₹7 = ₹3 per tea before rent, salaries, and everything else. On a high rent, ₹3 a cup may never add up to enough."
      },
      {
        n: 24,
        text: "A snack sells for ₹100 and costs ₹70 to make. A tea sells for ₹25 and costs ₹8 to make. Which item leaves more money per sale before other expenses?",
        type: "choice",
        options: [
          "The snack — ₹30 left, versus ₹17 for the tea.",
          "The tea — ₹17 left, versus ₹30 for the snack.",
          "They leave the same amount.",
          "The tea, because its ingredients are cheaper."
        ],
        answer: 0,
        working: "Snack: ₹100 − ₹70 = ₹30. Tea: ₹25 − ₹8 = ₹17. The snack leaves more per sale — though you may sell far more teas."
      },
      {
        n: 25,
        text: "You sell 60 teas at ₹25 and 30 snacks at ₹100. What are your total sales for the day?",
        type: "number", unit: "rupees", answer: 4500,
        working: "(60 × ₹25) + (30 × ₹100) = ₹1,500 + ₹3,000 = ₹4,500."
      },
      {
        n: 26,
        text: "Using Question 25: tea ingredients cost ₹8 each and snack ingredients cost ₹70 each. What is the total ingredient cost for the day?",
        type: "number", unit: "rupees", answer: 2580,
        working: "(60 × ₹8) + (30 × ₹70) = ₹480 + ₹2,100 = ₹2,580."
      },
      {
        n: 27,
        text: "Using Questions 25 and 26, how much money remains after ingredient costs, before rent, salaries, wastage, delivery commissions, and other expenses?",
        type: "number", unit: "rupees", answer: 1920,
        working: "₹4,500 − ₹2,580 = ₹1,920."
      },
      {
        n: 28,
        text: "You want ₹12,000 in daily sales. If your average customer bill is ₹120, how many customer bills do you need in one day?",
        formula: "sales target ÷ average bill",
        type: "number", unit: "count", answer: 100,
        working: "₹12,000 ÷ ₹120 = 100 customer bills."
      }
    ]
  }
];
