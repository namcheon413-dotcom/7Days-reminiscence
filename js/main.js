/* ========================================
   七曜回顧錄 · MAIN CONTROLLER
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
  document.getElementById("player-level");

const playerNicknameDisplay =
  document.getElementById("player-nickname");

const walletMunDisplay =
  document.getElementById("wallet-mun");

const walletOpulseDisplay =
  document.getElementById("wallet-opulse");

const walletEnduranceDisplay =
  document.getElementById("wallet-endurance");


/* ========================================
   ITEM DETAIL MODAL
======================================== */

const itemDetailModal =
  document.getElementById("item-detail-modal");

const itemDetailBackdrop =
  document.getElementById("item-detail-backdrop");

const itemDetailClose =
  document.getElementById("item-detail-close");

const itemDetailImage =
  document.getElementById("item-detail-image");

const itemDetailPlaceholder =
  document.getElementById("item-detail-placeholder");

const itemDetailGrade =
  document.getElementById("item-detail-grade");

const itemDetailName =
  document.getElementById("item-detail-name");

const itemDetailNameEn =
  document.getElementById("item-detail-name-en");

const itemDetailDescription =
  document.getElementById("item-detail-description");


/* ========================================
   INVENTORY ELEMENTS
======================================== */

const inventoryScreen =
  document.getElementById("inventory-screen");

const inventoryButton =
  document.getElementById("inventory-button");

const inventoryBackButton =
  document.getElementById("inventory-back-button");

const inventoryGrid =
  document.getElementById("inventory-grid");

const inventoryTabs =
  document.querySelectorAll(".inventory-tab");


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

let currentInventoryCategory =
  "all";


/* ========================================
   INVENTORY CATEGORY MAP

   DB의 category 값에 의존하지 않고
   확정된 item.id 기준으로 분류한다.
======================================== */

const INVENTORY_CATEGORY_MAP = {

  /* 육성 */

  origin: "growth",


  /* 해방 */

  azure_scale_low: "liberation",
  azure_scale_mid: "liberation",
  azure_scale_high: "liberation",

  vermilion_feather_low: "liberation",
  vermilion_feather_mid: "liberation",
  vermilion_feather_high: "liberation",

  yellow_mane_low: "liberation",
  yellow_mane_mid: "liberation",
  yellow_mane_high: "liberation",

  white_fang_low: "liberation",
  white_fang_mid: "liberation",
  white_fang_high: "liberation",

  black_shell_low: "liberation",
  black_shell_mid: "liberation",
  black_shell_high: "liberation",

  chilyo_gokok: "liberation",
  myeongmaek: "liberation",


  /* 소모품 */

  fatigue_tonic: "consumable",


  /* 모집권 */

  standard_recruit_10_ticket:
    "recruitment",

  limited_recruit_10_ticket:
    "recruitment"

};


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
      "[AUDIO] Click sound failed:",
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
      "[AUDIO] Title BGM failed:",
      error
    );

  }

}


/* ========================================
   SCREEN TRANSITION
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

  if (
    !window.GameAuth ||
    !window.GamePlayer
  ) {

    throw new Error(
      "Game auth/player module not loaded."
    );

  }


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


  const player =
    await window.GamePlayer
      .getCurrentPlayer();


  if (!player) {

    throw new Error(
      "Player data could not be loaded."
    );

  }


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
   NUMBER FORMAT
======================================== */

function formatNumber(
  value
) {

  const number =
    Number(value);


  if (
    !Number.isFinite(number)
  ) {

    return "0";

  }


  return number.toLocaleString(
    "ko-KR"
  );

}


/* ========================================
   LOBBY PLAYER DATA
======================================== */

