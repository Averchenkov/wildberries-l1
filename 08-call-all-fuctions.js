function first() {
    return "first"
}
function second() {
    return "second"
}
function third() {
    return "third"
}

const functionList = [first, second, third]

function callAllFuctions(functionList) {
    return () => {                          // Возвращает функцию
        return functionList.map(func => {   // которая возращает список 
            return func()                   // результатов работы функций в списке
        });
    }
}

const callAllFuctionsInFuctionList = callAllFuctions(functionList)

console.log(callAllFuctionsInFuctionList())