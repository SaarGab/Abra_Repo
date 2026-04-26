const fileInput = document.getElementById("profilePicInput");
const previewImg = document.getElementById("profilePreview");

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            previewImg.src = this.result; // base64 image
        });

        reader.readAsDataURL(file);
    }
});

const form = document.getElementById("profileForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Clear previous errors
    clearErrors();

    // 🔹 Name validation
    if (nameInput.value.trim() === "") {
        showError(nameInput, "nameError", "Name is required");
        isValid = false;
    }

    // 🔹 Email validation
    if (!emailInput.checkValidity()) {
        showError(emailInput, "emailError", "Enter a valid email");
        isValid = false;
    }

    // 🔹 Phone validation
    if (!phoneInput.checkValidity()) {
        showError(phoneInput, "phoneError", "Enter a valid phone number");
        isValid = false;
    }

    if (isValid) {
        console.log("Form is valid ✅");
        // proceed with saving / sending data
    }
});

function showError(input, errorId, message) {
    input.classList.add("invalid");
    document.getElementById(errorId).textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input").forEach(i => i.classList.remove("invalid"));
}