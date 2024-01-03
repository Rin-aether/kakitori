const kanjiData0 = [
  { question: "<span>アイサツ</span>をする", answer: "挨拶", 
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "<span>セリフ</span>を言う", answer: "台詞",
  meaning:"俳優が劇中で話す言葉。<br/>人に対する言葉。言いぐさ。" },
  { question: "<span>イバラキ</span>県", answer: "茨城" ,
  meaning:"日本の関東地方に位置する県。県庁所在地は水戸市。"},
  { question: "人事<span>イドウ</span>", answer: "異動" },
  { question: "<span>アワ</span>てる", answer: "慌" },
  { question: "<span>イナカ</span>に住む", answer: "田舎" },
  { question: "<span>サギ</span>に遭う", answer: "詐欺" },
  { question: "<span>ツジツマ</span>が合う", answer: "辻褄" },
  { question: "<span>カンキツ</span>系", answer: "柑橘" },
  { question: "<span>アイサツ</span>をする", answer: "挨拶", 
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "", answer: "" },
];
const kanjiData1 = [
  { question: "<span>アイサツ</span>をする", answer: "挨拶",
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。"},
  { question: "お<span>ミヤゲ</span>", answer: "土産",
  meaning:"遠隔地の産物などを送られた、あるいは入手した時に、近隣の者に裾分けすること。また、その品物。"},
  { question: "<span>ニイガタ</span>県", answer: "新潟",
  meaning:"日本の中部地方に位置する県。" },
  { question: "食費に<span>ア</span>てる", answer: "充" },
  { question: "眼鏡の<span>フチ</span>", answer: "縁" },
  { question: "<span>ギュウジ</span>る", answer: "牛耳" },
  { question: "<span>オオミソカ</span>", answer: "大晦日" },
  { question: "<span>シンチン</span>代謝", answer: "新陳" },
  { question: "<span>ゴイ</span>力を上げる", answer: "語彙" },
  { question: "<span>アイサツ</span>をする", answer: "挨拶", 
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "", answer: "" },
];
const kanjiData2 = [
  { question: "<span>アイサツ</span>をする", answer: "挨拶",
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "座右の<span>メイ</span>", answer: "銘",
  meaning:"いつも心に留めておいて、生き方の参考とすることばのこと。" },
  { question: "<span>ノリ</span>を食べる", answer: "海苔",
  meaning:"紅藻・緑藻・シアノバクテリア（藍藻）などを含む食用とする藻類の総称" },
  { question: "<span>アクビ</span>をする", answer: "欠伸" },
  { question: "桜<span>フブキ</span>", answer: "吹雪" },
  { question: "<span>センサイ</span>な人", answer: "繊細" },
  { question: "犬を<span>シツ</span>ける", answer: "躾" },
  { question: "<span>ダジャレ</span>を言う", answer: "駄洒落" },
  { question: "<span>カツオ</span>ぶし", answer: "鰹" },
  { question: "<span>アイサツ</span>をする", answer: "挨拶", 
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "", answer: "" },
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
