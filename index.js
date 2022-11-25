var colorArray = [];
var value;
function transitionToColorSelection() {
  const nav = document.querySelector("nav");
  const color = document.querySelector("div#option-color");
  const value = document.querySelector("div#option-value");
  const divider = document.querySelector("div#option-divider");
  const colorContainer = document.querySelector("#colors-container");
  const indicator = document.querySelector("#resistor-base :nth-child(1)");

  indicator.classList.add("selecting");
  nav.style.opacity = "0";
  value.style.opacity = "0";
  divider.style.opacity = "0";
  color.style.top = "0";
  color.style.height = "100vh";
  color.querySelector("h2").style.transform = "translate(0, -1vh)";
  colorContainer.style.display = "flex";
  colorContainer.style.opacity = "255";

  setTimeout(() => {
    value.style.display = "none";
    color.onclick = "";
  }, 300);
}

function transitionToValueSelection() {
  const nav = document.querySelector("nav");
  const color = document.querySelector("div#option-color");
  const value = document.querySelector("div#option-value");
  const divider = document.querySelector("div#option-divider");

  nav.style.opacity = "0";
  color.style.opacity = "0";
  divider.style.opacity = "0";
  value.style.top = "0";
  value.style.height = "100vh";
  value.querySelector("h3").transform = "translate(0, -10vh)";
  value.querySelector("h2").style.transform = "translate(0, -19vh)";

  setTimeout(() => {
    color.style.display = "none";
  }, 300);
}

function setCurrentColor(val) {
  console.log(colorArray.length);
  let preIndicator = document.querySelector(
    "#resistor-base :nth-child(" + String(colorArray.length + 1) + ")"
  );
  let indicator = document.querySelector(
    "#resistor-base :nth-child(" + String(colorArray.length + 2) + ")"
  );

  if (preIndicator !== null) {
    preIndicator.classList.remove("selecting");
  }
  if (indicator !== null) {
    indicator.classList.add("selecting");
  }else{
    if (preIndicator !== null) {
      preIndicator.classList.add("selecting");
    }
  }

  if (colorArray.length <= 2) {
    val = parseInt(val);
    colorArray.push(val);
  }
  if (colorArray.length >= 3) {
    val = parseInt(val);
    colorArray.push(val);
  }
  if (colorArray.length == 5) {
    addProceedBtn();
  }
  if (colorArray.length == 6) {
    colorToValue();
  }
}

function addProceedBtn(){
  let div = document.createElement("div");
  div.setAttribute("id","btn-proceed");
  div.setAttribute("onclick","colorToValue()");
  div.innerHTML = "✓"
  document.querySelector("body").appendChild(div);
}

function colorToValue() {
  let temp = "";
  for (let i = 0; i < colorArray.length - 3; i++) {
    temp = temp + colorArray[i].toString();
  }
  temp = parseInt(temp);
  temp = temp * Math.pow(10, parseInt(colorArray[colorArray.length - 2]));
  displayValue(numberWithCommas(temp) + "Ω");
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayValue(val) {
  let div = document.createElement("div");
  div.id = "display-value";
  let h2 = document.createElement("h2");
  h2.innerHTML = val;
  div.appendChild(h2);
  document.body.innerHTML = "";
  document.body.appendChild(div);
}
