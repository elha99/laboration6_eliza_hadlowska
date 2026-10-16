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

//Eventlyssnaren för sökfältet
function onSubmit(event) {
    event.preventDefault();

    //Rensa felmeddelanden
    error.textContent = "";

    //Läs in värdet som skrivs in i sökfältet
    const search = searchInput.value;

    //Om sökfältet är tomt ska felmeddelande visas annars ska den ladda in recept
    if (search === "") {
        recipe.innerHTML = "";
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
    //Rensa tidigare felmeddelanden och recept samt fånga upp nya fel/errors
    } catch (error) {
        recipe.innerHTML = "";
        errorMessage.textContent = "";
        console.error("Error: ", error)
        errorMessage.textContent = "Ett fel uppstod: ", error;
        return [];
    }
}

//Ladda in resultat på söksidan
async function loadRecipes(search) {

    //Avvakta svaret från inhämtning av API
    const data = await searchRecipes(search);
    
    //Hämta sektionen med receptet från HTML-filen
    const recipe = document.querySelector("#recipe");

    //Rensa tidigare recept och felmeddelanden
    recipe.innerHTML = "";
    errorMessage.textContent = "";

    //Visa endast det första receptet ifall det finns flera recept med samma sökord
    if (data.length > 0) { 
        const firstRecipe = data[0]; 
        console.log("Här är det första receptet:", firstRecipe);
        
        //Visa receptet med inhämtad information från API
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${firstRecipe.name}</h3>

            <img src="${firstRecipe.image}" alt="...">

            <div class="recipe-info">
                <p><strong>Servings:</strong>${firstRecipe.servings}</p>
                <p><strong>Prep time:</strong>${firstRecipe.prepTimeMinutes}</p>
                <p><strong>Cooking time:</strong>${firstRecipe.cookTimeMinutes}</p>
                <p><strong>Difficulty:</strong>${firstRecipe.difficulty}</p>
            </div>

            <h4>Ingredients</h4>
            <ul>
                ${firstRecipe.ingredients    
                .map((ingredient) => `<li>${ingredient}</li>`)
                .join("")}
            </ul>

            <h4>Instructions</h4>
            <ol>
                ${firstRecipe.instructions
                .map((instruction) => `<li>${instruction}</li>`)
                .join("")}
            </ol> ` 

            recipe.appendChild(article); 
    } else { 
        //Skriver ut meddelande till både konsol och användare ifall det inte finns sökresultat
        console.log("Inga sökresultat hittade, prova med annan sökfras");
        errorMessage.textContent = "Inga sökresultat hittade, prova med annan sökfras";
    }
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
