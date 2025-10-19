// Exemplos de Uso:

// Validando tipos:
// ErrorHandler.typeof(-500, 'string');

// Validando instancias:
// ErrorHandler.instanceof({ ... }, User, { varName: 'user' });

// Validando intervalos:
// ErrorHandler.inInterval(score, [0, 100], { varName: 'score' });

class ErrorHandler {
    static require(value, { varName, type = null, instanceOf = null }) {
        const ERROR = new Error(`${varName} is not defined`);

        if (typeof value === 'number' && !value && value !== 0) throw ERROR;
        if (!value) throw ERROR;

        if (type) ErrorHandler.typeof(value, type, { varName });
        if (instanceOf) ErrorHandler.instanceof(value, instanceOf, { varName });
    }

    static instanceof(value, Class, { varName = null }) {
        if (!value instanceof Class) {
            console.error(`${varName || value} is not an instance of ${Class.name}`);
            throw new TypeError(`${varName || value} is not an instance of ${Class.name}`);
        }
    }

    static typeof(value, type, { varName = null }) {
        if (!typeof value === type) {
            console.error(`${varName || value} is not a ${type}`);
        } 
    }

    static numberInInterval(value, [ min, max ], { varName }) {
        if (!min && min !== 0) throw new Error('min is not defined');
        if (!max && max !== 0) throw new Error('max is not defined');
        if (value < min || value > max) {
            console.error(`${varName} must be between ${min} and ${max}`);
            throw new RangeError(`${varName} must be between ${min} and ${max}`);
        }
    }

    static dateInInterval(date, [ min, max ], { varName }) {
        // ...
    }

    static inObject(key, object, { varName = null, message = null }) {
        if (!(key in object)) throw new Error(message || `${key} is not a valid ${varName}`);
    }
}

export default ErrorHandler;
