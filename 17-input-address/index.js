const inputAddressHTML = document.getElementById("address")        //  Поле ввода адресса
const suggestionsListHTML = document.getElementById("suggestions") //  Блок с подсказсками 

inputAddressHTML.addEventListener("input", debounce(inputAddressHandler, 1500)) // дебоунсинг ввода

function debounce(func, timeout = 1000){
    let timer;
    return function(...args) {
        clearTimeout(timer)          // Удаление таймера
        timer = setTimeout(() => {   // Задание нового таймера
            func.apply(this, args)
        }, timeout)
    };
}

async function inputAddressHandler() {
    value = this.value
    const suggestionsList = await getSuggestions(value)  // Получение подсказок
    renderSuggestionList(suggestionsList)                // Вывод подсказок
}

function renderSuggestionList(list) {
    suggestionsListHTML.innerHTML = ''                     // Очищение блока
    for (const suggest of list) {                          // Цикл по подсказкам
        const listElement = document.createElement("li")   // Создание элемента списка подскзок 
        listElement.textContent = suggest.value            // Заполнение элемента
        listElement.addEventListener("click", function() { // Клик по элементу => алерт с выбранным
            alert("Вы выбрали - " + this.textContent)
        })
        suggestionsListHTML.appendChild(listElement)        // Добавление элемента
    }
}

async function getSuggestions(query) {
    if (!query) return
    const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    const token = "d09e4a10cf2e4e16ca7a9f3a40af074511bf5720";

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({ query })
    }

    return fetch(url, options)
        .then(response => response.json())
        .then(data => data.suggestions)
        .catch(error => console.log("error", error));
}