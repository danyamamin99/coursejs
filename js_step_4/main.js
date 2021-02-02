// "use strict";
/* Задание на урок:
1) У нас уже есть рабочее приложение, состоящее из отдельных функций. Представьте, что
перед вами стоит задача переписать его так, чтобы все функции стали методами объекта personalMovieDB
Такое случается в реальных продуктах при смене технологий или подхода к архитектуре программы
2) Создать метод toggleVisibleMyDB, который при вызове будет проверять свойство privat. Если оно false - он
переключает его в true, если true - переключает в false. Протестировать вместе с showMyDB.
3) В методе writeYourGenres запретить пользователю нажать кнопку "отмена" или оставлять пустую строку. 
Если он это сделал - возвращать его к этому же вопросу. После того, как все жанры введены - 
при помощи метода forEach вывести в консоль сообщения в таком виде:
"Любимый жанр #(номер по порядку, начиная с 1) - это (название из массива)"*/

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        this.count = prompt("Сколько фильмов вы уже посмотрели?", "");

        while (this.count == "" || this.count == null || isNaN(this.count)) {
            this.count = prompt("Сколько фильмов вы уже посмотрели?", "");
        }
    },
    rememberMyFilms: function() {
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
    },
    detectPersonalLevel: function() {
        if (personalMovieDB.count <= 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (personalMovieDB.count > 10 && personalMovieDB.count <= 30) {
            console.log("Вы классический зритель");
        } else if (personalMovieDB.count > 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }          
    },
    writeYourGenres: function() {
        for (let i = 1; i <= 3; i++) {
            const a = prompt(`Ваш любимый жанр под номером ${i}`, "");
            (a != "" && a != null) ? personalMovieDB.genres.push(a) : i--;
        }
        // Альтернативный вариант из урока
            
        // let genres = prompt(`Введите ваши любимые жанры через запятую`).toLowerCase();

        // if (genres === '' || genres == null) {
        //     console.log('Вы ввели некорректные данные или не ввели их вовсе');
        //     i--;
        // } else {
        //     personalMovieDB.genres = genres.split(', ');
        //     personalMovieDB.genres.sort();
        // } 

        this.genres.forEach((item, i) => {
            console.log(`Любимый жанр ${i + 1} - это ${item}`);
        });
    },
    showMyDB: function() {
        if (!personalMovieDB.privat) {
            console.log(personalMovieDB);
        }
    },
    toggleVisibleMyDB: function() {
        if (this.privat) { this.privat = false; } 
        else { this.privat = true; }
    },
};