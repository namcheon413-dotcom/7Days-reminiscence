/* ========================================
   ELEMENTS
======================================== */

const initializeScreen =
  document.getElementById("initialize-screen");

const mainTitle =
  document.getElementById("main-title");

const startButton =
  document.getElementById("start-button");

const titleScreen =
  document.getElementById("title-screen");

const lobbyScreen =
  document.getElementById("lobby-screen");

const gachaBanner =
  document.getElementById("gacha-banner");

const gachaScreen =
  document.getElementById("gacha-screen");

const gachaBackButton =
  document.getElementById("gacha-back-button");

const eventGachaTab =
  document.getElementById("event-gacha-tab");

const standardGachaTab =
  document.getElementById("standard-gacha-tab");

const eventRecruitment =
  document.getElementById("event-recruitment");

const standardRecruitment =
  document.getElementById("standard-recruitment");

const recruitButtons =
  document.querySelectorAll(".recruit-button");


let initialized = false;
let transitioning = false;


/* ========================================
   SOUND
======================================== */

function safeClickSound() {

  try {

    if (typeof playClickSound === "function") {
      playClickSound();
    }

  } catch (error) {

    console.warn(
      "Click sound failed:",
      error
    );

  }

}


function safeTitleBgm() {

  try {

    if (typeof playTitleBgm === "function") {
      playTitleBgm();
    }

  } catch (error) {

    console.warn(
      "Title BGM failed:",
      error
    );

  }

}


/* ========================================
   INITIALIZE
   첫 화면 → 메인 타이틀
======================================== */

function initializeGame() {

  if (
    initialized ||
    !initializeScreen ||
    !mainTitle
  ) {
    return;
  }

  initialized = true;

  safeTitleBgm();
  safeClickSound();


  /* INITIALIZE 페이드 아웃 */

  initializeScreen.classList.remove(
    "active"
  );


  /* MAIN TITLE 페이드 인 */

  setTimeout(
    function () {

      mainTitle.classList.add(
        "active"
      );

    },
    350
  );

}


/* 반드시 실제 클릭 이벤트 등록 */

if (initializeScreen) {

  initializeScreen.addEventListener(
    "click",
    initializeGame
  );

}


/* ========================================
   START → LOBBY
======================================== */

if (
  startButton &&
  titleScreen &&
  lobbyScreen
) {

  startButton.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }

      transitioning = true;

      safeClickSound();

      startButton.disabled = true;


      /*
        1. 메인 타이틀 UI 먼저 OUT
      */

      mainTitle.classList.remove(
        "active"
      );


      /*
        2. 타이틀 전체 화면 OUT
      */

      titleScreen.classList.add(
        "screen-out"
      );


      /*
        3. 타이틀 OUT 완료 후
           로비 화면 준비
      */

      setTimeout(
        function () {

          lobbyScreen.style.display =
            "block";


          /*
            브라우저가 opacity:0 상태를
            먼저 렌더하도록 한 프레임 대기
          */

          requestAnimationFrame(
            function () {

              requestAnimationFrame(
                function () {

                  lobbyScreen.classList.add(
                    "active"
                  );

                  transitioning = false;

                }
              );

            }
          );

        },
        700
      );

    }
  );

}


/* ========================================
   GACHA CONTENT SWITCH
======================================== */

function showRecruitment(type) {

  if (
    !eventGachaTab ||
    !standardGachaTab ||
    !eventRecruitment ||
    !standardRecruitment
  ) {
    return;
  }


  eventGachaTab.classList.remove(
    "active"
  );

  standardGachaTab.classList.remove(
    "active"
  );

  eventRecruitment.classList.remove(
    "active"
  );

  standardRecruitment.classList.remove(
    "active"
  );


  if (type === "standard") {

    standardGachaTab.classList.add(
      "active"
    );

    standardRecruitment.classList.add(
      "active"
    );

  } else {

    eventGachaTab.classList.add(
      "active"
    );

    eventRecruitment.classList.add(
      "active"
    );

  }

}


/* ========================================
   LOBBY → GACHA
======================================== */

if (
  gachaBanner &&
  lobbyScreen &&
  gachaScreen
) {

  gachaBanner.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }

      transitioning = true;

      safeClickSound();

      showRecruitment("event");


      /*
        현재 화면 OUT
      */

      lobbyScreen.classList.remove(
        "active"
      );


      /*
        OUT 완료 후 다음 화면 IN
      */

      setTimeout(
        function () {

          lobbyScreen.style.display =
            "none";

          gachaScreen.style.display =
            "block";


          requestAnimationFrame(
            function () {

              requestAnimationFrame(
                function () {

                  gachaScreen.classList.add(
                    "active"
                  );

                  transitioning = false;

                }
              );

            }
          );

        },
        700
      );

    }
  );

}


/* ========================================
   GACHA → LOBBY
======================================== */

if (
  gachaBackButton &&
  gachaScreen &&
  lobbyScreen
) {

  gachaBackButton.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }

      transitioning = true;

      safeClickSound();


      /*
        GACHA OUT
      */

      gachaScreen.classList.remove(
        "active"
      );


      /*
        LOBBY IN
      */

      setTimeout(
        function () {

          gachaScreen.style.display =
            "none";

          lobbyScreen.style.display =
            "block";


          requestAnimationFrame(
            function () {

              requestAnimationFrame(
                function () {

                  lobbyScreen.classList.add(
                    "active"
                  );

                  transitioning = false;

                }
              );

            }
          );

        },
        700
      );

    }
  );

}


/* ========================================
   EVENT TAB
======================================== */

if (eventGachaTab) {

  eventGachaTab.addEventListener(
    "click",
    function () {

      safeClickSound();

      showRecruitment(
        "event"
      );

    }
  );

}


/* ========================================
   STANDARD TAB
======================================== */

if (standardGachaTab) {

  standardGachaTab.addEventListener(
    "click",
    function () {

      safeClickSound();

      showRecruitment(
        "standard"
      );

    }
  );

}


/* ========================================
   RECRUIT BUTTONS
======================================== */

recruitButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        safeClickSound();

        const recruitType =
          button.dataset.recruitType;

        const recruitCount =
          Number(
            button.dataset.recruitCount
          );

        console.log(
          "RECRUIT:",
          recruitType,
          recruitCount
        );

      }
    );

  }
);


/* ========================================
   DEFAULT GACHA
======================================== */

showRecruitment("event");
