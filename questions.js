/* Quiz registry. Add a quiz here to make it appear on the start screen.
   Each quiz: { id, title, tagline, blurb, icon, sectionWord, sections[] }
   Each section: { id, title, blurb, icon, questions[] }
   Each question: { n, text, type, unit, answer, tolerance?, formula?, hint?,
                    working? | steps[], options? } */

const QUIZZES = [QUIZ_BUSINESS, QUIZ_FOOD_COST, QUIZ_CONCEPTS];
