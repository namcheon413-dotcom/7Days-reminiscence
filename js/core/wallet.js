/* ========================================
   PLAYER WALLET
======================================== */


/* ========================================
   지구력 갱신 + 지갑 불러오기
======================================== */

async function refreshWallet() {

  const { data, error } =
    await supabaseClient.rpc("refresh_endurance");


  if (error) {
    console.error(
      "[GameWallet] 지갑 갱신 실패:",
      error
    );

    throw error;
  }


  if (!data) {
    throw new Error(
      "[GameWallet] 지갑 데이터가 없습니다."
    );
  }


  return data;
}


/* ========================================
   현재 지갑 조회
======================================== */

async function getWallet() {

  const {
    data: { user },
    error: userError
  } =
    await supabaseClient.auth.getUser();


  if (userError) {
    console.error(
      "[GameWallet] 사용자 확인 실패:",
      userError
    );

    throw userError;
  }


  if (!user) {
    throw new Error(
      "[GameWallet] 로그인된 사용자가 없습니다."
    );
  }


  const { data, error } =
    await supabaseClient
      .from("player_wallet")
      .select(
        `
          mun,
          opulse,
          endurance,
          endurance_max,
          endurance_updated_at
        `
      )
      .eq("player_id", user.id)
      .single();


  if (error) {
    console.error(
      "[GameWallet] 지갑 조회 실패:",
      error
    );

    throw error;
  }


  return data;
}


/* ========================================
   외부 공개
======================================== */

window.GameWallet = {
  refreshWallet,
  getWallet
};
