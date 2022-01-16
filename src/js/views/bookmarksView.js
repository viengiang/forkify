import View from './View.js';
import previewView from './previewView.js';

class BookmarkView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerLoaded(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(preview => previewView.render(preview, false))
      .join('');
  }
}

export default new BookmarkView();
