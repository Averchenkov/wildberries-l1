function createDomElement(tag, color, width, height) {
    const element = document.createElement(tag) // Создать елемент
    element.style.backgroundColor = color  // Добавить цвет
    element.style.width = width + "px"    // Определить размер
    element.style.height = height + "px"
    return element
}

export default createDomElement