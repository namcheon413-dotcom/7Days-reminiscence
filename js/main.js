/* ========================================
   BASIC ELEMENTS
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


let initialized = false;


/* ========================================
   INITIALIZE
   첫 화면 → 메인 타이틀
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }

  initialized = true;


  /* 오디오는 실패해도 화면 진행을 막지 않음 */

  try {

    if (typeof playTitleBgm === "function") {
      playTitleBgm();
    }

    if (typeof playClickSound === "function") {
      playClickSound();
    }

  } catch (error) {

    console.warn(
      "Audio initialization failed:",
      error
    );

  }


  /* CLICK TO INITIALIZE 숨김 */

  initializeScreen.classList.remove(
    "active"
  );


  /* 메인 타이틀 표시 */

  setTimeout(
    function () {

      mainTitle.classList.add(
        "active"
      );

    },
    350
  );

}


/* ========================================
   START → LOBBY
======================================== */

if (startButton && titleScreen && lobbyScreen) {

  startButton.addEventListener("click", function () {

    try {
      if (typeof playClickSound === "function") {
        playClickSound();
      }
    } catch (error) {
      console.warn("CLICK AUDIO ERROR:", error);
    }

    /* 타이틀 페이드 아웃 */
    titleScreen.classList.add("fade-out");

    /* 로비 페이드 인 */
    setTimeout(function () {

      lobbyScreen.classList.add("active");

    }, 300);

  });

}


/* ========================================
   GACHA ELEMENTS
======================================== */

const gachaBanner =
  document.getElementById(
    "gacha-banner"
  );

const gachaScreen =
  document.getElementById(
    "gacha-screen"
  );

const gachaBackButton =
  document.getElementById(
    "gacha-back-button"
  );

const eventGachaTab =
  document.getElementById(
    "event-gacha-tab"
  );

const standardGachaTab =
  document.getElementById(
    "standard-gacha-tab"
  );

const eventRecruitment =
  document.getElementById(
    "event-recruitment"
  );

const standardRecruitment =
  document.getElementById(
    "standard-recruitment"
  );

const recruitButtons =
  document.querySelectorAll(
    ".recruit-button"
  );


/* ========================================
   GACHA SWITCH
======================================== */

function showRecruitment(type) {

  /*
    가챠 HTML이 아직 없거나
    로드되지 않았더라도
    초기 화면에는 영향을 주지 않음
  */

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

    return;

  }


  eventGachaTab.classList.add(
    "active"
  );

  eventRecruitment.classList.add(
    "active"
  );

}


/* ========================================
   LOBBY → GACHA
======================================== */

if (
  gachaBanner &&
  gachaScreen &&
  lobbyScreen
) {

  gachaBanner.addEventListener(
    "click",
    function () {

      try {

        if (
          typeof playClickSound ===
          "function"
        ) {

          playClickSound();

        }

      } catch (error) {

        console.warn(
          "Click sound failed:",
          error
        );

      }


      /* 기본은 이벤트 모집 */

      showRecruitment(
        "event"
      );


      lobbyScreen.classList.remove(
        "active"
      );


      setTimeout(
        function () {

          lobbyScreen.style.display =
            "none";

          gachaScreen.style.display =
            "block";

          gachaScreen.classList.add(
            "active"
          );

        },
        300
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

      try {

        if (
          typeof playClickSound ===
          "function"
        ) {

          playClickSound();

        }

      } catch (error) {

        console.warn(
          "Click sound failed:",
          error
        );

      }


      gachaScreen.classList.remove(
        "active"
      );


      setTimeout(
        function () {

          gachaScreen.style.display =
            "none";

          lobbyScreen.style.display =
            "block";

          lobbyScreen.classList.add(
            "active"
          );

        },
        300
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

      try {

        if (
          typeof playClickSound ===
          "function"
        ) {

          playClickSound();

        }

      } catch (error) {

        console.warn(error);

      }


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

      try {

        if (
          typeof playClickSound ===
          "function"
        ) {

          playClickSound();

        }

      } catch (error) {

        console.warn(error);

      }


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

        try {

          if (
            typeof playClickSound ===
            "function"
          ) {

            playClickSound();

          }

        } catch (error) {

          console.warn(error);

        }


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

showRecruitment(
  "event"
);
