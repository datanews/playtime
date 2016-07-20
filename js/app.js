
(function() {
  // Parse true
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
