function sortUserLsit(prevUser, nextUser) {          // Для сортировки сравниваем два объекта предыдущий и следующий
    if (prevUser.age > nextUser.age) return 1        // Предыдущий по возрасту больше, тогда его ставим вперед
    if (prevUser.age < nextUser.age) return -1       // В противном случае, ствим назад
    if (prevUser.name > nextUser.name) return 1;     // Если возраст равен, сравниваем по имени
    if (prevUser.name < nextUser.name) return -1;    //
    if (prevUser.name === nextUser.name) return 0;   // Если имена одинаковые, то ничего не делаем   
}

const userList = [
    {
        name: "John",
        age: 25
    },
    {
        name: "Alex",
        age: 31
    },
    {
        name: "Chris",
        age: 31
    },
    {
        name: "Linda",
        age: 43
    },
    {
        name: "Candy",
        age: 31
    }
]

const sortedUserList = userList.sort(sortUserLsit)  // Сортировка

console.log(sortedUserList);