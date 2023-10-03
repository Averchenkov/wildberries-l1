const spinner = document.getElementById("spinner")

    // Раскрутить элемент
function spin(element) {
    element.style.animation = "element 0.7s linear infinite" // Добавить анимацию линейную, бесконечную
    const css = window.document.styleSheets[0];  // Добавить аниацию поворота на 360 градусов
    css.insertRule(`                            
    @keyframes element {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }`, css.cssRules.length);
}

spin(spinner)