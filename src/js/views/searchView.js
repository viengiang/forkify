class SearchView {
  _parent = document.querySelector('.search');
  _searchField = this._parent.querySelector('.search__field');

  getQuery() {
    const query = this._searchField.value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._searchField.value = '';
    this._searchField.blur();
  }

  addHandlerSearch(handler) {
    this._parent.addEventListener('submit', e => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
