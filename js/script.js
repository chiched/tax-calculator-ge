const taxTable = [
  {
    kw: 31,
    price: 182,
  },
  {
    kw: 36,
    price: 187.5,
  },
  {
    kw: 41,
    price: 193,
  },
  {
    kw: 46,
    price: 198.5,
  },
  {
    kw: 51,
    price: 204,
  },
  {
    kw: 56,
    price: 209.5,
  },
  {
    kw: 61,
    price: 215,
  },
  {
    kw: 66,
    price: 220.5,
  },
  {
    kw: 71,
    price: 226,
  },
  {
    kw: 76,
    price: 231.5,
  },
  {
    kw: 81,
    price: 253.5,
  },
  {
    kw: 86,
    price: 275.5,
  },
  {
    kw: 91,
    price: 297.5,
  },
  {
    kw: 96,
    price: 319.5,
  },
  {
    kw: 101,
    price: 341.5,
  },
  {
    kw: 106,
    price: 363.5,
  },
  {
    kw: 111,
    price: 396.5,
  },
  {
    kw: 116,
    price: 429.5,
  },
  {
    kw: 121,
    price: 462.5,
  },
  {
    kw: 126,
    price: 495.5,
  },
  {
    kw: 131,
    price: 528.5,
  },
  {
    kw: 136,
    price: 561.5,
  },
  {
    kw: 141,
    price: 594.5,
  },
  {
    kw: 146,
    price: 638.5,
  },
  {
    kw: 151,
    price: 682.5,
  },
  {
    kw: 156,
    price: 726.5,
  },
  {
    kw: 161,
    price: 770.5,
  },
  {
    kw: 166,
    price: 814.5,
  },
  {
    kw: 171,
    price: 858.5,
  },
  {
    kw: 176,
    price: 902.5,
  },
  {
    kw: 181,
    price: 946.5,
  },
  {
    kw: 186,
    price: 990.5,
  },
  {
    kw: 191,
    price: 1034.5,
  },
  {
    kw: 196,
    price: 1078.5,
  },
  {
    kw: 201,
    price: 1122.5,
  },
];

const round5 = (x) => {
  return Math.ceil(x / 5) * 5;
};

const calcHighkw = (kw) => {
  return (round5(kw - 201) / 5) * 44 + 1122.5;
};

const calcTax = (kw) => {
  if (kw > 201) {
    return calcHighkw(kw);
  }
  for (let i = 0; i < taxTable.length; i++) {
    if (kw <= taxTable[i].kw) {
      return taxTable[i].price;
    }
  }
};

const hideEmissionsInput = () => {
  const input = document.getElementById("emissionsInput");
  input.classList.add("hidden");
};
const showEmissionsInput = () => {
  const input = document.getElementById("emissionsInput");
  input.classList.remove("hidden");
};
const hideResultForm = () => {
  const input = document.getElementById("resultForm");
  input.classList.add("hidden");

  const details = document.getElementsByClassName("details");
  for (let i = 0; i < details.length; i++) {
    details[i].classList.add("hidden");
  }
};
const showElectricVehiculeInput = () => {
  const input = document.getElementById("electricVehiculeInput");
  input.classList.remove("hidden");
};
const hideElectricVehiculeInput = () => {
  const input = document.getElementById("electricVehiculeInput");
  input.classList.add("hidden");
};
const showWeightInput = () => {
  const input = document.getElementById("weightInput");
  input.classList.remove("hidden");
};
const hideWeightInput = () => {
  const input = document.getElementById("weightInput");
  input.classList.add("hidden");
};
const showFirstRegistrationInput = () => {
  const input = document.getElementById("firstRegistrationInput");
  input.classList.remove("hidden");
};
const hideFirstRegistrationInput = () => {
  const input = document.getElementById("firstRegistrationInput");
  input.classList.add("hidden");
};
const showNewCalculation = () => {
  showElectricVehiculeInput();
  form.elements.electricVehicule.value = "no";
  hideFirstRegistrationInput();
  showEmissionsInput();
  form.elements.recentCar.value = "yes";
};
const hideNewCalculation = () => {
  hideElectricVehiculeInput();
  hideWeightInput();
  hideNewResult;
  showFirstRegistrationInput();
};
const showNewResult = () => {
  const newResult = document.getElementById("newResult");
  newResult.classList.remove("hidden");
};
const hideNewResult = () => {
  const newResult = document.getElementById("newResult");
  newResult.classList.add("hidden");
};
const showResultForm = () => {
  const input = document.getElementById("resultForm");
  input.classList.remove("hidden");
};

form.onsubmit = submit;

