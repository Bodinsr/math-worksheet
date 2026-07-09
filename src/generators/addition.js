function hasCarry(a, b) {
  while (a > 0 || b > 0) {
    const digitA = a % 10;
    const digitB = b % 10;

    if (digitA + digitB >= 10) {
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

export function generateAddition(options) {
  const { count, digits, type } = options;

  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    const a = randomNumber(digits);
    let bDigits = 1;

    if (digits === 2) {
      bDigits = Math.random() < 0.5 ? 1 : 2;
    } else if (digits >= 3) {
      bDigits = Math.floor(Math.random() * (digits - 1)) + 2;
    }

    const b = randomNumber(bDigits);

    const key = `${a}+${b}`;

    if (used.has(key)) continue;

    const carry = hasCarry(a, b);

    if (type === "ไม่มีตัวทด" && carry) continue;

    if (type === "มีตัวทด" && !carry) continue;

    used.add(key);

    questions.push({
  id: questions.length + 1,
  left: a,
  operator: "+",
  right: b,
  answer: a + b,
  type: carry ? "มีตัวทด" : "ไม่มีตัวทด",
});
  }

  return questions;
}