function parse(string) {
    const isNumber = value => /^-?\d+(.\d+)?$/.test(value); // Проверка на число https://regex101.com/r/ZkwfVO/1
    const isString = value => /^\"(.*)\"$/g.test(value)     // Проверка на строку https://regex101.com/r/RkzkZr/1
    const isUndefined = value => value === "undefined"
    const isNull = value => value === "null"
    const isBoolean = value => (value === "true" || value === "false")

        // С помощью рекурсии на каждой итерации из части строки формируем объект
    function toObject(string) {
            // Конвертация списка
        if (string[0] === "[") {
            const entriesList = getEntries(string.slice(1,-1)) // получаем все элементы списка в виде строк, убирая квадратные скобки
            return entriesList.map(entrie => toObject(entrie)) // формируем список, конвертируя каждый элемент списка
        }

            //Конвертация объекта
        if (string[0] === "{") {
            const entriesList = getEntries(string.slice(1,-1)) // получаем все элементы объект в виде строк, убирая фигурные скобки
            return entriesList.reduce((total, entrie) => {     // формируе объект, конвертируя каждый элемент объекта
                const [match, key, value] = entrie.match(/^ *\"([^:]+)\" *: *(.*)$/) // получаем пары [ключ значени] c помощью разбиения https://regex101.com/r/TdLUUp/1
                total[key] = toObject(value)                                         // добавляем поля результирующему объекту
                return total
            }, {})
        }

            //Конвертация примитивов
        if (isNumber(string)) return Number(string)
        if (isString(string)) return string.slice(1, -1) // Убираем лишние кавычки "  "
        if (isNull(string)) return null
        if (isBoolean(string)) return string === 'true'
    }
    return toObject(string)
}


    // Получение всех элементов объекта. Можно было найти регулярное выражения для этого, наподобие этому https://regex101.com/r/fgLhaw/1,
    // но к сожалению в js у регулярок нет рекурсии (?R), есть библиотеки для решения этого, но я не стал думать в этом направлении и написал функцию
function getEntries(string) {
    if (string === "") return []
    const stack = []                            // Стэк для скобочек
    const entriesList = []                      // Список элементов
    let entriesElement = ""                     // Обнуление элемента
    for (const char of string) {                // Цикл по всем символам в строке 
        if (char === "{" || char === "[") {     // Если окрвающая скобка, то она записывается в стек
            stack.push(char)
        }
        if (char === "}" || char === "]") {     // Если закрывающая, то удаляется
            stack.pop()
        }
        if (char === "," && stack.length === 0) {   // В случе если нет скобок в стеке и встретилась запятая, то нашелся конец елемента 
            entriesList.push(entriesElement.replace(/^ *| *$/, "")) // Елемент, без пробелов по бокам, записывается в список
            entriesElement = ""                                     // Елемент обнуляется для поиска нового
        } else {
            entriesElement += char                  // Если скобки есть, то елемент заполняется
        }
    }
    entriesElement = entriesElement.replace(/^ *| *$/, "") // Удаление пробелов у последнего элемента
    entriesElement = entriesElement.replace(/ *$/, "")
    entriesList.push(entriesElement)                       // Добавление последнего элемента
    return entriesList
}

export default parse