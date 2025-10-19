/**
 * A classe é uma abstração para componentes de interface. Todo componente que herde de UIComponent segue essa abstração.
 * @abstract
*/
class UIComponent {
    element = null;

    getElement() { return this.element; }

    // Can be overwritten
    getCopy() { return this.element.cloneNode(true); }

    deleteElement() {
        this.element.remove();
        this.element = null;
    }

    /**
     * Cria os elementos que compõe o componente e salva em this.element.
     * @abstract
    */
    createElement() {
        throw new Error('UIComponent.createElement() is abstract. Implement the method in a child class.');
    }
}

export default UIComponent;
