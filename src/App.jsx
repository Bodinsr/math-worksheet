import { useState } from "react";
import { generateAddition } from "./generators/addition";
import { generateSubtraction } from "./generators/subtraction";
import VerticalQuestion from "./components/VerticalQuestion";
import "./App.css";
const generators = {
  "การบวก": generateAddition,
  "การลบ": generateSubtraction,
};

function App() {
  const [grade, setGrade] = useState("ป.1");
  const [topic, setTopic] = useState("การบวก");
  const [digits, setDigits] = useState(2);
  const [questionCount, setQuestionCount] = useState(20);
  const [questionType, setQuestionType] = useState("ไม่มีตัวทด");
  const [worksheet, setWorksheet] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [displayMode, setDisplayMode] = useState("Horizontal");

  function createWorksheet() {

  const generator = generators[topic];

 const data = generator({
  count: questionCount,
  digits,
  type: questionType,
});

  setWorksheet(data);
}
function formatQuestion(item) {
  if (!item) return "";
const number = String(item.id).padStart(2, "0");
  return showAnswer
    ? `${number}) ${item.left} ${item.operator} ${item.right} = ${item.answer}`
    : `${number}) ${item.left} ${item.operator} ${item.right} = ______`;
    
}
function getQuestionStyle() {

  const rows = Math.ceil(questionCount / 2);

  // พื้นที่ที่ใช้แสดงโจทย์ (ประมาณ)
  const usableHeight = 760;

  // ความสูงต่อแถว
  const rowHeight = usableHeight / rows;

  return {
    fontSize: `${Math.min(26, Math.max(18, rowHeight * 0.45))}px`,
    paddingBottom: `${rowHeight * 0.35}px`,
  };

}

function renderWorksheetContent() {
  if (worksheet.length === 0) {
    return <p>กด "สร้างใบงาน"</p>;
  }

  if (displayMode === "Vertical") {
    // Dynamically calculate columns to keep ~6 rows
    const columns = Math.ceil(questionCount / 6);
    const gridClassName = `vertical-question-grid vertical-question-grid--col-${columns}`;

    return (
      <div className={gridClassName}>
        {worksheet.map((item) => (
          <VerticalQuestion
            key={item.id}
            item={item}
            showAnswer={showAnswer}
          />
        ))}
      </div>
    );
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        {Array.from({
          length: Math.ceil(worksheet.length / 2),
        }).map((_, i) => (
          <tr key={i}>
            <td
              style={{
                width: "50%",
                verticalAlign: "top",
                ...getQuestionStyle(),
              }}
            >
              {formatQuestion(worksheet[i])}
            </td>

            <td
              style={{
                width: "50%",
                verticalAlign: "top",
                ...getQuestionStyle(),
              }}
            >
              {formatQuestion(
                worksheet[i + Math.ceil(worksheet.length / 2)]
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

  return (
    <div className="container">
      <h1>🧮 โปรแกรมสร้างใบงานคณิตศาสตร์</h1>
      <hr />

      <h3>ตั้งค่าใบงาน</h3>

      <div className="settings-grid">
        {/* Row 1 */}
        <div className="setting-group">
          <label htmlFor="grade">ชั้นเรียน</label>
          <select
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option>ป.1</option>
            <option>ป.2</option>
            <option>ป.3</option>
            <option>ป.4</option>
            <option>ป.5</option>
            <option>ป.6</option>
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="topic">เรื่อง</label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (e.target.value === "การบวก") {
                setQuestionType("ไม่มีตัวทด");
              }
              if (e.target.value === "การลบ") {
                setQuestionType("ไม่มียืม");
              }
            }}
          >
            <option>การบวก</option>
            <option>การลบ</option>
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="question-type">รูปแบบ</label>
          <select
            id="question-type"
            value={questionType}
            onChange={(e) => {
              setQuestionType(e.target.value);
            }}
          >
            {topic === "การบวก" ? (
              <>
                <option>ไม่มีตัวทด</option>
                <option>มีตัวทด</option>
                <option>คละ</option>
              </>
            ) : (
              <>
                <option>ไม่มียืม</option>
                <option>มียืม</option>
                <option>คละ</option>
              </>
            )}
          </select>
        </div>

        {/* Row 2 */}
        <div className="setting-group">
          <label>การแสดงผล</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="displayMode"
                value="Horizontal"
                checked={displayMode === "Horizontal"}
                onChange={() => setDisplayMode("Horizontal")}
              />
              แนวนอน
            </label>
            <label>
              <input
                type="radio"
                name="displayMode"
                value="Vertical"
                checked={displayMode === "Vertical"}
                onChange={() => setDisplayMode("Vertical")}
              />
              ตั้งคำนวณ
            </label>
          </div>
        </div>

        <div className="setting-group">
          <label htmlFor="digits">จำนวนหลัก</label>
          <select
            id="digits"
            value={digits}
            onChange={(e) => setDigits(Number(e.target.value))}
          >
            <option value={1}>1 หลัก</option>
            <option value={2}>2 หลัก</option>
            <option value={3}>3 หลัก</option>
            <option value={4}>4 หลัก</option>
          </select>
        </div>

        <div className="setting-group">
          <label htmlFor="question-count">จำนวนข้อ</label>
          <input
            id="question-count"
            type="number"
            min="1"
            max="40"
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
          />
        </div>

        {/* Row 3 */}
        <div className="setting-group">
          <button className="btn-primary" onClick={createWorksheet}>
            🎲 สร้างใบงาน
          </button>
        </div>

        <div className="setting-group">
          <button
            className="btn-secondary"
            onClick={() => {
              setShowAnswer(false);
              setTimeout(() => window.print(), 100);
            }}
          >
            🖨️ พิมพ์ใบงาน
          </button>
        </div>

        <div className="setting-group">
          <button
            className="btn-secondary"
            onClick={() => {
              setShowAnswer(true);
              setTimeout(() => {
                window.print();
                setShowAnswer(false);
              }, 100);
            }}
          >
            📖 พิมพ์เฉลย
          </button>
        </div>
      </div>

      <hr />
      <div
        id="worksheet"
        style={{
          background: "white",
          padding: "10px",
          border: "1px solid #ccc",
          marginTop: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          ใบงานคณิตศาสตร์
        </h2>

        <h3
          style={{
            textAlign: "center",
            fontWeight: "normal",
          }}
        >
          เรื่อง {topic}
        </h3>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          จำนวน {digits} หลัก  {questionType}  {questionCount} ข้อ
        </p>

        <p
  style={{
    textAlign: "center",
    marginBottom: "20px",
  }}
>
  คำชี้แจง : จงหาคำตอบที่ถูกต้อง
</p>

<div
  style={{
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
    marginBottom: "20px",
  }}
>

  <div>
    ชื่อ - สกุล ________________________________
  </div>

  <div>
    ชั้น {grade}
  </div>

  <div>
    เลขที่ ______
  </div>

</div>

        <hr />

        {renderWorksheetContent()}
      </div>
    </div>
  );
}

export default App;