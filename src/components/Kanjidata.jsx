const kanjiData0 = [
  { question: "体重を<span>ハカ</span>る", answer: "量" },
  { question: "<span>セリフ</span>を言う", answer: "台詞" },
  { question: "<span>イバラキ</span>県", answer: "茨城" },
  { question: "人事<span>イドウ</span>", answer: "異動" },
  { question: "<span>アワ</span>てる", answer: "慌" },
  { question: "<span>イナカ</span>に住む", answer: "田舎" },
  { question: "<span>サギ</span>に遭う", answer: "詐欺" },
  { question: "<span>ツジツマ</span>が合う", answer: "辻褄" },
  { question: "<span>カンキツ</span>系", answer: "柑橘" },
  { question: "<span>シンピョウ</span>性", answer: "信憑" },
];
const kanjiData1 = [
  { question: "<span>イシン</span>伝心", answer: "以心" },
  { question: "お<span>ミヤゲ</span>", answer: "土産" },
  { question: "<span>ニイガタ</span>県", answer: "新潟" },
  { question: "食費に<span>ア</span>てる", answer: "充" },
  { question: "眼鏡の<span>フチ</span>", answer: "縁" },
  { question: "<span>ギュウジ</span>る", answer: "牛耳" },
  { question: "<span>オオミソカ</span>", answer: "大晦日" },
  { question: "<span>シンチン</span>代謝", answer: "新陳" },
  { question: "<span>ゴイ</span>力を上げる", answer: "語彙" },
  { question: "子供が<span>ハシャ</span>ぐ", answer: "燥" },
];
const kanjiData2 = [
  { question: "<span>カジョウ</span>書き", answer: "箇条" },
  { question: "座右の<span>メイ</span>", answer: "銘" },
  { question: "<span>ノリ</span>を食べる", answer: "海苔" },
  { question: "<span>アクビ</span>をする", answer: "欠伸" },
  { question: "桜<span>フブキ</span>", answer: "吹雪" },
  { question: "<span>センサイ</span>な人", answer: "繊細" },
  { question: "犬を<span>シツ</span>ける", answer: "躾" },
  { question: "<span>ダジャレ</span>を言う", answer: "駄洒落" },
  { question: "<span>カツオ</span>ぶし", answer: "鰹" },
  { question: "<span>クタビ</span>れた顔", answer: "草臥" },
];

// ランダムな配列を生成する関数を定義
const generateQuiz = () => {
  const kanjiDataList = [kanjiData0, kanjiData1, kanjiData2];
  const randomIndex = Math.floor(Math.random() * kanjiDataList.length);
  return kanjiDataList[randomIndex];
};
// コンポーネントが読み込まれたときにgenerateQuiz関数を呼び出し、quiz変数に代入
let quiz = generateQuiz();

// コンポーネントが再度読み込まれたときにgenerateQuiz関数を呼び出してquizを再定義する
const reloadQuiz = () => {
  quiz = generateQuiz();
};

export { quiz, reloadQuiz };
