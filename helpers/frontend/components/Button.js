import UIComponent from './UIComponent.js';

class Button extends UIComponent {
    #onClickCallback;

    constructor({
        id = null,
        customClass = null,
        customLabelClass = null,
        text = null,
        faIcon = null,
        title = null,
        onClickCallback = _e => {}
    } = {}) {
        this.id = id;
        this.customClass = customClass;
        this.customLabelClass = customLabelClass;

        this.text = text;
        this.faIcon = faIcon;
        this.title = title;
        this.#onClickCallback = onClickCallback;

        super();
        this.createElement();
    }

    @Override
    createElement() {
        const button = document.createElement('button');
        if (this.id) button.id = this.id;
        if (this.customClass) button.className = this.customClass;

        if (this.text && !this.faIcon) button.innerHTML = this.text;
        if (this.faIcon && !this.text) button.innerHTML = `<i class="${this.faIcon}"></i>`;
        
        // Text + Icon
        if (this.text && this.faIcon) {
            button.innerHTML = `
                <i class="${this.faIcon}"></i>
                <span class="${this.customLabelClass || 'btn-label'}">${this.text}</span>
            `;
        }

        if (this.title) button.title = this.title;

        button.addEventListener('click', this.#onClickCallback);
        this.element = button;
    }
}

export default Button;
