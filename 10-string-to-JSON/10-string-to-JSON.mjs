import stringify from "../09-JSON-to-string/stringify.mjs";
import testList from "../09-JSON-to-string/test-data.mjs";
import parse from "./parse.mjs";

// Сравнение JSON.parse и parse
testList.forEach(test => {
    const string = JSON.stringify(test)
    const myString = stringify(test)

    if(string === myString) {
        console.log("Успешно");
    }

    const object = JSON.parse(string)
    console.log(object);
    
    const myObject = parse(myString)
    console.log(myObject);
        
    console.log()
})