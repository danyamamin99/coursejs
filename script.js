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

const wrapper = document.querySelector('.wrapper');

const st = () => {
  const box = document.querySelector('.box');
  let count = 0;

  countPlus();
  
  const id = setInterval(countPlus, 800);
  
  function countPlus() {
    if (count >= 420) {
      clearInterval(id);
    } else {
      count += 4 * 2;
      box.textContent = count;
    }
  }
};

st();