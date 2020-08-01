const tanah = document.querySelectorAll(".tanah");
const tikus = document.querySelectorAll(".tikus");
const papanSkor = document.querySelector(".skor");
const pop = document.querySelector("#pop");
const backsound = document.querySelector("#backsound");

let tanahSebelumnya;
let selesai;
let skor;

function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.random() * (max - min + min);
}

function tikusMuncul() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 2000);
  tRandom.classList.add("muncul");
  setTimeout(() => {
    tRandom.classList.remove("muncul");
    if (!selesai) {
      tikusMuncul();
    }
  }, 500);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.innerHTML = 0;
  tikusMuncul();
  setTimeout(() => {
    selesai = true;
    const history = {
      skor: skor,
    };

    console.log(history);
    putHistory(history);
    // papanSkor = skor;
    renderHistory();
  }, 10000);
}

function pukulTikus() {
  skor++;
  this.parentNode.classList.remove("muncul");
  pop.play();
  this.style.transition = "TOP 0s";
  papanSkor.innerHTML = skor;
}

tikus.forEach((t) => {
  t.addEventListener("click", pukulTikus);
});
