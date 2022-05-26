var switches = document.getElementsByClassName("switch");
var style = localStorage.getItem("style");
var prev_selection = "";

if (style == null) {
  setTheme("default");
} else {
  setTheme(style);
}

for (var i of switches) {
  i.addEventListener("click", function () {
    var theme = this.dataset.theme;
    setTheme(theme);
  });
}

function setTheme(theme) {
  if (prev_selection == theme) {
    document.getElementById("switcher-id").href =
      "../styling/global_themes/default.css";
    prev_selection = "";
    localStorage.setItem("style", "default");
    return;
  } else {
    if (theme == "p1") {
      document.getElementById("switcher-id").href =
        "../styling/global_themes/pallete1.css";
    } else if (theme == "p2") {
      document.getElementById("switcher-id").href =
        "../styling/global_themes//pallete2.css";
    } else if (theme == "p3") {
      document.getElementById("switcher-id").href =
        "../styling/global_themes/pallete3.css";
    } else if (theme == "p4") {
      document.getElementById("switcher-id").href =
        "../styling/global_themes/pallete4.css";
    } else if (theme == "p5") {
      document.getElementById("switcher-id").href =
        "../styling/global_themes/pallete5.css";
    } else if (theme == "p6") {
      document.getElementById("switcher-id").href =
        "../styling/global_themes/pallete6.css";
    }
    prev_selection = theme;
    localStorage.setItem("style", theme);
  }
}
