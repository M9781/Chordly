// returns random text, given a list of strings
function generateText(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

//function returns a randomly generated chord
function getRandomChord() {
  const chordMainPart = chosenChords.basic.map((ccb) => ccb.value);
  const chordSufix = [].concat(
    chosenChords.medium.map((ccm) => ccm.value),
    chosenChords.intermediate.map((cci) => cci.value),
    chosenChords.advanced.map((cca) => cca.value),
    [" ", " "]
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

//disables or enables fullscreen mode
function enableDisableFullscreen() {
  if (!isFullscreenEnabled) {
    randomizerElement.classList.add("fullscreen");
    document.body.classList.add("fullscreen");
    isFullscreenEnabled = true;
  } else {
    randomizerElement.classList.remove("fullscreen");
    document.body.classList.remove("fullscreen");
    isFullscreenEnabled = false;
  }
}

// At least 1 Main (Key/basic) chord has to be picked for Randomizer to run
function checkForBasicEmptyError() {
  if (app.chosenChordsMain.length == 0) {
    if (isFullscreenEnabled) {
      enableDisableFullscreen();
    }
    difficultyOptionsElements.basic.classList.add("warning");
    difficultyOptionsElements.basic.scrollIntoView();
    BasicEmptyErrorOutputElement.textContent =
      "You have to pick at least one Basic chord!";
    return true;
  } else {
    difficultyOptionsElements.basic.classList.remove("warning");
    BasicEmptyErrorOutputElement.textContent = "";
    return false;
  }
}

// at least 1 suffix or at least one custom chord has to be picked for Randomizer to run
//function checkForSufixEmptyError() {
//
//}

// separate functions for starting randomizer
function startRandomizer() {
  startBtn.children[0].textContent = "pause";
  randomizerInterval = setInterval(
    changeText,
    app.repeatChord * app.chordDuration * 1000
  );
  isRandomizerRunning = true;
}

// separate function for stoping randomizer
function stopRandomizer() {
  startBtn.children[0].textContent = "play_arrow";
  clearInterval(randomizerInterval);
  isRandomizerRunning = false;
}

//event listener function for startBtn
function startStopRandomizer(event) {
  //wait for pretimer
  if (checkForBasicEmptyError()) {
    return;
  }

  if (!isRandomizerRunning) {
    startRandomizer();
    //turn on metronome (if app.showmetronome)
  } else {
    stopRandomizer();
    //turn off metronome (if app.showmetronome)
  }
}
