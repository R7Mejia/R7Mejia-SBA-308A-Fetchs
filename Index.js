const searchMenu = document.querySelector("#searching-menu");
searchMenu.style.backgroundColor = "lightgreen";

searchMenu.addEventListener("input", () => {
  const query = searchMenu.value;
  fetchData(query);
});

async function fetchData(query) {
  if (query) {
    const config = {
      method: "get",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
      params: {
        query,
        cuisine: "Hispanic",
        number: "10",
      },
      headers: {
        "X-RapidAPI-Key": "b94a23ccb4msh2d5b9f5673899b2p1edb79jsnc72dbb569f22",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios(config);
      const results = response.data.results;

      const resultsElement = document.querySelector("#results");

      for (const result of results) {
        const recipeElement = document.createElement("div");
        recipeElement.classList.add("recipe");

        const titleElement = document.createElement("h2");
        titleElement.textContent = result.title;

        const imageElement = document.createElement("img");
        imageElement.src = result.image;

        recipeElement.appendChild(titleElement);
        recipeElement.appendChild(imageElement);

        resultsElement.appendChild(recipeElement);
      }
    } catch (error) {
      console.error(error);
    }
  }
}

fetchData();
