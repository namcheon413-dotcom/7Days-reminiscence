const titleBgm =
  document.getElementById("title-bgm");

const clickSfx =
  document.getElementById("click-sfx");


/* =========================
   VOLUME
========================= */

titleBgm.volume = 0.5;
clickSfx.volume = 0.8;


/* =========================
   TITLE BGM
========================= */

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


/* =========================
   CLICK SOUND
========================= */

function playClickSound() {

  const sound =
    clickSfx.cloneNode(true);

  sound.volume = 0.8;
  sound.currentTime = 0;

  sound.play().catch((error) => {
    console.error(
      "Click sound failed:",
      error
    );
  });

  sound.addEventListener(
    "ended",
    () => sound.remove()
  );

}
