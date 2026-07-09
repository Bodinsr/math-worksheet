function hasBorrow(a, b) {
  while (a > 0 || b > 0) {
    const digitA = a % 10;
    const digitB = b % 10;

    if (digitA < digitB) {
      return true;
    }

    a = Math.floor(a / 10);
    b = Math.floor(b / 10);
  }

  return false;
}

function randomNumber(digits) {
  const min = digits === 1 ? 1 : Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateSubtraction(options) {
  const { count, digits, type } = options;

  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    let a = randomNumber(digits);
    let b = 0;

    do {
      let bDigits = 1;

      if (digits === 2) {
        bDigits = Math.random() < 0.5 ? 1 : 2;
      } else if (digits >= 3) {
        bDigits = Math.floor(Math.random() * (digits - 1)) + 2;
      }

      b = randomNumber(bDigits);
    } while (b > a);

    const key = `${a}-${b}`;

    if (used.has(key)) continue;

    const borrow = hasBorrow(a, b);

    if (type === "ไม่มียืม" && borrow) continue;

if (type === "มียืม" && !borrow) continue;

    used.add(key);

    questions.push({
  id: questions.length + 1,
  left: a,
  operator: "-",
  right: b,
  answer: a - b,
  type: borrow ? "มียืม" : "ไม่มียืม",
});
  }

  return questions;
}
