/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const   promos = document.querySelectorAll('.promo__adv img'),
        genre = document.querySelector('.promo__genre'),
        promoBg = document.querySelector('.promo__bg'),
        movieList = document.querySelector('.promo__interactive-list');

promos.forEach(item => item.remove());
genre.textContent = 'драма';
promoBg.style.backgroundImage = "url('img/bg.jpg')";

movieDB.movies.sort();

movieDB.movies.forEach((item, i) => {
    movieList.insertAdjacentHTML('beforeend', 
        `<li class="promo__interactive-item">
            ${i + 1}. ${item}
            <div class="delete"></div>
        </li>`
    );
});

// Альтернативный вариант
// movieDB.movies.sort().forEach((item,i) => {
//     let li = document.createElement('li');
//     let div = document.createElement('div');

//     li.classList.add('promo__interactive-item');
//     div.classList.add('delete');

//     li.textContent = `${i + 1}. ${item}`;
//     li.append(div);

//     movieList.append(li);
// });

