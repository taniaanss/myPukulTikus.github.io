// buat variable kunci
const CACHE_KEY = "skor_history";

// membuaat fungsi untuk cek apakah browser mendukung web storage
function checkForStorage() {
  return typeof Storage !== "undefined";
}

//membuat fungsi untuk menyimpan data riwyat kalkulator
function putHistory(data) {
  if (checkForStorage()) {
    let historyData = null;

    if (localStorage.getItem(CACHE_KEY) === null) {
      historyData = [];
    } else {
      historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
    }

    historyData.unshift(data);

    if (historyData.length > 5) {
      historyData.pop();
    }

    localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
  } else {
    alert("Browser tidak mendukung local storage");
  }
}

// untuk mendapat data dari localstorage
function showHistory() {
  if (checkForStorage()) {
    return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
  } else {
    return [];
  }
}

// untuk merender riwayat kalkulasi pada tabel html
function renderHistory() {
  const historyData = showHistory();
  let historyList = document.querySelector("#historyList");

  // selalu hapus konten HTML pada element supaya tidak ada tampilan data ganda
  historyList.innerHTML = "";

  for (let history of historyData) {
    // membuat element tr
    let row = document.createElement("tr");
    row.innerHTML = "<td>" + history.skor + "</td>";

    historyList.appendChild(row);
  }
}

function hapusSkor() {
  // const hapusSkor = document.querySelector("#hapus");
  // hapusSkor.addEventListener("click", function (event) {
  //   localStorage.removeItem(CACHE_KEY);
  //   historyList.innerHTML = "";
  // });

  localStorage.removeItem(CACHE_KEY);
  historyList.innerHTML = "";
}

renderHistory();

// localStorage.setItem("ayodong", "bisa");
// let val = localStorage.getItem("ayodong");
// console.log(val);

// let key = "highscore";
// localStorage.setItem(key, 221);
