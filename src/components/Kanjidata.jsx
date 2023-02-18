const kanjiData0 = [
  { question: "<span>セリフ</span>を言う", answer: "台詞" },
  { question: "体重を<span>ハカ</span>る", answer: "量" },
  { question: "<span>イバラキ</span>県", answer: "茨城" },
  { question: "<span>イナカ</span>に住む", answer: "田舎" },
  { question: "<span>アワ</span>てる", answer: "慌" },
  { question: "人事<span>イドウ</span>", answer: "異動" },
  { question: "<span>ツジツマ</span>が合う", answer: "辻褄" },
  { question: "<span>カンキツ</span>系", answer: "柑橘" },
  { question: "<span>サギ</span>に遭う", answer: "詐欺" },
  { question: "<span>シンピョウ</span>性", answer: "信憑" },
];
const kanjiData1 = [
  { question: "<span>イシン</span>伝心", answer: "以心" },
  { question: "お<span>ミヤゲ</span>", answer: "土産" },
  { question: "<span>タナバタ</span>祭り", answer: "七夕" },
  { question: "食費に<span>ア</span>てる", answer: "充" },
  { question: "眼鏡の<span>フチ</span>", answer: "縁" },
  { question: "<span>ギュウジ</span>る", answer: "牛耳" },
  { question: "<span>ゴイ</span>力", answer: "語彙" },
  { question: "<span>オオミソカ</span>", answer: "大晦日" },
  { question: "<span>シンチン</span>代謝", answer: "新陳" },
  { question: "子供が<span>ハシャ</span>ぐ", answer: "燥" },
];
const kanjiData2 = [
  { question: "<span>カジョウ</span>書き", answer: "箇条" },
  { question: "<span>イッシ</span>乱れぬ", answer: "一糸" },
  { question: "座右の<span>メイ</span>", answer: "銘" },
  { question: "<span>サッポロ</span>市", answer: "札幌" },
  { question: "桜<span>フブキ</span>", answer: "吹雪" },
  { question: "犬を<span>シツ</span>ける", answer: "躾" },
  { question: "<span>センサイ</span>な人", answer: "繊細" },
  { question: "<span>ダジャレ</span>を言う", answer: "駄洒落" },
  { question: "<span>カツオ</span>ぶし", answer: "鰹" },
  { question: "力が<span>ミナギ</span>る", answer: "漲" },
];

const kanjiDataList = [kanjiData0, kanjiData1, kanjiData2]; // 配列のリスト
const randomIndex = Math.floor(Math.random() * kanjiDataList.length); // 配列のリストのうちランダムに1つのインデックスを取得
const quiz = kanjiDataList[randomIndex];

export { quiz };
