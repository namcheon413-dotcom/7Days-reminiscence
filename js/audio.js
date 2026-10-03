/* ========================================
   AUDIO MANAGER
======================================== */

const titleBgm = new Audio(
  "./assets/audio/title-bgm.mp3"
);

const clickSfx = new Audio(
  "./assets/audio/click.mp3"
);


/* ========================================
   SETTINGS
======================================== */

titleBgm.loop = true;

titleBgm.volume = 0.5; // BGM 50%
clickSfx.volume = 0.8; // 클릭음 80%

titleBgm.preload = "auto";
clickSfx.preload = "auto";


/* ========================================
   TITLE BGM
======================================== */

function playTitleBgm() {

  if (!titleBgm.paused) {
    return;
  }

  titleBgm.play()
    .then(() => {
      console.log("BGM PLAY");
    })
    .catch((error) => {
      console.error(
        "BGM ERROR:",
        error
      );
    });

}


/* ========================================
   CLICK SOUND
======================================== */

function playClickSound() {

  const sound = new Audio(
    "./assets/audio/click.mp3"
  );

  sound.volume = 0.8;

  sound.play()
    .then(() => {
      console.log("CLICK PLAY");
    })
    .catch((error) => {
      console.error(
        "CLICK ERROR:",
        error
      );
    });

}
