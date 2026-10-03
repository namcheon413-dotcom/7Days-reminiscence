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

let currentInventoryCategory = "all";


/* ========================================
   INVENTORY CATEGORY MAP

   DB category 값에 의존하지 않는다.
   item.id 기준으로 직접 분류한다.
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
  standard_recruit_10_ticket: "recruitment",
  limited_recruit_10_ticket: "recruitment"

};


/* ========================================
   GET INVENTORY CATEGORY
======================================== */

function getInventoryCategory(item) {

  if (!item || !item.id) {
    return "none";
  }

  return (
    INVENTORY_CATEGORY_MAP[item.id] ||
    "none"
  );

}


/* ========================================
   CREATE INVENTORY CARD
======================================== */

function createInventoryCard(item) {

  const card =
    document.createElement("button");

  card.type = "button";

  card.className =
    "inventory-item-card";


  /*
    DB category가 아니라
    위의 ID 분류표를 사용한다.
  */

  card.dataset.category =
    getInventoryCategory(item);


  /* ========================================
     IMAGE AREA
  ======================================== */

  const imageArea =
    document.createElement("div");

  imageArea.className =
    "inventory-item-image-area";


  const image =
    document.createElement("img");

  image.className =
    "inventory-item-image";

  image.alt =
    item.name_ko ||
    item.name ||
    item.id ||
    "";

  image.loading = "lazy";


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
    document.createElement("span");

  quantity.className =
    "inventory-item-quantity";

  quantity.textContent =
    `× ${Number(item.quantity) || 0}`;


  imageArea.appendChild(
    quantity
  );


  /* ========================================
     NAME
  ======================================== */

  const name =
    document.createElement("span");

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
   INVENTORY EMPTY MESSAGE
======================================== */

function showInventoryEmpty(
  message = "이 분류에 보유 중인 소지품이 없습니다."
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
      document.createElement("div");

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

  empty.style.display = "";

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


  let visibleCount = 0;


  cards.forEach(
    function (card) {

      const cardCategory =
        card.dataset.category ||
        "none";


      /*
        전체:
        모든 보유 아이템 표시.

        그 외:
        해당 카테고리만 표시.
      */

      const visible =
        category === "all" ||
        cardCategory === category;


      if (visible) {

        card.style.display = "";

        visibleCount += 1;

      } else {

        card.style.display =
          "none";

      }

    }
  );


  if (visibleCount === 0) {

    showInventoryEmpty();

  } else {

    hideInventoryEmpty();

  }

}


/* ========================================
   SET INVENTORY TAB
======================================== */

function setInventoryCategory(
  category
) {

  currentInventoryCategory =
    category;


  inventoryTabs.forEach(
    function (tab) {

      const tabCategory =
        tab.dataset.inventoryCategory ||
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


  inventoryGrid.innerHTML = "";


  if (
    !window.GameItems ||
    typeof window.GameItems
      .getPlayerInventory !== "function"
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
      MUN / Opulse는
      인벤토리에 표시하지 않는다.

      수량 0 이하도 표시하지 않는다.
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
            Number(item.quantity) > 0
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
      현재 선택되어 있는 탭을
      새 카드에 다시 적용.
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
        인벤토리를 새로 열면
        전체 탭으로 초기화.
      */

      currentInventoryCategory =
        "all";


      inventoryTabs.forEach(
        function (tab) {

          const category =
            tab.dataset.inventoryCategory ||
            "all";

          tab.classList.toggle(
            "active",
            category === "all"
          );

        }
      );


      changeGameScreen(
        lobbyScreen,
        inventoryScreen,
        300
      );


      await loadInventory();


      /*
        로딩 완료 후
        전체 필터 한 번 더 확정.
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

        const category =
          tab.getAttribute(
            "data-inventory-category"
          ) || "all";


        safeClickSound();


        /*
          여기서 실제 필터링.
      */

        setInventoryCategory(
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
