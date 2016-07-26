
(function() {
  // Parse true
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.getElementById(id);
    var daysSpan = clock.querySelector('.days');
    var hoursSpan = clock.querySelector('.hours');
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
  }

  var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
  initializeClock('clockdiv', deadline);


  function parseBoolean(value) {
    return (value && (value === true || (value && value.toLowerCase && value.toLowerCase().indexOf("y") !== -1))) ? true : false;
  }

  // Get data from spreadsheet
  window.Tabletop.init({
    key: "1Xdp58vPB4fB34E9BFgd28n3IA2Qhrlx01lZueE_cBDc",
    simpleSheet: true,
    callback: function(data, tabletop) {
      var talksEl = document.querySelector(".talks");

      // Convert some data
      data.map(function(d) {
        d.approved = parseBoolean(d["Approved to be listed"]);
      });

      // See if there are any approved
      if (!data.find(function(d) {
        return d.approved;
      })) {
        return;
      }

      // Remove placeholder
      talksEl.innerHTML = "";

      // Sort
      data.sort(function(a, b) {
        return +a.Order - +b.Order;
      });

      // Display
      data.forEach(function(d, di) {
        var div = document.createElement("div");

        // Only approved
        if (!d.approved) {
          return;
        }

        // Make html
        div.classList.add("talk");
        div.innerHTML = "<h3 class='color-4'>" + d["Title of presentation"] +
          " <span class='subtitle'>by " + d["Name of presenter(s)"] + "</span></h3>" +
          "<p>" + d["Description of presentation"]  + "</p>";
        talksEl.appendChild(div);
      });
    },
  });
})();
