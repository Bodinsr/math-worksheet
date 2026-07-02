import { useState } from "react";
import { generateAddition } from "./generators/addition";
import { generateSubtraction } from "./generators/subtraction";
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
  return (
    <div className="container">
      <h1>🧮 โปรแกรมสร้างใบงานคณิตศาสตร์</h1>
      <hr />

      <h3>ตั้งค่าใบงาน</h3>

      <div>
        <label>ชั้นเรียน</label>
        <br />
        <select
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

      <br />

      <div>
        <label>เรื่อง</label>
        <br />
        <select
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

      <br />

      <div>
        <label>รูปแบบ</label>
        <br />
        <select
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

      <br />

      <div>
        <label>จำนวนหลัก</label>
        <br />
        <select
          value={digits}
          onChange={(e) => setDigits(Number(e.target.value))}
        >
          <option value={1}>1 หลัก</option>
          <option value={2}>2 หลัก</option>
          <option value={3}>3 หลัก</option>
          <option value={4}>4 หลัก</option>
        </select>
      </div>

      <br />

      <div>
        
        <label>จำนวนข้อ</label>
        <br />
        <input
          type="number"
          min="1"
          max="40"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        />
      </div>
      

      <br />

      <button onClick={createWorksheet}>
        🎲 สร้างใบงาน
      </button>

      <button
  style={{ marginLeft: "10px" }}
  onClick={() => {
    setShowAnswer(false);
    setTimeout(() => window.print(), 100);
  }}
>
  🖨️ พิมพ์ใบงาน
</button>

      <hr />
<button
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

        {worksheet.length === 0 ? (
          <p>กด "สร้างใบงาน"</p>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default App;