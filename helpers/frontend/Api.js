// * Desconfio que essa classe consiga permitir outros tipos de conteúdo além de JSON apenas.
// * Testar depois e ver.

/**
 * @typedef {'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'} TMethod
 * 
 * @typedef {Object} TOptions
 * @property {object[] | string[] | undefined} headers
 * @property {string[] | undefined} params
 * @property {object | undefined} body
*/

class Api {
    #url;
    headers;

    constructor(url, { headers = [] } = {}) {
        this.#url = url;
        this.headers = new Headers(headers);
    }

    #mergeHeaders(headers) {
        const mergedHeaders = new Headers(this.headers);

        if (!headers) return mergedHeaders;
        if (typeof headers === 'object') {
            const setHeaderCb = ([key, value]) => mergedHeaders.set(key, value);
            Object.entries(headers).forEach(setHeaderCb);
            return mergedHeaders;
        }

        if (!Array.isArray(headers)) return mergedHeaders;

        headers.forEach(header => {
            if (typeof header === 'string') {
                const [key, value] = header.split(':');
                if (key && value) mergedHeaders.append(key.trim(), value.trim());
                return;
            }

            mergedHeaders.append(header[0], header[1]);
        });

        return mergedHeaders;
    }

    /**
     * Faz uma requisição fetch de acordo com os parâmetros recebidos.
     * 
     * @param {TMethod} method - Método da requisição
     * @param {string} endpoint - Rota da requisição
     * @param {?TOptions} options - Opções extras para requisição
     * @returns {Promise<any>} Retorna uma promise com a resposta da requisição.
     */
    async #request(method, endpoint, options = null) {
        let url = `${this.#url}/${endpoint}`;
        
        // Processa os parâmetros (Query Params)
        if (options?.params) {
            const searchParams = new URLSearchParams();

            options.params.forEach(param => {
                if (typeof param !== 'string') return;
                const [key, value] = param.split('=');
                if (key && value) searchParams.append(key, value);
            });

            const queryString = searchParams.toString();
            if (queryString) url += `?${queryString}`;
        }

        const headers = this.#mergeHeaders(options?.headers);
        // Adiciona um content-type pra JSON sempre que body estiver definido.
        if (options?.body && !headers.has('Content-Type'))
            headers.set('Content-Type', 'application/json');

        // Options:
        const fetchOptions = { method, headers };
        if (options?.body) fetchOptions.body = JSON.stringify(options.body);

        try {
            const response = await fetch(url, fetchOptions);
            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`);

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json'))
                return await response.json();
            return await response.text();
        } catch (e) {
            throw e;
        }
    }

    async get(endpoint, options = null) {
        return await this.#request('GET', endpoint, options);
    }
    async post(endpoint, options = null) {
        return await this.#request('POST', endpoint, options);
    }
    async put(endpoint, options = null) {
        return await this.#request('PUT', endpoint, options);
    }
    async patch(endpoint, options = null) {
        return await this.#request('PATCH', endpoint, options);
    }
    async delete(endpoint, options = null) {
        return await this.#request('DELETE', endpoint, options);
    }
}

export default Api;
