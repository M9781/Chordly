//*
//*  Application main module
//*

// ---------- DOCUMENT ELEMENTS ------------

const firstChordElement = document.getElementById("first-chord");
const nextChordElement = document.getElementById("next-chord");
const metronome = {
  visualMetronome: document.getElementById("metronome"),
  beep1: document.getElementById("beep1"),
  beep2: document.getElementById("beep2"),
  beep3: document.getElementById("beep3"),
  beep4: document.getElementById("beep4"),
  beep5: document.getElementById("beep5"),
  beep6: document.getElementById("beep6"),
};

const startBtn = document.getElementById("start-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");

const randomizerElement = document.getElementById("randomizer")

const showMetronomeSwitch = document.getElementById("show-metronome");
const showNextChordSwitch = document.getElementById("show-upc-chord");
const showPreTimerSwitch = document.getElementById("show-pre-timer");

const metronomeSignatureOptionsElement = document.getElementById(
  "metronome-signature"
);

const repeatChordBar = document.getElementById("metronome-range");
const repeatChordBarLabel = document.getElementById("metronome-time-value");
const chordDurationBar = document.getElementById("chord-range");
const chordDurationBarLabel = document.getElementById("chord-duration-value");
const metronomeSignatureRadio = document.querySelectorAll(
  "#metronome-signature input"
);

const difficultyBasicOptionsElement =
  document.getElementById("difficulty-basic");

const BasicEmptyErrorOutputElement =
  document.getElementById("basic-empty-error");


const chordListElements = {
  basic: document.getElementById("basic-chords-list"),
  medium: document.getElementById("medium-chords-list"),
  intermediate: document.getElementById("intermediate-chords-list"),
  advanced: document.getElementById("advanced-chords-list"),
};

// --------- DEFAULT VALUES ------------
let isFullscreenEnabled = false

let app = {
  cookiesExist: true,
  showNextChord: true,
  showMetronome: true,
  showPreTimer: true,
  repeatChord: 4,
  chordDuration: 5,
  metronomeSignature: "44",
  chosenChordsMain: ["C", "D", "E", "F", "G", "A", "B"],
  chosenChordsSufix: [" ", " "], // adding 2 empty sufixes
  isRandomizerRunning: false,
  loadedTexts: ["-"],
  txtInterval: 5,
};

// object containing default values for cookies
const defaultCookies = {
  cookiesExist: true,
  showNextChord: true,
  showMetronome: true,
  showPreTimer: true,
  repeatChord: 4,
  chordDuration: 5,
  metronomeSignature: "44",
  chosenChordsMain: ["C", "D", "E", "F", "G", "A", "B"],
  chosenChordsSufix: [" ", " "], // adding 2 empty sufixes
  isRandomizerRunning: false,
};

// object containing values of chosen chords
const chosenChords = {
  basic: [],
  medium: [],
  intermediate: [],
  advanced: [],
};

// object containning all the chords and its labels
const chords = {
  basic: [
    { id: 1, value: "C", label: "C" },
    { id: 2, value: "D", label: "D" },
    { id: 3, value: "E", label: "E" },
    { id: 4, value: "F", label: "F" },
    { id: 5, value: "G", label: "G" },
    { id: 6, value: "A", label: "A" },
    { id: 7, value: "B", label: "B" },
  ],
  medium: [
    { id: 8, value: "m", label: "minor" },
    { id: 9, value: "7", label: "dominant 7" },
    { id: 10, value: "m7", label: "minor 7" },
    { id: 11, value: "°", label: "diminished (°)" },
    { id: 12, value: "+", label: "augmented (+)" },
  ],
  intermediate: [
    { id: 13, value: "M7", label: "Major 7" },
    { id: 14, value: "6", label: "6" },
    { id: 15, value: "sus2", label: "suspended 2" },
    { id: 16, value: "sus4", label: "suspended 4" },
    { id: 17, value: "9", label: "9" },
    { id: 18, value: "m9", label: "minor 9" },
  ],
  advanced: [
    { id: 19, value: "11", label: "11" },
    { id: 20, value: "m11", label: "minor 11" },
    { id: 21, value: "13", label: "13" },
    { id: 22, value: "6/9", label: "6/9" },
    { id: 23, value: "7#5", label: "7Alt (7#5)" },
    { id: 24, value: "°7", label: "diminished 7 (°7)" },
    { id: 25, value: "m7♭5", label: "half-diminished (m7♭5)" },
  ],
};

