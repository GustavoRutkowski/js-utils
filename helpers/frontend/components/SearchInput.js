import UIComponent from './UIComponent.js';
import debounce from '../debounce.js';

class SearchInput extends UIComponent {
    #data;
    #placeholder;
    #customClass;
    #searchCallback;
    #currentResult;

    constructor({ placeholder, customClass, searchCallback = this.#searchByArray, data = [] }) {
        this.#data = data;
        this.#placeholder = placeholder;
        this.#customClass = customClass;
        this.#searchCallback = searchCallback;
    }

    getValue() { return this.element.value; }
    getCurrentResult() { return this.#currentResult; }

    // Função padrão de busca
    #searchByArray(value) {
        return this.#data.filter(e => e === value);
    }

    @Override
    createElement() {
        const search = document.createElement('input');
        search.type = 'search';
        search.placeholder = this.#placeholder || null;

        if (this.#customClass) search.classList.add(this.#customClass);

        search.addEventListener('input', debounce(e => {
            // Chama a callback de busca
            this.#currentResult = this.#searchCallback(e.target.value);
        }));

        this.element = search;
    }
}

export default SearchInput;
