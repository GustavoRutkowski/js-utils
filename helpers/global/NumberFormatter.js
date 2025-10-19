import ErrorHandler from './ErrorHandler.js';

class NumberFormatter {
    static formatAsBRL(number) {
        ErrorHandler.typeof(number, 'number', { varName: 'number' });

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(number);
    }

    static parseBRL(brl = '') {
        return parseFloat(
            brl.replace('R$', '')
            .replace('.', '')
            .replace(',', '.')
            .trim()
        );
    }
}

export default NumberFormatter
