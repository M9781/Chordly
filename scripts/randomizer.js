// returns random text, given a list of strings
function generateText(list) {
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

// function changes random chords to view in randomizer
function changeText() {
  firstChordElement.textContent = nextChordElement.textContent;
  nextChordElement.textContent =
    generateText(app.chosenChordsMain) + generateText(app.chosenChordsSufix); //chordlist main + chordlist sufix
}

//disables or enables fullscreen mode
function enableDisableFullscreen() {
  if (!isFullscreenEnabled) {
    randomizerElement.classList.add("fullscreen");
    document.body.classList.add("fullscreen")
    isFullscreenEnabled = true;
  } else {
    randomizerElement.classList.remove("fullscreen");
    document.body.classList.remove("fullscreen")
    isFullscreenEnabled = false;
  }
}

// At least 1 basic chord has to be picked for Randomizer to run
function checkForBasicEmptyError() {
  if (app.chosenChordsMain.length == 0) {
    if (isFullscreenEnabled) {
      enableDisableFullscreen();
    }
    difficultyBasicOptionsElement.classList.add("warning");
    difficultyBasicOptionsElement.scrollIntoView();
    BasicEmptyErrorOutputElement.textContent =
      "You have to pick at least one Basic chord!";
    return true;
  } else {
    difficultyBasicOptionsElement.classList.remove("warning");
    BasicEmptyErrorOutputElement.textContent = "";
    return false;
  }
}

//event listener function for startBtn
function startStopRandomizer(event) {
  //wait for pretimer
  if (checkForBasicEmptyError()) {
    return;
  }

  if (!app.isRandomizerRunning) {
    startBtn.children[0].textContent = "pause";
    randomizerInterval = setInterval(
      changeText,
      app.repeatChord * app.chordDuration * 1000
    );
    //turn on metronome (if app.showmetronome)
  } else {
    clearInterval(randomizerInterval);
    startBtn.children[0].textContent = "play_arrow";
  }
  app.isRandomizerRunning = !app.isRandomizerRunning;
}
