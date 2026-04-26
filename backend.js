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
const submitBtn = document.getElementById("submitBtn");
const statusMessage = document.getElementById("statusMessage");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 🔹 UI: loading state
    submitBtn.disabled = true;
    submitBtn.textContent = "Saving...";
    statusMessage.textContent = "";

    try {
        // Collect form data
        const formData = new FormData(form);

        // Example: send to backend
        const response = await fetch("/api/profile", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("Server error");
        }

        // 🔹 Success
        statusMessage.textContent = "✅ Profile updated successfully!";
        statusMessage.style.color = "green";

    } catch (error) {
        // 🔹 Error
        statusMessage.textContent = "❌ Failed to update profile.";
        statusMessage.style.color = "red";
    } finally {
        // 🔹 Reset buttonss
        submitBtn.disabled = false;
        submitBtn.textContent = "Save";
    }
});

submitBtn.classList.add("loading");