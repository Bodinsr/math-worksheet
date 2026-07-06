function VerticalQuestion({ item, showAnswer }) {
  if (!item) return null;

  const left = String(item.left);
  const right = String(item.right);

  // ความยาวของเส้น
  const width = Math.max(left.length, right.length) + 2;

  return (
    <div className="vertical-question">

      <div
        className="vertical-row top-number"
        style={{ width: `${width}ch` }}
      >
        {left}
      </div>

      <div
        className="vertical-row operator"
        style={{ width: `${width}ch` }}
      >
        {item.operator}
      </div>

      <div
        className="vertical-row bottom-number"
        style={{ width: `${width}ch` }}
      >
        {right}
      </div>

      <div
        className="line-single"
        style={{ width: `${width}ch` }}
      />

      <div
        className="answer-box"
        style={{ width: `${width}ch` }}
      >
        {showAnswer ? item.answer : ""}
      </div>

      <div
        className="line-double"
        style={{ width: `${width}ch` }}
      />

    </div>
  );
}

export default VerticalQuestion;
