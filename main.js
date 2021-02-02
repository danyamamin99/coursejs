const obj = {
  a: 11,
  b: 22
};

const newObj = Object.create(obj);
// Object.setPrototypeOf(newObj, obj);
console.log(newObj.a);
console.log(newObj.b);
newObj.a = 123;
console.log(newObj);
console.log(obj);
