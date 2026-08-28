/* Statisk vanilla-JS för lagerfiltrering på exporterade sidor (injiceras av build-wordpress.mjs) */
(function () {
  var grid = document.getElementById("stock-grid");
  if (!grid) return;
  var cards = [].slice.call(grid.children);
  var total = cards.length;
  var cond = "Alla";
  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value).trim() : "";
  }
  function chips() {
    return [].slice.call(document.querySelectorAll("button.chip")).filter(function (b) {
      return /ny & begagnad|^ny$|^begagnad$/i.test(b.textContent.trim());
    });
  }
  function apply() {
    var q = val("stock-q").toLowerCase();
    var brand = val("stock-brand");
    var fuel = val("stock-fuel");
    var body = val("stock-body");
    var sort = val("stock-sort");
    var hits = cards.filter(function (c) {
      if (q && c.getAttribute("data-text").indexOf(q) < 0) return false;
      if (brand && brand !== "Alla" && c.getAttribute("data-brand") !== brand) return false;
      if (fuel && fuel !== "Alla" && c.getAttribute("data-fuel") !== fuel) return false;
      if (body && body !== "Alla" && c.getAttribute("data-body") !== body) return false;
      if (cond !== "Alla" && c.getAttribute("data-condition") !== cond) return false;
      return true;
    });
    if (sort === "price-asc") hits.sort(function (a, b) { return (+a.getAttribute("data-price")) - (+b.getAttribute("data-price")); });
    if (sort === "price-desc") hits.sort(function (a, b) { return (+b.getAttribute("data-price")) - (+a.getAttribute("data-price")); });
    if (sort === "year-desc") hits.sort(function (a, b) { return (+b.getAttribute("data-year")) - (+a.getAttribute("data-year")); });
    cards.forEach(function (c) { c.style.display = "none"; });
    hits.forEach(function (c) { grid.appendChild(c); c.style.display = ""; });
    var st = document.getElementById("stock-status");
    if (st) st.textContent = "Visar " + hits.length + " av " + total + " annonser. Priser exkl. moms där annonsen anger det.";
  }
  ["stock-q", "stock-brand", "stock-fuel", "stock-body", "stock-sort"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(el.tagName === "INPUT" ? "input" : "change", apply);
  });
  chips().forEach(function (b) {
    b.addEventListener("click", function () {
      var t = b.textContent.trim();
      cond = /^begagnad$/i.test(t) ? "Begagnad" : (/^ny$/i.test(t) ? "Ny" : "Alla");
      chips().forEach(function (x) { x.classList.remove("chip-active"); });
      b.classList.add("chip-active");
      apply();
    });
  });
  apply();
})();
