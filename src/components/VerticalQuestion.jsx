function VerticalQuestion({ item, showAnswer }) {
  if (!item) return null;

  const left = String(item.left);
  const right = String(item.right);

  return (
    <div className="vertical-question">
      <div className="vertical-number-row">
        <span className="vertical-number">{left}</span>
      </div>

      <div className="vertical-operator-row">
        <span className="vertical-operator">{item.operator}</span>
      </div>

      <div className="vertical-number-row">
        <span className="vertical-number">{right}</span>
      </div>

      <div className="vertical-line" />

      <div className="vertical-answer">
        {showAnswer ? item.answer : ""}
      </div>

      <div className="vertical-answer-line" />
    </div>
  );
}

export default VerticalQuestion;
