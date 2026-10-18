/* Pollen calendar tool (/calendario-polen, /en/pollen-calendar).
   Everything it shows is already in the page: the city rows arrive as JSON
   built at deploy time (src/_data/calendarTool.js). No request leaves the
   browser, nothing is stored, nothing is sent to analytics. Without
   JavaScript the page still shows the default city's full calendar. */
(function () {
  var dataEl = document.getElementById("cal-data");
  var form = document.getElementById("cal-form");
  if (!dataEl || !form) return;
  var D = JSON.parse(dataEl.textContent);
  var T = D.t;
  var byId = {};
  D.cities.forEach(function (c) { byId[c.id] = c; });

  var select = document.getElementById("cal-city");
  var chips = document.getElementById("cal-allergens");
  var summary = document.getElementById("cal-summary");
  var tbody = document.getElementById("cal-body");
  var sources = document.getElementById("cal-sources");
  var notes = document.getElementById("cal-notes");
  var cityLink = document.getElementById("cal-citylink");
  var nowMonth = new Date().getMonth();
  var LEVEL_CSS = { "1": "low", "2": "moderate", "3": "high", "4": "very-high" };

  function nameOf(city, type) {
    return (city.country === "US" && D.namesUs ? D.namesUs : D.names)[type] || type;
  }
  // In a sentence a species is a common noun: "lo siguiente: ciprés".
  function inText(city, type) { return nameOf(city, type).toLowerCase(); }
  function selected() {
    return Array.prototype.filter.call(chips.querySelectorAll("input"), function (i) { return i.checked; })
      .map(function (i) { return i.value; });
  }
  function fill(str, vars) {
    return str.replace(/\{(\w+)\}/g, function (_, k) { return vars[k] != null ? vars[k] : ""; });
  }
  function list(items) {
    if (items.length < 2) return items.join("");
    return items.slice(0, -1).join(", ") + T.and + items[items.length - 1];
  }
  function lv(row, m) { var c = row.charAt(m); return c === "-" ? -1 : +c; }
  // Level for the written summary: a month the data layer flags as a model
  // artefact (city.skip) counts as nothing there, though the table shows it.
  function sv(city, t, m) { return (city.skip[t] || []).indexOf(m) !== -1 ? 0 : lv(city.rows[t], m); }

  /* "from April to June", "in May", "all year": months at moderate or above,
     as runs that may wrap the year (cypress December to March). */
  function spans(on) {
    if (!on.some(Boolean)) return null;
    if (on.every(Boolean)) return T.allYear;
    var start = (on.lastIndexOf(false) + 1) % 12, runs = [];
    for (var k = 0; k < 12; k++) {
      var i = (start + k) % 12;
      if (!on[i]) continue;
      var last = runs[runs.length - 1];
      if (last && (last.end + 1) % 12 === i) last.end = i; else runs.push({ from: i, end: i });
    }
    return list(runs.map(function (r) {
      return r.from === r.end ? fill(T.inMonth, { m: D.monthsFull[r.from] })
        : fill(T.fromTo, { a: D.monthsFull[r.from], b: D.monthsFull[r.end] });
    }));
  }

  function renderChips(city, keep) {
    chips.querySelectorAll(".chip").forEach(function (n) { n.remove(); });
    Object.keys(city.rows).forEach(function (type) {
      var label = document.createElement("label");
      label.className = "chip";
      var input = document.createElement("input");
      input.type = "checkbox"; input.name = "pollen"; input.value = type;
      input.checked = keep.indexOf(type) !== -1;
      var span = document.createElement("span");
      span.textContent = nameOf(city, type);
      label.appendChild(input); label.appendChild(span);
      chips.appendChild(label);
    });
  }

  function renderTable(city, types) {
    document.getElementById("cal-caption").textContent = fill(T.caption, { city: city.name });
    tbody.textContent = "";
    types.forEach(function (type) {
      var row = city.rows[type];
      var tr = document.createElement("tr");
      var th = document.createElement("th");
      th.scope = "row";
      th.textContent = nameOf(city, type);
      if (city.src[type] === "c") {
        var tag = document.createElement("span");
        tag.className = "tag-estimacion";
        tag.textContent = T.estimateTag;
        th.appendChild(document.createTextNode(" "));
        th.appendChild(tag);
      }
      tr.appendChild(th);
      for (var m = 0; m < 12; m++) {
        var td = document.createElement("td");
        var l = lv(row, m);
        td.className = "hm-cell" + (l <= 0 ? (l < 0 ? " hm-nodata" : " hm-none") : "") + (m === nowMonth ? " hm-now" : "");
        if (l > 0) td.style.setProperty("--_lv", "var(--level-" + LEVEL_CSS[l] + ")");
        var hidden = document.createElement("span");
        hidden.className = "visually-hidden";
        hidden.textContent = D.monthsFull[m] + ": " + (l < 0 ? T.noData : D.levels[l]);
        td.appendChild(hidden);
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
    document.querySelectorAll("#cal-table thead th[data-m]").forEach(function (th) {
      if (+th.getAttribute("data-m") === nowMonth) th.setAttribute("aria-current", "date");
      else th.removeAttribute("aria-current");
    });
  }

  function renderSummary(city, mine) {
    summary.textContent = "";
    var lines = [];
    if (!mine.length) {
      lines.push(fill(T.pickPrompt, { city: city.name }));
    } else {
      var on = [];
      for (var m = 0; m < 12; m++) on.push(mine.some(function (t) { return sv(city, t, m) >= 2; }));
      var s = spans(on);
      lines.push(s ? fill(T.yourMonths, { city: city.name, span: s }) : fill(T.noneModerate, { city: city.name }));
      var now = mine.filter(function (t) { return sv(city, t, nowMonth) >= 2; })
        .map(function (t) { return fill(T.nameLevel, { name: inText(city, t), level: D.levels[sv(city, t, nowMonth)].toLowerCase() }); });
      lines.push(now.length ? fill(T.nowOn, { month: D.monthsFull[nowMonth], list: list(now) })
        : fill(T.nowOff, { month: D.monthsFull[nowMonth] }));
      // The next month after this one where one of yours climbs to moderate.
      for (var k = 1; k < 12; k++) {
        var mm = (nowMonth + k) % 12, prev = (mm + 11) % 12;
        var starting = mine.filter(function (t) { return sv(city, t, mm) >= 2 && sv(city, t, prev) < 2; });
        if (starting.length) {
          lines.push(fill(T.next, { list: list(starting.map(function (t) { return inText(city, t); })), month: D.monthsFull[mm] }));
          break;
        }
      }
    }
    lines.forEach(function (text, i) {
      var p = document.createElement("p");
      if (i === 0) p.className = "cal-lead";
      p.textContent = text;
      summary.appendChild(p);
    });
  }

  function renderSources(city, types) {
    sources.textContent = "";
    // Each line names the rows it covers, so no reader has to match a tag.
    var bySrc = { m: [], c: [] };
    types.forEach(function (t) { bySrc[city.src[t]].push(nameOf(city, t)); });
    function names(arr) { var s = list(arr.map(function (n, i) { return i ? n.toLowerCase() : n; })); return s; }
    if (bySrc.m.length) addLine(sources, fill(T.srcModel, { list: names(bySrc.m), city: city.name, a: D.climaStart, b: D.climaEnd }));
    if (bySrc.c.length) addLine(sources, fill(city.country === "US" ? T.srcUs : T.srcCalendar,
      { list: names(bySrc.c), region: (D.zoneLabels || {})[city.zone] || "" }));
    notes.textContent = "";
    if (city.notes.indexOf("mugwortNov") !== -1 && types.indexOf("mugwort") !== -1) addLine(notes, T.noteMugwort);
    if (city.notes.indexOf("noModel") !== -1) addLine(notes, fill(T.noteNoModel, { city: city.name }));
    cityLink.href = city.url;
    cityLink.textContent = fill(T.cityLink, { city: city.name });
  }
  function addLine(parent, text) {
    var p = document.createElement("p");
    p.textContent = text;
    parent.appendChild(p);
  }

  function render(pushState) {
    var city = byId[select.value];
    if (!city) return;
    var mine = selected().filter(function (t) { return city.rows[t]; });
    var types = mine.length ? mine : Object.keys(city.rows);
    renderSummary(city, mine);
    renderTable(city, types);
    renderSources(city, types);
    if (pushState && window.history && history.replaceState) {
      var q = "?" + D.q.city + "=" + encodeURIComponent(city.id) +
        (mine.length ? "&" + D.q.pollen + "=" + mine.join(",") : "");
      history.replaceState(null, "", location.pathname + q);
    }
  }

  // Start: the URL's city and allergies, else a guess from the time zone
  // (the English page serves the UK, Ireland and the US), else the default.
  var params = new URLSearchParams(location.search);
  var start = params.get(D.q.city);
  if (!byId[start] && D.tzDefaults) {
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    for (var prefix in D.tzDefaults) if (tz.indexOf(prefix) === 0) { start = D.tzDefaults[prefix]; break; }
  }
  if (byId[start]) select.value = start;
  var wanted = (params.get(D.q.pollen) || "").split(",").filter(Boolean);
  renderChips(byId[select.value], wanted);
  form.hidden = false;
  render(false);

  select.addEventListener("change", function () {
    renderChips(byId[select.value], selected());
    render(true);
  });
  chips.addEventListener("change", function () { render(true); });
  form.addEventListener("submit", function (e) { e.preventDefault(); });
})();
