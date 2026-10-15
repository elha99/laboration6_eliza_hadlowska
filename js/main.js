"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Eliza Hadlowska
 */

const form = document.querySelector("#searchform");
const error = document.querySelector("#error");
const searchInput = document.querySelector("#search");
const errorMessage = document.querySelector("#message")


form.addEventListener("submit", onSubmit)

function onSubmit(event) {
    event.preventDefault();

    error.textContent = "";
    const search = searchInput.value;

    if (search === "") {
        displayError(search);
    } else {
        loadRecipes(search);
    } 
} 

//Hämta data från API
async function searchRecipes(search) {

    try {
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${search}`);
        //Kontrollera söksvaret
        if (!response.ok) {
            throw new Error("Kunde inte hämta recepten. Försök igen senare");
        }
        //Läs JSON-data
        const data = await response.json();
        return data.recipes || [];
        //Fånga upp fel/errors
    } catch (error) {
        console.error("Error: ", error)
        return [];
    }
}

//Ladda in resultat på söksidan
async function loadRecipes(search) {

    //Avvakta svaret från inhämtning av API
    const data = await searchRecipes(search);
    
    //Hämta sektionen med receptet från HTML-filen
    const recipe = document.querySelector("#recipe");

    //Visa endast det första receptet
    if (data.length > 0) { 
        const firstRecipe = data[0]; 
        console.log("Här är det första receptet:", firstRecipe); 
        return firstRecipe; 
    } else { 
        console.log("Inga sökresultat hittade, prova med annan sökfras"); 
    }

    recipe.innerHTML = "";
    
    //Visa endast efterfrågat resultat
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
                        .map((instruction) => `<li>${instruction}</li>`)
                        .join("")}
                    </ol> ` 

            recipe.appendChild(article);
    });   
}

//Funktion som visar felmeddelande
function displayError(search) {
    
    //Tömma fältet
    error.textContent = "";

    let validate = true;

    //Ifall sökfältet är tomt, visa ett meddelande
    if (search === "") {
        error.textContent = "Du måste ange ett sökord";
        validate = false;

    return validate;
}};
