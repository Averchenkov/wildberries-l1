import endingsOfTheWord from "./endingsOfTheWord.mjs";

console.log(endingsOfTheWord(1, {
    nominativeSingular: "сообщение",
    genitiveSingular: "сообщения",
    genitivePlural: "сообщений"
}));

console.log(endingsOfTheWord(1024, {
    nominativeSingular: "пользователь",
    genitiveSingular: "пользователя",
    genitivePlural: "пользователей"
}));