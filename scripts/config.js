//function creates a chord checkbox
function createChordCheckbox(name, value) {
  const newCheckbox = document.createElement("input");
  newCheckbox.name = value;
  newCheckbox.id = "chord-" + value;
  newCheckbox.value = value;
  newCheckbox.type = "checkbox";
  newCheckbox.classList.add("checkbox-hidden");
  const newLabel = document.createElement("label");
  newLabel.classList.add("checkbox-tag");
  newLabel.classList.add("noselect");
  newLabel.htmlFor = "chord-" + value;
  newLabel.textContent = name;
  return { input: newCheckbox, label: newLabel };
}

//function returns a list of  checked chesckboxes
function generateCheckboxList(divId) {
  const checkboxes = document.querySelectorAll(
    `#${divId} input[type=checkbox]:checked`
  );
  const values = Array.from(checkboxes).map((cb) => cb.value);
  return values;
}
// event listener function - updates chosenChords list, app and cookies.
function updateChosenChords(difficultyLevel) {
  const checkboxList = generateCheckboxList(difficultyLevel + "-chords-list");
  chosenChords[difficultyLevel] = checkboxList;
  app.chosenChordsMain = chosenChords.basic;
  app.chosenChordsSufix = [].concat(
    chosenChords.medium,
    chosenChords.intermediate,
    chosenChords.advanced,
    [" ", " "]
  );
  passCookie("chosenChordsMain", app.chosenChordsMain);
  passCookie("chosenChordsSufix", app.chosenChordsSufix);

  if (difficultyLevel == "basic") {
    if (checkForBasicEmptyError()) {
      stopRandomizer();
    }
  }
}

//event listener function - changes state of a checkbox given its id
function checkAllCheckboxes(event, difficultyLevel) {
  const divId = difficultyLevel + "-chords-list";
  const checkboxes = document.querySelectorAll(
    `#${divId} input[type=checkbox]`
  );
  checkboxes.forEach((cb) => (cb.checked = event.target.checked));
  updateChosenChords(difficultyLevel);
}

// Show or hide Metronome
function showHideMetronome() {
  if (app.showMetronome) {
    metronome.visualMetronome.style.display = "block";
    metronomeSignatureOptionsElement.style.display = "inline-block";
  } else {
    metronome.visualMetronome.style.display = "none";
    metronomeSignatureOptionsElement.style.display = "none";
  }
}
// Show or hide Next Chord
function showHideNextChord() {
  if (app.showNextChord) {
    nextChordElement.style.display = "block";
  } else {
    nextChordElement.style.display = "none";
  }
}

function showHidePreTimer() {
  //will be developed in the future
  if (app.showPreTimer) {
  } else {
  }
}
