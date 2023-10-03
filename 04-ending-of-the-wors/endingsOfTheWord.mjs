    // На вход получаем число и три падежа: именительный в единсвенном, родительский в единственном и родительский во множественном числе
function endingsOfTheWord(integer, {nominativeSingular, genitiveSingular, genitivePlural}) {
    if (typeof integer !== "number")  return   // Проверка на число              
    const tens = Math.abs(integer) % 100;      // Получаем десятки числа
	const number = integer % 10;               // Получаем единицы числа
	if (tens > 10 && tens < 20) return phrase(genitivePlural);     // Десятки от одиннадцати до девятнадцати род. во множественном
	if (number > 1 && number < 5) return phrase(genitiveSingular); // Единицы от двух до четырех род. в единственном
	if (number == 1) return phrase(nominativeSingular);            // Если заканчивается на 1 то именительный
	return phrase(genitivePlural);                                 // Во всех остальных случаях род. в множественном

    function phrase(result) {            // Вывод фразы с замыканием
        return integer + " " + result
    }
}

export default endingsOfTheWord     // Упаковывание в модуль