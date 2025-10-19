import ErrorHandler from '../ErrorHandler.js';
import Random from './Random.js';

class RandomData {
    static name() {
        const names = [
            'Adam', 'Ahmed', 'Alexander', 'Aisha', 'Amir', 'Abdul', 'Anton', 'Albert', 'Benjamin', 'Bruna',
            'Bruna Eloise', 'Bernardo', 'Chloe', 'Charlotte', 'Cauã', 'Caetano', 'David', 'Daniel', 'Dmitri',
            'Davi', 'Eva', 'Ethan', 'Elijah', 'Emily', 'Enrico', 'Enrique', 'Eduardo', 'Fatima', 'Gustavo',
            'Gabriel', 'Henry', 'Helena', 'Isabella', 'Isaac', 'Jhon', 'Jacob', 'Julian', 'João Luís', 'João Henrique',
            'João Pedro', 'Lucas', 'Liam', 'Leila', 'Layla', 'Luca', 'Luan', 'Mohammed', 'Mateo', 'Mia', 'Michael',
            'Maxim', 'Matheus', 'Noah', 'Nathan', 'Nicolas', 'Olivia', 'Oscar', 'Peter', 'Raphael', 'Rashid',
            'Sophia', 'Sebastian', 'Samuel', 'Thomas', 'Victoria', 'Yasmin', 'Zainab'
        ];

        const surnames = [
            'Ahmed', 'Andersson', 'Avila', 'Andrade', 'Ali', 'Brown', 'Black', 'Bianchi', 'Brasil', 'Batista',
            'Cohen', 'Chan', 'Choudhury', 'Carvalho', 'Chananeco', 'Dubois', 'Delgado', 'Eriksson', 'Ferrari',
            'Fontaine', 'Fernandes', 'Freitas', 'Fonseca', 'Franco', 'Gonzalez', 'Garcia', 'Hassan', 'Hussein',
            'Ivanov', 'Johnson', 'Kim', 'Kowalski', 'Kuball', 'Lopez', 'Laurent', 'Lévesque', 'Leote', 'Morgan',
            'Müller', 'Machida', 'Nguyen', 'Nakamura', 'Nowak', "O'Connor", 'Oliveira', 'Patel', 'Park', 'Pansera',
            'Pereira', 'Rossi', 'Ricci', 'Ribeiro', 'Rutkowski', 'Redin', 'Smith', 'Schroeder', 'Schumacher',
            'Schneider', 'Santiago', 'Taylor', 'Torres', 'Tassinari', 'Vasquez', 'Venturini', 'Vieira', 'Williams',
            'Yamamoto', 'Zhang'
        ];

        const randomName = {
            name: Random.choiceElement(names),
            surname: Random.choiceElement(surnames)
        };

        while (randomName.name === randomName.surname) {
            randomName.name = Random.choiceElement(names);
            randomName.surname = Random.choiceElement(surnames);
        }

        return `${randomName.name} ${randomName.surname}`;
    }

    static nickname() {
        let nickname = '';

        // Tem chance de começar com um número aleatório de até 3 digitos
        const startsWithNumber = Random.boolean();
        if (startsWithNumber) nickname += String(Random.int(0, 999));

        const coolWords = ['angel', 'cat', 'dog', 'dev', 'dark', 'dragon', 'fake', 'funny', 'hacker', 'inazuma', 'kalabasa', 'king', 'noob', 'pro', 'prime', 'shadow', 'zurg'];
        const prefixes = [...coolWords, 'bad', 'cool', 'cyber', 'mega', 'old', 'super', 'young']
        
        const twoWords = Random.boolean();

        // Pega um prefixo ou palavra aleatória
        const firstWord = Random.choiceElement(twoWords ? prefixes : coolWords);
        nickname += firstWord;

        const separators = ['_', '-', '.', ' ', ''];

        // Gera um separador aleatório
        nickname += Random.choiceElement(separators);

        // Tem chance de juntar com outra palavra
        if (twoWords) nickname += Random.choiceElement(coolWords);

        // Tem chance de juntar com um outro separador aleatório
        nickname += separators.includes(nickname.at(-1))
            ? '' : Random.choiceElement(separators);

        // Tem chance de juntar com um número de até 6 digitos
        const endsWithNumber = Random.boolean();
        if (endsWithNumber) nickname += String(Random.int(0, 999999));

        return nickname;
    }

    static password(length = 8, allowed_chars=`!"#$%&'()*+-/0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{}`) {
        let pass = '';
        
        for (let i = 0; i < length; i++)
            pass += Random.choiceChar(allowed_chars);

        return pass;
    }

    static cpf() {
        let digits = [];
        let checkDigits = Random.int(0, 99);

        for(let i = 1; i <= 3; i++) {
            digits.push(Random.int(0, 999));
        }

        digits = digits.map(p => String(p).padStart(3, '0'));
        checkDigits = String(checkDigits).padStart(2, '0');

        return `${digits.join('.')}-${checkDigits}`;
    }

    static ip() {
        const digits = [];

        for(let i = 1; i <= 4; i++) {
            const digits_part = String(Random.int(0, 255));
            digits.push(digits_part);
        }

        return digits.join('.');
    }

    static phoneNumber() {
        return `+55 ${Random.int(10, 99)} ${Random.int(90000, 99999)}-${Random.int(1000, 9999)}`;
    }

    static hours(format = 'HH:MM') {
        const formatsMap = {
            'HH:MM': () => {
                const hours = Random.int(0, 23).padStart(2, '0');
                const minutes = Random.int(0, 59).padStart(2, '0');
                return `${hours}:${minutes}`;
            },
            'HH:MM:SS': function() {
                const hoursMinutes = this['HH:MM']();
                const seconds = Random.int(0, 59).padStart(2, '0');
                return `${hoursMinutes}:${seconds}`;
            }
        };

        ErrorHandler.inObject(format, formatsMap, { varName: 'hours format' });
        formatsMap?.[format]?.();
    }

    static coordinates() {
        return {
            lat: Random.float(-90, 90).toFixed(6),
            long: Random.float(-180, 180).toFixed(6)
        };
    }
}

export default RandomData;
