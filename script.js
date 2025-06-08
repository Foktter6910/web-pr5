document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let isValid = true;

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const phone = document.getElementById('phone').value.trim();
    const dob = new Date(document.getElementById('dob').value);
    const terms = document.getElementById('terms').checked;

    const errors = {
        usernameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        phoneError: '',
        dobError: '',
        termsError: ''
    };

    // Валідація імені
    if (!username) {
        errors.usernameError = "Ім’я обов’язкове";
        isValid = false;
    }

    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.emailError = "Некоректний email";
        isValid = false;
    }

    // Валідація паролю
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        errors.passwordError = "Мін. 8 символів, 1 велика літера, 1 цифра";
        isValid = false;
    }

    // Підтвердження паролю
    if (password !== confirmPassword) {
        errors.confirmPasswordError = "Паролі не співпадають";
        isValid = false;
    }

    // Телефон
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
        errors.phoneError = "Некоректний номер телефону";
        isValid = false;
    }

    // Перевірка віку (18+)
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (isNaN(age) || age < 18 || (age === 18 && today < new Date(dob.setFullYear(dob.getFullYear() + 18)))) {
        errors.dobError = "Має бути 18+ років";
        isValid = false;
    }

    // Згода з умовами
    if (!terms) {
        errors.termsError = "Погодьтесь з умовами";
        isValid = false;
    }

    // Вивід помилок
    for (const key in errors) {
        document.getElementById(key).textContent = errors[key];
    }

    if (isValid) {
        alert("Реєстрація успішна!");
        this.reset();
    }
});
