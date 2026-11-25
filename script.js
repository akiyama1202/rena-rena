// goals.js の設定を使って画面を組み立てる

// 1. ゲージと%表示（少し遅らせると、伸びるアニメーションが見える）
const percent = Math.max(0, Math.min(100, CURRENT));
setTimeout(() => {
  document.getElementById("gaugeFill").style.width = percent + "%";
}, 100);
document.getElementById("percentText").textContent = percent + "%";

// 1.5 付き合ってからの日数（付き合った日を「1日目」と数える）
const [y, m, d] = START_DATE.split("-").map(Number);
const start = new Date(y, m - 1, d);          // 月は0始まりなので -1
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // 時刻を切り捨てて日付だけに
const days = Math.round((today - start) / 86400000) + 1; // 86400000ミリ秒 = 1日
document.getElementById("daysNum").textContent = days;

// 1.6 次の記念日（毎月、付き合った日と同じ日付）
// その月にその日がない場合（例：31日）は、月末の日を記念日にする
function annivDate(monthsLater) {
  const lastDay = new Date(y, m - 1 + monthsLater + 1, 0).getDate(); // 翌月の「0日」= その月の末日
  return new Date(y, m - 1 + monthsLater, Math.min(d, lastDay));
}
// 「〇ヶ月」か「〇年」かの呼び方を決める
function annivName(months) {
  return months % 12 === 0 ? `${months / 12}年記念日` : `${months}ヶ月記念日`;
}
let months = 1;
while (annivDate(months) < today) months++; // 今日以降で最初の記念日を探す
const annivEl = document.getElementById("anniv");
const left = Math.round((annivDate(months) - today) / 86400000);
if (left === 0) {
  annivEl.textContent = `🎉 今日は${annivName(months)}！`;
  annivEl.classList.add("today");
} else {
  annivEl.innerHTML = `${annivName(months)}まで あと<b>${left}</b>日`;
}

// 2. 次の目標（今の%より大きい最初の目標）
const next = GOALS.find((g) => g.percent > percent);
document.getElementById("nextGoal").textContent = next
  ? `${next.percent}%：${next.title}`
  : "ぜんぶ達成！おめでとう🎉";

// 3. 画像を読み込み、失敗したら代わりの表示に切り替える共通処理
function loadImage(imgId, src, fallbackId) {
  const img = document.getElementById(imgId);
  const fallback = document.getElementById(fallbackId);
  img.addEventListener("error", () => {
    img.hidden = true;
    fallback.hidden = false;
  });
  img.src = src; // エラー処理を先に登録してから読み込み開始
}
loadImage("centerImg", CENTER_IMAGE, "imgPlaceholder");
loadImage("iconImg", ICON_IMAGE, "iconDefault");

// 4. 目標一覧（チェックボックスは表示専用）
const list = document.getElementById("goalList");
GOALS.forEach((g) => {
  const done = g.percent <= percent;
  const li = document.createElement("li");
  if (done) li.classList.add("done");
  if (next && g.percent === next.percent) li.classList.add("next");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.className = "check";
  check.checked = done;
  check.disabled = true; // 押せないようにする
  check.tabIndex = -1;   // キーボード操作でも選ばれないようにする

  const pct = document.createElement("span");
  pct.className = "pct";
  pct.textContent = g.percent + "%";

  const title = document.createElement("span");
  title.className = "title";
  title.textContent = g.title;

  li.append(check, pct, title);
  list.appendChild(li);
});

// 5. 真ん中の画像をタップ → 別の画像と文字のポップアップ
const surprise = document.getElementById("surprise");
document.getElementById("surpriseText").textContent = POPUP_TEXT;
loadImage("surpriseImg", POPUP_IMAGE, "surprisePlaceholder");
document.getElementById("centerImg").addEventListener("click", () => {
  // hiddenを付け外しすると、開くたびにアニメーションが最初から再生される
  surprise.hidden = false;
});
surprise.addEventListener("click", () => (surprise.hidden = true)); // どこをタップしても閉じる

// 6. ユーザーアイコンでポップアップを開閉
const modal = document.getElementById("modal");
document.getElementById("userBtn").addEventListener("click", () => (modal.hidden = false));
document.getElementById("closeBtn").addEventListener("click", () => (modal.hidden = true));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.hidden = true; // 背景タップでも閉じる
});
