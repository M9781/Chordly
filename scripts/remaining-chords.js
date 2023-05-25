// ******************************************************
//   Remaining Chords
// ******************************************************

async function changeRemainingChords() {
  iteration++;
  if (app.repeatChord <= iteration) iteration = 0;

  remainingIterations = app.repeatChord - iteration;
  remainingChordsElement.textContent = remainingIterations;
}

function startRemainingChords() {
  remainingChordsElement.textContent = app.repeatChord;
  const time = getRemainingChordsTime();
  repeatChordInterval = setInterval(changeRemainingChords, time);
  startSpin();
  setSpinTime(time);
}

function stopRemainingChords() {
  clearInterval(repeatChordInterval);
  remainingChordsElement.textContent = app.repeatChord;
  stopSpin();
  iteration = 0;
}

function getRemainingChordsTime() {
  const remainingChordsTime = (60 / app.BPM) * 1000 * getFractionsNumber();
  return remainingChordsTime;
}

let iteration = 0;
