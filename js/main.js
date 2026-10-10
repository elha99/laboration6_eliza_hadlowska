"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Eliza Hadlowska
 */

const form = document.querySelector("#searchform");
const error = document.querySelector("#error");
const searchInput = document.querySelector("#search");

form.addEventListener("submit", onSubmit)

/* document.addEventListener("DOMContentLoaded", ()=> {
    searchRecipes();
/*     displayErrors();
}) */

function onSubmit(event) {
    event.preventDefault();

    displayErrors();

/*     if (!displayErrors) {
        searchRecipes();
    } */


}


async function searchRecipes() {
    try {
        const response = await fetch('https://dummyjson.com/recipes/search?q=SÖKFRAS');
        const data = await response.json();
        console.log(data)
    } catch (error) {
        console.error("Error: ", error)
    }

    console.log("Här fortsätter mitt program ...")
}

console.log(searchRecipes());

function displayErrors() {

    error.textContent = "";

    let validate = true;

    const search = searchInput.value.trim();

    if (search === "") {
        error.textContent = "Du måste ange ett sökord";
        validate = false;

    return validate;
}};