import UIComponent from './UIComponent.js';

class HamburguerMenu extends UIComponent {
    #target;
    #hiddenClass;

    static #ICON_CLOSE = '✕';
    static #ICON_OPEN = '☰';

    constructor({ target, isOpen = false, hiddenClass = 'hidden' }) {
        if (!target) throw new Error('target is not defined');

        this.#target = target;
        this.isOpen = isOpen;
        this.#hiddenClass = hiddenClass || 'hidden';

        super();
        this.createElement();
    }

    open() {
        this.isOpen = true;
        this.#target.classList.remove(this.#hiddenClass);
        this.#updateIcon();
        this.#updateStatesARIA();
    }

    close() {
        this.isOpen = false;
        this.#target.classList.add(this.#hiddenClass);
        this.#updateIcon();
        this.#updateStatesARIA();
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    #getIcon() {
        this.isOpen ? HamburguerMenu.#ICON_CLOSE : HamburguerMenu.#ICON_OPEN;
    }

    #updateIcon() {
        const menuIcon = this.element.querySelector('i');
        menuIcon.textContent = this.#getIcon();
    }

    #updateStatesARIA() {
        this.element.setAttribute('aria-expanded', this.isOpen ? 'true' : 'false');
        if (this.#target.id) this.element.setAttribute('aria-controls', this.#target.id);
    }

    @Override
    createElement() {
        const hamburguer = document.createElement('button');
        hamburguer.classList.add('hamburguer-menu');

        // Atributos ARIA fixos.
        hamburguer.setAttribute('role', 'button');
        hamburguer.setAttribute('tabindex', '0');

        // Atributos ARIA dinâmicos.
        this.#updateStatesARIA();

        hamburguer.innerHTML = `<i class="hamburguer-icon">${this.#getIcon()}</i>`;
        hamburguer.addEventListener('click', this.toggle);

        this.element = hamburguer;
    }
}

export default HamburguerMenu;
