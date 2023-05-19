//   ╔════════════════════════════════════════════════════╗
//   ║                 Metronome Module                   ║
//   ╚════════════════════════════════════════════════════╝

// MetronomeSoundUp.play()
// MetronomeSoundDown.play()

// ******************************************************
//   Start Metronome
// ******************************************************

// Launches metronome
function startMetronome() {
  changeBeep();
  metronomeInterval = setInterval(changeBeep, getSignatureTime());
}

// stops metronome
function stopMetronome() {
  clearInterval(metronomeInterval);
  i = 1;
}

// ******************************************************
//   Change Beep
// ******************************************************

// sets visibility of beep elements
function setBeepsVisibility() {
  Array.from(visualMetronome.children).forEach(
    (bp) => (bp.style.display = "none")
  );

  for (let beep = 1; beep <= getBeatsNumber(); beep++) {
    metronome["beep" + beep].style.display = "inline";
  }
}

// changes metronome section
function changeBeep() {
  if (i > getBeatsNumber()) {
    i = 1;
  }
  getBeep(i);
  i++;
}

// changes styling
function getBeep(i) {
  playSound(i);

  Array.from(visualMetronome.children).forEach((bp) =>
    bp.classList.remove("active")
  );
  metronome["beep" + i].classList.add("active");
}

// plays desired beep sound
function playSound(i) {
  if (i === 1) {
    MetronomeSoundUp.play();
    return;
  }
  MetronomeSoundDown.play();
}

// ******************************************************
//   Count signature time
// ******************************************************

function getBeatsNumber() {
  return +("" + app.metronomeSignature)[0];
}

function getFractionsNumber() {
  return +("" + app.metronomeSignature)[1];
}

function getSignatureTime() {
  const signatureTime = Math.floor(
    (((60 / app.BPM) * 1000)) *
      (getFractionsNumber() / getBeatsNumber())
  );
  return signatureTime;
}

//divide through metronome sequences number
let i = 1;
