/* Quiz 2 — GENERATED FILE. Do not edit by hand.
   Source: data/food-cost.json (Food_Cost_Calculator_Lecture_final.docx)
   Rebuild: node tools/build-food-cost.js */

const QUIZ_FOOD_COST = {
  "id": "foodcost",
  "title": "Food Cost Maths",
  "tagline": "Practice quiz",
  "blurb": "26 questions building from simple multiplication up to full food-cost and menu-pricing calculations, based on the Teapreneur food-cost-calculator lecture material.",
  "icon": "🧮",
  "sectionWord": "Level",
  "sections": [
    {
      "id": 1,
      "title": "Warm-up",
      "blurb": "Multiplying, and what a percentage really is.",
      "icon": "🌤️",
      "questions": [
        {
          "n": 1,
          "text": "Milk costs ₹0.048 per ml. A recipe uses 50 ml. What's 50 × 0.048?",
          "hint": "Multiply the two numbers. Line them up like: 50 × 0.048.",
          "type": "number",
          "unit": "rupees",
          "answer": 2.4,
          "tolerance": 0.05,
          "steps": [
            "50 × 0.048",
            "= 2.4"
          ]
        },
        {
          "n": 2,
          "text": "Ginger costs ₹0.15 per gram. A recipe uses 3 grams. What's 3 × 0.15?",
          "hint": "Multiply quantity by cost per gram.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.45,
          "tolerance": 0.05,
          "steps": [
            "3 × 0.15",
            "= 0.45"
          ]
        },
        {
          "n": 3,
          "text": "What is 20% of ₹300?",
          "hint": "20% means 20 out of 100. Try: 300 × 0.20",
          "type": "number",
          "unit": "rupees",
          "answer": 60,
          "tolerance": 0.05,
          "steps": [
            "300 × 0.20",
            "= 60"
          ]
        },
        {
          "n": 4,
          "text": "Write 30% as a decimal (e.g. 50% = 0.50).",
          "hint": "Move the decimal point two places left.",
          "type": "number",
          "unit": "plain",
          "answer": 0.3,
          "tolerance": 0.05,
          "steps": [
            "30 ÷ 100",
            "= 0.30"
          ]
        },
        {
          "n": 5,
          "text": "If your food cost is 30% of your menu price, what's your gross margin? (100% − 30%)",
          "hint": "Just subtract from 100.",
          "type": "number",
          "unit": "percent",
          "answer": 70,
          "tolerance": 0.05,
          "steps": [
            "100 − 30",
            "= 70"
          ]
        }
      ]
    },
    {
      "id": 2,
      "title": "Ingredient cost",
      "blurb": "Rate × quantity, one ingredient at a time.",
      "icon": "⚖️",
      "questions": [
        {
          "n": 6,
          "text": "Water costs ₹0.00175 per ml. A recipe uses 50 ml. What's the cost? (Round to 4 decimals)",
          "hint": "Cost = rate × quantity.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.0875,
          "tolerance": 0.001,
          "steps": [
            "50 × 0.00175",
            "= 0.0875"
          ]
        },
        {
          "n": 7,
          "text": "Tea powder costs ₹0.30 per gram. A recipe uses 3 grams. What's the cost?",
          "hint": "Cost = rate × quantity.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.9,
          "tolerance": 0.05,
          "steps": [
            "3 × 0.30",
            "= 0.90"
          ]
        },
        {
          "n": 8,
          "text": "Sugar costs ₹0.04 per gram. A recipe uses 6 grams. What's the cost?",
          "hint": "Cost = rate × quantity.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.24,
          "tolerance": 0.05,
          "steps": [
            "6 × 0.04",
            "= 0.24"
          ]
        },
        {
          "n": 9,
          "text": "Butter costs ₹450 per kg. A recipe uses 0.01 of a kg (10g). What's the cost?",
          "hint": "Cost = rate × quantity, even when the quantity is a fraction like 0.01.",
          "type": "number",
          "unit": "rupees",
          "answer": 4.5,
          "tolerance": 0.05,
          "steps": [
            "450 × 0.01",
            "= 4.50"
          ]
        },
        {
          "n": 10,
          "text": "Onion costs ₹40 per kg. One serving uses 0.02 of a kg (20g). What's the cost?",
          "hint": "Cost = rate × quantity.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.8,
          "tolerance": 0.05,
          "steps": [
            "40 × 0.02",
            "= 0.80"
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "Totals & wastage",
      "blurb": "Adding the parts up, then allowing for waste.",
      "icon": "➕",
      "questions": [
        {
          "n": 11,
          "text": "Add these three ingredient costs: ₹2.40 + ₹0.0875 + ₹0.90. What's the total?",
          "hint": "Line the numbers up by their decimal points and add.",
          "type": "number",
          "unit": "rupees",
          "answer": 3.3875,
          "tolerance": 0.01,
          "steps": [
            "2.40 + 0.0875 + 0.90",
            "= 3.3875"
          ]
        },
        {
          "n": 12,
          "text": "Add these two ingredient costs: ₹0.45 + ₹0.24. What's the total?",
          "hint": "Simple addition.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.69,
          "tolerance": 0.05,
          "steps": [
            "0.45 + 0.24",
            "= 0.69"
          ]
        },
        {
          "n": 13,
          "text": "Your main ingredients total ₹2.4875 and your extra ingredients total ₹0.69. What's the combined total?",
          "hint": "Add the two subtotals together.",
          "type": "number",
          "unit": "rupees",
          "answer": 3.1775,
          "tolerance": 0.01,
          "steps": [
            "2.4875 + 0.69",
            "= 3.1775"
          ]
        },
        {
          "n": 14,
          "text": "Wastage is 5% of ₹3.1775. What's the wastage amount? (Round to 2 decimals)",
          "hint": "Multiply by 0.05, then round to 2 decimals.",
          "type": "number",
          "unit": "rupees",
          "answer": 0.16,
          "tolerance": 0.005,
          "steps": [
            "3.1775 × 0.05",
            "= 0.159, rounds to 0.16"
          ]
        },
        {
          "n": 15,
          "text": "Your ingredients total ₹3.1775 and wastage adds ₹0.16. What's your total food cost?",
          "hint": "Add the two numbers.",
          "type": "number",
          "unit": "rupees",
          "answer": 3.3375,
          "tolerance": 0.01,
          "steps": [
            "3.1775 + 0.16",
            "= 3.3375"
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "Menu pricing",
      "blurb": "Turning a food cost into a menu price.",
      "icon": "🏷️",
      "questions": [
        {
          "n": 16,
          "text": "Your food cost is ₹3.3375. Your target food-cost % is 30%. What should you charge? (Menu price = food cost ÷ target %)",
          "hint": "Divide the food cost by 0.30.",
          "type": "number",
          "unit": "rupees",
          "answer": 11.13,
          "tolerance": 0.5,
          "steps": [
            "3.3375 ÷ 0.30",
            "= 11.13 (round to ₹11)"
          ]
        },
        {
          "n": 17,
          "text": "Same food cost, ₹3.3375, but this time your target is 40%. What should you charge?",
          "hint": "Divide the food cost by 0.40.",
          "type": "number",
          "unit": "rupees",
          "answer": 8.34,
          "tolerance": 0.5,
          "steps": [
            "3.3375 ÷ 0.40",
            "= 8.34 (round to ₹8)"
          ]
        },
        {
          "n": 18,
          "text": "If your food-cost target is 30%, what's your gross margin %?",
          "hint": "100% minus the food-cost %.",
          "type": "number",
          "unit": "percent",
          "answer": 70,
          "tolerance": 0.05,
          "steps": [
            "100 − 30",
            "= 70"
          ]
        },
        {
          "n": 19,
          "text": "If your food-cost target is 40%, what's your gross margin %?",
          "hint": "100% minus the food-cost %.",
          "type": "number",
          "unit": "percent",
          "answer": 60,
          "tolerance": 0.05,
          "steps": [
            "100 − 40",
            "= 60"
          ]
        },
        {
          "n": 20,
          "text": "A café made ₹5,00,000 revenue and ₹1,65,000 EBITDA. What % of revenue is that? (EBITDA ÷ revenue × 100)",
          "hint": "Divide EBITDA by revenue, then multiply by 100.",
          "type": "number",
          "unit": "percent",
          "answer": 33,
          "tolerance": 0.05,
          "steps": [
            "1,65,000 ÷ 5,00,000",
            "= 0.33, × 100 = 33%"
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "Stock & monitoring",
      "blurb": "Checking the real numbers against your target.",
      "icon": "📦",
      "questions": [
        {
          "n": 21,
          "text": "Opening stock ₹10,000. Purchases ₹25,000. Closing stock ₹8,000. What's your food consumed? (Opening + Purchases − Closing)",
          "hint": "Add the first two, then subtract the closing stock.",
          "type": "number",
          "unit": "rupees",
          "answer": 27000,
          "tolerance": 0.05,
          "steps": [
            "10,000 + 25,000 − 8,000",
            "= 27,000"
          ]
        },
        {
          "n": 22,
          "text": "Weekly sales are ₹70,000 and food consumed is ₹27,000. What's your food cost %? (Consumed ÷ sales × 100, round to 1 decimal)",
          "hint": "Divide consumed by sales, then multiply by 100.",
          "type": "number",
          "unit": "percent",
          "answer": 38.6,
          "tolerance": 0.2,
          "steps": [
            "27,000 ÷ 70,000",
            "= 0.386, × 100 = 38.6%"
          ]
        },
        {
          "n": 23,
          "text": "Your daily revenue is ₹10,000. What's your revenue over 7 days?",
          "hint": "Multiply by 7.",
          "type": "number",
          "unit": "rupees",
          "answer": 70000,
          "tolerance": 0.05,
          "steps": [
            "10,000 × 7",
            "= 70,000"
          ]
        },
        {
          "n": 24,
          "text": "Your target food cost % is 30% but your actual is 38.6%. By how many percentage points are you over target?",
          "hint": "Subtract the target from the actual.",
          "type": "number",
          "unit": "points",
          "answer": 8.6,
          "tolerance": 0.2,
          "steps": [
            "38.6 − 30",
            "= 8.6"
          ]
        }
      ]
    },
    {
      "id": 6,
      "title": "Full scenario",
      "blurb": "The whole calculation, start to finish.",
      "icon": "🧮",
      "questions": [
        {
          "n": 25,
          "text": "A snack costs ₹4 to make in total. Your target food cost is 25%. What should you charge?",
          "hint": "Menu price = food cost ÷ target %.",
          "type": "number",
          "unit": "rupees",
          "answer": 16,
          "tolerance": 0.05,
          "steps": [
            "4 ÷ 0.25",
            "= 16"
          ]
        },
        {
          "n": 26,
          "text": "Your rent is ₹45,000 and your monthly revenue is ₹3,00,000. What % of revenue does rent take up?",
          "hint": "Divide rent by revenue, then multiply by 100.",
          "type": "number",
          "unit": "percent",
          "answer": 15,
          "tolerance": 0.05,
          "steps": [
            "45,000 ÷ 3,00,000",
            "= 0.15, × 100 = 15%"
          ]
        }
      ]
    }
  ]
};
