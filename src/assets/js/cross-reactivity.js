/* Pollen-food cross-reactivity tool (/alergia-cruzada-polen-alimentos,
   /en/pollen-food-allergy). The page already holds every pollen's section;
   this only filters them and writes one summary line. No request, no
   storage, no analytics. Without JavaScript every section stays visible. */
(function () {
  var dataEl = document.getElementById("cr-data");
  var form = document.getElementById("cr-form");
  if (!dataEl || !form) return;
  var D = JSON.parse(dataEl.textContent);
  var T = D.t;
  var byId = {};
  D.pollens.forEach(function (p) { byId[p.id] = p; });
  var summary = document.getElementById("cr-summary");
  var sections = document.querySelectorAll("[data-pollen]");

  function list(items) {
    if (items.length < 2) return items.join("");
    return items.slice(0, -1).join(", ") + T.and + items[items.length - 1];
  }
  function fill(str, vars) {
    return str.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ""; });
  }
  function selected() {
    return Array.prototype.filter.call(form.querySelectorAll("input[name=pollen]"), function (i) { return i.checked; })
      .map(function (i) { return i.value; });
  }

  function render(push) {
    var mine = selected();
    sections.forEach(function (s) {
      s.hidden = mine.length > 0 && mine.indexOf(s.getAttribute("data-pollen")) === -1;
    });
    summary.textContent = "";
    if (!mine.length) {
      add(T.prompt, "cal-lead");
    } else {
      // Foods in the order a reader should check them: the well documented
      // ones first, each named once even when two pollens share it.
      var strong = [], other = [];
      mine.forEach(function (id) {
        byId[id].foods.forEach(function (f) {
          var n = f.n.toLowerCase(); // mid-sentence: "tomate, melón y sandía"
          var bucket = f.s === "w" ? strong : other;
          if (strong.indexOf(n) === -1 && other.indexOf(n) === -1) bucket.push(n);
          else if (f.s === "w" && other.indexOf(n) !== -1) { other.splice(other.indexOf(n), 1); strong.push(n); }
        });
      });
      var names = list(mine.map(function (id) { return byId[id].name.toLowerCase(); }));
      if (strong.length) {
        add(fill(T.strong, { pollens: names, foods: list(strong) }), "cal-lead");
        if (other.length) add(fill(T.other, { foods: list(other) }));
      } else {
        add(fill(T.onlyReported, { pollens: names, foods: list(other) }), "cal-lead");
      }
      if (mine.some(function (id) { return byId[id].stable; })) add(T.stableWarning, "cr-warning");
    }
    if (push && window.history && history.replaceState) {
      history.replaceState(null, "", location.pathname + (mine.length ? "?" + D.q + "=" + mine.join(",") : ""));
    }
  }
  function add(text, cls) {
    var p = document.createElement("p");
    if (cls) p.className = cls;
    p.textContent = text;
    summary.appendChild(p);
  }

  var wanted = (new URLSearchParams(location.search).get(D.q) || "").split(",");
  form.querySelectorAll("input[name=pollen]").forEach(function (i) { i.checked = wanted.indexOf(i.value) !== -1; });
  form.hidden = false;
  render(false);
  form.addEventListener("change", function () { render(true); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
})();
