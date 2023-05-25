// ******************************************************
//   Countdown
// ******************************************************

async function startCountdown() {
  countdownElement.style.display = "block";
  firstChordElement.style.display = "none";
  nextChordElement.style.display = "none";
  visualMetronome.style.display = "none";
  randomizerOptions.style.display = "none";
  await new Promise((r) => setTimeout(r, 10));
  progress = (1 / 3) * 100;
  setProgress(countdownProgressCircle, progress);
  timerInterval = setInterval(changeNumber, 1000);
}

function stopCountdown() {
  clearInterval(timerInterval);
  countdownElement.style.display = "none";
  firstChordElement.style.display = "block";
  showHideMetronome();
  showHideNextChord();
  randomizerOptions.style.display = "grid";
  round = 3;
  progress = 0;
}

function changeNumber() {
  round--;
  progress += (1 / 3) * 100;
  if (round < 1) stopCountdown();
  setProgress(countdownProgressCircle, progress);
  countdownElement.children[0].textContent = round;
}

let round = 3;
let progress = 0;