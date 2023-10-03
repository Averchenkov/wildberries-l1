async function asyncFunction() {
    await new Promise(resolve => {
        setTimeout(() => {
            console.log("first");
            resolve()
        }, 0)
    })

    await Promise.resolve().then(() => console.log("second"))

    console.log("third");
}
 
// Если применять await к самим promise и setTimeout, то из можно вызывать последовательно

asyncFunction()