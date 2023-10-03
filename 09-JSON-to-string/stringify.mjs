// Пока делел получилась табличка с типами переменных https://docs.google.com/spreadsheets/d/1J4hgoFBoMHmyOVVyAIqwTnr263t1HSCdMjJWxrqr55U/edit?usp=sharing

function stringify(json) {
    const typeOf = value => Object.prototype.toString.call(value).match(/^\[object (.*)\]$/)[1]            // Возвращает тип объекта
    const isString = value => typeOf(value) === "String"                                                   // Проверка на стоку
    const isBoolean = value => typeOf(value) === "Boolean"                                                 // Проверка на логический тип
    const isBigInt = value => typeOf(value) === "BigInt"                                                   // Проверка на BigInt
    const isNan = value => (typeOf(value) === "Number" && (value !== value || isNaN(value)))               // Проверка на NaN, только nan !== nan, но new Number(NaN) === new Number(NaN), по-этому еще проверка на isNaN
    const isInfinity = value => (typeOf(value) === "Number" && (value == Infinity || value == -Infinity))  // Проверка на Infinity
    const isNumber = value => (typeOf(value) === "Number" && !isNan(value) && !isInfinity(value))          // Число это Number, но не Nan и не Infinity
    const isUndefined = value => typeOf(value) === "Undefined"                                             // Проверка на undefined
    const isNull = value => typeOf(value) === "Null"                                                       // Проверка на null
    const isSymbol = value => typeOf(value) === "Symbol"                                                   // Проверка на Symbol
    const isValidDate = value => (typeOf(value) === "Date" && !isNaN(value))                               // Проверка на валидную дату
    const isInvalidDate = value => (typeOf(value) === "Date" && isNaN(value))                              // Проверка на не валидную дату
    const isFunction = value => typeOf(value) === "Function"                                               // Проверка на функцию
    const isArray = value => typeOf(value) === "Array"                                                     // Проверка на список

    function toStringUndefined(context) {   // В зависимости от контекста, в чем были вызваны символ функци или undefined, JSON.stingify выдает
        switch (context) {
            case "object": return           // в оъекте {a:a} пропускает
            case "array": return "null"     // в списке [a] => null
            case "var": return "undefined"  // как переменная a => undefined
        }
    }
        // С помощью рекурсии на каждой итерации из кусочка объекта получаем строку, с самого начала контекст это переменная
    function toString(value, context = "var") {
            // Конвертация примитивов. Дата и функции это не примитивы, но они не создают рекурсии
        if (isString(value)) return `\"${value}\"`
        if (isBoolean(value) || isNumber(value)) return String(value)
        if (isSymbol(value) || isUndefined(value) || isFunction(value)) return toStringUndefined(context)
        if (isValidDate(value)) return `\"${value.toJSON()}\"`
        if (isInfinity(value) || isNan(value) || isNull(value) || isInvalidDate(value)) return "null"
        
            // Конвертация списка
        if (isArray(value)) {
            let stringArray = value.reduce((total, element) => { // Формируем строку 
                const stringElement = toString(element, "array") // поэлементно конвертируя с контекстом списка
                return total + stringElement + ","               // разграничивая запятой
            }, "")
            stringArray = stringArray.slice(0, -1)               // Убираем лишнюю запятую
            return "[" + stringArray + "]"                       // И оборачиваем в квадратные скобки
        }
            // Конвертация объекта. Все, что осталось ведет себя как объект в JSON.stringify
        const objectEntries = Object.entries(value)                         // получаем спиок [ключ значение]
        if (objectEntries.length === 0) return "{}"                         // если список пустой то возвращаем пустой объект

        let stringObject = objectEntries.reduce((total, [key, value]) => {  // Иначе, как и со списком 
            const stringValue = toString(value, "object")                   // поэлементно конвертируем
            if (!stringValue) return total                                  // если undefined, то пропускаем
            return total + `\"${key}\":` + stringValue + ","                // и формируем строку
        }, "")
        stringObject = stringObject.slice(0, -1)                 // Убираем лишнюю запятую
        return "{" + stringObject + "}"                          // И оборачиваем в фигурные скобки
    }

    if (isBigInt(json)) return new TypeError("Do not know how to serialize a BigInt")   // Выдаем ошибку, что нельзя преобразовать BigInt
    if (isCircular(json)) return new TypeError("Converting circular structure to JSON") // Выдаем ошибку, если объект зациклен
    return toString(json)       
}

// Функцию подсмотрел вот здесь https://stackoverflow.com/a/15179204, но подправил, добавил проверку Object.hasOwnProperty.call в цикле forin
function isCircular(obj, arr) {       
    "use strict";

    var type = typeof obj,
        propName,
        //keys,
        thisVal,
        //iterKeys,
        iterArr,
        lastArr;

    if (type !== "object" && type !== "function") {
        return false;
    }

    if (Object.prototype.toString.call(arr) !== '[object Array]') {
    //if (!Array.isArray(arr)) {
        type = typeof arr; // jslint sake
        if (!(type === "undefined" || arr === null)) {
            throw new TypeError("Expected attribute to be an array");
        }

        arr = [];
    }

    arr.push(obj);
    lastArr = arr.length - 1;

    for (propName in obj) {
        if (Object.hasOwnProperty.call(obj, propName)) {
            //keys = Object.keys(obj);
            //propName = keys[iterKeys];
            //for (iterKeys = keys.length - 1; iterKeys >= 0; iterKeys -= 1) {
            thisVal = obj[propName];
            //thisVal = obj[keys[iterKeys]];
            type = typeof thisVal;

            if (type === "object" || type === "function") {
                for (iterArr = lastArr; iterArr >= 0; iterArr -= 1) {

                    if (thisVal === arr[iterArr]) {
                        debugger
                        return true;
                    }
                }

                // alternative to the above for loop
                /*
                if (arr.indexOf(obj[propName]) >= 0) {
                    return true;
                }
                */

                if (isCircular(thisVal, arr)) {
                    debugger
                    return true;
                }

            }
        }
    }

    arr.pop();

    return false;
}


export default stringify