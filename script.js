// goals.js の CURRENT と GOALS を使って画面を組み立てる

// 1. ゲージと%表示（少し遅らせると、伸びるアニメーションが見える）
const percent = Math.max(0, Math.min(100, CURRENT));
setTimeout(() => {
  document.getElementById("gaugeFill").style.width = percent + "%";
}, 100);
document.getElementById("percentText").textContent = percent + "%";

// 2. 次の目標（今の%より大きい最初の目標）
const next = GOALS.find((g) => g.percent > percent);
document.getElementById("nextGoal").textContent = next
  ? `${next.percent}%：${next.title}`
  : "ぜんぶ達成！おめでとう🎉";

// 3. 真ん中の画像：ファイルがなければ「枠」を表示
const img = document.getElementById("centerImg");
img.addEventListener("error", () => {
  img.hidden = true;
  document.getElementById("imgPlaceholder").hidden = false;
});

// 4. 目標一覧（達成済み・次・まだ、の3種類で見た目を変える）
const list = document.getElementById("goalList");
GOALS.forEach((g) => {
  const li = document.createElement("li");
  const done = g.percent <= percent;
  if (done) li.classList.add("done");
  if (next && g.percent === next.percent) li.classList.add("next");
  li.innerHTML = `<span class="pct">${g.percent}%</span><span class="title"></span><span class="mark">${done ? "✅" : ""}</span>`;
  li.querySelector(".title").textContent = g.title; // 文字はtextContentで安全に入れる
  list.appendChild(li);
});

// 5. ユーザーアイコンでポップアップを開閉
const modal = document.getElementById("modal");
document.getElementById("userBtn").addEventListener("click", () => (modal.hidden = false));
document.getElementById("closeBtn").addEventListener("click", () => (modal.hidden = true));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.hidden = true; // 背景タップでも閉じる
});
