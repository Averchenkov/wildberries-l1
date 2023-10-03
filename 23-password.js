function passwordАnalysis(password) {
        // Критерии оценки - главный длина пароля, остальные тоже важны, но не так важно их количество, как наличие -  //https://cyberleninka.ru/article/n/analiz-nadezhnosti-paroley-dlya-zaschity-dannyh/viewer
    let lengthRaiting = 0           // Длина - от 0 до 6 баллов
    let upperCaseRating = 0         // Большой регистр - 1 балл
    let lowerCaseRating = 0         // Малый регистр - 1 балл
    let numberRating = 0            // Наличие чисел - 1 балл
    let specialCharRating = 0       // Наличие спец. символов - 1 балл
                                    // В сумме - 10 баллов
    const improvementList = []      // Список улучшений

    // Проверка, что длина пароля больше чем заданная в  массиве
    const lenf = [6, 8, 11, 14, 17, 20]
    lenf.forEach(limtLength => {
        if (password.length >= limtLength) {
            lengthRaiting += 1
        }
    });  

    if (lengthRaiting < 6) {  // Не максимальна длина
        improvementList.push("Повысте длину пароля")
    }

        // Проверка на наличие высокго регистра
    if (password === password.toUpperCase()) {
        upperCaseRating = 1
    } else {
        improvementList.push("Используйте заглавные буквы")
    }
        // Проверка на наличие малого регистра
    if (password  === password.toLowerCase()) {
        lowerCaseRating = 1
    } else {
        improvementList.push("Используйте прописные буквы")
    }
        // Проверка на наличие числа
    if ((/\d/).test(password)) {
        numberRating = 1
    } else {
        improvementList.push("Используйте цифры")
    }
        // Проверка на наличие спец. символа
    if ((/[^\w\d]/i).test(password)) {
        specialCharRating = 1
    } else {
        improvementList.push("Используюте спец символы (пример: .:,;?!@$%")
    }

    const grade = lengthRaiting + upperCaseRating + lowerCaseRating + numberRating + specialCharRating // Оценка 1 - 10, сумма критериев
    const result = grade >= 6 ? "надежный" : "не надежный" // Определение надежности 

    return { grade, improvementList, result }
}

console.log(passwordАnalysis("password"))


