import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  _generateBtnNext(curPage) {
    return `
      <button class="btn--inline pagination__btn--next" data-goto="${
        curPage + 1
      }">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateBtnPrev(curPage) {
    return `
      <button class="btn--inline pagination__btn--prev" data-goto="${
        curPage - 1
      }">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and other pages
    if (curPage === 1 && numPage > 1) {
      return this._generateBtnNext(curPage);
    }
    // Last page
    if (curPage === numPage && numPage > 1) {
      return this._generateBtnPrev(curPage);
    }
    // Other pages
    if (curPage < numPage) {
      return `${this._generateBtnPrev(curPage)}${this._generateBtnNext(
        curPage
      )}`;
    }
    // Page 1 and no other pages
    return '';
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
}

export default new PaginationView();
