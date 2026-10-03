/* ========================================
   七曜回顧錄
   MAIN CONTROLLER
======================================== */


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


/* ========================================
   LOBBY PLAYER INFO
======================================== */

const playerLevelDisplay =
  document.getElementById(
    "player-level"
  );

const playerNicknameDisplay =
  document.getElementById(
    "player-nickname"
  );

const walletMunDisplay =
  document.getElementById(
    "wallet-mun"
  );

const walletOpulseDisplay =
  document.getElementById(
    "wallet-opulse"
  );

/* ========================================
   ITEM DETAIL MODAL
======================================== */

const itemDetailModal =
  document.getElementById(
    "item-detail-modal"
  );

const itemDetailBackdrop =
  document.getElementById(
    "item-detail-backdrop"
  );

const itemDetailClose =
  document.getElementById(
    "item-detail-close"
  );

const itemDetailImage =
  document.getElementById(
    "item-detail-image"
  );

const itemDetailPlaceholder =
  document.getElementById(
    "item-detail-placeholder"
  );

const itemDetailGrade =
  document.getElementById(
    "item-detail-grade"
  );

const itemDetailName =
  document.getElementById(
    "item-detail-name"
  );

const itemDetailNameEn =
  document.getElementById(
    "item-detail-name-en"
  );

const itemDetailDescription =
  document.getElementById(
    "item-detail-description"
  );

const walletEnduranceDisplay =
  document.getElementById(
    "wallet-endurance"
  );

/* ========================================
   INVENTORY
======================================== */

const inventoryScreen =
  document.getElementById(
    "inventory-screen"
  );

const inventoryButton =
  document.getElementById(
    "inventory-button"
  );

const inventoryBackButton =
  document.getElementById(
    "inventory-back-button"
  );

const inventoryGrid =
  document.getElementById(
    "inventory-grid"
  );

const inventoryTabs =
  document.querySelectorAll(
    ".inventory-tab"
  );

/* ========================================
   PLAYER REGISTRATION
======================================== */

const playerRegistrationScreen =
  document.getElementById(
    "player-registration-screen"
  );

const playerNicknameInput =
  document.getElementById(
    "player-nickname-input"
  );

const playerNicknameCount =
  document.getElementById(
    "player-nickname-count"
  );

const playerRegistrationError =
  document.getElementById(
    "player-registration-error"
  );

const playerRegistrationConfirm =
  document.getElementById(
    "player-registration-confirm"
  );


/* ========================================
   GACHA
======================================== */

const gachaBanner =
  document.getElementById("gacha-banner");

const gachaScreen =
  document.getElementById("gacha-screen");

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
   STATE
======================================== */

let initialized = false;

let transitioning = false;

let playerReady = false;


/* ========================================
   AUDIO
======================================== */

function safeClickSound() {

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

}


