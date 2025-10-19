// Exemplos de Uso:

// Setando Variável:
// LocalData.set('token', { token: loginToken, user_email: userEmail }); // Já salva como objeto.

// Setando Variável com prazo de expiração:
// LocalData.set('token', { token: loginToken }, 1000 * 60 * 5); // Expira em 5 minutos

// Pegando Variável:
// const token = LocalData.get('token');
// console.log(token.token, token.userEmail); // Já retorna como objeto.

// Removendo Variável:
// LocalData.remove('token');
// Ou...
// LocalData.clear(); // Remove todas. Use com segurança.

class LocalData {
    static get(key) {
        try {
            const data = JSON.parse(localStorage.getItem(key));
    
            if (data.expires_in && Date.now() > data.expires_in) {
                LocalData.remove(key);
                return null;
            }
            return data.data || null;
        } catch (e) {
            return localStorage.getItem(key) || null;
        }
    }

    static set(key, value, expiresIn = null) {
        const data = { data: value };
        if (expiresIn) data.expires_in = Date.now() + expiresIn;

        localStorage.setItem(key, JSON.stringify(data));
    }

    static remove(key) { localStorage.removeItem(key); }
    static clear() { localStorage.clear(); }
}

export default LocalData;
