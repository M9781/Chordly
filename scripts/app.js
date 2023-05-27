//   ╔════════════════════════════════════════════════════╗
//   ║                  App Main Module                   ║
//   ╚════════════════════════════════════════════════════╝

// ---------- DOCUMENT ELEMENTS ------------
const pageLogo = document.getElementById("page-logo")

const firstChordElement = document.getElementById("first-chord");
const firstChordContainerElement = document.getElementById("first-chord-container");
const nextChordElement = document.getElementById("next-chord");
const nextChordContainerElement = document.getElementById("next-chord-container");
const visualMetronome = document.getElementById("metronome");
const countdownElement = document.getElementById("countdown");

const metronome = {
  beep1: document.getElementById("beep1"),
  beep2: document.getElementById("beep2"),
  beep3: document.getElementById("beep3"),
  beep4: document.getElementById("beep4"),
  beep5: document.getElementById("beep5"),
  beep6: document.getElementById("beep6"),
};

const startBtn = document.getElementById("start-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");

const randomizerElement = document.getElementById("randomizer");
const randomizerOptions = document.getElementById("randomizer-options");

const showMetronomeSwitch = document.getElementById("show-metronome");
const showNextChordSwitch = document.getElementById("show-upc-chord");
const showCountdownSwitch = document.getElementById("show-countdown");

const metronomeSignatureOptionsElement = document.getElementById(
  "metronome-signature"
);

const repeatChordBar = document.getElementById("metronome-range");
const repeatChordBarLabel = document.getElementById("metronome-time-value");
const BPMBar = document.getElementById("BPM-range");
const BPMBarLabel = document.getElementById("BPM-value");
const metronomeSignatureRadio = document.querySelectorAll(
  "#metronome-signature input"
);

const countdownProgressElement = document.getElementById("countdown-progress");
const chordProgressElement = document.getElementById("chord-progress");

const countdownProgressCircle = document.getElementById(
  "countdown-progress-circle"
);
const chordProgressCircle = document.getElementById("chord-progress-circle");
const remainingChordsElement = document.getElementById("remaining-iterations");

const section = {
  presets: document.getElementById("presets"),
  main: document.getElementById("main-key"),
  sufix: document.getElementById("difficulty"),
};

const optionsElements = {
  main: document.getElementById("options-main"),
  basic: document.getElementById("options-basic"),
  medium: document.getElementById("options-medium"),
  intermediate: document.getElementById("options-intermediate"),
  advanced: document.getElementById("options-advanced"),
};

const errorOutputElement = {
  main: document.getElementById("main-empty-error"),
  sufix: document.getElementById("sufix-empty-error"),
};

const emptyCLExceptionMsg = {
  main: "You have to pick at least one Key chord!",
  sufix: "You have to pick at least one type!",
};

const chordListElements = {
  main: document.getElementById("main-chords-list"),
  basic: document.getElementById("basic-chords-list"),
  medium: document.getElementById("medium-chords-list"),
  intermediate: document.getElementById("intermediate-chords-list"),
  advanced: document.getElementById("advanced-chords-list"),
};

// --------- DEFAULT VALUES ------------
let isFullscreenEnabled = false;
let isRandomizerRunning = false;
let isCountdownRunning = false;

let app = {
  cookiesExist: true,
  showNextChord: true,
  showMetronome: true,
  showCountdown: true,
  repeatChord: 1,
  BPM: 60,
  metronomeSignature: "44",
  chosenChordsMain: [1, 2, 4, 5, 7, 8, 9, 11, 12, 14, 15, 17],
  chosenChordsSufix: [18],
  customChordsId: [],
  customChordsValue: [],
};

// object containing OBJECTS of chosen chords
const chosenChords = {
  main: [],
  basic: [],
  medium: [],
  intermediate: [],
  advanced: [],
};

// object containning all the chords objects and its labels
const chords = {
  main: [
    { id: 1, value: "C", label: "C" },
    { id: 2, value: "C#", label: "C#" },
    { id: 3, value: "D♭", label: "D♭" },
    { id: 4, value: "D", label: "D" },
    { id: 5, value: "D#", label: "D#" },
    { id: 6, value: "E♭", label: "E♭" },
    { id: 7, value: "E", label: "E" },
    { id: 8, value: "F", label: "F" },
    { id: 9, value: "F#", label: "F#" },
    { id: 10, value: "G♭", label: "G♭" },
    { id: 11, value: "G", label: "G" },
    { id: 12, value: "G#", label: "G#" },
    { id: 13, value: "A♭", label: "A♭" },
    { id: 14, value: "A", label: "A" },
    { id: 15, value: "A#", label: "A#" },
    { id: 16, value: "B♭", label: "B♭" },
    { id: 17, value: "B", label: "B" },
  ],
  basic: [
    { id: 18, value: " ", label: "Major" },
    { id: 19, value: "m", label: "minor" },
  ],
  medium: [
    { id: 20, value: "7", label: "dominant 7" },
    { id: 21, value: "m7", label: "minor 7" },
    { id: 22, value: "°", label: "diminished (°)" },
    { id: 23, value: "+", label: "augmented (+)" },
  ],
  intermediate: [
    { id: 24, value: "M7", label: "Major 7" },
    { id: 25, value: "6", label: "6" },
    { id: 26, value: "sus2", label: "suspended 2" },
    { id: 27, value: "sus4", label: "suspended 4" },
    { id: 28, value: "9", label: "9" },
    { id: 29, value: "m9", label: "minor 9" },
  ],
  advanced: [
    { id: 30, value: "11", label: "11" },
    { id: 31, value: "m11", label: "minor 11" },
    { id: 32, value: "13", label: "13" },
    { id: 33, value: "6/9", label: "6/9" },
    { id: 34, value: "7#5", label: "7Alt (7#5)" },
    { id: 35, value: "°7", label: "diminished 7 (°7)" },
    { id: 36, value: "m7♭5", label: "half-diminished (m7♭5)" },
  ],
};