async function updateLobbyPlayerData(
  player
) {

  if (!player) {

    return;

  }


  if (playerLevelDisplay) {

    playerLevelDisplay.textContent =
      player.level ?? 1;

  }


  if (playerNicknameDisplay) {

    playerNicknameDisplay.textContent =
      player.nickname || "—";

  }


  if (
    !window.GameWallet ||
    typeof window.GameWallet
      .refreshWallet !== "function"
  ) {

    throw new Error(
      "GameWallet module not loaded."
    );

  }


  const wallet =
    await window.GameWallet
      .refreshWallet();


  if (!wallet) {

    throw new Error(
      "Player wallet could not be loaded."
    );

  }


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
      `${formatNumber(
        wallet.endurance
      )} / ${formatNumber(
        wallet.endurance_max
      )}`;

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


  if (
    !window.GameItems ||
    typeof window.GameItems
      .getItem !== "function"
  ) {

    console.error(
      "[ITEM] GameItems.getItem is unavailable."
    );

    return;

  }


  safeClickSound();


  try {

    const item =
      await window.GameItems
        .getItem(
          itemId
        );


    if (!item) {

      return;

    }


    if (itemDetailName) {

      itemDetailName.textContent =
        item.name_ko ||
        item.name ||
        "—";

    }


    if (itemDetailNameEn) {

      itemDetailNameEn.textContent =
        item.name_en ||
        "";

    }


    if (itemDetailGrade) {

      itemDetailGrade.textContent =
        item.grade
          ? String(
              item.grade
            ).toUpperCase()
          : "";

    }


    if (itemDetailDescription) {

      itemDetailDescription.textContent =
        item.description ||
        "";

    }


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
        item.name_ko ||
        item.name ||
        "";


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


    itemDetailModal.classList.add(
      "active"
    );


    itemDetailModal.setAttribute(
      "aria-hidden",
      "false"
    );


  } catch (error) {

    console.error(
      "[ITEM] Item detail failed:",
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
   ITEM DETAIL CLOSE EVENTS
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
    closeItemDetail
  );

}


document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      itemDetailModal?.classList.contains(
        "active"
      )
    ) {

      closeItemDetail();

    }

  }
);


/* ========================================
   INVENTORY CATEGORY
======================================== */

function getInventoryCategory(
  item
) {

  if (
    !item ||
    !item.id
  ) {

    return "none";

  }


  return (
    INVENTORY_CATEGORY_MAP[
      item.id
    ] ||
    "none"
  );

}


/* ========================================
   CREATE INVENTORY CARD
======================================== */

function createInventoryCard(
  item
) {

  const card =
    document.createElement(
      "button"
    );


  card.type =
    "button";


  card.className =
    "inventory-item-card";


  /*
    실제 탭 필터에 사용되는 값.
  */

  card.dataset.category =
    getInventoryCategory(
      item
    );


  /* IMAGE */

  const imageArea =
    document.createElement(
      "div"
    );


  imageArea.className =
    "inventory-item-image-area";


  const image =
    document.createElement(
      "img"
    );


  image.className =
    "inventory-item-image";


  image.alt =
    item.name_ko ||
    item.name ||
    item.id ||
    "";


  image.loading =
    "lazy";


  if (item.image_path) {

    image.src =
      item.image_path;

  } else {

    image.style.display =
      "none";


    imageArea.classList.add(
      "no-image"
    );

  }


  image.addEventListener(
    "error",
    function () {

      image.style.display =
        "none";


      imageArea.classList.add(
        "no-image"
      );

    }
  );


  imageArea.appendChild(
    image
  );


  /* QUANTITY */

  const quantity =
    document.createElement(
      "span"
    );


  quantity.className =
    "inventory-item-quantity";


  quantity.textContent =
    `× ${Number(
      item.quantity
    ) || 0}`;


  imageArea.appendChild(
    quantity
  );


  /* NAME */

  const name =
    document.createElement(
      "span"
    );


  name.className =
    "inventory-item-name";


  name.textContent =
    item.name_ko ||
    item.name ||
    item.id ||
    "—";


  card.appendChild(
    imageArea
  );


  card.appendChild(
    name
  );


  card.addEventListener(
    "click",
    function () {

      openItemDetail(
        item.id
      );

    }
  );


  return card;

}


/* ========================================
   INVENTORY EMPTY
======================================== */

