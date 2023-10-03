import moment from 'moment';
import endingsOfTheWord from '../04-ending-of-the-wors/endingsOfTheWord.mjs';

// Функця расчета разницы между датами в часах и минутах
function differanceDate(dateStartString, dateEndString) {
    const dateStart = moment(dateStartString)                // Задание точек подсчета
    const dateEnd = moment(dateEndString)
    const differanceMs = dateEnd.diff(dateStart)             // Рассчет разницы в мс
    const differance = moment.duration(differanceMs)         // Рассчет продолжительности
    const hours = endingsOfTheWord(differance.hours(), {     // в часах
        nominativeSingular: "час",
        genitiveSingular: "часа",
        genitivePlural: "часов"
    })
    const minutes = endingsOfTheWord(differance.minutes(), {  // и минутах
        nominativeSingular: "минута",
        genitiveSingular: "минуты",
        genitivePlural: "минут"
    })
    return `${hours} ${minutes}`
}

export default differanceDate