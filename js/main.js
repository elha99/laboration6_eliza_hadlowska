"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Eliza Hadlowska
 */

const form = document.querySelector("#searchform");
const error = document.querySelector("#error");
const searchInput = document.querySelector("#search");
const noRecipe = document.querySelector("#message")
const recipe = document.querySelector("#recipe")

form.addEventListener("submit", onSubmit)




function onSubmit(event) {
    event.preventDefault();

    loadRecipes(search);

/*     if (!displayErrors()) {
        searchRecipes();
        loadRecipes();
    }
 */

}

async function searchRecipes() {
    const search = searchInput.value.trim();
    
    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${search}`);
        if (!response.ok) {
            throw new Error("Kunde inte hämta resultatet");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error)
        return [];
    }
}

async function loadRecipes() {
    const data = await searchRecipes();
    recipe.innerHTML = "";

    data.recipes.forEach(recipeItem => {
        const article = document.createElement('article');
        article.innerHTML = `
                    <h3>${recipeItem.name}</h3>

                    <img src="${recipeItem.image}" alt="...">

                    <div class="recipe-info">
                        <p><strong>Servings:</strong>${recipeItem.servings}</p>
                        <p><strong>Prep time:</strong>${recipeItem.prepTimeMinutes}</p>
                        <p><strong>Cooking time:</strong>${recipeItem.cookTimeMinutes}</p>
                        <p><strong>Difficulty:</strong>${recipeItem.difficulty}</p>
                    </div>

                    <h4>${recipeItem.ingredients}</h4>
                    <ul>
                        ${recipeItem.ingredients    
                        .map((ingredient) => `<li>${ingredient}</li>`)
                        .join("")}
                    </ul>

                    <h4>${recipeItem.instructions}</h4>
                    <ol>
                        <li>First step.</li>
                        <li>Second step.</li>
                    </ol>`

            recipe.appendChild(article);
    });
}


function displayErrors() {

    error.textContent = "";

    let validate = true;

    if (search === "") {
        error.textContent = "Du måste ange ett sökord";
        validate = false;

    return validate;
}};