/* ========================================
   GAME ITEMS
======================================== */


/* ========================================
   아이템 하나 조회
======================================== */

async function getItem(
  itemId
) {

  if (!itemId) {

    throw new Error(
      "[GameItems] itemId가 없습니다."
    );

  }


  const { data, error } =
    await supabaseClient
      .from("game_items")
      .select("*")
      .eq("id", itemId)
      .single();


  if (error) {

    console.error(
      "[GameItems] 아이템 조회 실패:",
      itemId,
      error
    );

    throw error;

  }


  return data;
}


/* ========================================
   여러 아이템 조회
======================================== */

async function getItems(
  itemIds
) {

  if (
    !Array.isArray(itemIds) ||
    itemIds.length === 0
  ) {

    return [];

  }


  const { data, error } =
    await supabaseClient
      .from("game_items")
      .select("*")
      .in("id", itemIds);


  if (error) {

    console.error(
      "[GameItems] 아이템 목록 조회 실패:",
      error
    );

    throw error;

  }


  return data || [];
}


/* ========================================
   플레이어 인벤토리 전체 조회
======================================== */

async function getPlayerInventory() {

  const {
    data: { user },
    error: userError
  } =
    await supabaseClient.auth.getUser();


  if (userError) {

    console.error(
      "[GameItems] 사용자 확인 실패:",
      userError
    );

    throw userError;

  }


  if (!user) {

    throw new Error(
      "[GameItems] 로그인된 사용자가 없습니다."
    );

  }


  /* ========================================
     1. 게임 아이템 전체 조회
  ======================================== */

  const {
    data: items,
    error: itemsError
  } =
    await supabaseClient
      .from("game_items")
      .select("*");


  if (itemsError) {

    console.error(
      "[GameItems] 아이템 목록 조회 실패:",
      itemsError
    );

    throw itemsError;

  }


  /* ========================================
     2. 플레이어 보유 수량 조회
  ======================================== */

  const {
    data: inventory,
    error: inventoryError
  } =
    await supabaseClient
      .from("player_inventory")
      .select("item_id, quantity")
      .eq("player_id", user.id);


  if (inventoryError) {

    console.error(
      "[GameItems] 플레이어 인벤토리 조회 실패:",
      inventoryError
    );

    throw inventoryError;

  }


  /* ========================================
     3. 보유 수량 MAP
  ======================================== */

  const quantityMap =
    new Map();


  (inventory || []).forEach(
    function (entry) {

      quantityMap.set(
        entry.item_id,
        Number(entry.quantity) || 0
      );

    }
  );


  /* ========================================
     4. game_items + 보유 수량 합치기

     MUN / OPULSE는 통화이므로
     일반 인벤토리에서 제외
  ======================================== */

  const result =
    (items || [])
      .filter(
        function (item) {

          return (
            item.id !== "mun" &&
            item.id !== "opulse"
          );

        }
      )
      .map(
        function (item) {

          return {
            ...item,

            quantity:
              quantityMap.get(item.id) || 0
          };

        }
      );


  return result;

}

/* ========================================
   외부 공개
======================================== */

window.GameItems = {
  getItem,
  getItems,
  getPlayerInventory
};
