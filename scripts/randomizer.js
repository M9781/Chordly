//   ╔════════════════════════════════════════════════════╗
//   ║                Randomizer Module                   ║
//   ╚════════════════════════════════════════════════════╝

//disables or enables fullscreen mode
function enableDisableFullscreen() {
  if (!isFullscreenEnabled) {
    randomizerElement.classList.add("fullscreen");
    document.body.classList.add("fullscreen");
    fullscreenBtn.children[0].textContent = "fullscreen_exit";
    isFullscreenEnabled = true;
  } else {
    randomizerElement.classList.remove("fullscreen");
    document.body.classList.remove("fullscreen");
    fullscreenBtn.children[0].textContent = "fullscreen";
    isFullscreenEnabled = false;
  }
}

// ******************************************************
//   Show or hide "Empty Chord List" Warning
// ******************************************************

// Checks if there is an empty array
//   at least 1 Main and at least 1 suffix or custom chord
//   has to be picked for Randomizer to run
function checkForEmptyCLException() {
  if (app.chosenChordsMain.length == 0) {
    showEmptyCLError("main");
    return true;
  }
  if (app.chosenChordsSufix.length == 0) {
    //or  custom
    showEmptyCLError("sufix");
    return true;
  }

  hideEmptyCLError();
  return false;
}

// Hides warning styling and message
function hideEmptyCLError() {
  for (element in optionsElements) {
    optionsElements[element].classList.remove("warning");
    errorOutputElement.main.textContent = "";
    errorOutputElement.sufix.textContent = "";
  }
}

// Shows warning styling and message
function showEmptyCLError(type) {
  if (isFullscreenEnabled) {
    enableDisableFullscreen();
  }

  for (element in optionsElements) {
    if (type === "main" && element !== "main") continue;
    if (type !== "main" && element === "main") continue;

    optionsElements[element].classList.add("warning");
  }
  section[type].scrollIntoView();
  errorOutputElement[type].textContent = emptyCLExceptionMsg[type];
}

// ******************************************************
//   Generate Random Chords
// ******************************************************

// returns random text, given a list of strings
function generateText(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

//function returns a randomly generated chord
function getRandomChord() {
  const chordMainPart = chosenChords.main.map((ccn) => ccn.value);
  const chordSufix = [].concat(
    chosenChords.basic.map((ccb) => ccb.value),
    chosenChords.medium.map((ccm) => ccm.value),
    chosenChords.intermediate.map((cci) => cci.value),
    chosenChords.advanced.map((cca) => cca.value)
  );
  //get random value whether to show a predefined or custom (only if both exist)

  const randomChord = generateText(chordMainPart) + generateText(chordSufix);
  return randomChord;
}

// function changes random chords to view in randomizer
function changeText() {
  firstChordElement.textContent = nextChordElement.textContent;
  nextChordElement.textContent = getRandomChord(); //chordlist main + chordlist sufix
}

// ******************************************************
//   Start Randomizer
// ******************************************************

// separate function for starting randomizer
async function startRandomizer() {
  startBtn.children[0].textContent = "pause";
  isRandomizerRunning = true;
  if (app.showPreTimer) {
    startPreTimer();
    await new Promise((r) => setTimeout(r, 3000));
  }

  randomizerInterval = setInterval(
    changeText,
    app.repeatChord * (60 / app.BPM) * 1000 * getFractionsNumber()
  );
  

  if (app.showMetronome) startMetronome();
}

// separate function for stoping randomizer
function stopRandomizer() {
  startBtn.children[0].textContent = "play_arrow";
  clearInterval(randomizerInterval);
  isRandomizerRunning = false;
  stopPreTimer();
  stopMetronome();
}

//event listener function for startBtn
function startStopRandomizer(event) {
  //wait for pretimer
  if (checkForEmptyCLException()) return;

  if (!isRandomizerRunning) {
    startRandomizer();
  } else {
    stopRandomizer();
  }
}
