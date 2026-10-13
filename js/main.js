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

async function onSubmit(event) {
    event.preventDefault();
    
    error.textContent = "";
    const search = searchInput.value.trim();

/*     const data = await loadRecipes(searchInput); */

    if (search === "") {
        displayError(search);
    } else {
        loadRecipes(search);
    }

    
} 

async function searchRecipes(searchText) {
/*     if (!search) return []; */

    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchText}`);
        if (!response.ok) {
            throw new Error("Kunde inte hämta recepten. Försök igen senare");
        }
        const data = await response.json();
        return data.recipes || [];
    } catch (error) {
        console.error("Error: ", error)
        return [];
    }
}

async function loadRecipes(search) {
    const data = await searchRecipes(search);
    
    if (data && data.length > 0) { 
        const firstRecipe = data[0]; 
        console.log("Här är det första receptet:", firstRecipe); 
        return firstRecipe; 
    } else { 
        console.log("Inga sökresultat hittade, prova med annan fras"); 
    }    

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
                        ${recipeItem.instructions
                        .map((instructions) => `<li>${instructions}</li>`)
                        .join("")}
                    </ol> ` 

            recipe.appendChild(article);
    });
}

function displayError(search) {
    error.textContent = "";

    let validate = true;

    if (search === "") {
        error.textContent = "Du måste ange ett sökord";
        validate = false;

    return validate;
}};
