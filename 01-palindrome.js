function isPalindrome(string) {
    if (!string) return false   // Проверка на получение строки
    if  (typeof string !== "string") return false  // Проверка, что получили строку
    string = string.replace(/\s/g, "");   // Избавление от пробелов, переходов на другую строку
    const strReverse = string.split("").reverse().join("")  // Переворачиваем строку
    return string === strReverse    // Если строка равна перевернутой, то это палиндром
}

console.log(isPalindrome("  "))
console.log(isPalindrome({}))
console.log(isPalindrome(43))
console.log(isPalindrome(null))
console.log(isPalindrome("аргентина манит"))
console.log(isPalindrome("аргентина манит негра"))