const startButton =
  document.getElementById("start-button");


startButton.addEventListener("click", function () {

  // 사용자 클릭 순간 BGM 재생
  playTitleBgm();

  // 클릭 효과음
  playClickSound();

  // 클릭 확인
  startButton.textContent = "CONNECTING...";

});
