"use strict";
/* Задание на урок:
1) Первую часть задания повторить по уроку
2) Создать функцию showMyDB, которая будет проверять свойство privat. Если стоит в позиции
false - выводит в консоль главный объект программы
3) Создать функцию writeYourGenres в которой пользователь будет 3 раза отвечать на вопрос 
"Ваш любимый жанр под номером ${номер по порядку}". Каждый ответ записывается в массив данных
genres
P.S. Функции вызывать не обязательно */

let numberOfFilms;

function start() {
    numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?", "");

    while (numberOfFilms == "" || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = prompt("Сколько фильмов вы уже посмотрели?", "");
    }
}

start();

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};


function rememberMyFilms() {
    let film, rating, i = 1;
    
    do {
        film = prompt("Один из последних просмотренных фильмов?", "");
        rating = prompt("На сколько оцените его?", "");
    
        if (film != "" && rating != "" && film.length < 50 && film != null && rating != null) {
            personalMovieDB.movies[film] = rating;
            i++;
        } else {
            alert("Введите название фильма! И не отменяйте вопрос!");
        }
    } while (i <= 2);
}

function  detectPersonalLevel() {
    if (personalMovieDB.count <= 10) {
        console.log("Просмотрено довольно мало фильмов");
    } else if (personalMovieDB.count > 10 && personalMovieDB.count <= 30) {
        console.log("Вы классический зритель");
    } else if (personalMovieDB.count > 30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }          
}

function writeYourGenres() {
    for (let i = 1; i <= 3; i++) {
        const a = prompt(`Ваш любимый жанр под номером ${i}`, "");
        
        (a != "" && a != null) ? personalMovieDB.genres.push(a) : i--;
    }
}

function showMyDB() {
    if (!personalMovieDB.privat) {
        console.log(personalMovieDB);
    }
}

rememberMyFilms();
detectPersonalLevel();
writeYourGenres();
showMyDB();