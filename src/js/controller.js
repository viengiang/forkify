import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    resultsView.update(model.getSearchResultsPage());
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlUpdateServings = function (newServings) {
  // Update servings number in model
  model.updateServings(newServings);

  // Re-render ingredients in view
  // This action will render all the recipe
  // recipeView.render(model.state.recipe);

  // Update only changes to view
  recipeView.update(model.state.recipe);
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search results
    await model.loadSearchResults(searchView.getQuery());
    // Render search results
    resultsView.render(model.getSearchResultsPage());
    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // Render search results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render pagination buttons
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  model.addBookmark(model.state.recipe);

  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSubmit(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
