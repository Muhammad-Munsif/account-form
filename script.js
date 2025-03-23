const accountRegistrationForm = document.getElementById("accountRegistrationForm")
accountRegistrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!firstName || !lastName || !username || !email || !phone || !dob || !gender || !address || !password || !confirmPassword) {
        alert("All fields are required!");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    alert("Account registration successful!");
});