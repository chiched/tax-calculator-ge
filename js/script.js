const taxTable = [
    { kw: 31, price: 182 },
    { kw: 36, price: 187.5 },
    { kw: 41, price: 193 },
    { kw: 46, price: 198.5 },
    { kw: 51, price: 204 },
    { kw: 56, price: 209.5 },
    { kw: 61, price: 215 },
    { kw: 66, price: 220.5 },
    { kw: 71, price: 226 },
    { kw: 76, price: 231.5 },
    { kw: 81, price: 253.5 },
    { kw: 86, price: 275.5 },
    { kw: 91, price: 297.5 },
    { kw: 96, price: 319.5 },
    { kw: 101, price: 341.5 },
    { kw: 106, price: 363.5 },
    { kw: 111, price: 396.5 },
    { kw: 116, price: 429.5 },
    { kw: 121, price: 462.5 },
    { kw: 126, price: 495.5 },
    { kw: 131, price: 528.5 },
    { kw: 136, price: 561.5 },
    { kw: 141, price: 594.5 },
    { kw: 146, price: 638.5 },
    { kw: 151, price: 682.5 },
    { kw: 156, price: 726.5 },
    { kw: 161, price: 770.5 },
    { kw: 166, price: 814.5 },
    { kw: 171, price: 858.5 },
    { kw: 176, price: 902.5 },
    { kw: 181, price: 946.5 },
    { kw: 186, price: 990.5 },
    { kw: 191, price: 1034.5 },
    { kw: 196, price: 1078.5 },
    { kw: 201, price: 1122.5 },
  ],
  round5 = (e) => 5 * Math.ceil(e / 5),
  calcHighkw = (e) => (round5(e - 201) / 5) * 44 + 1122.5,
  calcTax = (e) => {
    if (e > 201) return calcHighkw(e);
    for (let t = 0; t < taxTable.length; t++)
      if (e <= taxTable[t].kw) return taxTable[t].price;
  },
  hideEmissionsInput = () => {
    let e = document.getElementById("emissionsInput");
    e.classList.add("hidden");
  },
  showEmissionsInput = () => {
    let e = document.getElementById("emissionsInput");
    e.classList.remove("hidden");
  },
  hideResultForm = () => {
    let e = document.getElementById("resultForm");
    e.classList.add("hidden");
    let t = document.getElementsByClassName("details");
    for (let i = 0; i < t.length; i++) t[i].classList.add("hidden");
  },
  showElectricVehiculeInput = () => {
    let e = document.getElementById("electricVehiculeInput");
    e.classList.remove("hidden");
  },
  hideElectricVehiculeInput = () => {
    let e = document.getElementById("electricVehiculeInput");
    e.classList.add("hidden");
  },
  showWeightInput = () => {
    let e = document.getElementById("weightInput");
    e.classList.remove("hidden");
  },
  hideWeightInput = () => {
    let e = document.getElementById("weightInput");
    e.classList.add("hidden");
  },
  showFirstRegistrationInput = () => {
    let e = document.getElementById("firstRegistrationInput");
    e.classList.remove("hidden");
  },
  hideFirstRegistrationInput = () => {
    let e = document.getElementById("firstRegistrationInput");
    e.classList.add("hidden");
  },
  showNewCalculation = () => {
    showElectricVehiculeInput(),
      (form.elements.electricVehicule.value = "no"),
      hideFirstRegistrationInput(),
      showEmissionsInput(),
      (form.elements.recentCar.value = "yes");
  },
  hideNewCalculation = () => {
    hideElectricVehiculeInput(),
      hideWeightInput(),
      showFirstRegistrationInput();
  },
  showNewResult = () => {
    let e = document.getElementById("newResult");
    e.classList.remove("hidden");
  },
  hideNewResult = () => {
    let e = document.getElementById("newResult");
    e.classList.add("hidden");
  },
  showResultForm = () => {
    let e = document.getElementById("resultForm");
    e.classList.remove("hidden");
  };
function submit(e) {
  e.preventDefault(), hideNewResult();
  let t = document.getElementById("power").value,
    i = form.elements.units.value,
    s = form.elements.recentCar.value,
    l = document.getElementById("emissions").value,
    n = form.elements.includeNewCalc.value,
    r = form.elements.electricVehicule.value,
    d = form.elements.weight.value;
  if (
    (console.log("includeNewCalculation", n),
    console.log("isElectricVehicule", r),
    console.log("weight", d),
    !1 == t || !Number.isInteger(+t))
  ) {
    document.getElementById("power").classList.add("invalid"), hideResultForm();
    return;
  }
  if ("yes" === s && ("" === l || !Number.isInteger(+l))) {
    document.getElementById("emissions").classList.add("invalid"),
      hideResultForm();
    return;
  }
  if ("yes" === r && ("" === d || !Number.isInteger(+d))) {
    document.getElementById("weight").classList.add("invalid"),
      hideResultForm();
    return;
  }
  hideResultForm(), "yes" === n && showNewResult(), showResultForm();
  let c = calcTax("kw" === i ? t : t / 1.36),
    a = c / 2,
    _ = "",
    u = c,
    m = 120;
  if ("yes" === s) {
    if (void 0 === l) {
      u = c;
      let w = document.getElementById("details-missing-info");
      w.classList.remove("hidden");
    } else if (l >= 0 && l <= 120) {
      u = c - a;
      let o = document.getElementById("details-bonus"),
        $ = o.getElementsByTagName("span")[0],
        p = o.getElementsByTagName("span")[1];
      ($.innerHTML = c), (p.innerHTML = a), o.classList.remove("hidden");
    } else if (l > 200) {
      u = c + a;
      let h = document.getElementById("details-malus"),
        g = h.getElementsByTagName("span")[0],
        I = h.getElementsByTagName("span")[1];
      (g.innerHTML = c), (I.innerHTML = a), h.classList.remove("hidden");
    } else (u = c), (_ = "");
  }
  "yes" === n &&
    ("yes" === r
      ? d >= 1401 && d <= 1650
        ? (m += 50)
        : d >= 1651 && d <= 1750
        ? (m += 100)
        : d >= 1751 && d <= 1900
        ? (m += 200)
        : d >= 1901 && d <= 2100
        ? (m += 400)
        : d >= 2101 && d <= 2300
        ? (m += 600)
        : d >= 2301 && d <= 2400
        ? (m += 800)
        : d >= 2401 && d <= 2500
        ? (m += 1100)
        : d >= 2501 && d <= 2600
        ? (m += 1200)
        : d > 2600 && (m += 1400)
      : l <= 120
      ? (m += 0.25 * l)
      : l <= 135
      ? (m += 0.75 * l)
      : l <= 155
      ? (m += 1.25 * l)
      : l <= 175
      ? (m += 2.25 * l)
      : l <= 200
      ? (m += 3.5 * l)
      : l <= 250
      ? (m += 4.5 * l)
      : l <= 300
      ? (m += 8 * l)
      : (m += 12 * l));
  let k = document.getElementById("total");
  k.innerHTML = u;
  let E = document.getElementById("newTotal");
  E.innerHTML = m;
}
form.onsubmit = submit;
const resetForm = (e) => {
  e.preventDefault(),
    (document.getElementById("power").value = ""),
    (form.elements.units.value = "kw"),
    (form.elements.recentCar.value = "yes"),
    (document.getElementById("emissions").value = ""),
    (document.getElementById("weight").value = ""),
    showEmissionsInput(),
    hideResultForm();
};
