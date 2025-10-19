import ErrorHandler from './ErrorHandler.js'; 

// Exemplos de uso:

// Formatar datas:
// const dateNow = new Date(); // 09:10 do dia 19/10/2025
// const formattedDate = DateFormatter.formatAs(dateNow, '%D/%M/%Y');
// console.log(formattedDate); // Imprime 19/10/2025

// Pegar a quanto tempo foi uma data:
// const timeAgo = DateFormatter.getTimeAgo(dateNow);
// console.log(timeAgo); // Imprime 'Há 10 dias atrás'
// console.log(DateFormatter.getTimeAgo(Date.now())); // Imprime 'Agora mesmo'

// Formato:
// %Y -> Ano
// %M -> Mês
// %D -> Dia
// %H -> Horas
// %m -> Minutos

// Exemplo de Formato: "%H horas e %m minutos" -> "9 horas e 10 minutos"
// Formato padrão: "%D/%M/%Y - %H:%m" -> "19/10/2025 - 09:10"

class DateFormatter {
    static formatAs(date, format = '%D/%M/%Y - %H:%m') {
        ErrorHandler.instanceof(date, Date, { varName: 'date' });
        ErrorHandler.typeof(format, 'string', { varName: 'format' });

        const formatPattern = format || '%D/%M/%Y - %H:%m';

        return formatPattern
            .replaceAll('%Y', date.getFullYear())
            .replaceAll('%M', (date.getMonth() + 1).toString().padStart(2, '0'))
            .replaceAll('%D', date.getDate().toString().padStart(2, '0'))
            .replaceAll('%H', date.getHours().toString().padStart(2, '0'))
            .replaceAll('%m', date.getMinutes().toString().padStart(2, '0'));
    }

    static getTimeAgo(date) {
        ErrorHandler.instanceof(date, Date, { varName: 'date' });

        const currentDate = new Date();

        // Calcula diferenças absolutas para cada unidade de tempo
        const yearDiff   = currentDate.getFullYear() - date.getFullYear();
        const monthDiff  = currentDate.getMonth() - date.getMonth();
        const dayDiff    = currentDate.getDate() - date.getDate();
        const hourDiff   = currentDate.getHours() - date.getHours();
        const minuteDiff = currentDate.getMinutes() - date.getMinutes();

        const MONTHS_PER_YEAR = 12;
        const MINS_PER_HOUR = 60;
        const HOURS_PER_DAY = 24;

        let totalMonths = yearDiff * MONTHS_PER_YEAR + monthDiff;
        let totalDays = dayDiff;

        let adjustedMinutes = minuteDiff;
        let adjustedHours = hourDiff;
        
        if (adjustedMinutes < 0) {
            adjustedMinutes += MINS_PER_HOUR;
            adjustedHours -= 1;
        }

        if (adjustedHours < 0) {
            adjustedHours += HOURS_PER_DAY;
            totalDays -= 1;
        }

        if (totalDays < 0) {
            const daysInLastMonth = new Date(
                currentDate.getFullYear(),
                currentDate.getMonth(),
                0
            ).getDate();
            
            totalDays += daysInLastMonth;
            totalMonths -= 1;
        }

        // Verifica qual unidade de tempo usar
        if (yearDiff > 0) return `Há ${yearDiff} ano${yearDiff !== 1 ? 's' : ''} atrás`;
        if (totalMonths > 0) return `Há ${totalMonths} mês${totalMonths !== 1 ? 'es' : ''} atrás`;
        if (totalDays > 0) return `Há ${totalDays} dia${totalDays !== 1 ? 's' : ''} atrás`;
        if (adjustedHours > 0) return `Há ${adjustedHours} hora${adjustedHours !== 1 ? 's' : ''} atrás`;
        if (adjustedMinutes > 0) return `Há ${adjustedMinutes} minuto${adjustedMinutes !== 1 ? 's' : ''} atrás`;

        return 'Agora mesmo';
    }
}

export default DateFormatter;
