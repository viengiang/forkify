import View from './View.js';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again ;)';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(preview => {
        const id = window.location.hash.slice(1);

        return `
        <li class="preview">
          <a class="preview__link ${
            id === preview.id ? 'preview__link--active' : ''
          }" href="#${preview.id}">
            <figure class="preview__fig">
              <img src="${preview.image}" alt="${preview.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${preview.title}</h4>
              <p class="preview__publisher">${preview.publisher}</p>
            </div>
          </a>
        </li>
      `;
      })
      .join('');
  }
}

export default new ResultsView();
