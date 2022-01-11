import View from './View.js';

class SearchView extends View {
  _parentEl = document.querySelector('.search');
  _searchFieldEl = this._parentEl.querySelector('.search__field');

  getQuery() {
    const query = this._searchFieldEl.value;
    this._clear();
    return query;
  }

  _clear() {
    this._searchFieldEl.value = '';
    this._searchFieldEl.blur();
  }

  addHandlerSubmit(handler) {
    this._parentEl.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
