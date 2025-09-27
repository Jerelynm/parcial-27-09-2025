document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const messageDiv = document.getElementById('message');
    const formTitle = document.getElementById('formTitle');
    const sessionMessage = document.getElementById('sessionMessage');

    // Simulación de base de datos en memoria
    const users = [
        {
            firstName: "Jerelyn",
            lastName: "Marín",
            email: "jerelyn245@gmail.com",
            phone: "37661056",
            password: "123456"
        }
    ];

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const identifier = loginForm.loginIdentifier.value;
        const password = loginForm.loginPassword.value;

        const user = users.find(u =>
            (u.email === identifier || u.phone === identifier) && u.password === password
        );

        if (user) {
            sessionMessage.textContent = `¡Has iniciado sesión como ${user.firstName} ${user.lastName}!`;
            sessionMessage.style.color = "green";
            messageDiv.textContent = "";
            setTimeout(() => {
                window.location.href = "home.html";
            }, 1500); // Redirige después de 1.5 segundos
        } else {
            messageDiv.textContent = "Correo/Teléfono o contraseña incorrectos.";
            messageDiv.style.color = "red";
            sessionMessage.textContent = "";
        }
    });

    showRegisterBtn.addEventListener('click', function() {
        registerForm.style.display = "block";
        loginForm.style.display = "none";
        showRegisterBtn.style.display = "none";
        formTitle.textContent = "Formulario de Registro";
        messageDiv.textContent = "";
        sessionMessage.textContent = "";
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const firstName = registerForm.firstName.value.trim();
        const lastName = registerForm.lastName.value.trim();
        const newEmail = registerForm.newEmail.value.trim();
        const phone = registerForm.phone.value.trim();
        const newPassword = registerForm.newPassword.value;
        const confirmPassword = registerForm.confirmPassword.value;

        if (users.find(u => u.email === newEmail || u.phone === phone)) {
            messageDiv.textContent = "El correo o teléfono ya está registrado.";
            messageDiv.style.color = "red";
            return;
        }

        if (newPassword !== confirmPassword) {
            messageDiv.textContent = "Las contraseñas no coinciden.";
            messageDiv.style.color = "red";
            return;
        }

        users.push({
            firstName,
            lastName,
            email: newEmail,
            phone,
            password: newPassword
        });

        messageDiv.textContent = "¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.";
        messageDiv.style.color = "green";
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        showRegisterBtn.style.display = "inline-block";
        formTitle.textContent = "Formulario de Inicio de Sesión";
        registerForm.reset();
    });
});