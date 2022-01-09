import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function (id) {
  try {
    await model.loadRecipe(id);

    console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

controlRecipe('5ed6604591c37cdc054bc886');
