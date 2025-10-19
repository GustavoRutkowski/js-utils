import UIComponent from './UIComponent.js';

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

    #debounce(callbcakFn) {
        // Criar o timer que reseta o debounce de tempos em tempos.
        return callbcakFn;
    }

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

        search.addEventListener('input', this.#debounce(e => {
            // Chama a callback de busca
            this.#currentResult = this.#searchCallback(e.target.value);
        }));

        this.element = search;
    }
}

export default SearchInput;
