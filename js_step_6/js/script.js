/* Задания на урок:
1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.
2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки
3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)
4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"
5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };

    const   promosAdv = document.querySelectorAll('.promo__adv img'),
            genre = document.querySelector('.promo__genre'),
            promoBg = document.querySelector('.promo__bg'),
            movieList = document.querySelector('.promo__interactive-list'),
            addingInput = document.querySelector('.adding__input'),
            addForm = document.querySelector('.add'),
            checkbox = document.querySelector("input[type='checkbox']");

    const removeAdv = (arr) => {
        arr.forEach(item => item.remove());
    };

    const makeChanges = () => {
        genre.textContent = 'драма';
        promoBg.style.backgroundImage = "url('img/bg.jpg')";
    };

    const sortArr = (arr) => {
        arr.sort();
    };

    const showMovies = (films, parent) => {
    
        sortArr(films);
        parent.innerHTML = '';

        films.forEach((item, i) => {
            parent.insertAdjacentHTML('beforeend', 
                `<li class="promo__interactive-item">
                    ${i + 1}. ${item}
                    <div class="delete"></div>
                </li>`
            );
        });

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                films.splice(i, 1);
                
                showMovies(movieDB.movies, movieList);
            });
        });
    };

    const addFilm = (event) => {
        event.preventDefault();

        let film = addingInput.value;
        const favorite = checkbox.checked;

        if (film) {
            if (film.length > 21) { film = `${film.slice(0, 21)}...`; }
            if (favorite) { console.log("Добавляем любимый фильм"); } 

            movieDB.movies.push(film);
            showMovies(movieDB.movies, movieList);

            addForm.reset();
        }
    };

    removeAdv(promosAdv);
    makeChanges();
    showMovies(movieDB.movies, movieList);

    addForm.addEventListener('submit', addFilm);

});

