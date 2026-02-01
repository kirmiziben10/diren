var colorArray = [];
var toleranceValue = 5;
var toleranceColor = "gold";

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
  colorContainer.style.opacity = "1";

  setTimeout(() => {
    value.style.display = "none";
    color.onclick = null;
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
  value.querySelector("h3").style.transform = "translate(0, -5vh)";
  value.querySelector("h2").style.transform = "translate(0, -8vh)";

  // Show value input UI
  showValueInputUI();

  setTimeout(() => {
    color.style.display = "none";
    value.onclick = null;
  }, 300);
}

function showValueInputUI() {
  const value = document.querySelector("div#option-value");
  const textValue = document.querySelector("#text-value");
  
  // Hide the static text
  textValue.style.display = "none";
  
  // Create input container
  const inputContainer = document.createElement("div");
  inputContainer.id = "value-input-container";
  inputContainer.innerHTML = `
    <input type="number" id="value-input" placeholder="Değer girin (örn: 470)">
    <select id="unit-select">
      <option value="1">Ω (Ohm)</option>
      <option value="1000" selected>KΩ (Kilo Ohm)</option>
      <option value="1000000">MΩ (Mega Ohm)</option>
    </select>
    <div id="value-submit-btn" onclick="valueToColor()">Renkleri Göster</div>
  `;
  value.appendChild(inputContainer);
  
  setTimeout(() => {
    inputContainer.style.display = "flex";
    inputContainer.style.opacity = "1";
  }, 100);
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
    preIndicator.className = "resistor-line r" + val;
  }
  if (indicator !== null) {
    indicator.classList.add("selecting");
  } else {
    if (preIndicator !== null) {
      preIndicator.classList.add("selecting");
    }
  }

  val = parseInt(val);
  colorArray.push(val);

  // After 4 bands selected (for 4-band resistor), show tolerance picker
  if (colorArray.length === 4) {
    showTolerancePicker();
  }
}

function showTolerancePicker() {
  const colorContainer = document.querySelector("#colors-container");
  const toleranceContainer = document.querySelector("#tolerance-container");
  
  // Hide color picker
  colorContainer.style.opacity = "0";
  setTimeout(() => {
    colorContainer.style.display = "none";
    toleranceContainer.style.display = "flex";
    toleranceContainer.style.opacity = "1";
  }, 300);
}

function setTolerance(color, value) {
  toleranceColor = color;
  toleranceValue = value;
  
  // Update the tolerance band on resistor visual
  const toleranceBand = document.querySelector("#resistor-base :nth-child(5)");
  if (toleranceBand) {
    toleranceBand.className = "resistor-line " + color;
    toleranceBand.classList.remove("selecting");
  }
  
  // Calculate and show result
  colorToValue();
}

function addProceedBtn() {
  // Remove existing button if any
  const existing = document.querySelector("#btn-proceed");
  if (existing) {
    existing.remove();
  }
  
  let div = document.createElement("div");
  div.setAttribute("id", "btn-proceed");
  div.setAttribute("onclick", "colorToValue()");
  div.innerHTML = "✓";
  document.querySelector("body").appendChild(div);
}

function colorToValue() {
  // For 4-band resistor: first 2 are digits, 3rd is multiplier, 4th is tolerance
  let temp = "";
  for (let i = 0; i < 2; i++) {
    temp = temp + colorArray[i].toString();
  }
  temp = parseInt(temp);
  temp = temp * Math.pow(10, parseInt(colorArray[2]));
  
  displayValue(formatResistorValue(temp), toleranceValue);
}

function formatResistorValue(ohms) {
  if (ohms >= 1000000) {
    return numberWithCommas(ohms / 1000000) + " MΩ";
  } else if (ohms >= 1000) {
    return numberWithCommas(ohms / 1000) + " KΩ";
  } else {
    return numberWithCommas(ohms) + " Ω";
  }
}

