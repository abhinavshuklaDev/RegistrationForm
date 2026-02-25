const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {

    event.preventDefault(); // Prevent page reload

    // Get Inputs
    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const dob = document.getElementById("dob");
    const city = document.getElementById("city");

    let isValid = true;

    // Clear previous errors
    clearErrors();

    // Required Validation
    if (name.value.trim() === "") {
        showError(name, "nameError", "Full name is required");
        isValid = false;
    }

    if (email.value.trim() === "") {
        showError(email, "emailError", "Email is required");
        isValid = false;
    }

    if (dob.value === "") {
        showError(dob, "dobError", "Date of birth is required");
        isValid = false;
    }

    if (city.value === "") {
        showError(city, "cityError", "Please select a city");
        isValid = false;
    }

    // Email Regex Validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.value && !emailPattern.test(email.value)) {
        showError(email, "emailError", "Invalid email format");
        isValid = false;
    }

    // Age Validation (18+)
    if (dob.value) {
        const birthDate = new Date(dob.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            showError(dob, "dobError", "You must be 18+ years old");
            isValid = false;
        }
    }

    // If Valid → Save to LocalStorage
    if (isValid) {

        const userData = {
            fullName: name.value,
            email: email.value,
            dob: dob.value,
            city: city.value
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Registration Successful!");
        form.reset();
    }

});

// Show Error
function showError(input, errorId, message) {
    input.classList.add("error-border");
    document.getElementById(errorId).textContent = message;
}

// Clear Errors
function clearErrors() {
    document.querySelectorAll("input, select").forEach(el => {
        el.classList.remove("error-border");
    });

    document.querySelectorAll(".error").forEach(el => {
        el.textContent = "";
    });
}
