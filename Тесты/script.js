// const btn = document.querySelector('.btn');
// const myAnimation = () => {

//   const box = document.querySelector('.box');
//   let pos = 0;
//   let id = setInterval(frame, 100);

//   function frame() {
//     if (pos == 300) {
//       clearInterval(id);
//     } else {
//       pos += 10;
//       box.style.left = pos + "px";
//       box.style.top = pos + "px";
//     }
//   }
// };

// btn.addEventListener('click', myAnimation);

// const wrapper = document.querySelector('.wrapper');

// const st = () => {
//   const box = document.querySelector('.box');
//   let count = 0;

//   countPlus();
  
//   const id = setInterval(countPlus, 800);
  
//   function countPlus() {
//     if (count >= 420) {
//       clearInterval(id);
//     } else {
//       count += 4 * 2;
//       box.textContent = count;
//     }
//   }
// };

// st();

// const inputRUB = document.querySelector('#rub'); 
// const inputUSD = document.querySelector('#usd'); 

// inputRUB.addEventListener('input', () => {
//   const request = new XMLHttpRequest();

//   request.open('GET', 'js/current.json');
//   request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
//   request.send();

//   request.addEventListener('load', () => {
//     if (request.status === 200) {
//       const data = JSON.parse(request.response);
//       inputUSD.value = (inputRUB.value / data.current.usd).toFixed(1);
//     } else {
//       inputUSD.value = `Ошибка...`;
//     }
//   });

// });

// setTimeout(() => {
  //   console.log('Данные получены..');
  
  //   const product = {
    //     name: 'TV',
    //     price: 2000
    //   };
    
    //   setTimeout(() => {
      //     console.log('Вывод данных..');
      //     console.log(product);
      //   }, 2000);
      
      // }, 2000);
      
// console.log('Запрос данных..');

// const promise = new Promise((resolve, reject) => {

//   setTimeout(() => {
//     console.log('Подготовка данных...');

//     const product = {
//       name: 'TV',
//       price: 2000
//     };

//     resolve(product);
//   }, 2000);

// });

// promise.then((product) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(product);
//       resolve(product);
//     }, 2000);
//   });
// }).then((data) => {
//     console.log('2');
//     data.value = 3;
//     return data;
// }).then((data) => {
//   console.log('3');
//   console.log(data);
// });
// .catch() .finally()
// Свойства Promise.all() - проверяет все ли промисы готовы
// Свойство Promise.race() - кто быстрее выполнился

// const test = (time) => {
//   return new Promise(res => {
//     setTimeout(() => res(), time);
//   });
// };
// test(5000).then(() => console.log('5000'));
// test(7000).then(() => console.log('7000'));

// Promise.race([test(3000), test(5000)]).then(() => console.log('race'));
// Promise.all([test(3000), test(5000)]).then(() => console.log('all'));


// let filter = [2000, 100, 400, 5000].filter(item => {
//   console.log(item);
//   return item < 500
// });
// console.log(filter);

// let map = ['arr', 'new', 'ArR'].map(item => item.toLowerCase());
// console.log(map);

// let reduce = [3, 2, 5].reduce((sum, value) => sum + value, 5);
// console.log(reduce);

// let some = ['2', 5, 'asdsa'].some(item => typeof(item) == 'number');
// console.log(some);

// let every = ['2', 5, 'asdsa'].every(item => typeof(item) == 'number');
// console.log(every);


// РЕГУЛЯРНЫЕ ВЫРАЖЕНИЯ
// console.log('Ann'.search(/t/));
// console.log('Ann'.match(/N/ig));
// console.log('An.n.'.replace(/\./g, '*'));
// console.log('MY NAME R2D2'.match(/\W/g));

// class User {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   static n = 0;
//   #surname = 'Mamin';

//   static inc() {
//     return this.n++;
//   }

//   say () {
//     console.log(`${this.name} ${this.#surname}, ${this.age}`);
//   }

//   get surname() {
//     return this.#surname;
//   }
//   set surname (sn) {
//     this.#surname = sn;
//   }

// }

// class R extends User {
//   sss () {
//     console.log('f');
//   }
// }

// const dm = new User('Danya', 21);
// dm.say();
// // console.log(dm.surname);
// dm.surname = 'MAMIN';
// dm.say();
// console.log(User.inc());
// console.log(User.n);
// console.log(R.n);
// console.log(User.inc());
// console.log(User.n);
// console.log(R.n);
// console.log(dm.n); // undefined
