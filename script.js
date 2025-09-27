document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const messageDiv = document.getElementById('message');
    const formTitle = document.getElementById('formTitle');

    //simularé que estos datos están en una base de datos así que estarán creados de esta forma debido al factor tiempo y complejidad.
    const users = [
        { email: "usuario@facebook.com", password: "123456" }
    ];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = form.email.value;
        const password = form.password.value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            messageDiv.textContent = "¡Inicio de sesión exitoso!";
            messageDiv.style.color = "green";
        } else {
            messageDiv.textContent = "Correo o contraseña incorrectos.";
            messageDiv.style.color = "red";
        }
    });

    showRegisterBtn.addEventListener('click', function() {
        registerForm.style.display = "block";
        form.style.display = "none";
        showRegisterBtn.style.display = "none";
        formTitle.textContent = "Formulario de Registro";
        messageDiv.textContent = "";
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newEmail = registerForm.newEmail.value;
        const newPassword = registerForm.newPassword.value;

        if (users.find(u => u.email === newEmail)) {
            messageDiv.textContent = "El correo ya está registrado.";
            messageDiv.style.color = "red";
        } else {
            users.push({ email: newEmail, password: newPassword });
            messageDiv.textContent = "¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.";
            messageDiv.style.color = "green";
            registerForm.style.display = "none";
            form.style.display = "block";
            showRegisterBtn.style.display = "inline-block";
            formTitle.textContent = "Formulario de Inicio de Sesión";
            registerForm.reset();
        }
    });
});