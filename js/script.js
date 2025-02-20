const round5 = (x) => {
  return Math.ceil(x / 5) * 5;
};

const hideResultForm = () => {
  const input = document.getElementById("resultForm");
  input.classList.add("hidden");

  const details = document.getElementsByClassName("details");
  for (let i = 0; i < details.length; i++) {
    details[i].classList.add("hidden");
  }
};

const setIsElectricVehicule = () => {
  hideResultForm();
  document.getElementById("emissions").value = "";

  const weightInput = document.getElementById("weightInput");
  weightInput.classList.remove("hidden");

  const emissionsInput = document.getElementById("emissionsInput");
  emissionsInput.classList.add("hidden");
};
const setIsCombustionEngineVehicule = () => {
  hideResultForm();
  document.getElementById("weight").value = "";

  const weightInput = document.getElementById("weightInput");
  weightInput.classList.add("hidden");

  const emissionsInput = document.getElementById("emissionsInput");
  emissionsInput.classList.remove("hidden");
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

  const isElectricVehicule = form.elements.electricVehicule.value;
  const emissions = document.getElementById("emissions").value;
  const weight = form.elements.weight.value;

  // emissions
  if (
    isElectricVehicule === "no" &&
    (emissions === "" || !Number.isInteger(+emissions))
  ) {
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
  showNewResult();
  showResultForm();

  let newTotal = 120;

  // calculation for new car
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

  const newTotalDiv = document.getElementById("newTotal");
  newTotalDiv.innerHTML = newTotal;
}

const resetForm = (event) => {
  event.preventDefault();

  document.getElementById("emissions").value = "";
  document.getElementById("weight").value = "";
  hideResultForm();
};
