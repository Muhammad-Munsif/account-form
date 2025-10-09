document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("accountRegistrationForm");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const togglePasswordBtn = document.getElementById("togglePassword");
  const passwordStrengthBar = document.getElementById("passwordStrength");

  // Toggle password visibility
  togglePasswordBtn.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<i class="fas fa-eye"></i>'
        : '<i class="fas fa-eye-slash"></i>';
  });

  // Password strength indicator
  passwordInput.addEventListener("input", function () {
    const password = this.value;
    let strength = 0;

    if (password.length >= 6) strength += 25;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25;
    if (password.match(/\d/)) strength += 25;
    if (password.match(/[^a-zA-Z\d]/)) strength += 25;

    passwordStrengthBar.style.width = strength + "%";

    if (strength < 50) {
      passwordStrengthBar.style.backgroundColor = "#dc3545";
    } else if (strength < 75) {
      passwordStrengthBar.style.backgroundColor = "#ffc107";
    } else {
      passwordStrengthBar.style.backgroundColor = "#28a745";
    }
  });

  // Real-time validation
  const inputs = form.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateField(this);
      }
    });
  });

  function validateField(field) {
    const errorElement = document.getElementById(field.id + "Error");

    if (!field.value.trim()) {
      showError(field, errorElement, "This field is required");
      return false;
    }

    switch (field.id) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          showError(field, errorElement, "Please enter a valid email address");
          return false;
        }
        break;

      case "password":
        if (field.value.length < 6) {
          showError(
            field,
            errorElement,
            "Password must be at least 6 characters"
          );
          return false;
        }
        break;

      case "confirmPassword":
        if (field.value !== passwordInput.value) {
          showError(field, errorElement, "Passwords do not match");
          return false;
        }
        break;

      case "phone":
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = field.value.replace(/\D/g, "");
        if (!phoneRegex.test(cleanPhone)) {
          showError(field, errorElement, "Please enter a valid phone number");
          return false;
        }
        break;

      case "dob":
        const dob = new Date(field.value);
        const today = new Date();
        const age = today.getFullYear() - dob.getFullYear();
        if (age < 13) {
          showError(field, errorElement, "You must be at least 13 years old");
          return false;
        }
        break;
    }

    showSuccess(field, errorElement);
    return true;
  }

  function showError(field, errorElement, message) {
    field.classList.add("error");
    field.classList.remove("success");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  function showSuccess(field, errorElement) {
    field.classList.remove("error");
    field.classList.add("success");
    errorElement.style.display = "none";
  }

  // Form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      // Show success message
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Creating Account...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert("🎉 Account created successfully! Welcome to our community.");
        form.reset();
        passwordStrengthBar.style.width = "0%";
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Remove success classes
        inputs.forEach((input) => {
          input.classList.remove("success");
        });
      }, 2000);
    }
  });
});
