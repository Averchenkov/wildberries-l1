
    // Класс
    class Animal { 
        constructor(a, b) {
            this.a = a
            this.b = b
        }
        voise() {
            return "voice"
        }
        set addC(c) {
            this.c = c
        }
    }
    
        // Генератор
    function* idMaker() {
        var index = 0;
        while (true) yield index++;
    }
    
        // Всевозможные типы
    const n1_string = "foo"
    const n2_newString = new String("esf")
    const n3_boolean = true
    const n4_newBoolean = new Boolean(true)
    const n5_bigint = 1n
    const n6_objBigint = Object(1n)
    const n7_number = 1
    const n8_newNumber = new Number(1)
    const n9_float = 1.2
    const n10_newFloat32 = new Float32Array(1.2)
    const n11_NaN = NaN
    const n12_newNaN = new Number(NaN)
    const n13_infinity = Infinity
    const n14_newInfinity = new Number(Infinity)
    const n15_undefined = undefined
    const n16_simbol = Symbol()
    const n17_function = function(){}
    const n18_newFunction = new function(){}
    const n19_date = new Date()
    const n20_invalidDate = new Date("esf")
    const n21_null = null
    const n22_object = {}
    const n23_newObject = new Object({})
    const n24_array = [1, 3]
    const n25_newArray = new Array([1, 3])
    const n26_Map = new Map()
    const n27_Set = new Set()
    const n28_WeakMap = new WeakMap()
    const n29_WeakSet = new WeakSet()
    const n30_Promise = Promise.resolve().then(() => 1)       
    const n31_newPromise =new Promise(resolve=>{ resolve() })                            
    const n32_class = new Animal()
    const n33_iter =n1_string[Symbol.iterator]()
    const n34_gen = idMaker();
    
        // Объект с переменными
    const testObject = {
        n1_string, n2_newString, n3_boolean, n4_newBoolean, n7_number, n8_newNumber, n9_float, n10_newFloat: n10_newFloat32, n11_NaN, n12_newNaN, n13_infinity, n14_newInfinity, n15_undefined, n16_simbol, n17_function, n18_newFunction, n19_date, n21_invalidDate: n20_invalidDate, n21_null, n22_object, n23_newObject, n24_array, n25_newArray, n26_Map, n27_Set, n28_WeakMap, n29_WeakSet, n30_Promise, n31_newPromise, n32_class, n33_iter, n34_gen
    }
        // Список с переменными
    const testArray = [
        n1_string, n2_newString, n3_boolean, n4_newBoolean, n7_number, n8_newNumber, n9_float, n10_newFloat32, n11_NaN, n12_newNaN, n13_infinity, n14_newInfinity, n15_undefined, n16_simbol, n17_function, n18_newFunction, n19_date, n20_invalidDate, n21_null, n22_object, n23_newObject, n24_array, n25_newArray, n26_Map, n27_Set, n28_WeakMap, n29_WeakSet, n30_Promise, n31_newPromise, n32_class, n33_iter, n34_gen
    ]
    
    const map = new Map()
    map.set(n5_bigint, n6_objBigint)
    map.set(n7_number, n8_newNumber)
    map.set(n9_float, n9_float)
    map.set(n10_newFloat32, n11_NaN)
    
    const weakMap = new WeakMap()
    weakMap.set(n12_newNaN, n13_infinity)
    weakMap.set(n14_newInfinity, n15_undefined)
    weakMap.set({ n12_newNaN, n13_infinity}, {n1_string, n2_newString})
    weakMap.set([ n12_newNaN, n13_infinity], [n1_string, n2_newString])
    
    const set = new Set() 
    set.add(n16_simbol)
    set.add(n17_function)
    set.add(n18_newFunction)
    set.add(n19_date)
    
    const weakSet = new WeakSet() 
    weakSet.add(n20_invalidDate)
    
    const cat = new Animal(n16_simbol, n24_array)
    const dog = new Animal(cat, {n15_undefined, n11_NaN})
    dog.addC = n21_null
    
        // Итератор
    let range = {
        from: 1,
        to: 5,
      
        [Symbol.iterator]() {
          this.current = this.from;
          return this;
        },
      
        next() {
          if (this.current <= this.to) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    
    const testArray2 = [
        {k: "eelke"},
        [],
        {
            range: null,
            n1_string,
            arr: [1, 2, n2_newString],
            func: n17_function 
        },
        [n3_boolean, n4_newBoolean, n10_newFloat32],
        {
            map: new Date(),
            set,
            cat
        },
        n16_simbol,
        weakMap,
        weakSet,
        n17_function,
        dog,
        ["fes", "efsn", "oeefl"]
    ]

const testList = [testObject, testArray, testArray2]

export default testList