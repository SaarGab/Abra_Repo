// ===============================
// ELEMENT REFERENCES
// ===============================
const form = document.getElementById("profileForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const bioInput = document.getElementById("bio");

const fileInput = document.getElementById("profilePicInput");
const previewImg = document.getElementById("profilePreview");

const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

// ===============================
// IMAGE PREVIEW
// ===============================
fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        previewImg.src = URL.createObjectURL(file);
    }
});

// ===============================
// VALIDATION HELPERS
// ===============================
function showError(input, errorId, message) {
    input.classList.add("invalid");
    document.getElementById(errorId).textContent = message;
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(e => e.textContent = "");
    document.querySelectorAll("input, textarea").forEach(i => i.classList.remove("invalid"));
}

// Optional: clear error on typing
function attachLiveValidation(input, errorId) {
    input.addEventListener("input", () => {
        if (input.checkValidity() && input.value.trim() !== "") {
            input.classList.remove("invalid");
            document.getElementById(errorId).textContent = "";
        }
    });
}

attachLiveValidation(nameInput, "nameError");
attachLiveValidation(emailInput, "emailError");
attachLiveValidation(phoneInput, "phoneError");

// ===============================
// FORM SUBMIT
// ===============================
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    clearErrors();
    statusMessage.textContent = "";

    let isValid = true;

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

    if (!isValid) return;

    // ===============================
    // LOADING STATE
    // ===============================
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";

    try {
        // Collect form data (includes file)
        const formData = new FormData(form);

        const response = await fetch("/api/profile", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        // ===============================
        // SUCCESS
        // ===============================
        statusMessage.textContent = "✅ Profile updated successfully!";
        statusMessage.style.color = "green";

    } catch (error) {
        // ===============================
        // ERROR
        // ===============================
        statusMessage.textContent = "❌ Failed to update profile.";
        statusMessage.style.color = "red";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Save";
    }
});