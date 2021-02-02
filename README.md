# VUE-TS-Calculator
A "simple" project that turned out to be a lot more in depth than I thought. This calculator mimics the functionality of the google search calculator.

# Technologies
- Vue.js 3
- TypeScript
- Tailwind CSS
- Jest (Unit Tests)

# Behind The Scenes
Parsing bedmas operations was the hardest part of this project. After the equation string is cleaned to a consistent format, the string is analyzed and turned into an array of Arrays. Each interior array represents the order of what needs to be calculated first in terms of bedmas. We take of advantage of resursive functions to go inside each array and equate them before equating the entire string together.

After bedmas, parsing the parenthesis was another difficult task that was made easy using recursion. Now, even brackets inside of brackets can be parsed into sub-arrays for preparation to equate using bedmas.