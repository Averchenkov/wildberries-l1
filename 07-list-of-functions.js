function first() {
    console.log("first");
}
function second() {
    console.log("second");
}
function third() {
    console.log("third");
}

let functionList = [first, second, third] // Массив функций

functionList.forEach((func, index) => { // Цикл по массиву
    console.log(index + 1);             // Выводим порядковый номер
    func()                              // Вызываем функцию
});
console.log();

// Если учитывать, что завершение работы функции это выход из коллстэка, то реньшение выше, но если принимать завершение работы функции как 
// выполнение коллбека, который функция отдает в EventLoop, то никаким образом нельзя поставить массив фунций выполняться последовательно, 
// так как коллбек из setTimeout попадет в очередь макротасок, а коллбек из промиса поадет в очередь микротасок и будет в любом случае вызван раньше.
// Пример ниже

function fourth() {
    setTimeout(() => console.log("fourth"), 0);
}
function fiveth() {
    Promise.resolve().then(() => console.log("fiveth"))
}
function sixth() {
    console.log("sixth");
}

functionList = [fourth, fiveth, sixth]

const main = async () => {   // Разные способы заставить выполняться последовательно
    for (const func of functionList) {
        await func()
    }
    functionList.forEach(async func => {
        await func()
    })
    for (let i = 0; i < functionList.length; i++) {
        await functionList[i]()
    }
}

main()