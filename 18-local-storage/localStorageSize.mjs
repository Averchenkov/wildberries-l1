function getLocalStorageSize() {
    const byte = "b"           // 1 байт
    const mega = 1024 * 1024   // приставка мега
    const key = "bytes"        // ключ для localStorage

    // Заполнение происходит от большего к меньшему пока есть пространство
    function fillLocalStorage(count) {
        if (count < 1) return              // и пока исть что складывать

        try {
            while(true) {
                const prevData = localStorage.getItem(key)
                localStorage.setItem(key, prevData + byte.repeat(count))  // Заполнение байтами 
            }
        } catch {
            fillLocalStorage(count / 2)  // Если больше не вмещается, то заполять в два раза меньше 1Mb -> ... -> 1byte
        }
    }
    
    // Заполнение мегабайтами
    fillLocalStorage(mega)
    // Ссумирование значений хранилища по всем ключам
    const size =  Object.entries(localStorage).reduce((total, [key, item]) => {
        return total + item.length
    }, 0)
    console.log(`Максимальный объем данных в localStorage: ${Math.round(size / mega)} Мбайт`)
    localStorage.removeItem(key)  // Очищение
    return size
}

export default getLocalStorageSize