function safeTitleBgm() {

  try {

    if (
      typeof playTitleBgm ===
      "function"
    ) {

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
   GENERIC GAME SCREEN TRANSITION
======================================== */

function changeGameScreen(
  fromScreen,
  toScreen,
  delay = 300
) {

  if (
    transitioning ||
    !fromScreen ||
    !toScreen
  ) {

    return;

  }


  transitioning = true;


  fromScreen.classList.remove(
    "active"
  );


  setTimeout(
    function () {

      fromScreen.style.display =
        "none";


      toScreen.style.display =
        "block";


      toScreen.classList.remove(
        "active"
      );


      requestAnimationFrame(
        function () {

          requestAnimationFrame(
            function () {

              toScreen.classList.add(
                "active"
              );


              transitioning = false;

            }
          );

        }
      );

    },
    delay
  );

}


/* ========================================
   TITLE → GAME SCREEN

   title-screen은 .game-screen이 아니므로
   별도 전환 처리
======================================== */

function leaveTitleScreen(
  destinationScreen
) {

  if (
    transitioning ||
    !titleScreen ||
    !destinationScreen
  ) {

    return;

  }


  transitioning = true;


  if (mainTitle) {

    mainTitle.classList.remove(
      "active"
    );

  }


  titleScreen.classList.add(
    "screen-out"
  );


  setTimeout(
    function () {

      titleScreen.style.display =
        "none";


      destinationScreen.style.display =
        "block";


      destinationScreen.classList.remove(
        "active"
      );


      requestAnimationFrame(
        function () {

          requestAnimationFrame(
            function () {

              destinationScreen.classList.add(
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


/* ========================================
   INITIALIZE
======================================== */

function initializeGame() {

  if (initialized) {
    return;
  }


  if (
    !initializeScreen ||
    !mainTitle
  ) {

    return;

  }


  initialized = true;


  safeTitleBgm();

  safeClickSound();


  initializeScreen.classList.remove(
    "active"
  );


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
   INITIALIZE CLICK
======================================== */

if (initializeScreen) {

  initializeScreen.addEventListener(
    "click",
    initializeGame
  );

}


/* ========================================
   PLAYER AUTH + LOAD
======================================== */

async function preparePlayer() {

  /*
    Auth 계정 확인.

    기존 계정이 있으면 복구하고,
    없으면 익명 계정을 생성한다.
  */

  const authResult =
    await window.GameAuth
      .getOrCreateUser();


  if (
    !authResult ||
    !authResult.user
  ) {

    throw new Error(
      "Player authentication failed."
    );

  }


  /*
    해당 Auth UUID의 players 데이터를
    서버에서 불러온다.
  */

  const player =
    await window.GamePlayer
      .getCurrentPlayer();


  if (!player) {

    throw new Error(
      "Player data could not be loaded."
    );

  }


  /*
    접속 시간 갱신.

    실패해도 게임 진입 자체를
    막을 필요는 없으므로 별도 처리.
  */

  try {

    await window.GamePlayer
      .updateLastLogin();

  } catch (error) {

    console.warn(
      "[PLAYER] Last login update failed:",
      error
    );

  }


  return player;

}

/* ========================================
   LOBBY PLAYER DATA
======================================== */

function formatNumber(value) {

  return Number(value).toLocaleString(
    "ko-KR"
  );

}


async function updateLobbyPlayerData(
  player
) {

   /* ========================================
   ITEM DETAIL
======================================== */

async function openItemDetail(
  itemId
) {

  if (
    !itemId ||
    !itemDetailModal
  ) {
    return;
  }


  safeClickSound();


  try {

    const item =
      await window.GameItems
        .getItem(itemId);


    if (!item) {
      return;
    }


    /* 이름 */

    if (itemDetailName) {

      itemDetailName.textContent =
        item.name_ko || "—";

    }


    if (itemDetailNameEn) {

      itemDetailNameEn.textContent =
        item.name_en || "";

    }


    /* 등급 */

    if (itemDetailGrade) {

      itemDetailGrade.textContent =
        item.grade
          ? String(item.grade).toUpperCase()
          : "";

    }


    /* 설명 */

    if (itemDetailDescription) {

      itemDetailDescription.textContent =
        item.description || "";

    }


    /* 이미지 */

    if (
      itemDetailImage &&
      itemDetailPlaceholder
    ) {

      itemDetailImage.classList.remove(
        "visible"
      );

      itemDetailImage.removeAttribute(
        "src"
      );

      itemDetailImage.alt =
        item.name_ko || "";


      itemDetailPlaceholder.style.display =
        "block";


      if (item.image_path) {

        itemDetailImage.onload =
          function () {

            itemDetailPlaceholder.style.display =
              "none";

            itemDetailImage.classList.add(
              "visible"
            );

          };


        itemDetailImage.onerror =
          function () {

            itemDetailImage.classList.remove(
              "visible"
            );

            itemDetailPlaceholder.style.display =
              "block";

          };


        itemDetailImage.src =
          item.image_path;

      }

    }


    /* 팝업 열기 */

    itemDetailModal.classList.add(
      "active"
    );

    itemDetailModal.setAttribute(
      "aria-hidden",
      "false"
    );


  } catch (error) {

    console.error(
      "[GAME] Item detail failed:",
      error
    );

  }

}


/* ========================================
   CLOSE ITEM DETAIL
======================================== */

function closeItemDetail() {

  if (!itemDetailModal) {
    return;
  }


  itemDetailModal.classList.remove(
    "active"
  );

  itemDetailModal.setAttribute(
    "aria-hidden",
    "true"
  );

}

   /* ========================================
   WALLET ITEM CLICK
======================================== */

const walletMunItem =
  walletMunDisplay?.closest(
    ".wallet-item"
  );

const walletOpulseItem =
  walletOpulseDisplay?.closest(
    ".wallet-item"
  );


if (walletMunItem) {

  walletMunItem.addEventListener(
    "click",
    function () {

      openItemDetail(
        "mun"
      );

    }
  );

}


if (walletOpulseItem) {

  walletOpulseItem.addEventListener(
    "click",
    function () {

      openItemDetail(
        "opulse"
      );

    }
  );

}


/* ========================================
   ITEM DETAIL CLOSE
======================================== */

if (itemDetailClose) {

  itemDetailClose.addEventListener(
    "click",
    function () {

      safeClickSound();

      closeItemDetail();

    }
  );

}


if (itemDetailBackdrop) {

  itemDetailBackdrop.addEventListener(
    "click",
    function () {

      closeItemDetail();

    }
  );

}


/* ESC로 닫기 */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      itemDetailModal &&
      itemDetailModal.classList.contains(
        "active"
      )
    ) {

      closeItemDetail();

    }

  }
);
   
  if (!player) {
    return;
  }


  /* ========================================
     PLAYER
  ======================================== */

  if (playerLevelDisplay) {

    playerLevelDisplay.textContent =
      player.level ?? 1;

  }


  if (playerNicknameDisplay) {

    playerNicknameDisplay.textContent =
      player.nickname || "—";

  }


  /* ========================================
     WALLET + ENDURANCE REFRESH
  ======================================== */

  const wallet =
    await window.GameWallet
      .refreshWallet();


  if (!wallet) {

    throw new Error(
      "Player wallet could not be loaded."
    );

  }


  /* ========================================
     WALLET UI
  ======================================== */

  if (walletMunDisplay) {

    walletMunDisplay.textContent =
      formatNumber(
        wallet.mun
      );

  }


  if (walletOpulseDisplay) {

    walletOpulseDisplay.textContent =
      formatNumber(
        wallet.opulse
      );

  }


  if (walletEnduranceDisplay) {

    walletEnduranceDisplay.textContent =
      `${formatNumber(wallet.endurance)} / ${formatNumber(wallet.endurance_max)}`;

  }


  console.log(
    "[GAME] Lobby data updated:",
    {
      player,
      wallet
    }
  );

}


/* ========================================
   START
======================================== */

if (
  startButton &&
  titleScreen &&
  lobbyScreen
) {

  startButton.addEventListener(
    "click",
    async function () {

      if (
        transitioning ||
        playerReady
      ) {

        return;

      }


      safeClickSound();


      startButton.disabled =
        true;


      /*
        서버 처리 중에는 중복 START 방지.
      */

      playerReady = true;


      try {

        const player =
          await preparePlayer();


        console.log(
          "[GAME] Player ready:",
          player
        );

      await updateLobbyPlayerData(
          player
        );
         
        /*
          별호가 없는 신규 플레이어
        */

        if (
          !player.nickname ||
          !player.nickname.trim()
        ) {

          if (
            !playerRegistrationScreen
          ) {

            throw new Error(
              "Player registration screen not found."
            );

          }


          leaveTitleScreen(
            playerRegistrationScreen
          );


          return;

        }


        /*
          이미 별호가 있는 플레이어
          → 바로 로비
        */

        leaveTitleScreen(
          lobbyScreen
        );


      } catch (error) {

        console.error(
          "[GAME] Failed to prepare player:",
          error
        );


        /*
          서버 오류가 났을 경우
          START를 다시 누를 수 있게 복구.
        */

        playerReady = false;

        startButton.disabled =
          false;

      }

    }
  );

}


/* ========================================
   NICKNAME CHARACTER COUNT
======================================== */

function updateNicknameCount() {

  if (
    !playerNicknameInput ||
    !playerNicknameCount
  ) {

    return;

  }


  const length =
    playerNicknameInput
      .value
      .length;


  playerNicknameCount.textContent =
    `${length} / 20`;

}


/* ========================================
   NICKNAME INPUT
======================================== */

if (playerNicknameInput) {

  playerNicknameInput.addEventListener(
    "input",
    function () {

      updateNicknameCount();


      /*
        다시 입력하면 이전 오류 문구 제거.
      */

      if (playerRegistrationError) {

        playerRegistrationError.textContent =
          "";

      }

    }
  );

}


/* ========================================
   SAVE NICKNAME
======================================== */

async function submitNickname() {

  if (
    !playerNicknameInput ||
    !playerRegistrationConfirm
  ) {

    return;

  }


  const nickname =
    playerNicknameInput
      .value
      .trim();


  /* ========================================
     VALIDATION
  ======================================== */

  if (nickname.length < 1) {

    if (playerRegistrationError) {

      playerRegistrationError.textContent =
        "별호를 입력하십시오.";

    }


    playerNicknameInput.focus();

    return;

  }


  if (nickname.length > 20) {

    if (playerRegistrationError) {

      playerRegistrationError.textContent =
        "별호는 20자 이내로 입력하십시오.";

    }


    playerNicknameInput.focus();

    return;

  }


  /*
    저장 중 중복 클릭 방지.
  */

  playerRegistrationConfirm.disabled =
    true;


  if (playerRegistrationError) {

    playerRegistrationError.textContent =
      "기록 중...";

  }


  safeClickSound();


  try {

    /*
      Supabase players.nickname 저장
    */

    const player =
      await window.GamePlayer
        .updateNickname(
          nickname
        );
     await updateLobbyPlayerData(
  player
);


    console.log(
      "[GAME] Nickname registered:",
      player.nickname
    );


    if (playerRegistrationError) {

      playerRegistrationError.textContent =
        "";

    }


    /*
      등록 완료
      → 별호 화면에서 로비로 전환
    */

    changeGameScreen(
      playerRegistrationScreen,
      lobbyScreen,
      300
    );


  } catch (error) {

    console.error(
      "[GAME] Nickname registration failed:",
      error
    );


    if (playerRegistrationError) {

      playerRegistrationError.textContent =
        "별호를 저장하지 못했습니다. 다시 시도하십시오.";

    }


    playerRegistrationConfirm.disabled =
      false;

  }

}


/* ========================================
   CONFIRM BUTTON
======================================== */

if (playerRegistrationConfirm) {

  playerRegistrationConfirm.addEventListener(
    "click",
    submitNickname
  );

}


/* ========================================
   ENTER → CONFIRM
======================================== */

if (playerNicknameInput) {

  playerNicknameInput.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key !== "Enter"
      ) {

        return;

      }


      event.preventDefault();


      if (
        playerRegistrationConfirm &&
        !playerRegistrationConfirm.disabled
      ) {

        submitNickname();

      }

    }
  );

}


/* ========================================
   GACHA
   EVENT / STANDARD SWITCH
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


  /* STANDARD */

  if (type === "standard") {

    standardGachaTab.classList.add(
      "active"
    );

    standardRecruitment.classList.add(
      "active"
    );

    return;

  }


  /* EVENT */

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
  lobbyScreen &&
  gachaScreen
) {

  gachaBanner.addEventListener(
    "click",
    function () {

      if (transitioning) {
        return;
      }


      safeClickSound();


      showRecruitment(
        "event"
      );


      changeGameScreen(
        lobbyScreen,
        gachaScreen,
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

      if (transitioning) {
        return;
      }


      safeClickSound();


      changeGameScreen(
        gachaScreen,
        lobbyScreen,
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
   INITIAL SCREEN STATE
======================================== */

/*
  타이틀 이외 게임 화면은
  최초 접속 시 DOM에서 숨겨 둔다.
*/


if (playerRegistrationScreen) {

  playerRegistrationScreen.classList.remove(
    "active"
  );

  playerRegistrationScreen.style.display =
    "none";

}


if (lobbyScreen) {

  lobbyScreen.classList.remove(
    "active"
  );

  lobbyScreen.style.display =
    "none";

}


if (gachaScreen) {

  gachaScreen.classList.remove(
    "active"
  );

  gachaScreen.style.display =
    "none";

}


/* ========================================
   INITIAL VALUES
======================================== */

updateNicknameCount();


showRecruitment(
  "event"
);
