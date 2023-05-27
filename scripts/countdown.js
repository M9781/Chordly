// ******************************************************
//   Countdown
// ******************************************************

async function startCountdown() {
  let randomizerHeight = parseFloat(
    getComputedStyle(randomizerElement).height,
    10
  );
  countdownElement.style.display = "block";
  firstChordContainerElement.style.display = "none";
  nextChordContainerElement.style.display = "none";
  visualMetronome.style.display = "none";
  randomizerOptions.style.display = "none";
  randomizerElement.style.height = `${randomizerHeight}px`;
  await new Promise((r) => setTimeout(r, 10));
  progress = (1 / 3) * 100;
  setProgress(countdownProgressCircle, progress);
  timerInterval = setInterval(changeNumber, 1000);
}

function stopCountdown() {
  clearInterval(timerInterval);
  countdownElement.style.display = "none";
  firstChordContainerElement.style.display = "flex";
  showHideMetronome();
  showHideNextChord();
  randomizerOptions.style.display = "grid";
  round = 3;
  progress = 0;
  randomizerElement.removeAttribute("style")
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