async function fetchRecipes() {
    const response = await fetch("https://dummyjson.com/recipes?limit=50");
    const recipesObj = await response.json();
    return recipesObj.recipes;
}

// Fonction pour afficher les recettes dans le carrousel
async function displayRecipesInCarousel() {
    try {
        const recipes = await fetchRecipes();
        const carouselInner = document.getElementById("carouselInner");
        carouselInner.innerHTML = ""; // Effacer le contenu précédent

        recipes.forEach((recipe, index) => {
            const carouselItem = document.createElement("div");
            carouselItem.classList.add("carousel-item");
            if (index === 0) {
                carouselItem.classList.add("active");
            }

            const image = document.createElement("img");
            image.classList.add("d-block", "w-100");
            image.src = recipe.image;
            image.alt = recipe.name;

            const caption = document.createElement("div");
            caption.classList.add("carousel-caption", "d-none", "d-md-block");
            caption.innerHTML = `
                <h5>${recipe.name}</h5>
                <p>Numéro de recette : ${index + 1}</p>
            `;

            carouselItem.appendChild(image);
            carouselItem.appendChild(caption);
            carouselInner.appendChild(carouselItem);
        });
    } catch (error) {
        console.error("Error fetching or displaying recipes in carousel:", error);
    }
}

document.addEventListener("DOMContentLoaded", displayRecipesInCarousel);


async function displayRecipes() {
    try {
        const recipes = await fetchRecipes();
        let recipesHtml = ""; // Variable pour stocker le HTML des recettes
        for (const [index, recipe] of recipes.entries()) {
            // Créer un cadre pour chaque recette avec son image, nom et bouton pour les détails
            recipesHtml += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${recipe.image}" class="card-img-top" alt="${recipe.name}">
                        <div class="card-body">
                            <h5 class="card-title">${recipe.name}</h5>
                            <button onclick="showIngredients(${index})" class="btn btn-primary"  >Ingrédients</button>
                            <button onclick="showInstructions(${index})" class="btn btn-primary">Instructions</button>
                            <a href="https://dummyjson.com/recipes/${recipe.id}" class="btn btn-primary">Détails</a>
                            <div id="ingredients-${index}" style="display:none;">
                                <h6>Ingrédients:</h6>
                                <ul>
                                    ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                                </ul>
                            </div>
                            <div id="instructions-${index}" style="display:none;">
                                <h6>Instructions:</h6>
                                <ol>
                                    ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        // Insérer le HTML des recettes dans la section #recipesList
        document.querySelector("#recipesList").innerHTML = recipesHtml;

        // Appel de la fonction pour afficher les recettes dans le tableau
        displayRecipesInTable();
    } catch (error) {
        console.error("Error fetching or displaying recipes:", error);
    }
}

// Fonction pour afficher les ingrédients d'une recette
async function showIngredients(index) {
    try {
        const recipes = await fetchRecipes(); // Supposons que fetchRecipes() soit une fonction valide pour récupérer les recettes
        const recipe = recipes[index];
        let ingredientsHtml = "<h6>Ingrédients:</h6><ul>";
        for (const ingredient of recipe.ingredients) {
            ingredientsHtml += `<li>${ingredient}</li>`;
        }
        ingredientsHtml += "</ul>";
        const ingredientsDiv = document.getElementById(`ingredients-${index}`);
        if (ingredientsDiv) {
            ingredientsDiv.innerHTML = ingredientsHtml;
            ingredientsDiv.style.display = "block";
        }
    } catch (error) {
        console.error("Error displaying ingredients:", error);
    }
}

// Fonction pour afficher les instructions d'une recette
async function showInstructions(index) {
    try {
        const recipes = await fetchRecipes(); // Supposons que fetchRecipes() soit une fonction valide pour récupérer les recettes
        const recipe = recipes[index];
        let instructionsHtml = "<h6>Instructions:</h6><ol>";
        for (const instruction of recipe.instructions) {
            instructionsHtml += `<li>${instruction}</li>`;
        }
        instructionsHtml += "</ol>";
        const instructionsDiv = document.getElementById(`instructions-${index}`);
        if (instructionsDiv) {
            instructionsDiv.innerHTML = instructionsHtml;
            instructionsDiv.style.display = "block";
        }
    } catch (error) {
        console.error("Error displaying instructions:", error);
    }
}


// Fonction pour obtenir la classe CSS en fonction de la difficulté
function getDifficultyClass(difficulty) {
    switch (difficulty.toLowerCase()) {
        case "easy":
            return "text-success"; // Vert pour les recettes faciles
        case "medium":
            return "text-warning"; // Orange pour les recettes moyennes
        case "difficulty":
            return "text-danger"; // Rouge pour les recettes difficiles
        default:
            return ""; // Aucune classe par défaut
    }
}

// Appeler la fonction displayRecipes au chargement de la page
document.addEventListener("DOMContentLoaded", displayRecipes);
