const startButton =
  document.getElementById("start-button");



/* =========================================
   START
========================================= */

startButton.addEventListener(
  "click",
  async function () {

    /*
      자동재생이 차단되어 있었다면
      사용자의 클릭을 이용해 BGM 시작
    */

    await playTitleBgm();


    /*
      START 클릭 효과음
    */

    playClickSound();


    /*
      아직 로비가 없으므로
      현재는 버튼 반응만 확인한다.
    */

    startButton.textContent =
      "CONNECTING...";

  }
);
