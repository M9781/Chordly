// class progressRing extends HTMLElement {
//   constructor() {
//     super();
//     this.circumference =
//     this.radius =
//     this.strokeWidth =
//   }

//   getCircumference(radius) {
//     radius * 2 * Math.PI

//   }
//   setStrokeDash(circumference) {
//     circle.style.strokeDasharray = `${circumference} ${circumference}`;
//     circle.style.strokeDashoffset = `${circumference}`;
//   }

//   setRadius() {
//     const cx = parseFloat(getComputedStyle(circle).cx, 10);
//     const strokeWidth = parseFloat(getComputedStyle(circle).strokeWidth, 10);
//     const radius = cx - strokeWidth * 2;
//     circle.style.r = `${radius}`;
//     const circumference = radius * 2 * Math.PI;
//     setStrokeDash(circle, circumference);
//   }

//   setProgress(percent) {
//     if (percent >= 100) percent = 100;
//     const radius = parseFloat(getComputedStyle(circle).r, 10);
//     const circumference = radius * 2 * Math.PI;
//     const offset = circumference - (percent / 100) * circumference;
//     circle.style.strokeDashoffset = offset;
//   }
// }

function setStrokeDash(circle, circumference) {
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;
}

function setStrokeTransitionTime(circle, miliseconds) {
  const seconds = miliseconds * 0.001
  circle.style.transition = `${seconds}s stroke-dashoffset`;
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

//setRadius(circle);
//console.log(circle);
//console.log(document.getElementById("countdown-progress"));
