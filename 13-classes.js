class Shape {
    constructor({ name }) {
        this.name = name
    }
    perimeter() {
    }
    area() {
    }
    toString() {  // Вывод результата
        console.log("Фигура - " + this.name);
        console.log("Периметр - " + this.perimeter())
        console.log("Площадь - " + this.area());
        console.log()
    }
}

class Rectangle extends Shape {
    constructor({ length, width }) {
        if (!length || !width) throw new Error("Введите правильно стороны прямоугольника")
        if (length <= 0 || width <= 0) throw new Error("Стороны прямоугольника должны быть положительными")
        super({ name: "прямоугольник" })
        this.length = length
        this.width = width
    }
    perimeter() {
        return (this.length + this.width) * 2
    }
    area() {
        return this.length * this.width
    }
}

class Circle extends Shape {
    constructor({ radius }) {
        if (!radius) throw new Error("Введите правильно радиус круга")
        if (radius <= 0) throw new Error("Радиус круга должн быть положительным")
        super({ name: "круг" })
        this.radius = radius
    }
    perimeter() {
        return 2 * Math.PI * this.radius
    }
    area() {
        return Math.PI * (this.radius ** 2)
    }
}

class Triangle extends Shape {
    constructor({ sideA, sideB, sideC }) {
        if (!sideA || !sideB || !sideC) throw new Error("Введите правильно стороны треугольника")
        if (sideA <= 0 || sideB <= 0 || sideC <= 0) throw new Error("Стороны треугольника должны быть положительными")
        if (!(sideA + sideB > sideC && sideB + sideC > sideA && sideC + sideA > sideB)) throw new Error("Такой треугольник не существует") // Треугольник существует только тогда, когда сумма двух его сторон больше третьей
        super({ name: "треугольник" })
        this.sideA = sideA
        this.sideB = sideB
        this.sideC = sideC
    }
    perimeter() {
        return this.sideA + this.sideB + this.sideC
    }
    area() {
        debugger
        const semiPerimetr = this.perimeter() / 2
        return Math.sqrt(semiPerimetr * (semiPerimetr - this.sideA) * (semiPerimetr - this.sideB) * (semiPerimetr - this.sideC))
    }
}

try {
    const rectangle = new Rectangle({ length: 31, width: 45 })
    const circle = new Circle({ radius: 34 })
    const triangle = new Triangle({ sideA: 5, sideB: 4, sideC: 2 })

    rectangle.toString()
    circle.toString()
    triangle.toString()
} catch (error) {
    console.log(error);
}

