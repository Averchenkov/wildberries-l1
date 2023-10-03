function loadingImage() {
    fetch("https://loremflickr.com/320/240/dog") // Случайная картинка
        .then(resposnse => {  
            console.log("Начало загрузки изображения");
            if (!resposnse.ok) return Promise.reject(resposnse.error)
            return resposnse.blob() // Конвертирование в файл
        })
        .then(imageBlob => {
            console.log("Взаимодействие с изображением");
            const image = URL.createObjectURL(imageBlob); // Получение картинки из файла
            console.log(image);
        })
        .then(() => {
            console.log("Промис разрешается с данными об изображении");
        })
        .catch((error) => {
            console.log(error);
        })
}

loadingImage()