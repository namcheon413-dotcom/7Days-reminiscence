const titleBgm =
  document.getElementById("title-bgm");

const clickSfx =
  document.getElementById("click-sfx");


/* ========================================
   VOLUME
======================================== */

titleBgm.volume = 0.5;
clickSfx.volume = 0.8;


/* ========================================
   TITLE BGM
======================================== */

function playTitleBgm() {

  if (!titleBgm.paused) {
    return;
  }

  titleBgm.play().catch((error) => {

    console.error(
      "BGM playback failed:",
      error
    );

  });

}


/* ========================================
   CLICK SOUND
======================================== */

function playClickSound() {

  clickSfx.currentTime = 0;

  clickSfx.play().catch((error) => {

    console.error(
      "Click sound failed:",
      error
    );

  });

}
