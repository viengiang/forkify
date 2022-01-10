import View from './View.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for you query! Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data.map(this._generatePreviewResult).join('');
  }

  _generatePreviewResult(recipe) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new ResultsView();