function numberWithCommas(x) {
  // Handle decimals properly
  const parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function displayValue(val, tolerance) {
  let optionColor = document.querySelector("#option-color");
  let div = document.createElement("div");
  let h2 = document.createElement("h2");
  let toleranceText = document.createElement("p");
  
  div.id = "display-value";
  h2.innerHTML = val;
  toleranceText.innerHTML = "±" + tolerance + "%";
  toleranceText.style.color = "#d9d9d9";
  toleranceText.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  toleranceText.style.fontSize = "1.5rem";
  toleranceText.style.marginTop = "1vh";
  
  div.appendChild(h2);
  div.appendChild(toleranceText);
  div.setAttribute("id", "result");
  div.style.opacity = "0";
  div.style.flexDirection = "column";
  
  if (optionColor) {
    optionColor.style.opacity = "0";
  }
  
  setTimeout(() => {
    document.body.innerHTML = "";
    document.body.appendChild(div);
    addResetButton();
    document.querySelector("#result").style.opacity = "1";
  }, 300);
}

function addResetButton() {
  const resetBtn = document.createElement("div");
  resetBtn.id = "reset-btn";
  resetBtn.innerHTML = "Yeniden Başla";
  resetBtn.onclick = function() {
    location.reload();
  };
  document.body.appendChild(resetBtn);
}

// Value to Color conversion
function valueToColor() {
  const input = document.querySelector("#value-input");
  const unitSelect = document.querySelector("#unit-select");
  
  let value = parseFloat(input.value);
  if (isNaN(value) || value <= 0) {
    alert("Lütfen geçerli bir değer girin!");
    return;
  }
  
  // Convert to base ohms
  const multiplier = parseInt(unitSelect.value);
  value = value * multiplier;
  
  // Calculate color bands
  const colors = calculateColorBands(value);
  
  if (!colors) {
    alert("Bu değer standart renk kodlarıyla temsil edilemez!");
    return;
  }
  
  displayColorResult(colors, value);
}

function calculateColorBands(ohms) {
  // Normalize to 2 significant digits
  if (ohms < 10) {
    return null; // Too small for standard 4-band resistor
  }
  
  let multiplier = 0;
  let significantDigits = ohms;
  
  // Reduce to 2-digit number
  while (significantDigits >= 100) {
    significantDigits = significantDigits / 10;
    multiplier++;
  }
  
  // Handle fractional multipliers (for values like 4.7)
  while (significantDigits < 10 && multiplier > 0) {
    significantDigits = significantDigits * 10;
    multiplier--;
  }
  
  significantDigits = Math.round(significantDigits);
  
  if (significantDigits < 10 || significantDigits > 99) {
    return null;
  }
  
  const firstDigit = Math.floor(significantDigits / 10);
  const secondDigit = significantDigits % 10;
  
  return {
    band1: firstDigit,
    band2: secondDigit,
    multiplier: multiplier,
    tolerance: toleranceValue
  };
}

function getColorName(digit) {
  const colors = [
    "black",    // 0
    "saddlebrown", // 1
    "red",      // 2
    "orange",   // 3
    "yellow",   // 4
    "green",    // 5
    "blue",     // 6
    "rebeccapurple", // 7
    "gray",     // 8
    "white"     // 9
  ];
  return colors[digit] || "black";
}

function getColorClass(digit) {
  return "r" + digit;
}

function displayColorResult(colors, ohms) {
  const optionValue = document.querySelector("#option-value");
  
  // Create result div
  const div = document.createElement("div");
  div.id = "result";
  div.style.flexDirection = "column";
  div.style.opacity = "0";
  
  // Value display
  const h2 = document.createElement("h2");
  h2.innerHTML = formatResistorValue(ohms);
  div.appendChild(h2);
  
  // Tolerance text
  const toleranceText = document.createElement("p");
  toleranceText.innerHTML = "±" + colors.tolerance + "%";
  toleranceText.style.color = "#d9d9d9";
  toleranceText.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  toleranceText.style.fontSize = "1.5rem";
  toleranceText.style.marginTop = "1vh";
  toleranceText.style.marginBottom = "3vh";
  div.appendChild(toleranceText);
  
  // Create resistor container (same visual as color selection mode)
  const resistorContainer = document.createElement("div");
  resistorContainer.className = "container-resistor";
  
  // Resistor cable
  const cable = document.createElement("div");
  cable.id = "resistor-cable";
  resistorContainer.appendChild(cable);
  
  // Resistor base with color bands
  const base = document.createElement("div");
  base.id = "resistor-base";
  
  // Band 1 - first digit
  const band1 = document.createElement("div");
  band1.className = "resistor-line " + getColorClass(colors.band1);
  base.appendChild(band1);
  
  // Band 2 - second digit
  const band2 = document.createElement("div");
  band2.className = "resistor-line " + getColorClass(colors.band2);
  base.appendChild(band2);
  
  // Band 3 - multiplier
  const band3 = document.createElement("div");
  band3.className = "resistor-line " + getColorClass(colors.multiplier);
  base.appendChild(band3);
  
  // Band 4 - tolerance (with gap)
  const band4 = document.createElement("div");
  band4.className = "resistor-line " + toleranceColor;
  base.appendChild(band4);
  
  resistorContainer.appendChild(base);
  div.appendChild(resistorContainer);
  
  if (optionValue) {
    optionValue.style.opacity = "0";
  }
  
  setTimeout(() => {
    document.body.innerHTML = "";
    document.body.appendChild(div);
    addResetButton();
    document.querySelector("#result").style.opacity = "1";
  }, 300);
}
