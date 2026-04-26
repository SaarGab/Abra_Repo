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

form.addEventListener("submit", function (event) {
    event.preventDefault(); // 🚫 stops page reload

    // You can now handle the data manually
    console.log("Form submitted without reload!");

    // Example: collect data
    const formData = new FormData(form);
    console.log(Object.fromEntries(formData.entries()));
});