function submit(event) {
  event.preventDefault();

  hideNewResult();
  const power = document.getElementById("power").value;
  const units = form.elements.units.value;
  const newCar = form.elements.recentCar.value;
  const emissions = document.getElementById("emissions").value;
  const powerKw = units === "kw" ? power : power / 1.36;
  const includeNewCalculation = form.elements.includeNewCalc.value;
  const isElectricVehicule = form.elements.electricVehicule.value;
  const weight = form.elements.weight.value;

  console.log("includeNewCalculation", includeNewCalculation);
  console.log("isElectricVehicule", isElectricVehicule);
  console.log("weight", weight);

  // input validation

  //power
  if (power == false || !Number.isInteger(+power)) {
    document.getElementById("power").classList.add("invalid");
    hideResultForm();
    return;
  }

  // emissions
  if (newCar === "yes" && (emissions === "" || !Number.isInteger(+emissions))) {
    document.getElementById("emissions").classList.add("invalid");
    hideResultForm();
    return;
  }

  //weight
  if (
    isElectricVehicule === "yes" &&
    (weight === "" || !Number.isInteger(+weight))
  ) {
    document.getElementById("weight").classList.add("invalid");
    hideResultForm();
    return;
  }

  hideResultForm();
  if (includeNewCalculation === "yes") {
    showNewResult();
  }
  showResultForm();

  const baseTax = calcTax(powerKw);
  const bonusMalus = baseTax / 2;

  let resultDetail = "";
  let total = baseTax;
  let newTotal = 120;
  if (newCar === "yes") {
    if (emissions === undefined) {
      total = baseTax;

      const detailDiv = document.getElementById("details-missing-info");
      detailDiv.classList.remove("hidden");
    } else if (emissions >= 0 && emissions <= 120) {
      total = baseTax - bonusMalus;
      const detailDiv = document.getElementById("details-bonus");
      const detailSpan1 = detailDiv.getElementsByTagName("span")[0];
      const detailSpan2 = detailDiv.getElementsByTagName("span")[1];
      detailSpan1.innerHTML = baseTax;
      detailSpan2.innerHTML = bonusMalus;
      detailDiv.classList.remove("hidden");
    } else if (emissions > 200) {
      total = baseTax + bonusMalus;
      const detailDiv = document.getElementById("details-malus");
      const detailSpan1 = detailDiv.getElementsByTagName("span")[0];
      const detailSpan2 = detailDiv.getElementsByTagName("span")[1];
      detailSpan1.innerHTML = baseTax;
      detailSpan2.innerHTML = bonusMalus;
      detailDiv.classList.remove("hidden");
    } else {
      total = baseTax;
      resultDetail = "";
    }
  }

  // calculation for new car
  if (includeNewCalculation === "yes") {
    // calculation for electric car
    if (isElectricVehicule === "yes") {
      if (weight >= 1401 && weight <= 1650) {
        newTotal += 50;
      } else if (weight >= 1651 && weight <= 1750) {
        newTotal += 100;
      } else if (weight >= 1751 && weight <= 1900) {
        newTotal += 200;
      } else if (weight >= 1901 && weight <= 2100) {
        newTotal += 400;
      } else if (weight >= 2101 && weight <= 2300) {
        newTotal += 600;
      } else if (weight >= 2301 && weight <= 2400) {
        newTotal += 800;
      } else if (weight >= 2401 && weight <= 2500) {
        newTotal += 1100;
      } else if (weight >= 2501 && weight <= 2600) {
        newTotal += 1200;
      } else if (weight > 2600) {
        newTotal += 1400;
      }
    } else {
      // calculation for combustion engine or hybrid
      if (emissions <= 120) {
        newTotal += emissions * 0.25;
      } else if (emissions <= 135) {
        newTotal += emissions * 0.75;
      } else if (emissions <= 155) {
        newTotal += emissions * 1.25;
      } else if (emissions <= 175) {
        newTotal += emissions * 2.25;
      } else if (emissions <= 200) {
        newTotal += emissions * 3.5;
      } else if (emissions <= 250) {
        newTotal += emissions * 4.5;
      } else if (emissions <= 300) {
        newTotal += emissions * 8;
      } else {
        newTotal += emissions * 12;
      }
    }
  }

  const totalDiv = document.getElementById("total");
  totalDiv.innerHTML = total;

  const newTotalDiv = document.getElementById("newTotal");
  newTotalDiv.innerHTML = newTotal;
}

const resetForm = (event) => {
  event.preventDefault();

  document.getElementById("power").value = "";
  form.elements.units.value = "kw";
  form.elements.recentCar.value = "yes";
  document.getElementById("emissions").value = "";
  document.getElementById("weight").value = "";
  showEmissionsInput();
  hideResultForm();
};
