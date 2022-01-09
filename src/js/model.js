import { getRecipe } from './helpers.js';
import { API_URL } from './config.js';
export const state = {
  recipe: {},
};

const createRecipe = function (data) {
  let { recipe } = data.data;
  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await getRecipe(`${API_URL}${id}`);
    state.recipe = createRecipe(data);
  } catch (err) {
    throw err;
  }
};
