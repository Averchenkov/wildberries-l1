const sleep = (ms) => new Promise(resolve => setTimeout(() => resolve(), ms))  // Искусственная задержка

async function loading(data) {
    const resposnse = "Были загружены "
    console.log("Начало загрузки");
    await sleep(3000)
    console.log("Конец загрузки");

    return () => {
        return console.log(resposnse + data) // Внутренняя функция имеет доступ к переменными response и data определенной во внешней функции
    }
}

const loadingPosts = loading("post1, post2, post3...")

loadingPosts.then(func => {
    func()                  // Даже после того как внешняя функция завершила свое выполнение
})
