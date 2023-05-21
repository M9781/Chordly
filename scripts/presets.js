//   ╔════════════════════════════════════════════════════╗
//   ║                   Presets Module                   ║
//   ╚════════════════════════════════════════════════════╝

//function creates a chord checkbox
function createChordCheckbox(id, label, value, difficultyLevel) {
  const newCheckbox = document.createElement("input");
  newCheckbox.name = value;
  newCheckbox.id = "chord-" + id;
  newCheckbox.value = value;
  newCheckbox.type = "checkbox";
  newCheckbox.classList.add("checkbox-hidden");
  newCheckbox.dataset.difficultyLevel = difficultyLevel;
  newCheckbox.dataset.label = label;
  const newLabel = document.createElement("label");
  newLabel.classList.add("checkbox-tag");
  newLabel.classList.add("noselect");
  newLabel.htmlFor = "chord-" + id;
  newLabel.textContent = label;
  return { input: newCheckbox, label: newLabel };
}

//function returns a list of  checked chesckboxes
function generateCheckedCheckboxList(difficultyLevel) {
  const divId = difficultyLevel + "-chords-list";
  const checkboxes = document.querySelectorAll(
    `#${divId} input[type=checkbox]:checked`
  );
  const values = Array.from(checkboxes).map((cb) => {
    let checkedCheckbox;
    if (cb.dataset.difficultyLevel == difficultyLevel) {
      checkedCheckbox = {
        id: cb.id.split("-").pop(),
        label: cb.dataset.label,
        value: cb.value,
      };
    }
    return checkedCheckbox;
  });
  return values;
}

// event listener function - updates chosenChords list, app and cookies.
function updateChosenChords(difficultyLevel) {
  const checkboxList = generateCheckedCheckboxList(difficultyLevel);
  chosenChords[difficultyLevel] = checkboxList;
  app.chosenChordsMain = chosenChords.main.map((cc) => cc.id);
  app.chosenChordsSufix = [].concat(
    chosenChords.basic.map((cc) => cc.id),
    chosenChords.medium.map((cc) => cc.id),
    chosenChords.intermediate.map((cc) => cc.id),
    chosenChords.advanced.map((cc) => cc.id)
  );
  passCookie("chosenChordsMain", app.chosenChordsMain);
  passCookie("chosenChordsSufix", app.chosenChordsSufix);

  if (checkForEmptyCLException()) {
    stopRandomizer();
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
    visualMetronome.style.display = "block";
    metronomeSignatureOptionsElement.style.display = "inline-block";
  } else {
    visualMetronome.style.display = "none";
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

