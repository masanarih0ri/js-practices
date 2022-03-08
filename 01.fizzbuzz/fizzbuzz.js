const fizzBuzz = (num) => {
  if (num % (3 * 5) === 0) {
    return 'FizzBuzz'
  } else if (num % 3 === 0) {
    return 'Fizz'
  } else if (num % 5 === 0) {
    return 'Buzz'
  } else {
    return num
  }
}

for (let i = 1; i <= 20; i++) {
  console.log(fizzBuzz(i))
}
