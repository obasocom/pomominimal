//Flashlight
var vMax = localStorage.getItem("flash-strength");
if (vMax != null) {
  console.log(vMax);
  document.querySelector(":root").style.setProperty("--flash-strength", vMax);
} else {
  document
    .querySelector(":root")
    .style.setProperty("--flash-strength", "10vmax");
  console.log(vMax);
}
var newVmax;

function update(e) {
  var x = e.clientX || e.touches[0].clientX;
  var y = e.clientY || e.touches[0].clientY;

  document.documentElement.style.setProperty("--cursorX", x + "px");
  document.documentElement.style.setProperty("--cursorY", y + "px");
}

document.addEventListener("mousemove", update);
document.addEventListener("touchmove", update);

var flashLevels = document.getElementsByClassName("section");
for (let i of flashLevels) {
  i.addEventListener("click", function () {
    changeFlashSize(this);
  });
  i.addEventListener("mouseenter", function () {
    displayChange(this);
  });
}
function changeFlashSize(el) {
  var selectedLevel = el.getAttribute("strength") * 1;
  if (selectedLevel == 1) {
    newVmax = "10vmax";
  } else if (selectedLevel == 2) {
    newVmax = "20vmax";
  } else if (selectedLevel == 3) {
    newVmax = "30vmax";
  } else if (selectedLevel == 4) {
    newVmax = "40vmax";
  }
  localStorage.setItem("flash-strength", newVmax);
}

function displayChange(el) {
  var selectedLevel = el.getAttribute("strength") * 1;
  document
    .querySelector(":root")
    .style.setProperty("--flash-strength", selectedLevel + "0vmax");
}

document.addEventListener("DOMContentLoaded", (event) => {
  if (localStorage.getItem("hazeOn") == true) {
    document.body.classList.remove("hazeOff");
    document.body.classList.add("hazeOn");
  } else {
    document.body.classList.remove("hazeOn");
    document.body.classList.add("hazeOff");
  }
  console.log(document.body.classList);
});