function showInventoryEmpty(
  message =
    "이 분류에 보유 중인 소지품이 없습니다."
) {

  if (!inventoryGrid) {

    return;

  }


  let empty =
    inventoryGrid.querySelector(
      ".inventory-category-empty"
    );


  if (!empty) {

    empty =
      document.createElement(
        "div"
      );


    empty.className =
      "inventory-empty inventory-category-empty";


    inventoryGrid.appendChild(
      empty
    );

  }


  empty.innerHTML = `
    <span>EMPTY</span>
    <p>${message}</p>
  `;


  empty.style.display =
    "";

}


function hideInventoryEmpty() {

  if (!inventoryGrid) {

    return;

  }


  const empty =
    inventoryGrid.querySelector(
      ".inventory-category-empty"
    );


  if (empty) {

    empty.style.display =
      "none";

  }

}


/* ========================================
   INVENTORY FILTER
======================================== */

function filterInventoryCards(
  category
) {

  if (!inventoryGrid) {

    return;

  }


  const cards =
    inventoryGrid.querySelectorAll(
      ".inventory-item-card"
    );


  let visibleCount =
    0;


  cards.forEach(
    function (card) {

      const cardCategory =
        card.dataset.category ||
        "none";


      /*
        전체:
        보유품 전부 표시.

        그 외:
        정확히 해당 분류만 표시.

        none:
        전체 이외에서는 자동으로 숨김.
      */

      const visible =
        category === "all" ||
        cardCategory === category;


      card.style.display =
        visible
          ? ""
          : "none";


      if (visible) {

        visibleCount +=
          1;

      }

    }
  );


  if (
    visibleCount === 0
  ) {

    showInventoryEmpty();

  } else {

    hideInventoryEmpty();

  }

}


/* ========================================
   SET INVENTORY CATEGORY
======================================== */

function setInventoryCategory(
  category
) {

  currentInventoryCategory =
    category;


  inventoryTabs.forEach(
    function (tab) {

      const tabCategory =
        tab.dataset
          .inventoryCategory ||
        "all";


      tab.classList.toggle(
        "active",
        tabCategory === category
      );

    }
  );


  filterInventoryCards(
    category
  );

}


/* ========================================
   LOAD INVENTORY
======================================== */

async function loadInventory() {

  if (!inventoryGrid) {

    return;

  }


  inventoryGrid.innerHTML =
    "";


  if (
    !window.GameItems ||
    typeof window.GameItems
      .getPlayerInventory !==
      "function"
  ) {

    console.error(
      "[INVENTORY] getPlayerInventory is unavailable."
    );


    showInventoryEmpty(
      "소지품 데이터를 불러올 수 없습니다."
    );


    return;

  }


  try {

    const items =
      await window.GameItems
        .getPlayerInventory();


    /*
      인벤토리 표시 조건:

      1. 실제 보유 수량 > 0
      2. MUN 제외
      3. Opulse 제외
    */

    const ownedItems =
      (items || []).filter(
        function (item) {

          if (!item) {

            return false;

          }


          if (
            item.id === "mun" ||
            item.id === "opulse"
          ) {

            return false;

          }


          return (
            Number(
              item.quantity
            ) > 0
          );

        }
      );


    if (
      ownedItems.length === 0
    ) {

      showInventoryEmpty(
        "보유 중인 소지품이 없습니다."
      );


      return;

    }


    ownedItems.forEach(
      function (item) {

        const card =
          createInventoryCard(
            item
          );


        inventoryGrid.appendChild(
          card
        );

      }
    );


    /*
      로드가 끝난 뒤
      현재 탭 필터를 실제 카드에 적용.
    */

    filterInventoryCards(
      currentInventoryCategory
    );


  } catch (error) {

    console.error(
      "[INVENTORY] Load failed:",
      error
    );


    showInventoryEmpty(
      "소지품을 불러오지 못했습니다."
    );

  }

}


/* ========================================
   LOBBY → INVENTORY
======================================== */

