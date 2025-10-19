import ErrorHandler from '../ErrorHandler.js';

class Random {
    static boolean() { return Random.choice(false, true); }

    // MIN MAX Methods:
    
    static array(length, { min, max, type = 'int' }) {
        ErrorHandler.require(min, { varName: 'min', type: 'number' });
        ErrorHandler.require(max, { varName: 'max', type: 'number' });

        const randomArray = [];

        // Melhorar isso
        for (let i = 0; i < length; i++) {
            if (type === 'int') {
                randomArray.push(this.int(min, max));
                continue;
            }

            if (type === 'float') {
                randomArray.push(this.float(min, max));
                continue;
            }

            throw new TypeError('type must be an int or a float');
        }

        return randomArray; // S2
    }

    static int(min, max) {
        ErrorHandler.require(min, { varName: 'min', type: 'number' });
        ErrorHandler.require(max, { varName: 'max', type: 'number' });
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static float(min, max) {
        ErrorHandler.require(min, { varName: 'min', type: 'number' });
        ErrorHandler.require(max, { varName: 'max', type: 'number' });
        return (Math.random() * (max - min + Number.EPSILON)) + min;
    }

    static date(min, max) {
        ErrorHandler.require(min, { varName: 'min', instanceOf: Date });
        ErrorHandler.require(max, { varName: 'max', instanceOf: Date });

        const minUTC = min.getTime();
        const maxUTC = max.getTime();

        const randomUTC = this.int(minUTC, maxUTC);
        return new Date(randomUTC);
    }

    static scrumbleArray(array=[]) {
        return [...array].sort(() => this.choice(-1, 1));
    }

    static sequence(length, min, max) {
        return new Array(length).fill(0).map(() => this.int(min, max));
    }

    // CHOICE Methods:

    static choice(...values) {
        if (values.length <= 0) throw new Error('the choice function needs at least 1 argument');
        return values[Random.int(0, values.length-1)];
    }

    static choiceIndex(array=[]) {
        if (array.length <= 0) return -1;
        return Random.int(0, array.length-1);
    }

    static choiceElement(array=[]) {
        if (array.length <= 0) return null;
        return array[Random.int(0, array.length-1)];
    }

    static choiceMultiple(array=[], quantity) {
        const choicedElements = [];

        for (const [i, element] of array.entries()) {
            if (choicedElements.length === quantity) break;
            
            const remainingElements = array.length - i;
            const remainingChoiced = quantity - choicedElements.length;

            const choose = Random.boolean();

            if (choose) choicedElements.push(element);
            if (remainingElements === remainingChoiced) choicedElements.push(element);
        }

        return choicedElements;
    }

    static choiceChar(string='') {
        if (string.length <= 0) return '';
        return string[this.int(0, string.length-1)];
    }
}

export default Random;
