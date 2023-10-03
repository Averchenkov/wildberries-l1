    // Создание поста из шаблона для 19 задачи
function createPostHTML(template, img, title, date, text, likeCount, repostCount, viewCount) {
    const postHTML = template.content.cloneNode(true) // Клонирвание шаблона
        // Заполнение данными
    const imgHTML = postHTML.querySelectorAll("img")[0]
    const titleHTML = postHTML.querySelector(".post__title").querySelector("a")
    const dateHTML = postHTML.querySelector("time")
    const textHTML = postHTML.querySelector(".post__text")
    const likeCountHTML = postHTML.querySelector(".post__like-count")
    const repostCountHTML = postHTML.querySelector(".post__repost-count")
    const viewCountHTML = postHTML.querySelector(".post__views-count")
    
    imgHTML.attributes.src.value = img
    titleHTML.textContent = title
    dateHTML.textContent = date
    textHTML.textContent = text
    likeCountHTML.textContent = likeCount
    repostCountHTML.textContent = repostCount
    viewCountHTML.textContent = viewCount
    return postHTML
}

export default createPostHTML