if (
  inventoryButton &&
  lobbyScreen &&
  inventoryScreen
) {

  inventoryButton.addEventListener(
    "click",
    async function () {

      if (transitioning) {

        return;

      }


      safeClickSound();


      /*
        새로 열 때는 항상 전체.
      */

      currentInventoryCategory =
        "all";


      setInventoryCategory(
        "all"
      );


      /*
        화면 전환.
      */

      changeGameScreen(
        lobbyScreen,
        inventoryScreen,
        300
      );


      /*
        실제 서버 보유품 로드.
      */

      await loadInventory();


      /*
        카드 생성 후
        전체 필터 다시 확정.
      */

      setInventoryCategory(
        "all"
      );

    }
  );

}


/* ========================================
   INVENTORY → LOBBY
======================================== */

if (
  inventoryBackButton &&
  inventoryScreen &&
  lobbyScreen
) {

  inventoryBackButton.addEventListener(
    "click",
    function () {

      if (transitioning) {

        return;

      }


      safeClickSound();


      changeGameScreen(
        inventoryScreen,
        lobbyScreen,
        300
      );

    }
  );

}


/* ========================================
   INVENTORY TAB CLICK
======================================== */

inventoryTabs.forEach(
  function (tab) {

    tab.addEventListener(
      "click",
      function () {

        safeClickSound();


        const category =
          tab.dataset
            .inventoryCategory ||
          "all";


        /*
          탭을 누르는 즉시
          실제 카드 필터링.
        */

        setInventoryCategory(
          category
        );

      }
    );

  }
);


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


      playerReady =
        true;


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
          신규 플레이어
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
          기존 플레이어
        */

        leaveTitleScreen(
          lobbyScreen
        );


      } catch (error) {

        console.error(
          "[GAME] Failed to prepare player:",
          error
        );


        playerReady =
          false;


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


  playerNicknameCount.textContent =
    `${playerNicknameInput.value.length} / 20`;

}


/* ========================================
   NICKNAME INPUT
======================================== */

if (playerNicknameInput) {

  playerNicknameInput.addEventListener(
    "input",
    function () {

      updateNicknameCount();


      if (
        playerRegistrationError
      ) {

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


  if (
    nickname.length < 1
  ) {

    if (
      playerRegistrationError
    ) {

      playerRegistrationError.textContent =
        "별호를 입력하십시오.";

    }


    playerNicknameInput.focus();


    return;

  }


  if (
    nickname.length > 20
  ) {

    if (
      playerRegistrationError
    ) {

      playerRegistrationError.textContent =
        "별호는 20자 이내로 입력하십시오.";

    }


    playerNicknameInput.focus();


    return;

  }


  playerRegistrationConfirm.disabled =
    true;


  if (
    playerRegistrationError
  ) {

    playerRegistrationError.textContent =
      "기록 중...";

  }


  safeClickSound();


  try {

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


    if (
      playerRegistrationError
    ) {

      playerRegistrationError.textContent =
        "";

    }


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


    if (
      playerRegistrationError
    ) {

      playerRegistrationError.textContent =
        "별호를 저장하지 못했습니다. 다시 시도하십시오.";

    }


    playerRegistrationConfirm.disabled =
      false;

  }

}


/* ========================================
   NICKNAME CONFIRM
======================================== */

if (
  playerRegistrationConfirm
) {

  playerRegistrationConfirm.addEventListener(
    "click",
    submitNickname
  );

}


/* ========================================
   NICKNAME ENTER
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
        !playerRegistrationConfirm
          .disabled
      ) {

        submitNickname();

      }

    }
  );

}


/* ========================================
   GACHA
======================================== */

function showRecruitment(
  type
) {

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


  if (
    type === "standard"
  ) {

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
          button.dataset
            .recruitType;


        const recruitCount =
          Number(
            button.dataset
              .recruitCount
          );


        console.log(
          "[RECRUIT]",
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

if (
  playerRegistrationScreen
) {

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


if (inventoryScreen) {

  inventoryScreen.classList.remove(
    "active"
  );


  inventoryScreen.style.display =
    "none";

}


/* ========================================
   INITIAL VALUES
======================================== */

updateNicknameCount();


showRecruitment(
  "event"
);
