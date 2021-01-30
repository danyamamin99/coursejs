"use strict";

const numberOfFilms = +prompt("Сколько фильмов вы уже посмотрели?", "");

const personalMovieDB = {
  count: numberOfFilms,
  movies: {},
  actors: {},
  genres: [],
  privat: false
};

const filmOne = prompt("Один из последних просмотренных фильмов?", "");
const ratingOne = +prompt("На сколько оцените его?", "");
const filmTwo = prompt("Один из последних просмотренных фильмов?", "");
const ratingTwo = +prompt("На сколько оцените его?", "");

personalMovieDB.movies[filmOne] = ratingOne;
personalMovieDB.movies[filmTwo] = ratingTwo;

console.log(personalMovieDB);