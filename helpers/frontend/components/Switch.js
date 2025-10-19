import UIComponent from './UIComponent.js';

class Switch extends UIComponent {
    checked = false;
    disabled = false;
    #onChangeCallback = _e => {};

    constructor({ checked = false } = {}) {
        this.checked = checked;

        super();
        this.createElement();
    }

    #getCheckbox() {
        return this.element.querySelector('.switch-checkbox') || null;
    }

    #updateState() {
        const checkbox = this.#getCheckbox();

        checkbox.checked = this.checked;
        checkbox.disabled = this.disabled;
    }

    toggleValue() {
        this.checked = !this.checked;
        this.#updateState();
    }

    enable() {
        this.disabled = false;
        this.#updateState();
    }

    disable() {
        this.disabled = true;
        this.#updateState();
    }

    onChange(eventCallback) {
        this.#onChangeCallback = eventCallback;
    }

    @Override
    createElement() {
        const switchInput = document.createElement('div');
        switchInput.classList.add('switch-component');

        switchInput.innerHTML = `
            <label id="switch-element" >
                <input class="switch-checkbox" type="checkbox">
            </label>
        `;

        this.element = switchInput;

        const checkbox = this.#getCheckbox();

        checkbox.addEventListener('change', e => {
            this.toggleValue();

            this.#onChangeCallback(e);
        });
    }
    
}

export default Switch;
