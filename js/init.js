//********************************************************************************
// Author(s): Oscar Basoco, Kealen Heinz
// This file contains the code for the timer on the home page
//********************************************************************************

var pomoTimes = [5,10,15,20,25,30,45,60];
var breakTimes = [1,5,10,15];
var intervalOptHeight = 0;

intervalOptHeight = pomoTimes.length > breakTimes.length ?  intervalOptHeight = pomoTimes.length * 24 : intervalOptHeight = breakTimes.length * 24;


var pomoList = document.getElementById("timer-interval-container");
for(let t of pomoTimes)
{
    let id = "timer-" + t + "min-pomo";

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerText = t + " min";

    let linkCont = document.createElement("div");
    linkCont.setAttribute("id",id);
    linkCont.appendChild(link);

    pomoList.appendChild(linkCont);
}

var breakList = document.getElementById("timer-break-container");
for(let t of breakTimes)
{
    let id = "timer-" + t + "min-break";

    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerText = t + " min";

    let linkCont = document.createElement("div");
    linkCont.setAttribute("id",id);
    linkCont.appendChild(link);

    breakList.appendChild(linkCont);
}