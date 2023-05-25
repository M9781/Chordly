// ******************************************************
//   Progress circle functions
// ******************************************************

// Function sets length of stroke dash and space between using circumference
function setStrokeDash(circle, circumference) {
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;
}

function setRadius(circle) {
  const cx = parseFloat(getComputedStyle(circle).cx, 10);
  const strokeWidth = parseFloat(getComputedStyle(circle).strokeWidth, 10);
  const radius = cx - strokeWidth * 2;
  circle.style.r = `${radius}`;
  const circumference = radius * 2 * Math.PI;
  setStrokeDash(circle, circumference);
}

function setProgress(circle, percent) {
  if (percent >= 100) percent = 100;
  const radius = parseFloat(getComputedStyle(circle).r, 10);
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}

// These functions set animation time depending on animation type
function setStrokeTransitionTime(circle, miliseconds) {
  const seconds = (miliseconds - 10) * 0.001;
  circle.style.transition = `${seconds}s stroke-dashoffset`;
}

function setSpinTime(miliseconds) {
  const circle = document.querySelector(".spinning")
  const seconds = (miliseconds) * 0.001;
  circle.style.animationDuration = `${seconds}s`
}

function startSpin() {
  chordProgressCircle.classList.add("spinning");
}

function stopSpin() {
  chordProgressCircle.classList.remove("spinning");
}