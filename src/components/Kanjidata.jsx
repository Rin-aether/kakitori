const kanjiData0 = [
  { question: "<span>レイ</span>を出す", answer: "例", 
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "<span>セリフ</span>を言う", answer: "台詞",
  meaning:"俳優が劇中で話す言葉。<br/>人に対する言葉。言いぐさ。" },
  { question: "<span>イバラキ</span>県", answer: "茨城" ,
  meaning:"日本の関東地方に位置する県。県庁所在地は水戸市。"},
  { question: "人事<span>イドウ</span>", answer: "異動",
  meaning:"職場での地位、勤務などが変わること。"},
  { question: "<span>アワ</span>てる", answer: "慌" ,
  meaning:"思いがけない物事に出会って、ふだんの落ち着きを失うこと。"},
  { question: "<span>イナカ</span>に住む", answer: "田舎",
  meaning:"都会から離れた地方。田畑が多く、のどかな所。" },
  { question: "<span>サギ</span>に遭う", answer: "詐欺",
  meaning:"他人をだまして、金品を奪ったり損害を与えたりすること。" },
  { question: "<span>ツジツマ</span>が合う", answer: "辻褄" ,
  meaning:"筋道がよく通る。理屈が合うこと。"},
  { question: "<span>カンキツ</span>系", answer: "柑橘",
  meaning:"ミカン科のミカン属・キンカン属・カラタチ属の植物の総称。"},
  { question: "<span>シンピョウ</span>性", answer: "信憑", 
  meaning:"情報や証言などの、信用してよい度合い。" },
  { question: "", answer: "", meaning:"" },
];
const kanjiData1 = [
  {  question: "<span>レイ</span>を出す", answer: "例",
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。"},
  { question: "お<span>ミヤゲ</span>", answer: "土産",
  meaning:"遠隔地の産物などを入手した時に、近隣の者に裾分けすること。また、その品物。"},
  { question: "<span>ニイガタ</span>県", answer: "新潟",
  meaning:"日本の中部地方に位置する県。" },
  { question: "食費に<span>ア</span>てる", answer: "充",
  meaning:"全体の一部をそのために使うこと。" },
  { question: "眼鏡の<span>フチ</span>", answer: "縁",
  meaning:"物の端の部分。また、物の周りの、ある幅をもった部分。" },
  { question: "<span>ギュウジ</span>る", answer: "牛耳",
  meaning:"団体や組織を支配し、思いのままに動かすこと。" },
  { question: "<span>オオミソカ</span>", answer: "大晦日",
  meaning:"1年の最終の日。12月31日。おおつごもり。" },
  { question: "<span>シンチン</span>代謝", answer: "新陳",
  meaning:"新しいものが古いものに取って代わること。生体内で行われる物質の化学変化の総称。" },
  { question: "<span>ゴイ</span>力を上げる", answer: "語彙",
  meaning:"その人がもっている単語の知識と、それを使いこなす能力のこと。" },
  { question: "子供が<span>ハシャ</span>ぐ", answer: "燥",
  meaning:" 調子にのってふざけ騒ぐこと。" },
  { question: "", answer: "", meaning:"" },
];
const kanjiData2 = [
  {  question: "<span>レイ</span>を出す", answer: "例",
  meaning:"人に会ったときや別れるときなどに取り交わす、礼にかなった動作や言葉。" },
  { question: "座右の<span>メイ</span>", answer: "銘",
  meaning:"いつも心に留めておいて、生き方の参考とすることばのこと。" },
  { question: "<span>ノリ</span>を食べる", answer: "海苔",
  meaning:"紅藻・緑藻・藍藻などを含む、食用とする藻類の総称" },
  { question: "<span>アクビ</span>をする", answer: "欠伸",
  meaning:"眠いとき、疲れたときなどに思わず口が大きく開く呼吸運動のこと。" },
  { question: "桜<span>フブキ</span>", answer: "吹雪",
  meaning:"風に吹かれなどして、乱れ舞うもの。" },
  { question: "<span>センサイ</span>な人", answer: "繊細",
  meaning:"感情などがこまやかなこと。また、そのさま。デリケート。" },
  { question: "犬を<span>シツ</span>ける", answer: "躾",
  meaning:"礼儀作法を身につくように教え込むこと。また、その礼儀作法。" },
  { question: "<span>ダジャレ</span>を言う", answer: "駄洒落",
  meaning:"へたなしゃれ。くだらないしゃれのこと。" },
  { question: "<span>カツオ</span>ぶし", answer: "鰹",
  meaning:"カツオの肉を蒸して干し固め、黴付けと日干しを繰り返したもの。" },
  { question: "<span>クタビ</span>れた顔", answer: "草臥",
  meaning:"くたびれること。疲れ。" },
  { question: "", answer: "", meaning:"" },
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
