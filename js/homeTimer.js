var docBody = document.body;

const Sounds = [
  new Audio("../sounds/KalimbaC.wav"),
  new Audio("../sounds/KalimbaE5.wav"),
  new Audio("../sounds/KalimbaC1.wav"),
];

class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();

    this.el = {
      minutes: root.querySelector(".timer__part--minutes"),
      seconds: root.querySelector(".timer__part--seconds"),
      control: root.querySelector(".timer__btn--control"),
      reset: root.querySelector(".timer__btn--reset"),
      break: 0,
    };

    this.interval = null;
    this.remainingSeconds = 1500;
    this.break = 0;

    // When the user clicks on the timer button
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

    // Following funcitons are used to show timer options
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

    //Following functions are for changing the time
    $("#timer-5min").click(() => {
      this.remainingSeconds = 300;
      this.updateInterfaceTime();
    });
    $("#timer-15min").click(() => {
      this.remainingSeconds = 900;
      this.updateInterfaceTime();
    });
    $("#timer-25min").click(() => {
      this.remainingSeconds = 1500;
      this.updateInterfaceTime();
    });
    $("#timer-30min").click(() => {
      this.remainingSeconds = 1800;
      this.updateInterfaceTime();
    });
    $("#timer-45min").click(() => {
      this.remainingSeconds = 2700;
      this.updateInterfaceTime();
    });
    $("#timer-60min").click(() => {
      this.remainingSeconds = 3600;
      this.updateInterfaceTime();
    });
    $("#debug").click(() => {
      this.remainingSeconds = 0;
      this.updateInterfaceTime();
    });
  }

  //Updates the time on the interface
  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }
  // Updates the control buttons visuals so they better match
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
  }

  // Begins timer and if timer runs out, plays sound
  start() {
    if (this.remainingSeconds == 0) this.remainingSeconds = 1;
    if (this.remainingSeconds < 0) return;
    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();
      if (this.remainingSeconds <= 0) {
        var rand = [];
        while (rand.length < Sounds.length) {
          var r = Math.floor(Math.random() * Sounds.length);
          if (rand.indexOf(r) === -1) rand.push(r);
          console.log(r);
        }
        for (let i = 0; i < Sounds.length; i++) {
          setTimeout(function () {
            Sounds[rand[i]].play();
          }, 800 * i);
        }
        this.stop();
      }
    }, 1000);
    this.updateInterfaceControls();
  }

  // Stops timer and updates interface.
  // Deactivates flash light
  stop() {
    localStorage.setItem("hazeOn", false);
    docBody.classList.remove("hazeOn");
    docBody.classList.add("hazeOff");
    if (this.break == 0) {
      this.remainingSeconds = 300;
      this.break = 1;
    } else if (this.break == 1) {
      this.remainingSeconds = 1500;
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

  static getHTML() {
    return (
      `
              <span class="timer__part timer__part--minutes">` +
      25 +
      `</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">` +
      "00" +
      `</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">play_arrow</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>
          `
    );
  }
}

var timer = new Timer(document.querySelector(".timer"));
sessionStorage.setItem("timer", JSON.stringify(timer));
//TODO: MAKE SO THAT TIMER IS GLOBAL AND INSTANCED ACROSS MULTIPLE PAGES
//TODO: MAKE SURE THAT TIMER IS SAVED IN SESSIONSTORAGE
