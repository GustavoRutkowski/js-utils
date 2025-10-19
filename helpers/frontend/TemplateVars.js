// Exemplo de uso:

// HTML (input criado a partir do mustache/handlebars):
// <input type="hidden" name="API_PORT" value="4444">

// JS:
// TemplateVar.init(); // Pega o input hidden, guarda seu valor e depois deleta o input.
// console.log(TemplateVar.get('API_PORT')); // Imprime 4444 no console.

/**
 * Serve para pegar variáveis secretas definidas via \<input type="hidden">.
 * 
 * Quando usamos Mustache ou Handlebars para compartilhar variáveis .env ou parâmetros de URL com o front-end.\
 * Esses dados geralmente são passados para o front-end usando um input do tipo "hidden".
 * 
 * Exemplo:\
 * \<input type="hidden" name="API_PORT" value="4444">
 * 
 * Após isso, o front deve pegar os valores desse input e deletar.\
 * Essa classe facilita esse processo.
 */
class TemplateVar {
    static #vars = new Map();

    /**
     * Retorna o valor de uma determinada variável a partir da chave.
     * @returns {any} Retorna o valor da variável ou nulo, caso não encontre.
    */
    static get(key) { return TemplateVar.#vars.get(key) || null; }

    /** Deleta uma determinada variável a partir da chave. */
    static remove(key) { TemplateVar.#vars.delete(key); }

    /**
     * Retorna um Map contendo o par chave-valor de cada variável inicializada.
     * @returns {Map} Retorna um Map contendo as variáveis incializadas.
    */
    static getVars() { return TemplateVar.#vars; }

    /**
     * Inicializa as variáveis para a página atual a partir dos inputs. Apaga os inputs após a inicialização.
     * 
     * @param {string} [customClass] - Classe customizada.
     *  Quando definida, só busca as variáveis que possuem a classe.
     *  Quando omitida, busca todas as variáveis presentes em quaisquer input do tipo hidden na página.
     * @returns {number} Retorna a quantidade de variáveis encontradas.
    */
    static init(customClass = null) {
        TemplateVar.#vars.clear();

        const QUERY = 'input[type="hidden"]';

        const inputs = document.querySelectorAll(customClass ? `${QUERY}.${customClass}` : QUERY);
        const itemsFound = inputs.length;

        inputs.forEach(i => {
            const key = i.name.toString();
            const value = i.value.toString();
            TemplateVar.#vars.set(key, value);
            i.remove();
        });

        return itemsFound;
    }
}

export default TemplateVar;
