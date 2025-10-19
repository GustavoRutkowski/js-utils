import UIComponent from '../UIComponent.js';

class User {
    static USER_UPDATED_EVENT = 'user-update';

    static get() { return 'Usuário...'; }

    static update() {
        console.log('Atualizando usuário...');
        dispatchEvent(User.USER_UPDATED_EVENT); // Dispara o evento User.USER_UPDATED_EVENT
        return 'Usuário atualizado!';
    }
} 

/**
 * Uma classe que simula um comportamento reativo do estado de outra classe.
 * Nesse caso, toda vez que o usuário (classe User) é atualizado, ele dispara um evento User.USER_UPDATED_EVENT.
 * 
 * A classe UserAwareUIComponent consegue captar esse evento e atualizar o estado do componente.
 * @abstract
*/
class UserAwareUIComponent extends UIComponent {
    #userInstance = null;

    constructor(user, { onUpdate = _e => {} } = {}) {
        this.#userInstance = user;

        // Quando o usuário for atualizado, automaticamente atualiza a instância
        addEventListener(User.USER_UPDATED_EVENT, e => {
            this.#userInstance = User.get();
            onUpdate(e); // Chama uma callback que trata o evento.
        });
    }

    getUserInstance() { return this.#userInstance; }

    // createElement permanece não implementado. Já que essa classe também é só abstrata.
}

export default UserAwareUIComponent;
