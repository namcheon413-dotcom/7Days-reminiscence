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
   외부 공개
======================================== */

window.GameItems = {
  getItem,
  getItems
};
