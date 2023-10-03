function getCallStackSize(count = 0) {
    try {
        getCallStackSize(++count)  // Пока идет рекурсивный вызов подсчитваются запущенные функции
    } catch (error) {
        if (error.message === "Maximum call stack size exceeded") { // Если стек переполнен,
            alert(count + " функции");                              // То выводится кол-во функий
        } else {
            console.error(error)
        }
        return
    }
}

getCallStackSize()

// Chrome - 9658 функций
// Opera - 9657 функций
// Edge - 9669 функций