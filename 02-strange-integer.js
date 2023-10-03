function isStangesInteger(integer) {
    if (typeof integer !== "number") return false // Проверка, что получили число
    let sumDivisorsOfInteger = 0        // Обнуление суммы числительных числа
    for (let i = 0; i < integer; i++) { // Прохождение по всем числам до переданного числа, но не равном ему
        if (integer % i === 0) {        // Если оин деляться без остатка, то суммируем их
            sumDivisorsOfInteger += i
        }       
    }
    return integer === sumDivisorsOfInteger // Если сумма числительных равна числу, то оно ̶с̶о̶в̶е̶р̶ш̶е̶н̶н̶о̶е̶  странное
}

console.log(isStangesInteger(6))
console.log(isStangesInteger(5))