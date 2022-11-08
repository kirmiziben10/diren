function transitionToColorSelection() {
  let nav = document.querySelector("nav");
  let value = document.querySelector("div#option-value");
  nav.style.opacity = "0"
  value.style.opacity = "0";

  setTimeout(() => {
    value.style.display = "none";
  }, 300);
}

function transitionToValueSelection() {
  let nav = document.querySelector("nav");
  let color = document.querySelector("div#option-color");
  nav.style.opacity = "0"
  color.style.opacity = "0";

  setTimeout(() => {
    color.style.display = "none";
  }, 300);
}
