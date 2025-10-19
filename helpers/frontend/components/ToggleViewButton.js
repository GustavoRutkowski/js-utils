import UIComponent from './UIComponent.js';

// const cssRaw = `
//     @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css');

//     :host {
//         min-width: fit-content;
//         min-height: fit-content;
//         color: rgba(255, 255, 255, .4);
//         cursor: pointer;
//         transition-duration: .3s;
//     }
//     :host i {
//         display: inline-block;
//         min-width: 20px;
//         min-height: 20px;
//         color: rgba(255, 255, 255, .4);
//     }
//     :host:hover { color: white }
// `;

class ToggleViewButton extends UIComponent {
    static VISIBLE_ICON = 'fa-eye-slash';
    static HIDDEN_ICON = 'fa-eye';

    identifierClass = 'toggle-view-btn';

    target;
    title;
    visible;

    constructor(target, title = 'exibir') {
        super();

        this.target = target;
        this.title = title;
        this.visible = false;
        this.createElement();
    }

    isVisible() { return this.visible }

    appendBelowTarget() {
        this.target.insertAdjacentElement('afterend', this.element);
    }

    static createAllButtons(node = document) {
        const inputPasswords = node.querySelectorAll('input[type="password"]');

        inputPasswords.forEach(input => {
            const toggleViewBtn = new ToggleViewButton(input);
            toggleViewBtn.appendBelowTarget();
        });
    }

    renderIcon() {
        this.target.type = this.visible ? 'text' : 'password';

        const selectedIcon = this.visible
            ? ToggleViewButton.VISIBLE_ICON
            : ToggleViewButton.HIDDEN_ICON;

        const i = this.element?.querySelector('i') || null;
        i?.setAttribute('class', `fa-solid ${selectedIcon}`);
    }

    toggleVisibility() {
        this.visible = !this.visible;
        this.renderIcon();
    }

    @Override
    createElement() {
        const button = document.createElement('button');
        button.classList.add(this.identifierClass);
        button.title = this.title;
        button.setAttribute('tabindex', '0');

        const selectedIcon = this.visible
            ? ToggleViewButton.VISIBLE_ICON
            : ToggleViewButton.HIDDEN_ICON;

        button.innerHTML = `<i class="fa-solid ${selectedIcon}"></i>`;
        button.addEventListener('click', e => {
            e.preventDefault();
            this.toggleVisibility();
        });

        this.element = button;
    }
}

export default ToggleViewButton;