// variable holding interval object
let randomizerInterval;

// Metronome sounds
let MetronomeSoundDown = new Audio("sounds/Metronome.wav");
let MetronomeSoundUp = new Audio("sounds/MetronomeUp.wav");



// -------- INITIALIZATION -------

// sprawdzenie, czy ciasteczka istnieją
const cookiesExist = getCookie("cookiesExist");
if (cookiesExist) {
  // wczytaj dane z ciastek do obiektu aplikacji
  loadCookies();
} else {
  //Jeśli niema ciastek, utwórz ciasteczka z wartoścmi domyślnymi.
  loadDefaultCookies();
}

showHideMetronome();
showHideNextChord();
showHidePreTimer();

// -------- CREATE OBJECTS -------
//create a checkbox for every chord
for (const difficultyLevel in chords) {
  for (const chord in chords[difficultyLevel]) {
    const chordCheckbox = createChordCheckbox(
      chords[difficultyLevel][chord].label,
      chords[difficultyLevel][chord].value
    );
    chordListElements[difficultyLevel].appendChild(chordCheckbox.input);
    chordListElements[difficultyLevel].appendChild(chordCheckbox.label);
  }
}

// ---- INITIAL VALUES ------
//set initial values of randomizer chords
firstChordElement.textContent =
  generateText(app.chosenChordsMain) + generateText(app.chosenChordsSufix);
nextChordElement.textContent =
  generateText(app.chosenChordsMain) + generateText(app.chosenChordsSufix);

// set initial values of app presets
showMetronomeSwitch.checked = app.showMetronome;
showNextChordSwitch.checked = app.showNextChord;
showPreTimerSwitch.checked = app.showPreTimer;

// set initial values of other presets
repeatChordBar.value = app.repeatChord;
chordDurationBar.value = app.chordDuration;
document.querySelector("#metronome-" + app.metronomeSignature).checked = true;
// set initial value of bar labels
repeatChordBarLabel.textContent = app.repeatChord;
chordDurationBarLabel.textContent = app.chordDuration;

// help array to search through created checkboxes id. Removes " " strings
let initialChordList = []
  .concat(app.chosenChordsMain, app.chosenChordsSufix)
  .filter((item) => item != " ");

// set initial states of checkboxes
for (let chord of initialChordList) {
  document.querySelector("#chord-" + chord).checked = true;
}
for (let difficultyLevel in chosenChords) {
  updateChosenChords(difficultyLevel);
}

// -------- EVENT LISTENERS ---------

// start/pause event listener
startBtn.addEventListener("click", startStopRandomizer);

fullscreenBtn.addEventListener("click", enableDisableFullscreen)

for (const difficultyLevel in chordListElements) {
  // chord checkboxes event listener
  chordListElements[difficultyLevel].addEventListener(
    "change",
    function (event) {
      updateChosenChords(difficultyLevel);
    }
  );
  // selectAll event listener
  let selectAllBtn = document.getElementById(difficultyLevel + "-all");
  selectAllBtn.addEventListener("change", function (event) {
    checkAllCheckboxes(event, difficultyLevel);
  });
}

showMetronomeSwitch.addEventListener("change", function (event) {
  updateCookie("showMetronome", event.target.checked);
  showHideMetronome();
});

showNextChordSwitch.addEventListener("change", function (event) {
  updateCookie("showNextChord", event.target.checked);
  showHideNextChord();
});

showPreTimerSwitch.addEventListener("change", function (event) {
  updateCookie("showPreTimer", event.target.checked);
  showHidePreTimer();
});

repeatChordBar.addEventListener("input", function (event) {
  updateCookie("repeatChord", event.target.value);
  repeatChordBarLabel.textContent = event.target.value;
});
chordDurationBar.addEventListener("input", function (event) {
  updateCookie("chordDuration", event.target.value);
  chordDurationBarLabel.textContent = event.target.value;
});

for (let radioControl of metronomeSignatureRadio) {
  radioControl.addEventListener("change", function (event) {
    updateCookie("metronomeSignature", event.target.value);
  });
}




//
//
// nasłuchuje zmian w inpucie time i zapisuje ciasteczko
// timeInput.addEventListener("change", function (event) {
//   app.txtInterval = event.target.valueAsNumber;
//   passCookie(txtInterval, app.txtInterval);
//   timeInput.setAttribute("value", time);
// });
