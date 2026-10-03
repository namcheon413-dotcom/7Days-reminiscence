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

const walletEnduranceDisplay =
  document.getElementById(
    "wallet-endurance"
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


  if (!Number.isFinite(number)) {

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


  /* PLAYER */

  if (playerLevelDisplay) {

    playerLevelDisplay.textContent =
      player.level ?? 1;

  }


  if (playerNicknameDisplay) {

    playerNicknameDisplay.textContent =
      player.nickname || "—";

  }


  /* WALLET */

  if (!window.GameWallet) {

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
    typeof window.GameItems.getItem !==
      "function"
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


    /* NAME */

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


    /* GRADE */

    if (itemDetailGrade) {

      itemDetailGrade.textContent =
        item.grade
          ? String(
              item.grade
            ).toUpperCase()
          : "";

    }


    /* DESCRIPTION */

    if (itemDetailDescription) {

      itemDetailDescription.textContent =
        item.description ||
        "";

    }


    /* IMAGE */

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


    /* OPEN */

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
   INVENTORY
======================================== */

let currentInventoryCategory =
  "all";


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
    DB category가 없거나
    none이면 none으로 취급.

    none 아이템은 전체 탭에서만 표시.
  */

  card.dataset.category =
    item.category &&
    item.category !== "none"
      ? item.category
      : "none";


  /* ========================================
     IMAGE
  ======================================== */

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


  /* ========================================
     QUANTITY
  ======================================== */

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


  /* ========================================
     NAME
  ======================================== */

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


  /* ========================================
     CARD
  ======================================== */

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

      const itemCategory =
        card.dataset.category ||
        "none";


      let visible =
        false;


      /*
        전체:
        보유 중인 모든 아이템 표시.

        다른 탭:
        해당 category만 표시.

        none:
        전체에서만 표시.
      */

      if (
        category === "all"
      ) {

        visible =
          true;

      } else if (
        itemCategory ===
        category
      ) {

        visible =
          true;

      }


      if (visible) {

        card.style.display =
          "";


        visibleCount +=
          1;

      } else {

        card.style.display =
          "none";

      }

    }
  );


  /* ========================================
     CATEGORY EMPTY
  ======================================== */

  let emptyMessage =
    inventoryGrid.querySelector(
      ".inventory-category-empty"
    );


  if (
    visibleCount === 0
  ) {

    if (!emptyMessage) {

      emptyMessage =
        document.createElement(
          "div"
        );


      emptyMessage.className =
        "inventory-empty inventory-category-empty";


      emptyMessage.innerHTML = `
        <span>EMPTY</span>
        <p>이 분류에 보유 중인 소지품이 없습니다.</p>
      `;


      inventoryGrid.appendChild(
        emptyMessage
      );

    }


    emptyMessage.style.display =
      "";

  } else if (emptyMessage) {

    emptyMessage.style.display =
      "none";

  }

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


    inventoryGrid.innerHTML = `
      <div class="inventory-empty">
        <span>ERROR</span>
        <p>소지품 데이터를 불러올 수 없습니다.</p>
      </div>
    `;


    return;

  }


  try {

    const items =
      await window.GameItems
        .getPlayerInventory();


    /*
      수량이 실제로 존재하는 아이템만
      인벤토리에 넣는다.
    */

    const ownedItems =
      (items || []).filter(
        function (item) {

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

      inventoryGrid.innerHTML = `
        <div class="inventory-empty">
          <span>EMPTY</span>
          <p>보유 중인 소지품이 없습니다.</p>
        </div>
      `;


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
      새로 로드한 뒤에도
      현재 선택된 탭 유지.
    */

    filterInventoryCards(
      currentInventoryCategory
    );


  } catch (error) {

    console.error(
      "[INVENTORY] Load failed:",
      error
    );


    inventoryGrid.innerHTML = `
      <div class="inventory-empty">
        <span>ERROR</span>
        <p>소지품을 불러오지 못했습니다.</p>
      </div>
    `;

  }

}


/* ========================================
   INVENTORY OPEN
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
        인벤토리를 새로 열 때는
        항상 전체 탭부터 시작.
      */

      currentInventoryCategory =
        "all";


      inventoryTabs.forEach(
        function (tab) {

          const category =
            tab.dataset
              .inventoryCategory;


          if (
            category === "all"
          ) {

            tab.classList.add(
              "active"
            );

          } else {

            tab.classList.remove(
              "active"
            );

          }

        }
      );


      /*
        화면 먼저 전환.
      */

      changeGameScreen(
        lobbyScreen,
        inventoryScreen,
        300
      );


      /*
        서버에서 실제 보유품 로드.
      */

      await loadInventory();

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
   INVENTORY TABS
======================================== */

inventoryTabs.forEach(
  function (tab) {

    tab.addEventListener(
      "click",
      function () {

        const category =
          tab.dataset
            .inventoryCategory ||
          "all";


        if (
          category ===
          currentInventoryCategory
        ) {

          return;

        }


        safeClickSound();


        currentInventoryCategory =
          category;


        /* ACTIVE TAB */

        inventoryTabs.forEach(
          function (otherTab) {

            otherTab.classList.remove(
              "active"
            );

          }
        );


        tab.classList.add(
          "active"
        );


        /* ACTUAL FILTER */

        filterInventoryCards(
          category
        );

      }
    );

  }
);

/* ========================================
   GACHA VIEW
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


  /* STANDARD */

  if (
    type ===
    "standard"
  ) {

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

  playerRegistrationScreen
    .classList
    .remove(
      "active"
    );


  playerRegistrationScreen.style.display =
    "none";

}


if (lobbyScreen) {

  lobbyScreen
    .classList
    .remove(
      "active"
    );


  lobbyScreen.style.display =
    "none";

}


if (gachaScreen) {

  gachaScreen
    .classList
    .remove(
      "active"
    );


  gachaScreen.style.display =
    "none";

}


if (inventoryScreen) {

  inventoryScreen
    .classList
    .remove(
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
