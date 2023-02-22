let cocktailName = document.getElementById("cocktail-name");
let cocktailIngredientsList = document.getElementById("ingredients-cocktail");
const cocktailContainer = document.querySelector(".cocktail-container");
let ingredient1 = "";
let ingredient2 = "";
let ingredient3 = "";

const fetchCocktail = () => {
  let url = `https://api.api-ninjas.com/v1/cocktail?ingredients=${ingredient1}`;
  if (ingredient2) {
    url += `,${ingredient2}`;
  }
  if (ingredient3) {
    url += `,${ingredient3}`;
  }

  fetch(url, {
    headers: { "X-Api-Key": "aXJ9lIAmt0zbmZLVIHPi5w==8w4ZS1jO9BVg9tYq" },
  })
    .then((response) => response.json())
    .then((data) => {
      let cocktailCards = "";
      data.forEach((cocktail) => {
        let cocktailName = cocktail.name;
        let cocktailIngredients = cocktail.ingredients;
        let instructions = cocktail.instructions;
        let card = `
        <div class="card">
          <div class="card-header">${cocktailName}</div>
          <div class="card-body">
            <ul>
              ${cocktailIngredients
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}
            </ul>
            <p class="card_instructions">
                ${instructions}
            </p>
          </div>
        </div>
        `;
        cocktailCards += card;
      });
      cocktailContainer.innerHTML = cocktailCards;
    })
    .catch((error) => console.error(error));
};
fetchCocktail();
