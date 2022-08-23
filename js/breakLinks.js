var arrayOfLinks = [
  "https://findtheinvisiblecow.com/",
  "https://www.mapcrunch.com/",
  "https://theuselessweb.com/",
  "http://hackertyper.com/",
  "http://beesbeesbees.com/",
  "http://www.shadyurl.com/",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://www.youtube.com/watch?v=wnHW6o8WMas",
]; // array of links to be chosen from (randomly chosen)

// function to randomly choose a link from the array
(function makeDiv() {
  var divsize = (Math.random() * 100 + 50).toFixed();
  var color = "#ffffff";
  var pickRandSite = pickRandSite();
  $newdiv = $('<a>"')
    .css({
      width: divsize + "px",
      height: divsize + "px",
      "background-color": color,
    })
    .attr("href", pickRandSite)
    .attr("target", "_blank");
  // console.log($newdiv);
  var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
  var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

  //Generates new div in a reandom position with a random size, fading in and out
  $newdiv
    .css({
      position: "absolute",
      left: posx + "px",
      top: posy + "px",
      display: "none",
    })
    .appendTo("body")
    .fadeIn(1000)
    .delay(1000)
    .fadeOut(1000, function () {
      $(this).remove();
      makeDiv();
    });
  function pickRandSite() {
    var stop = Math.round(Math.random() * arrayOfLinks.length);
    // console.log(stop);
    for (var i = 0; i < arrayOfLinks.length; i++) {
      if (i == stop) {
        return arrayOfLinks[i];
      }
    }
    return arrayOfLinks[0];
  }
})();
