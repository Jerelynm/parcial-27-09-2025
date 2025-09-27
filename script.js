document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegisterBtn');
    const messageDiv = document.getElementById('message');
    const formTitle = document.getElementById('formTitle');
    const sessionMessage = document.getElementById('sessionMessage');

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
        try {
            const identifier = loginForm.loginIdentifier.value.trim();
            const password = loginForm.loginPassword.value;

            if (!identifier || !password) {
                throw new Error("Todos los campos son obligatorios.");
            }

            const user = users.find(u =>
                (u.email === identifier || u.phone === identifier) && u.password === password
            );

            if (user) {
                sessionMessage.textContent = `¡Has iniciado sesión como ${user.firstName} ${user.lastName}!`;
                sessionMessage.style.color = "green";
                messageDiv.textContent = "";
                localStorage.setItem('nombreUsuario', user.firstName + ' ' + user.lastName);
                setTimeout(() => {
                    window.location.href = "home.html";
                }, 1500);
            } else {
                throw new Error("Correo/Teléfono o contraseña incorrectos.");
            }
        } catch (error) {
            messageDiv.textContent = error.message;
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
        try {
            const firstName = registerForm.firstName.value.trim();
            const lastName = registerForm.lastName.value.trim();
            const newEmail = registerForm.newEmail.value.trim();
            const phone = registerForm.phone.value.trim();
            const newPassword = registerForm.newPassword.value;
            const confirmPassword = registerForm.confirmPassword.value;

            if (!firstName || !lastName || !newEmail || !phone || !newPassword || !confirmPassword) {
                throw new Error("Todos los campos son obligatorios.");
            }

            if (users.find(u => u.email === newEmail || u.phone === phone)) {
                throw new Error("El correo o teléfono ya está registrado.");
            }

            if (newPassword !== confirmPassword) {
                throw new Error("Las contraseñas no coinciden.");
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
        } catch (error) {
            messageDiv.textContent = error.message;
            messageDiv.style.color = "red";
        }
    });
});