const titleBgm = document.getElementById("title-bgm");
const clickSfx = document.getElementById("click-sfx");


// 초기 볼륨
titleBgm.volume = 0.5;
clickSfx.volume = 0.7;


/* =========================
   BGM
========================= */

async function playTitleBgm() {

  try {

    if (titleBgm.paused) {
      await titleBgm.play();
    }

  } catch (error) {

    console.log("BGM 재생 대기:", error);

  }

}


/* =========================
   CLICK
========================= */

function playClickSound() {

  clickSfx.pause();
  clickSfx.currentTime = 0;

  clickSfx.play()
    .then(() => {
      console.log("CLICK SFX PLAY");
    })
    .catch((error) => {
      console.error("CLICK SFX ERROR:", error);
    });

}


/* =========================
   자동재생 시도
========================= */

window.addEventListener("load", () => {

  titleBgm.load();
  clickSfx.load();

  playTitleBgm();

});
