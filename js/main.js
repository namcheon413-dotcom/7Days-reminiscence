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


/* ========================================
   RECRUITMENT ELEMENTS
======================================== */

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


/* ========================================
   INITIALIZE
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }

  initialized = true;


  /* 오디오 시작 */

  playTitleBgm();
  playClickSound();


  /* INITIALIZE 화면 숨기기 */

  initializeScreen.classList.remove(
    "active"
  );


  /* 메인 타이틀 표시 */

  setTimeout(() => {

    mainTitle.classList.add(
      "active"
    );

  }, 350);

}


/* ========================================
   INITIALIZE CLICK
======================================== */

initializeScreen.addEventListener(
  "click",
  initializeGame
);


/* ========================================
   START → LOBBY
======================================== */

startButton.addEventListener(
  "click",
  function () {

    playClickSound();


    startButton.disabled = true;

    startButton.textContent =
      "CONNECTING...";


    setTimeout(() => {

      /* 타이틀 숨김 */

      titleScreen.style.display =
        "none";


      /* 로비 표시 */

      lobbyScreen.style.display =
        "block";

      lobbyScreen.classList.add(
        "active"
      );

    }, 500);

  }
);


/* ========================================
   LOBBY → GACHA
======================================== */

gachaBanner.addEventListener(
  "click",
  function () {

    playClickSound();


    /*
      가챠 페이지에 들어갈 때마다
      이벤트 모집을 기본으로 표시
    */

    showRecruitment("event");


    lobbyScreen.classList.remove(
      "active"
    );


    setTimeout(() => {

      lobbyScreen.style.display =
        "none";

      gachaScreen.style.display =
        "block";

      gachaScreen.classList.add(
        "active"
      );

    }, 300);

  }
);


/* ========================================
   GACHA → LOBBY
======================================== */

gachaBackButton.addEventListener(
  "click",
  function () {

    playClickSound();


    gachaScreen.classList.remove(
      "active"
    );


    setTimeout(() => {

      gachaScreen.style.display =
        "none";

      lobbyScreen.style.display =
        "block";

      lobbyScreen.classList.add(
        "active"
      );

    }, 300);

  }
);


/* ========================================
   RECRUITMENT SWITCH
======================================== */

function showRecruitment(type) {

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


  /* 상시 모집 */

  if (type === "standard") {

    standardGachaTab.classList.add(
      "active"
    );

    standardRecruitment.classList.add(
      "active"
    );

    return;

  }


  /* 이벤트 모집 */

  eventGachaTab.classList.add(
    "active"
  );

  eventRecruitment.classList.add(
    "active"
  );

}


/* ========================================
   EVENT RECRUITMENT
======================================== */

eventGachaTab.addEventListener(
  "click",
  function () {

    playClickSound();

    showRecruitment(
      "event"
    );

  }
);


/* ========================================
   STANDARD RECRUITMENT
======================================== */

standardGachaTab.addEventListener(
  "click",
  function () {

    playClickSound();

    showRecruitment(
      "standard"
    );

  }
);


/* ========================================
   RECRUIT BUTTONS
   현재 실제 추첨은 아직 연결하지 않음
======================================== */

recruitButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        playClickSound();


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
   DEFAULT RECRUITMENT
======================================== */

showRecruitment(
  "event"
);
