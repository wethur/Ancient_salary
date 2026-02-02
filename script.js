function calculate() {
  const salaryInput = document.getElementById("salary");
  const salary = parseFloat(salaryInput.value);

  if (isNaN(salary) || salary <= 0) {
    alert("請輸入有效的月薪金額");
    return;
  }

  // 換算基準
  const silverPricePerGram = 75; // 元 / 克
  const liangWeight = 37.5;       // 克 / 兩

  // 計算
  const silverGrams = salary / silverPricePerGram;
  const silverLiang = silverGrams / liangWeight;

  // 判定階級
  const rankInfo = getRankInfo(silverLiang);

  // 更新 UI
  document.getElementById("liangValue").innerText =
    silverLiang.toFixed(2);

  document.getElementById("rankTitle").innerText =
    rankInfo.rank;

  document.getElementById("rankDesc").innerText =
    rankInfo.desc;

  document.getElementById("modernSalary").innerText =
    salary.toLocaleString();

  document.getElementById("silverGram").innerText =
    silverGrams.toFixed(1);

  document.getElementById("ladder").innerHTML =
    renderLadder(silverLiang);

  document.getElementById("result").classList.remove("hidden");
}


/**
 * 依照白銀兩數，回傳階級與說明
 */
function getRankInfo(liang) {
  if (liang < 5) {
    return {
      rank: "勉強糊口型",
      desc: "日子緊巴巴，遇事能忍就忍，見官先低頭。"
    };
  } else if (liang < 10) {
    return {
      rank: "小民安身型",
      desc: "能養家，但沒什麼餘糧，最怕生病或災年。"
    };
  } else if (liang < 15) {
    return {
      rank: "基層體面型",
      desc: "正經養家糊口，但別想橫著走，屬於縣衙小吏等級。"
    };
  } else if (liang < 25) {
    return {
      rank: "地方中產型",
      desc: "衣食無憂，開始有些人情往來與社會資本。"
    };
  } else if (liang < 50) {
    return {
      rank: "地方富戶型",
      desc: "在本地說話有份量，請得動官差，鄉里給面子。"
    };
  } else {
    return {
      rank: "豪紳官宦型",
      desc: "可以橫著走，但也最容易被盯上，要懂得收斂。"
    };
  }
}


/**
 * 繪製古代社會階級階梯
 */
function renderLadder(liang) {
  const levels = [
    { name: "豪紳官宦", min: 50 },
    { name: "地方富戶", min: 25 },
    { name: "地方中產", min: 15 },
    { name: "基層體面", min: 10 },
    { name: "小民安身", min: 5 },
    { name: "勉強糊口", min: 0 }
  ];

  return levels
    .map(level => {
      const activeClass = liang >= level.min ? "active" : "";
      return `<div class="ladder-level ${activeClass}">
                ${level.name}
              </div>`;
    })
    .join("");
}

