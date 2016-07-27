
(function() {

  function outputTime(t) {
    var s = t.getTimeValues().seconds.toString();
    return t.getTimeValues().minutes + ":" + (s.length === 1 ? "0" + s : s);
  }

  // Make timers
  function makeTimers() {
    [{ c: "ideas", m: 5 }, { c: "work", m: 50 }, { c: "finished", m: 5 }].forEach(function(t) {
      var timer = new Timer();
      var $timer = $(".timer." + t.c);
      var $time = $(".timer." + t.c + " .time");
      var $play = $(".timer." + t.c + " .play");
      var $restart = $(".timer." + t.c + " .restart");

      // Remember
      var s = window.localStorage.getItem("playtime-" + t.c);
      if (s) {
        t = JSON.parse(s);
      }
      else {
        s = t;
      }

      // Start and pause
      timer.start({
        countdown: true,
        startValues: {
          minutes: t.m,
          seconds: t.s || 0
        }
      });
      timer.pause();
      $time.html(outputTime(timer));

      // PLay/pause
      $play.on("click", function(e) {
        $timer.toggleClass("playing");

        if (!timer.isRunning()) {
          timer.start();
        }
        else {
          timer.pause();
        }
      });

      // Restart
      $restart.on("click", function(e) {
        window.localStorage.removeItem("playtime-" + t.c);
        makeTimers();
      });

      // Update
      timer.addEventListener("secondsUpdated", function(e) {
        $time.html(outputTime(timer));

        window.localStorage.setItem("playtime-" + t.c, JSON.stringify({
          c: t.c,
          m: timer.getTimeValues().minutes,
          s: timer.getTimeValues().seconds
        }));
      });

      // Done
      timer.addEventListener("targetAchieved", function(e) {
        $timer.removeClass("playing").addClass("done");
      });
    });
  }

  makeTimers();
})();
