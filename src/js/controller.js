import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { UPLOAD_TIMEOUT } from './config.js';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import searchView from './views/searchView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
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
    const query = searchView.getQuery();
    if (!query) return;
    // 2) Load search results
    await model.loadSearchResults(query);
    // Render search results
    resultsView.render(model.getSearchResultsPage());
    // Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  // Render search results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render pagination buttons
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  // Update bookmark icon
  recipeView.update(model.state.recipe);
  // Update preview bookmark
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();
    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    // Render reipce
    recipeView.render(model.state.recipe);
    // Success message
    addRecipeView.renderMessage();
    // Render bookmarks view
    bookmarksView.render(model.state.bookmarks);
    //Change url hash
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Close form window
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, UPLOAD_TIMEOUT * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerLoaded(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlUpdateServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSubmit(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
