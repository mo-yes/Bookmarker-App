// ================= Elements =================
let siteNameInput = document.getElementById("bookmarkName");
let siteUrlInput = document.getElementById("bookmarkURL");
let nameError = document.getElementById("nameError");
let urlError = document.getElementById("urlError");
let tableBody = document.getElementById("tBody");

// ================= Toast =================
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
});

// ================= Data =================
let sitesArr = [];

if (localStorage.getItem("sites") !== null) {
    sitesArr = JSON.parse(localStorage.getItem("sites"));
    displaySites();
}

// ================= Events (Live Validation) =================
siteNameInput.addEventListener("input", validateName);
siteUrlInput.addEventListener("input", validateURL);

// ================= Add Site =================
function addSites(event) {
    event.preventDefault();

    let isNameValid = validateName();
    let isURLValid = validateURL();

    if (!isNameValid || !isURLValid) {
    Toast.fire({
        icon: "error",
        title: "Please fix errors first",
    });
    return;
    }

    let site = {
    name: siteNameInput.value.trim(),
    url: siteUrlInput.value.trim(),
    };

    sitesArr.push(site);
    localStorage.setItem("sites", JSON.stringify(sitesArr));

    displaySites();
    clearInputs();

    Toast.fire({
    icon: "success",
    title: "Website added successfully",
    });
}

// ================= Display =================
function displaySites() {
    let trs = "";

    for (let i = 0; i < sitesArr.length; i++) {
    trs += `
        <tr>
        <td>${i + 1}</td>
        <td>${sitesArr[i].name}</td>
        <td>
            <a href="${sitesArr[i].url}" target="_blank" class="btn btn-outline-primary">
            <i class="fa-solid fa-eye"></i>
            </a>
        </td>
        <td>
            <button class="btn btn-outline-danger" onclick="deleteSite(${i})">
            Delete
            </button>
        </td>
        </tr>
    `;
    }

    tableBody.innerHTML = trs;
}

// ================= Delete =================
function deleteSite(index) {
    sitesArr.splice(index, 1);
    localStorage.setItem("sites", JSON.stringify(sitesArr));
    displaySites();

    Toast.fire({
    icon: "success",
    title: "Website deleted",
    });
}

// ================= Validation =================
function validateName() {
    let regex = /^[a-zA-Z\s]{3,}$/;

    if (regex.test(siteNameInput.value.trim())) {
    nameError.classList.add("d-none");
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
    return true;
    } else {
    nameError.classList.remove("d-none");
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
    }
}

function validateURL() {
    let regex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/;

    if (regex.test(siteUrlInput.value.trim())) {
    urlError.classList.add("d-none");
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
    return true;
    } else {
    urlError.classList.remove("d-none");
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
    }
}

// ================= Helpers =================
function clearInputs() {
    siteNameInput.value = "";
    siteUrlInput.value = "";

    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}

// ================= Reset =================
function reset() {
    if (sitesArr.length === 0) return;

    Swal.fire({
    title: "Are you sure?",
    text: "All bookmarks will be deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete all",
    }).then((result) => {
    if (result.isConfirmed) {
        localStorage.removeItem("sites");
        sitesArr = [];
        displaySites();

        Toast.fire({
        icon: "success",
        title: "All bookmarks cleared",
        });
    }
    });
}
