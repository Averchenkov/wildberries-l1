function setItemWithLog(localStorageSize) {  
        // Приставки
    const kilo = 1024         
    const mega = 1024 * 1024

    return function() {
            // Подсчет занятого пространства по всем элементам в хранилище
        const sumLength =  Object.entries(localStorage).reduce((total, [key, item]) => {
            return total + item.length
        }, 0)
    

        const procentOccupid = (sumLength / localStorageSize * 100).toFixed(1) + " %" // Процент занятости
        const occupidSpace = Math.round(sumLength/ kilo) + " Кбайт"                   // Занятое пространство
        const localStorageCapacity = Math.round(localStorageSize/ mega) + " Мбайт"    // Объем всего хранилища
    
        console.log(`Хранилище занято на ${procentOccupid} (${occupidSpace} / ${localStorageCapacity})`);
        
        this.setItem(...arguments)
    }
}

export default setItemWithLog