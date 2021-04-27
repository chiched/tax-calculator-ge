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
  return Math.floor(x / 5) * 5;
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

  const details = document.getElementsByClassName("details")
  for (let i = 0; i < details.length; i++) {
    details[i].classList.add("hidden");
  }
};
const showResultForm = () => {
  const input = document.getElementById("resultForm");
  input.classList.remove("hidden");
};

form.onsubmit = submit;

function submit(event) {
  event.preventDefault();

  const power = document.getElementById("power").value;
  const units = form.elements.units.value;
  const newCar = form.elements.recentCar.value;
  const emissions = document.getElementById("emissions").value;
  const powerKw = units === "kw" ? power : power * 0.7457;

  if (power == false || !Number.isInteger(+power)) {
    document.getElementById("power").classList.add("invalid");
    hideResultForm();
    return
  }
 
  if (newCar === 'yes' && (emissions === '' || !Number.isInteger(+emissions))) {
    document.getElementById("emissions").classList.add("invalid");
    hideResultForm();
    return
  }

  hideResultForm();
  showResultForm();

  const baseTax = calcTax(powerKw);
  const bonusMalus = (baseTax / 2);

  let resultDetail = "";
  let total = baseTax;

  if (newCar === "yes") {
    if (emissions === undefined) {
      total = baseTax;

      const detailDiv = document.getElementById("details-missing-info");
      detailDiv.classList.remove("hidden");
    } else if (emissions >= 0 && emissions <= 120) {
      total = baseTax - bonusMalus;
      const detailDiv = document.getElementById("details-bonus")
      const detailSpan1 = detailDiv.getElementsByTagName("span")[0];
      const detailSpan2 = detailDiv.getElementsByTagName("span")[1];
      detailSpan1.innerHTML = baseTax
      detailSpan2.innerHTML = bonusMalus
      detailDiv.classList.remove("hidden");
    } else if (emissions > 200) {
      total = baseTax + bonusMalus;
      const detailDiv = document.getElementById("details-malus")
      const detailSpan1 = detailDiv.getElementsByTagName("span")[0];
      const detailSpan2 = detailDiv.getElementsByTagName("span")[1];
      detailSpan1.innerHTML = baseTax
      detailSpan2.innerHTML = bonusMalus
      detailDiv.classList.remove("hidden");
    } else {
      total = baseTax;
      resultDetail = "";
    }

  }

  const totalDiv = document.getElementById("total");
  totalDiv.innerHTML = total;
}

const resetForm = (event) => {
  event.preventDefault();
  document.getElementById("power").value = '';
  form.elements.units.value = "kw";
  form.elements.recentCar.value = "yes";
  document.getElementById("emissions").value = '';
  showEmissionsInput();
  hideResultForm();
}