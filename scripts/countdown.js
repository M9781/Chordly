
// ******************************************************
//   Pre-timer
// ******************************************************

function startPreTimer() {
    preTimerElement.style.display = "block";
    firstChordElement.style.display = "none";
    nextChordElement.style.display = "none";
    visualMetronome.style.display = "none";
    randomizerOptions.style.display = "none";
    changeProgress(countdownProgressElement);
    timerInterval = setInterval(changeNumber, 1000);
  }
  
  function stopPreTimer() {
    clearInterval(timerInterval);
    preTimerElement.style.display = "none";
    firstChordElement.style.display = "block";
    nextChordElement.style.display = "block";
    visualMetronome.style.display = "block";
    randomizerOptions.style.display = "grid";
    round = 3;
    preTimerElement.children[0].textContent = round;
    stopProgress(countdownProgressElement);
  }
  
  function changeNumber() {
    round--;
    changeProgress(countdownProgressElement);
    if (round < 1) {
      stopPreTimer();
      return;
    }
    preTimerElement.children[0].textContent = round;
  }
  
  let round = 3;
  
  // emulate progress attribute change
  
  function startProgress(el, ms) {
    progressInterval = setInterval(() => {
      changeProgress(el);
    }, ms);
  }
  
  function changeProgress(el) {
    progress += (1 / 3) * 100;
    el.setAttribute("progress", progress);
    if (progress >= 100) {
      stopProgress(countdownProgressElement);
    }
  }
  
  function stopProgress(el) {
    clearInterval(progressInterval);
    progress = 0;
    el.setAttribute("progress", progress);
  }
  
  // countdownInterval = setInterval(() => {
  //   progress += 10;
  //   el.setAttribute("progress", progress);
  //   if (progress === 100) clearInterval(countdownInterval);
  // }, 1000);
  
  let progress = 0;
  