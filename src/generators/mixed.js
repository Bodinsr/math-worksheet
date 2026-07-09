import { generateAddition } from "./addition";
import { generateSubtraction } from "./subtraction";

function resolveQuestionType(type, operation) {
  if (type === "คละ") {
    return "คละ";
  }

  if (operation === "addition") {
    return type === "มีตัวทด/มียืม" ? "มีตัวทด" : "ไม่มีตัวทด";
  }

  return type === "มีตัวทด/มียืม" ? "มียืม" : "ไม่มียืม";
}

export function generateMixed(options) {
  const { count, digits, type } = options;

  const questions = [];
  const used = new Set();

  while (questions.length < count) {
    const useAddition = Math.random() < 0.5;
    const operation = useAddition ? "addition" : "subtraction";
    const generator = useAddition ? generateAddition : generateSubtraction;
    const question = generator({
      count: 1,
      digits,
      type: resolveQuestionType(type, operation),
    })[0];

    if (!question) continue;

    const key = `${question.left}${question.operator}${question.right}`;

    if (used.has(key)) continue;

    used.add(key);

    questions.push({
      ...question,
      id: questions.length + 1,
    });
  }

  return questions;
}
