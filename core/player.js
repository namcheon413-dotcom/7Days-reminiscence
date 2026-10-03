/* ========================================
   七曜回顧錄
   PLAYER MANAGER
======================================== */


/* ========================================
   GET CURRENT PLAYER
======================================== */

async function getCurrentPlayer() {

  /*
    현재 로그인된 Supabase 사용자를 확인한다.
  */

  const {
    data: userData,
    error: userError
  } =
    await window.supabaseClient
      .auth
      .getUser();


  if (userError) {

    console.error(
      "[PLAYER] Failed to get user:",
      userError
    );

    throw userError;
  }


  const user =
    userData.user;


  if (!user) {

    console.warn(
      "[PLAYER] No authenticated user."
    );

    return null;
  }


  /*
    auth.users의 UUID와 동일한
    players 행을 가져온다.

    RLS 때문에 현재 로그인된 사용자는
    자기 행만 읽을 수 있다.
  */

  const {
    data: player,
    error: playerError
  } =
    await window.supabaseClient
      .from("players")
      .select(`
        id,
        nickname,
        level,
        exp,
        created_at,
        updated_at,
        last_login_at
      `)
      .eq("id", user.id)
      .single();


  if (playerError) {

    console.error(
      "[PLAYER] Failed to load player:",
      playerError
    );

    throw playerError;
  }


  console.log(
    "[PLAYER] Loaded:",
    player
  );


  return player;
}


/* ========================================
   UPDATE NICKNAME
======================================== */

async function updateNickname(nickname) {

  /*
    앞뒤 공백 제거
  */

  const cleanNickname =
    String(nickname ?? "").trim();


  /*
    DB에도 1~20자 제약이 있지만
    브라우저에서도 먼저 검사한다.
  */

  if (
    cleanNickname.length < 1 ||
    cleanNickname.length > 20
  ) {

    throw new Error(
      "[PLAYER] Nickname must be 1–20 characters."
    );
  }


  const {
    data: userData,
    error: userError
  } =
    await window.supabaseClient
      .auth
      .getUser();


  if (userError) {

    console.error(
      "[PLAYER] Failed to get user:",
      userError
    );

    throw userError;
  }


  const user =
    userData.user;


  if (!user) {

    throw new Error(
      "[PLAYER] No authenticated user."
    );
  }


  /*
    현재 로그인된 플레이어의
    별호와 수정 시각만 갱신.
  */

  const {
    data: player,
    error: updateError
  } =
    await window.supabaseClient
      .from("players")
      .update({
        nickname: cleanNickname,
        updated_at: new Date().toISOString()
      })
      .eq("id", user.id)
      .select(`
        id,
        nickname,
        level,
        exp,
        created_at,
        updated_at,
        last_login_at
      `)
      .single();


  if (updateError) {

    console.error(
      "[PLAYER] Failed to update nickname:",
      updateError
    );

    throw updateError;
  }


  console.log(
    "[PLAYER] Nickname updated:",
    player.nickname
  );


  return player;
}


/* ========================================
   UPDATE LAST LOGIN
======================================== */

async function updateLastLogin() {

  const {
    data: userData,
    error: userError
  } =
    await window.supabaseClient
      .auth
      .getUser();


  if (userError) {
    throw userError;
  }


  const user =
    userData.user;


  if (!user) {
    return null;
  }


  const now =
    new Date().toISOString();


  const {
    error
  } =
    await window.supabaseClient
      .from("players")
      .update({
        last_login_at: now,
        updated_at: now
      })
      .eq("id", user.id);


  if (error) {

    console.error(
      "[PLAYER] Failed to update last login:",
      error
    );

    throw error;
  }


  return now;
}


/* ========================================
   TEST
======================================== */

async function testPlayerLoad() {

  try {

    const player =
      await getCurrentPlayer();


    console.log(
      "================================"
    );

    console.log(
      "[PLAYER TEST]"
    );

    console.log(
      "ID:",
      player?.id
    );

    console.log(
      "NICKNAME:",
      player?.nickname
    );

    console.log(
      "LEVEL:",
      player?.level
    );

    console.log(
      "EXP:",
      player?.exp
    );

    console.log(
      "================================"
    );


    return player;

  } catch (error) {

    console.error(
      "[PLAYER TEST FAILED]",
      error
    );

    return null;
  }
}


/* ========================================
   GLOBAL ACCESS
======================================== */

window.GamePlayer = {
  getCurrentPlayer,
  updateNickname,
  updateLastLogin,
  testPlayerLoad
};