// variables holding interval object
let randomizerInterval;
let metronomeInterval;
let timerInterval;
let repeatChordInterval;

// Metronome sounds
let MetronomeSoundDown = new Audio("sounds/Metronome.wav");
let MetronomeSoundUp = new Audio("sounds/MetronomeUp.wav");

// -------- INITIALIZATION -------

// Check if cookies exist
const cookiesExist = getCookie("cookiesExist");
if (cookiesExist) {
  // load cookies data to app object
  loadCookies();
} else {
  // when cookies don't exist, load defaults
  loadDefaultCookies();
}

setBeepsVisibility();
showHideMetronome();
showHideNextChord();
setRadius(countdownProgressCircle);

// If page was closed without choosing at least one Main
if (app.chosenChordsMain.length == 0) {
  app.chosenChordsMain = [1, 2, 4, 5, 7, 8, 9, 11, 12, 14, 15, 17];
}
// If page was closed without choosing at least one Sufix
if (app.chosenChordsSufix.length == 0) {
  app.chosenChordsMain = [18];
}

// -------- CREATE OBJECTS -------
//create checkboxes for every predefined chord
for (const difficultyLevel in chords) {
  for (const chord in chords[difficultyLevel]) {
    const chordCheckbox = createChordCheckbox(
      chords[difficultyLevel][chord].id,
      chords[difficultyLevel][chord].label,
      chords[difficultyLevel][chord].value,
      difficultyLevel
    );
    chordListElements[difficultyLevel].appendChild(chordCheckbox.input);
    chordListElements[difficultyLevel].appendChild(chordCheckbox.label);
  }
}

//create checkboxes for every custom chord (if any)

// ---- INITIAL VALUES ------
// set initial states of checkboxes

// help array to search through created checkboxes id. Removes " " strings
let initialChordList = []
  .concat(app.chosenChordsMain, app.chosenChordsSufix)
  .filter((item) => item != " ");

for (let chord of initialChordList) {
  document.querySelector("#chord-" + chord).checked = true;
}
for (let difficultyLevel in chosenChords) {
  updateChosenChords(difficultyLevel);
}

updateChosenChords();

//set initial values of randomizer chords
firstChordElement.textContent = getRandomChord();
nextChordElement.textContent = getRandomChord();
processInput(firstChordElement, firstChordContainerElement)

// set initial values of app presets
showMetronomeSwitch.checked = app.showMetronome;
showNextChordSwitch.checked = app.showNextChord;
showCountdownSwitch.checked = app.showCountdown;

// set initial values of other presets
repeatChordBar.value = app.repeatChord;
BPMBar.value = app.BPM;
document.querySelector("#metronome-" + app.metronomeSignature).checked = true;
// set initial value of bar labels
repeatChordBarLabel.textContent = app.repeatChord;
BPMBarLabel.textContent = app.BPM;

// set initial value for remaining chords
remainingChordsElement.textContent = app.repeatChord;

// -------- EVENT LISTENERS ---------

// start/pause event listener
startBtn.addEventListener("click", startStopRandomizer);

fullscreenBtn.addEventListener("click", enableDisableFullscreen);

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
  restartRandomizer();
  showHideMetronome();
});

showNextChordSwitch.addEventListener("change", function (event) {
  updateCookie("showNextChord", event.target.checked);
  showHideNextChord();
});

showCountdownSwitch.addEventListener("change", function (event) {
  updateCookie("showCountdown", event.target.checked);
});

repeatChordBar.addEventListener("input", function (event) {
  updateCookie("repeatChord", event.target.value);
  repeatChordBarLabel.textContent = event.target.value;
  remainingChordsElement.textContent = event.target.value;
  restartRandomizer();
});
BPMBar.addEventListener("input", function (event) {
  updateCookie("BPM", event.target.value);
  BPMBarLabel.textContent = event.target.value;
  restartRandomizer();
});

for (let radioControl of metronomeSignatureRadio) {
  radioControl.addEventListener("change", function (event) {
    updateCookie("metronomeSignature", event.target.value);
    restartRandomizer();
    setBeepsVisibility();
  });
}

window.addEventListener("resize", (event) => {
  setRadius(countdownProgressCircle);
  setProgress(countdownProgressCircle, progress);
  processInput(firstChordElement, firstChordContainerElement)
});

pageLogo.scrollIntoView()