// Я не нашел какие переменные можно замкнуть для этих функций, кроме как number для подчета Фибоначчи. 
// Я сделал, как еще на паскале в школе, фибоначчи с помощью рекурсии, а простые числа с небольшими оптимизациями
const MathX = {                     
            // Массив чиссел в ряду Фибоначчи до числа number либо до конца счетчика count
    fibonacciNumber({ count = Number.MAX_VALUE, number = Number.MAX_VALUE }) {  
            // На каждой итерации получаем счетчик, который идет в обратную сторону, результирующий массив чисел Фибоначчи, предущую и текущую сумму
        function fib(count, result, prevSum, sum) {
            if (count === 1 || result.slice(-1)[0] >= number) return result    // Закачиваем когда счетчик дошел до 1 или последнее число больше
            else {                                                             // замкнутого number
                result.push(sum)                                               // В результирующий массив записываем сумму
                return fib(--count, result, sum, prevSum + sum)               // Заного вызываем
            } 
        }
        return fib(count, [0], 0, 1)
    },
    nthFibonacciNumber(count) {
        return this.fibonacciNumber({count}).slice(-1)[0]  // Для n-го числа возвращаем последниее из ряда Фибоначчи
    },
    fibonacciNumberBefore(number) {
        return this.fibonacciNumber({number}).slice(0, -1) // Для всех чисел до n убираем последнее, так как оно больше n
    },
        // Для просты чисел я применил три хитрости:
        //   достаточно найти один числитель, тогда число не является простым
        //   числители достаточно искать до квадрата проверяемого числа  - https://algocode.ru/page/c-3-number-theory/
        //   все найденные простые числа я сохраняю в массив и там же ищю числители для следующих чисел
    primeNumber({ count = Number.MAX_VALUE, number = Number.MAX_VALUE }) {
        const primeNumberList = [2]  // Заполнение массива простых чисел первым простым числом
        let int = 3                  // Следующее число на проверку простоты
        while (primeNumberList.length < count && primeNumberList.slice(-1)[0] < number) { // Цикл пока в массиве не наберется нужно количество простых чисел или последнее число не будет больше number
            const maxLimit = Math.floor(Math.sqrt(int)) // Граница в корень для проверяемого числа

            let isPrime = true                                     // Флаг что число простое
            let i = 0                                              
            while (primeNumberList[i] <= maxLimit && isPrime) {    // Перебор простых чисел пока не дошли границу, либо не определили составное число
                isPrime = int % primeNumberList[i] !== 0           // Определение тип числа
                i++
            }

            if (isPrime) primeNumberList.push(int)                 //Если после перебора не нашелся делитель, то число простое и сохраняем в массив
            int++
        }   
        return primeNumberList
    },
    nthPrimeNumber(count) {
        return this.primeNumber({count}).slice(-1)[0] 
    },
    primeNumberBefore(number) {
        return this.primeNumber({number}).slice(0,-1) 
    }
}

console.log("Девятое число Фибоначчи - " + MathX.nthFibonacciNumber(9));
console.log("Ряд Фибоначчи до 20 - " + MathX.fibonacciNumberBefore(20));
console.log("Шестое простое число - " + MathX.nthPrimeNumber(6));
console.log("Ряд простых чисел до 30 - " + MathX.primeNumberBefore(30));
console.log();

//https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BF%D1%80%D0%BE%D1%81%D1%82%D1%8B%D1%85_%D1%87%D0%B8%D1%81%D0%B5%D0%BB
const fibList = MathX.primeNumberBefore(3572)   // Простые числа в виде таблицы
for (let i = 0; i < 25; i++) {                            
    let s = ""
    for (let j = 0; j < 20; j++) {
        s += fibList[j + i * 20] + " "
    }
    console.log(s)
}
