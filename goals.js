// ===== ここだけ書き換えればOK =====

// 今どこまで達成したか（%）
const CURRENT = 40;

// 画像の場所（ファイル名は大文字・小文字まで一致させること）
const CENTER_IMAGE = "img/center.gif"; // 真ん中の画像
const ICON_IMAGE = "img/icon.png";     // 右上のアイコン（なければ標準アイコン）
const POPUP_IMAGE = "img/popup.gif";   // 真ん中の画像をタップしたときの画像
const POPUP_TEXT = "死んでまうわ！！";  // そのとき画像の上に出る文字

// 目標一覧（percent: 何%の目標か, title: 目標の名前）
const GOALS = [
  { percent: 10, title: "キス" },
  { percent: 20, title: "付き合う" },
  { percent: 30, title: "旅行" },
  { percent: 40, title: "好きにならない方法" },
  { percent: 50, title: "お互いの両親に挨拶" },
  { percent: 60, title: "1年記念日を迎える" },
  { percent: 70, title: "同棲" },
  { percent: 80, title: "ペット飼う" },
  { percent: 90, title: "専業主婦　爆誕" },
  { percent: 100, title: "結婚🎉" },
];
