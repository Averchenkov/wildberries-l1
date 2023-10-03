document.querySelector("form").addEventListener("submit", submitForm)

    // Отпрака стать на сервер
async function submitForm(event) {
    event.preventDefault()    // Отключение перезагрузки страницы
    const formHTML = this
    const titleHTML = formHTML.querySelector("#post-title")
    const bodyHTML = formHTML.querySelector("#post-body")
    
    if (titleHTML.value && bodyHTML.value) { // Если есть данные, отправка данны на серевер
        await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({ 
                title: titleHTML.value, 
                body: bodyHTML.value, 
                userId: 1 }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response) => response.json())
        .then((json) => alert("Ваша статья опубликована под номером " + json.id)); // Уведомление для пользователя
            // Обнуление ввода
        titleHTML.value = ""
        bodyHTML.value = ""
    }
}