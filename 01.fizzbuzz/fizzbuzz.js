const fizz_buzz = (num) => {
  if (num % (3 * 5) === 0) {
    return "FizzBuzz";
  } else if (num % 3 === 0) {
    return "Fizz";
  } else if (num % 5 === 0) {
    return "Buzz";
  } else {
    return num;
  }
}

console.log(fizz_buzz(1))
console.log(fizz_buzz(3))
console.log(fizz_buzz(5))
console.log(fizz_buzz(15))