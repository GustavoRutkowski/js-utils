import UIComponent from '../UIComponent.js';

class Counter extends UIComponent {
    #decrementBtn;
    #incrementBtn;
    #counter = 0;

    constructor() {
        super();
        this.createElement();
    }

    #showCounter() {
        this.element.querySelector('span.count').textContent = this.#counter;
    }

    @Override
    createElement() {
        const counter = document.createElement('div');
        counter.classList.add('counter');

        this.#decrementBtn = document.createElement('button');
        this.#decrementBtn.classList.add('decrement-btn');

        this.#decrementBtn.addEventListener('click', () => {
            this.#counter--;
            this.#showCounter();
        });

        this.#incrementBtn = document.createElement('button');
        this.#incrementBtn.classList.add('increment-btn');

        this.#incrementBtn.addEventListener('click', () => {
            this.#counter++;
            this.#showCounter();
        });

        counter.appendChild(this.#decrementBtn);
        counter.innerHTML += `<span class="count">${this.#counter}</span>`;
        counter.appendChild(this.#incrementBtn);

        this.element = counter;
    }
}

const counter = new Counter();
document.body.appendChild(counter.getElement());
