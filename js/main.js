var bookmarkNameInput = document.querySelector("#bookmarkName");
var bookmarkURLInput = document.querySelector("#bookmarkURL");
var inputs = document.querySelectorAll("input");
var alerts = document.querySelectorAll(".alert");
var submitBtn = document.querySelector("#btn");

// ----- Check & Add & Save Sites -----
var sitesList;
if (localStorage.getItem("sites") == null) {
  sitesList = [];
} else {
  sitesList = JSON.parse(localStorage.getItem("sites"));
  display();
}
var names = [];
function addSite() {
  if (
    bookmarkNameInput.classList.contains("is-valid") &&
    bookmarkURLInput.classList.contains("is-valid")
  ) {
    if (names.length == 0 || !names.includes(bookmarkNameInput.value)) {
      var site = {
        name: bookmarkNameInput.value,
        url: bookmarkURLInput.value,
      };
      sitesList.push(site);
      names.push(bookmarkNameInput.value);
      localStorage.setItem("sites", JSON.stringify(sitesList));
      display();
      resetInputs();
    } else {
      if (names.includes(bookmarkNameInput.value)) {
        alert("please change data");
        bookmarkNameInput.classList.replace("is-valid", "is-invalid");
      }
    }
  } else if (
    bookmarkNameInput.classList.contains("is-invalid") ||
    bookmarkURLInput.classList.contains("is-invalid")
  ) {
    alert("Not Valid data");
  } else if (bookmarkNameInput.value == "" || bookmarkURLInput.value == "") {
    alert("Please Insert Full Data");
  }
}
// -------------------------

// ----- Display Sites -----
function display() {
  var box = "";
  for (let i = 0; i < sitesList.length; i++) {
    box += `
      <tr>
              <td>${i + 1}</td>
              <td>${sitesList[i].name}</td>
              <td><button class="btn visitBtn px-4 py-2"> <i class="fa-solid fa-eye"></i> <a target="_blank" href="${
                sitesList[i].url
              }">Visit</a></button></td>
              <td><button onclick="deleteSite(${i})" class="btn deleteBtn px-4 py-2"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
    `;
  }
  document.querySelector(".content").innerHTML = box;
}

// -------------------------

function resetInputs() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value == null;
    inputs[i].classList.remove("is-valid");
    inputs[i].classList.remove("is-invalid");
    inputs[i].nextElementSibling.classList.replace("d-block", "d-none");
  }
}
// ----- Submit Btn -----
submitBtn.addEventListener("click", () => {
  addSite();
});
// -------------------------

// ----- delete Btn -----
function deleteSite(deletedsiteIndex) {
  sitesList.splice(deletedsiteIndex, 1);
  localStorage.setItem("sites", JSON.stringify(sitesList));
  display();
  resetInputs();
}
// -------------------------

function validatinInputs(element) {
  var regex = {
    bookmarkName: /^[A-Z][A-Za-z0-9]{3,}$/,
    bookmarkURL:
      /^((http|https):\/{2}www\.[a-zA-Z0-9\.]{2,}\.(com|net|org|io)\/{0,})$/,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }

  if (element.value == "") {
    element.classList.remove("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.add("d-none");
  }
}
