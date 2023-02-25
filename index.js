let cocktailName = document.getElementById("cocktail-name");
let cocktailIngredientsList = document.getElementById("ingredients-cocktail");
let firstIngredient = document.getElementById("ingredient1");
let secondIngredient = document.getElementById("ingredient2");
let thirdIngredient = document.getElementById("ingredient3");
let cocktailContainer = document.querySelector(".cocktail-container");
let form = document.getElementById("form");
let reset = document.getElementById("reset");

let ingredient1 = "";
let ingredient2 = "";
let ingredient3 = "";

const fetchCocktail = (ingredient1, ingredient2, ingredient3) => {
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
          </div>
          <p class="card-instructions">
                ${instructions}
          </p>
        </div>
        `;
        cocktailCards += card;
      });
      if (cocktailCards === "") {
        cocktailContainer.innerHTML = "<h3>No cocktails found</h3>";
      } else {
        cocktailContainer.innerHTML = cocktailCards;
      }
    })
    .catch((error) => console.error(error));
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  ingredient1 = firstIngredient.value;
  ingredient2 = secondIngredient.value;
  ingredient3 = thirdIngredient.value;
  fetchCocktail(ingredient1, ingredient2, ingredient3);
});

const clearCocktailContainer = () => {
  const cocktailContainer = document.querySelector(".cocktail-container");
  cocktailContainer.innerHTML = `<h3 class="resetH3">Indicate between one and three ingredients and find out which cocktails you can make !</h3>`;
  firstIngredient.value = "";
  secondIngredient.value = "";
  thirdIngredient.value = "";
};

reset.addEventListener("click", () => {
  clearCocktailContainer();
});
