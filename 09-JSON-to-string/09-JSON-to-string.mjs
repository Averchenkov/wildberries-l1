import stringify from "./stringify.mjs";
import testList from "./test-data.mjs";

// Сравнение JSON.stringify и stringify
testList.forEach(test => {
    const string = JSON.stringify(test) 
    console.log(string);

    const myString = stringify(test)
    console.log(myString);

    if(string === myString) {
        console.log("Успешно");
    }
    console.log()
})