import getLocalStorageSize from "../18-local-storage/localStorageSize.mjs"
import setItemWithLog from "../20-loacal-storage-log-size.mjs"
import createPostHTML from "../28-template.mjs"

const token = "5feebbcf5feebbcf5feebbcfc65cfb004755fee5feebbcf3ae18c10470cb6a6ecd5d6e2"
const groupId = "wicked.humor"
const proxy = "https://corsanywhere-nicroniys.b4a.run/"    // Мой прокси для обхода cors ошибок
const vkWidgetHTML = document.getElementById("vk-widget")  // Виджет
const postTemplate = document.getElementById("vk-post")    // Шабло поста
const localStorageSize = getLocalStorageSize()             // Размер хранилилща

Storage.prototype.setItemWithLog = setItemWithLog(localStorageSize)  // Добавление в протоип хранилища функцию логирования из 20 задания

vkWidgetHTML.addEventListener('scroll', debounce(async function() {  // По скролу рассчитывается расстояние до нижней границы виджета
    const scrollableHeight = this.scrollHeight - this.clientHeight
    const scrollBottom = scrollableHeight - this.scrollTop
    localStorage.setItemWithLog("scrollBottom", scrollBottom)      // Сохранения этого значения чтобы при перезагрузке вернуться к этому месту

    if (scrollBottom <= 5) { // Если уже практически конец, загрузка новых постов
        await addPosts()
    }
}))

function debounce(func, timeout = 500){
    let timer;
    return function(...args) {
        clearTimeout(timer)
        timer = setTimeout(() => { 
            func.apply(this, args)
        }, timeout)
    };
}

    // Получить посты по токену, домену сообщества, смещению и количеству
function getPosts(token, domain, offset, count) {
    const url = `https://api.vk.com/method/wall.get?` +
        `access_token=${token}&` +
        `domain=${domain}&` +
        `offset=${offset}&` +
        `count=${count}&` +
        `v=5.150`

    return fetch(proxy + url)
        .then(response => response.json())
        .then(data => data.response.items)
        .catch(error => console.error(error))
}
// Получение группы по id
function getGroupById(token, id) {
    const url = `https://api.vk.com/method/groups.getById?` +
        `access_token=${token}&` +
        `group_id=${id}&` +
        `v=5.150`

    return fetch(proxy + url)
        .then(response => response.json())
        .then(data => data.response.groups[0])
        .catch(error => console.error(error))
}

async function addPosts() {
    const posts = JSON.parse(localStorage.getItem("posts"))  // Посты из кэша
    const group = JSON.parse(localStorage.getItem("group"))  // Группа из кэша
    const offset = parseInt(localStorage.getItem("offset"))  // Смещение из кэша
    const newPosts = await getPosts(token, groupId, offset, 30)

        // Загрузка новых постов в кэш
    function stuffingPosts() { 
        try {
            localStorage.setItemWithLog("posts", JSON.stringify([...posts, ...newPosts])) // Обновление списка постов добавлением новых
            localStorage.setItemWithLog("offset", String(offset + 30)) // Обновление смещения
        } catch (error) {
            posts.splice(0, 30) // Если добавить не получается, то удалем старые, в самом начале
            stuffingPosts()     // Повтор обновления
        }
    }
    stuffingPosts()
    
        // Показ новых постов
    newPosts.forEach(post => {      
        if (!post.text) return
        const postHTML = renderPost(post, group)
        vkWidgetHTML.appendChild(postHTML)
    });
}

    // Отрисовка виджета
async function renderWidget() {
    let posts = JSON.parse(localStorage.getItem("posts"))  // Загрузка постов из кэша
    let group = JSON.parse(localStorage.getItem("group"))  // Загрузка группы из кэша
    const scrollBottom = parseInt(localStorage.getItem("scrollBottom"))  // Загрузка последней точки остановки относительно дна виджета

        //Если нет постов или группы, то загрузить новые и записать в кэш
    if (!posts) {
        posts = await getPosts(token, groupId, 0, 30)
        localStorage.setItemWithLog("posts", JSON.stringify(posts))
        localStorage.setItemWithLog("offset", "30")
    }
    if (!group) {
        group = await getGroupById(token, groupId)
        localStorage.setItemWithLog("group", JSON.stringify(group))
    }
        // Показ постов
    posts.forEach(post => {  
        if (!post.text) return
        const postHTML = renderPost(post, group)
        vkWidgetHTML.appendChild(postHTML)
    });

        // Установка окна на последнею точку остановки
    if (scrollBottom) {
        const scrollableHeight = vkWidgetHTML.scrollHeight - vkWidgetHTML.clientHeight
        const scrollTop = scrollableHeight > scrollBottom ? scrollableHeight - scrollBottom : 0
        vkWidgetHTML.scrollTo(0, scrollTop)
    }
}

renderWidget()

    // Отрисовка поста
function renderPost(post, group) {
    const img = group.photo_50 
    const title = group.name 
    const date = new Date(post.date * 1000) // Конвертирование из unix timestamp в дату
    let dateString = date.toLocaleDateString("ru", {"day": "numeric" , "month": "short"}).slice(0, -2)
    dateString += " в "
    dateString += date.toLocaleTimeString("ru", {"hour": "numeric", "minute": "numeric"})
    const text = post.text
    const likeCount = post.likes.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " "); // Добавление пробелов через каждые 3 цифры -  3 342 982
    const repostCount = post.reposts.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    let viewCount = post.views.count
    if (viewCount > 1000) {
        viewCount = Math.round(viewCount / 1000) + "К" // Округление до тысячи
    }
    // Функция созданния поста из шаблона для 28 задания
    return createPostHTML(postTemplate, img, title, dateString, text, likeCount, repostCount, viewCount)
}