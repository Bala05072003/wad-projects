// Validation functions
function validateName() {
    const name = document.getElementById('name').value.trim();
    const nameError = document.getElementById('nameError');
    const regex = /^[A-Za-z ]+$/;

    if (name === "") {
        nameError.textContent = "Name cannot be empty";
        return false;
    } else if (!regex.test(name)) {
        nameError.textContent = "Only alphabets allowed";
        return false;
    } else {
        nameError.textContent = "✔";
        nameError.classList.add('success');
        return true;
    }
}

function validateEmail() {
    const email = document.getElementById('email').value.trim();
    const emailError = document.getElementById('emailError');
    const regex = /^[^\s@]+@[^\s@]+\.(com|edu|in)$/;

    if (!regex.test(email)) {
        emailError.textContent = "Invalid email format";
        emailError.classList.remove('success');
        return false;
    } else {
        emailError.textContent = "✔";
        emailError.classList.add('success');
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    const regex = /^(?=.*\d).{6,}$/;

    if (!regex.test(password)) {
        passwordError.textContent = "Min 6 chars, at least 1 number";
        passwordError.classList.remove('success');
        return false;
    } else {
        passwordError.textContent = "✔";
        passwordError.classList.add('success');
        return true;
    }
}

function validateMobile() {
    const mobile = document.getElementById('mobile').value.trim();
    const mobileError = document.getElementById('mobileError');
    const regex = /^\d{10}$/;

    if (!regex.test(mobile)) {
        mobileError.textContent = "Enter 10 digit number";
        mobileError.classList.remove('success');
        return false;
    } else {
        mobileError.textContent = "✔";
        mobileError.classList.add('success');
        return true;
    }
}

function validateDOB() {
    const dob = document.getElementById('dob').value;
    const dobError = document.getElementById('dobError');

    if (!dob) {
        dobError.textContent = "Select your Date of Birth";
        dobError.classList.remove('success');
        return false;
    } else {
        dobError.textContent = "✔";
        dobError.classList.add('success');
        return true;
    }
}

function validateRating() {
    const ratings = document.getElementsByName('rating');
    const ratingError = document.getElementById('ratingError');
    let selected = false;

    ratings.forEach(r => {
        if (r.checked) selected = true;
    });

    if (!selected) {
        ratingError.textContent = "Select a rating";
        ratingError.classList.remove('success');
        return false;
    } else {
        ratingError.textContent = "✔";
        ratingError.classList.add('success');
        return true;
    }
}

function validateInterests() {
    const interests = document.getElementsByName('interests');
    const interestsError = document.getElementById('interestsError');
    let selected = false;

    interests.forEach(i => {
        if (i.checked) selected = true;
    });

    if (!selected) {
        interestsError.textContent = "Select at least one interest";
        interestsError.classList.remove('success');
        return false;
    } else {
        interestsError.textContent = "✔";
        interestsError.classList.add('success');
        return true;
    }
}

// Display form values
function displayValues() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobile = document.getElementById('mobile').value;
    const dob = document.getElementById('dob').value;

    const ratings = document.getElementsByName('rating');
    let ratingValue = '';
    ratings.forEach(r => { if (r.checked) ratingValue = r.value; });

    const interests = document.getElementsByName('interests');
    let selectedInterests = [];
    interests.forEach(i => { if (i.checked) selectedInterests.push(i.value); });

    alert(
        `Name: ${name}\nEmail: ${email}\nPassword: ${password}\nMobile: ${mobile}\nDOB: ${dob}\nRating: ${ratingValue}\nInterests: ${selectedInterests.join(", ")}`
    );
}

// Form submission
document.getElementById('surveyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = validateName() & validateEmail() & validatePassword() & validateMobile() & validateDOB() & validateRating() & validateInterests();
    if (valid) {
        // Store details in sessionStorage to show in success page
        sessionStorage.setItem('name', document.getElementById('name').value);
        sessionStorage.setItem('email', document.getElementById('email').value);

        const ratings = document.getElementsByName('rating');
        let ratingValue = '';
        ratings.forEach(r => { if (r.checked) ratingValue = r.value; });
        sessionStorage.setItem('rating', ratingValue);

        const interests = document.getElementsByName('interests');
        let selectedInterests = [];
        interests.forEach(i => { if (i.checked) selectedInterests.push(i.value); });
        sessionStorage.setItem('interests', selectedInterests.join(", "));

        window.location.href = "success.html";
    } else {
        alert("Please correct the errors in the form before submitting.");
    }
});
