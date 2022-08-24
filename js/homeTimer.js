//TODO: Add option to swtich from break to not break.
//TODO: upon page resfresh, restore and display preselected values rather than saved running values
var docBody = document.body;
// Predefine the variables for the timer stored globally ----------------------
var savedPomoSeconds = localStorage.getItem("pomoSeconds");
var savedBreakSeconds = localStorage.getItem("breakSeconds");
var selectedPomoStartTime = localStorage.getItem("pomoStartTime");
var selectedBreakStartTime = localStorage.getItem("breakStartTime");

var displayPomoMinutes;
var displayBreakMinutes;
var displayPomoSeconds;
var displayBreakSeconds;

// Set default values if no values are saved -------------------------------------
// Pomo minutes
if (savedPomoSeconds == null) savedPomoSeconds = 1500;
displayPomoMinutes = Math.floor(savedPomoSeconds / 60);
displayPomoSeconds = savedPomoSeconds % 60;

// Break minutes
if (savedBreakSeconds == null) savedBreakSeconds = 300;
displayBreakMinutes = Math.floor(savedBreakSeconds / 60);
displayBreakSeconds = savedBreakSeconds % 60;

// Default times to display to timer when either pomo or break is selected and their -----
// timers are completely finished
// Pomo timer
if (selectedPomoStartTime == null) selectedPomoStartTime = 1500;
else selectedPomoStartTime = localStorage.getItem("pomoStartTime");

// Break timer
if (selectedBreakStartTime == null) selectedBreakStartTime = 300;
else selectedBreakStartTime = localStorage.getItem("breakStartTime");

console.log("Selected pomo time: " + selectedPomoStartTime);
console.log("Saved pomo seconds: " + savedPomoSeconds);

// Sound files for the timer --------------------------------------------------
const Sounds = [
  new Audio("../sounds/KalimbaC.wav"),
  new Audio("../sounds/KalimbaE5.wav"),
  new Audio("../sounds/KalimbaC1.wav"),
];

