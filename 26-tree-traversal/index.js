    //Рекурсивный обход DOM дерева в ширину
function domTreeTraversal(element) {
    console.log(element.className);  // Вывод названия класса
    const childList = element.children  
    if (childList.length = 0) return // Закончить, если нет вложенных елементов
    for (const child of childList) { // Выполнить для каждого ребенка
        try {
            domTreeTraversal(child)  // Рекурсивный обход
        } catch (error) {            
            if (error.message === "Maximum call stack size exceeded") {
                setTimeout(() => domTreeTraversal(child), 0) // Если стек переполнен, то выполнить рекурсию через таймаут. Работает медленее, 
            } else {                                         // но зато не остановит процесс
                console.error(error)
            }
        }
        
    }
}

domTreeTraversal(document.body)