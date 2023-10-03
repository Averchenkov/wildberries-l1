const barbieBook = Object.create(
    {
        // Методы для полученя и изминения значений свойств книги
        getName() {
            return `♡ ${this.name} ♡`
        },
        setName(name) {
            name = name.toLowerCase()
            debugger
            if (!name.includes("барби") && !name.includes("barbie")) throw new Error("Книга должна быть про Барби!")
            this.name = name
        },
        getAuthor() {
            return `Автор - ${this.author}`
        },
        setAuthor(author) {
            this.author = author
        },
        getPublishingYear() {
            return `Год издания - ${this.publishingYear}`
        },
        setPublishingYear(publishingYear) {
            if (publishingYear > new Date().getFullYear()) throw new Error("Такой год еще не наступил!")
            if (publishingYear < 1454) throw new Error("В этом году еще не начали печатать книги!") // https://www.rsl.ru/ru/about/projects/biblia-gutenberga-2019/exhibits/bibliya-gutenberga#:~:text=%232-,%D0%91%D0%B8%D0%B1%D0%BB%D0%B8%D1%8F%20%D0%93%D1%83%D1%82%D0%B5%D0%BD%D0%B1%D0%B5%D1%80%D0%B3%D0%B0%20%E2%80%94%20%D0%BF%D0%B5%D1%80%D0%B2%D0%B0%D1%8F%20%D0%BA%D1%80%D1%83%D0%BF%D0%BD%D0%BE%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%D0%BD%D0%B0%D1%8F%20%D0%BF%D0%B5%D1%87%D0%B0%D1%82%D0%BD%D0%B0%D1%8F%20%D0%BA%D0%BD%D0%B8%D0%B3%D0%B0%20%D0%B2%20%D0%B8%D1%81%D1%82%D0%BE%D1%80%D0%B8%D0%B8%20%D1%87%D0%B5%D0%BB%D0%BE%D0%B2%D0%B5%D1%87%D0%B5%D1%81%D1%82%D0%B2%D0%B0%2C%20%D0%B7%D0%BD%D0%B0%D0%BC%D0%B5%D0%BD%D1%83%D1%8E%D1%89%D0%B0%D1%8F,%D0%B8%20%D0%BF%D0%B5%D1%80%D0%B5%D0%BF%D0%BB%D0%B5%D1%82%D1%91%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%B2%20%D0%B4%D0%B2%D0%B0%20%D1%82%D0%BE%D0%BC%D0%B0.
            this.publishingYear = publishingYear
        }
    }, 
    {
        // Поля книги
        name: {
            value: "Барби. The Icon. Полная энциклопедия",
            writable: true,
        },
        author: {
            value: "Капелла Массимилиано",
            writable: true,
        },
        publishingYear: {
            value: 2018,
            writable: true,
        }
    }
)
try {
    console.log(barbieBook.getName());
    console.log(barbieBook.getAuthor());
    console.log(barbieBook.getPublishingYear());
    console.log();
    //barbieBook.setPublishingYear(2035)
    barbieBook.setName("Оппенгеймер. Триумф и трагедия Американского Прометея")

    
} catch (error) {
    console.log(error.message);   
}