// Timer class ---------------------------------------------------------------
class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      pomoMinutes: root.querySelector(".timer__part--pomominutes"),
      breakMinutes: root.querySelector(".timer__part--breakminutes"),
      pomoseconds: root.querySelector(".timer__part--pomoseconds"),
      breakseconds: root.querySelector(".timer__part--breakseconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
      break: 0,
    };
    //Predefined vars for timer -------------------------------------------------
    this.break = 0;
    this.interval = null;

    // Determines if the timers were saved previously --------------------------
    // Pomo timer
    if (savedPomoSeconds == 0) this.remainingSeconds = 1500;
    else this.remainingSeconds = savedPomoSeconds;
    // Break timer
    if (savedBreakSeconds == 0) this.remainingBreakSeconds = 300;
    else this.remainingBreakSeconds = savedBreakSeconds;

    console.log(
      "Remaining seconds: " +
        this.remainingSeconds +
        "\nRemaining break seconds: " +
        this.remainingBreakSeconds
    );
    // When the user clicks on the timer button --------------------------------
    // if haze is off, turn on
    // else turn off
    // alternates between the two states
    this.el.control.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
        this.turnOnFlashLight();
        localStorage.setItem("hazeOn", true);
      } else {
        this.stop();
        this.turnOffFlashLight();
        localStorage.setItem("hazeOn", false);
      }
    });

    // Following funcitons are used to show timer options ----------------------
    // for both intervals and breaks
    this.el.reset.addEventListener("click", () => {
      $("#timer-options").stop().animate({ height: 200 }, "slow");
    });
    this.el.reset.addEventListener("click", () => {
      if ($("#timer-options").height() > 0) {
        $("#timer-options").stop().animate({ height: 0 }, "slow");
      }
    });

    //TODO: Discuss possible options with keeping this active until edit button
    //pressed or have hide every time an option is selected
    // $("#timer-options").click(() => {
    //   $("#timer-options").stop().animate({ height: 0 }, "slow");
    //   console.log("click bitxh");
    // });

    //Following functions are for changing the POMO time ----------------------
    $("#timer-5min-pomo").click(() => {
      this.remainingSeconds = 300;
      localStorage.setItem("pomoSeconds", 300);
      localStorage.setItem("pomoStartTime", 300);
      this.updateInterfaceTime();
    });
    $("#timer-15min-pomo").click(() => {
      this.remainingSeconds = 900;
      localStorage.setItem("pomoSeconds", 900);
      localStorage.setItem("pomoStartTime", 900);
      this.updateInterfaceTime();
    });
    $("#timer-25min-pomo").click(() => {
      this.remainingSeconds = 1500;
      localStorage.setItem("pomoSeconds", 1500);
      localStorage.setItem("pomoStartTime", 1500);
      this.updateInterfaceTime();
    });
    $("#timer-60min-pomo").click(() => {
      this.remainingSeconds = 3600;
      localStorage.setItem("pomoSeconds", 3600);
      localStorage.setItem("pomoStartTime", 3600);
      this.updateInterfaceTime();
    });
    $("#debug").click(() => {
      this.remainingSeconds = 1;
      localStorage.setItem("pomoSeconds", 1);
      localStorage.setItem("pomoStartTime", 1);
      this.updateInterfaceTime();
    });
    //Following functions are for changing the BREAK time ----------------------
    $("#timer-1min-break").click(() => {
      this.remainingBreakSeconds = 60;
      localStorage.setItem("breakSeconds", 60);
      localStorage.setItem("breakStartTime", 60);
      this.updateInterfaceTime();
    });
    $("#timer-5min-break").click(() => {
      this.remainingBreakSeconds = 300;
      localStorage.setItem("breakSeconds", 300);
      localStorage.setItem("breakStartTime", 300);
      this.updateInterfaceTime();
    });
    $("#timer-10min-break").click(() => {
      this.remainingBreakSeconds = 600;
      localStorage.setItem("breakSeconds", 600);
      localStorage.setItem("breakStartTime", 600);
      this.updateInterfaceTime();
    });
    $("#timer-15min-break").click(() => {
      this.remainingBreakSeconds = 900;
      localStorage.setItem("breakSeconds", 900);
      localStorage.setItem("breakStartTime", 900);
      this.updateInterfaceTime();
    });
  }

  //Updates the time on the interface -----------------------------------------
  updateInterfaceTime() {
    const pomominutes = Math.floor(this.remainingSeconds / 60);
    const breakMinutes = Math.floor(this.remainingBreakSeconds / 60);
    const pomoseconds = this.remainingSeconds % 60;
    const breakSeconds = this.remainingBreakSeconds % 60;
    localStorage.setItem("pomoSeconds", this.remainingSeconds);
    localStorage.setItem("breakSeconds", this.remainingBreakSeconds); // <--
    //Pomo Minutes
    this.el.pomoMinutes.textContent = pomominutes.toString().padStart(2, "0");
    this.el.pomoseconds.textContent = pomoseconds.toString().padStart(2, "0");

    //Break minutes
    this.el.breakMinutes.textContent = breakMinutes.toString().padStart(2, "0");
    this.el.breakseconds.textContent = breakSeconds.toString().padStart(2, "0");
  }
  // Updates the control buttons visuals so they better match the state ---------
  // what the use may expect to see when activating and
  // deactivating the timer
  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
      this.el.control.classList.add("timer__btn--start");
      this.el.control.classList.remove("timer__btn--stop");
    } else {
      this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
      this.el.control.classList.add("timer__btn--stop");
      this.el.control.classList.remove("timer__btn--start");
    }
    console.log(
      "Current stored values\nPomo: " +
        this.remainingSeconds +
        "\nBreak: " +
        this.remainingBreakSeconds
    );
  }

  // Begins timer and if timer runs out, plays sound ---------------------------------
  start() {
    console.log(this.break);

    if (this.break === 1) {
      if (this.remainingBreakSeconds <= 0) return;
      this.interval = setInterval(() => {
        this.remainingBreakSeconds--;
        this.updateInterfaceTime();
        if (this.remainingBreakSeconds <= 0) {
          this.stop();
          this.turnOffFlashLight();
          this.playSound();
        }
      }, 1000);
    }
    if (this.break === 0) {
      if (this.remainingSeconds <= 0) return;
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
        if (this.remainingSeconds <= 0) {
          this.stop();
          this.turnOffFlashLight();
          this.playSound();
        }
      }, 1000);
    }
    this.updateInterfaceControls();
  }

  // Stops timer and updates interface. -----------------------------------------
  // Deactivates flash light
  stop() {
    localStorage.setItem("hazeOn", false);
    docBody.classList.remove("hazeOn");
    docBody.classList.add("hazeOff");
    if (this.break == 0 && this.remainingSeconds == 0) {
      //Not break time, display pomo time
      this.remainingSeconds = selectedPomoStartTime;
      this.break = 1;
    } else if (this.break == 1 && this.remainingBreakSeconds == 0) {
      //IS break time, display break time
      this.remainingBreakSeconds = selectedBreakStartTime;
      this.break = 0;
    }

    // Clears interval
    clearInterval(this.interval);
    this.interval = null;
    this.updateInterfaceTime();
    this.updateInterfaceControls();
  }

  turnOnFlashLight() {
    docBody.classList.remove("hazeOff");
    docBody.classList.add("hazeOn");
  }
  turnOffFlashLight() {
    docBody.classList.remove("hazeOn");
    docBody.classList.add("hazeOff");
  }

  // Creates a uniquely random number between 0 and 2 ---------------------------------
  // and plays a sound based on that number
  playSound() {
    var rand = [];
    while (rand.length < Sounds.length) {
      var r = Math.floor(Math.random() * Sounds.length);
      if (rand.indexOf(r) === -1) rand.push(r);
      //console.log(r);
    }
    for (let i = 0; i < Sounds.length; i++) {
      setTimeout(function () {
        Sounds[rand[i]].play();
      }, 800 * i);
    }
    this.stop();
  }

  // Creates dynamically created timer elements and appends them to the DOM -------
  static getHTML() {
    return (
      ` <div class="timer__value--container"> 
        <div class="timer__value--times">
          <div class="timer__value--pomo">
            <span class="timer__part timer__part--pomominutes">` +
      displayPomoMinutes.toString().padStart(2, "0") +
      `</span>
            <span class="timer__part">:</span>
            <span class="timer__part timer__part--pomoseconds">` +
      displayPomoSeconds.toString().padStart(2, "0") +
      `</span> 
          </div>` +
      ` <div class="timer__value--break">
          <span class="timer__part timer__part--breakminutes">` +
      displayBreakMinutes.toString().padStart(2, "0") +
      `</span>
          <span class="timer__part">:</span>
          <span class="timer__part timer__part--breakseconds">` +
      displayBreakSeconds.toString().padStart(2, "0") +
      `</span> 
        </div></div>
        <div class="timer__buttons--container">
          <button type="button" class="timer__btn timer__btn--control timer__btn--start">
              <span class="material-icons">play_arrow</span>
          </button>
          <button type="button" class="timer__btn timer__btn--skip">
              <span class="material-icons">chevron_right</span>
          </button>
          <button type="button" class="timer__btn timer__btn--swap">
              <span class="material-icons">swap_vert</span>
          </button>
          <button type="button" class="timer__btn timer__btn--reset">
              <span class="material-icons">more_vert</span>
          </button>
        </div>
      </div>    `
    );
  }
}

var timer = new Timer(document.querySelector(".timer"));
sessionStorage.setItem("timer", JSON.stringify(timer));
//TODO: for timer options, try to change color of selected item until a different number is selected
//TODO: add option to switch from break to not break
