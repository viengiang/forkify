import icons from 'url:../../img/icons.svg';

class View {
  _data;

  _clear() {
    this._parentEl.innerHTML = '';
  }

  /**
   * Render the recived object to the DOM
   * @param {Object | Object[]} data The data to be render
   * @param {boolean} [render=false] If render=false return the string instead of rendering to the DOM
   * @returns {undefined | string} A markup string will return if render=true
   */

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    // if (!data || (Array.isArray(data) && data.length === 0))
    //   throw new Error('No data to render');
    this._data = data;
    const newMarkup = this._generateMarkup();
    /**
     * createRange(): return về 1 range object. Range object là đại diện cho 1 phần của document, nó chứa các nodes và các phần của các text nodes.
     *
     * createContextualFragment(): return về 1 DocumentFragment và nó chứa các nodes
     */
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // isEqualNode(): return về boolean đại diện cho 2 node có các properties giống nhau hay không.
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Ơ phía trên chỉ update textContent mà k update value của data-update-to attribute. Vì v ta cần update nó.
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const spinner = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', spinner);
  }
}

export default View;
