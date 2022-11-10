function transitionToColorSelection() {
  const nav = document.querySelector("nav");
  const color = document.querySelector("div#option-color");
  const value = document.querySelector("div#option-value");
  const divider = document.querySelector("div#option-divider");
  const colorContainer = document.querySelector("#colors-container");

  nav.style.opacity = "0";
  value.style.opacity = "0";
  divider.style.opacity = "0";
  color.style.top = "0";
  color.style.height = "100vh";
  color.querySelector("h2").style.transform = "translate(0, -3vh)";
  colorContainer.style.display = "flex";
  colorContainer.style.opacity = "255";

  setTimeout(() => {
    value.style.display = "none";
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
  value.querySelector("h3").transform = "translate(0, -10vh)"
  value.querySelector("h2").style.transform = "translate(0, -19vh)";

  setTimeout(() => {
    color.style.display = "none";
  }, 300);
}
