/**
 * @Author: Oscar Basoco
 * @Date:   6/14/2022
 * @Desc:   This is a simple flash light script that will be used to light up the scene.
 */

// Grab the selected global flash-strength from the local storage.
var vMax = localStorage.getItem("flash-strength");
// Interval for switching between locked and unlocked flashlight mode
var interval = false;
// Grabs all the available flash-strength values from section in HTML file
var flashLevels = document.getElementsByClassName("section");
var newVmax;

// Update current positon of the mouse every time the mouse moves
document.addEventListener("mousemove", update);
document.addEventListener("touchmove", update);

// If the value is not set, set it to the current value.
// else, set to default value
if (vMax != null) {
  console.log(vMax);
  document.querySelector(":root").style.setProperty("--flash-strength", vMax);
} else {
  document
    .querySelector(":root")
    .style.setProperty("--flash-strength", "10vmax");
  console.log(vMax);
}

// Locks Flashlight in place so that flasihlight does not follow mouse away from
// timer.
document.body.onkeyup = function (e) {
  if ((e.key == "G" || e.keyCode == 71) && !interval) {
    interval = true;
  } else if (interval) {
    interval = false;
  }
};
// Updates current postion of mouse constantly and
// stores it into --cursoer-x and --cursor-y css properties
function update(e) {
  var x, y;
  if (interval) {
    x = e.clientX || e.touches[0].clientX;
    y = e.clientY || e.touches[0].clientY;
  } else {
    x = window.innerWidth / 2;
    y = window.innerHeight / 2;
  }
  document.documentElement.style.setProperty("--cursorX", x + "px");
  document.documentElement.style.setProperty("--cursorY", y + "px");
}

// Add event listener to each flash-strength value that captures
// hover and click events.
for (let i of flashLevels) {
  i.addEventListener("click", function () {
    changeFlashSize(this);
  });
  i.addEventListener("mouseenter", function () {
    displayChange(this);
  });
}

// For each time the differnt flash-strength values are selected,
// store the selected value into local storage. ALlows us to pick it up
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

// For each time the flash-strength values are hovered over,
// update example size in flashlight screen
function displayChange(el) {
  var selectedLevel = el.getAttribute("strength") * 1;
  document
    .querySelector(":root")
    .style.setProperty("--flash-strength", selectedLevel + "0vmax");
}

// Grabs the current value of the flash-strength from local storage and
// updates the current value of the flash-strength in the flashlight screen
// aswell as the haze
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
