const tableHTML = document.querySelector("table")
const tableBodyHTML = tableHTML.querySelector("tbody")
const tableRowTemlate = document.querySelector("#table-row")
const paginationHTML = document.querySelector("nav")
const paginationButtonListHTML = [...paginationHTML.querySelector(".pagination__counter-container").children]
const prevButtonHTML = paginationHTML.querySelector(".pagination__prev")
const nextButtonHTML = paginationHTML.querySelector(".pagination__next")
const urlData = "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true"

function debounce(func, timeout = 100){
    let timer;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => { 
            func.apply(this, args)
        }, timeout)
    };
}

async function main() {
    const dataList = await getData(urlData)                    // Загрузка данных 
    const countRow = 30                                        // Задаем кол-во строк на одной странице
    const countPages = Math.ceil(dataList.length / countRow)   // Подсчет количества страниц
    createTableRows(countRow)                                  // Создание строк в таблице
    fillTable(dataList)                                        // Заполнение таблицы
    fillPagination(countPages, 1)                              // Заполнение меню пагинации
    window.addEventListener("resize", debounce(() => fillPagination(countPages, 1))) // Если размер окна меняется то подстраивать под окно 
    tableHTML.classList.add("show")                            // Показать таблицу

    for (const buttonHTML of [prevButtonHTML, ...paginationButtonListHTML, nextButtonHTML]) { // На все кнопки из меню навесть клик
        buttonHTML.addEventListener("click", function() {
            const currentPage = parseInt(this.name)         // Изминение текущей страницы
            const offset = (currentPage - 1)  * countRow    // Подсчет смещения
            fillTable(dataList, offset)                     // Смена значений в таблице для новой страницы
            fillPagination(countPages, currentPage)         // Обновление меню пагинации
            window.scrollTo(0, 0)                           // Перемещение окна на вверх страницы
            window.addEventListener("resize", debounce(() => fillPagination(countPages, currentPage)))
        })
    }
}

main()

    // Создание строк в таблице с помощью шаблона
function createTableRows(countRow) {
    for (let index = 0; index < countRow; index++) {
        const rowHTML = tableRowTemlate.content.cloneNode(true)
        tableBodyHTML.appendChild(rowHTML)
    }
}

    // Заполнение таблицы 
async function fillTable(dataList, offset = 0) {
    const tableRowsListHTML = [...tableBodyHTML.children]
    tableRowsListHTML.forEach((rowHTML, index) => { // Цикл по всем строкам таблицы
        const tableFieldListHTML = [...rowHTML.children]
            //Значения полей для строки таблицы. Если нет значений то заполнить пустым значением \u00a0, которое распознает браузер, как элемент имеющий высоту
        const dataValueList = dataList[offset + index] ? Object.values(dataList[offset + index]) : tableFieldListHTML.map(() => "\u00a0") 
        for (let j = 0; j < tableFieldListHTML.length; j++) {
            tableFieldListHTML[j].children[0].textContent = dataValueList[j] // Присвоить нужные значения
        }
    });
}
    //Обновление меню пагинации
function fillPagination(countPages, currentPage) {
        // Оставить только показанные кнопки
    const showButtonListHTML = paginationButtonListHTML.filter(buttonHTML => {
        return getComputedStyle(buttonHTML, null).display !== "none"
    });
        // Если кол-во страниц меньше чем кол-во кнопок то скрыть ненужные
    if (countPages <= showButtonListHTML.length) {
        const hiddenButtonListHTML = showButtonListHTML.splice(countPages)
        hiddenButtonListHTML.forEach(buttonHTML => {
            buttonHTML.style.display = "none"
        });
    }
    const countButton = showButtonListHTML.length // Количество кнопок равно длине массива показанных кнопок

    let firstNumber = null  // Первое число в списке кнопок

    if (currentPage < ((countButton / 2) + 1)) { // Если ряд кнопок прижат слева
        firstNumber = 1
    }
    else if (countPages - currentPage < countButton / 2) { // Если ряд кнопок прижат справа
        firstNumber = countPages - countButton + 1
    }
    else {                                                  // В остально случае текущая страница посередине
        firstNumber = currentPage - Math.floor(countButton / 2)
    }
        // Заполнение кнопок их ссылками
    showButtonListHTML.forEach((buttonHTML, index) => {
        const buttonNumber = firstNumber + index
        buttonHTML.textContent = buttonNumber
        buttonHTML.name = buttonNumber // Ссылка устанавливается на атрибут name
        if (buttonNumber === currentPage) {  // Отметка текущей страницы
            buttonHTML.classList.add("pagination__button_current")
        } else {
            buttonHTML.classList.remove("pagination__button_current")
        }
    });

        // Ссылки для боковых кнопок
    prevButtonHTML.name = currentPage - 1
    nextButtonHTML.name = currentPage + 1

        // Выключение боковых кнопок если текущаю страница граничная
    prevButtonHTML.disabled = currentPage <= 1
    nextButtonHTML.disabled = currentPage >= countPages
}
    // Загрузка данных
function getData(url) {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error))
}