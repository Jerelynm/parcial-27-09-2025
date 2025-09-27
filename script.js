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

    const nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario Ejemplo';
    let fotoUsuario = localStorage.getItem('fotoUsuario') || "https://dehayf5mhw1h7.cloudfront.net/wp-content/uploads/sites/1255/2020/05/18091119/avatar.jpg";

    if (document.querySelectorAll('.profile-name, .sidebar-name').length) {
        document.querySelectorAll('.profile-name, .sidebar-name').forEach(el => {
            el.textContent = nombreUsuario;
        });
        document.querySelectorAll('.profile-pic, .sidebar-pic').forEach(el => {
            el.src = fotoUsuario;
        });

        const sidebarBtns = document.querySelectorAll('.sidebar-nav button');
        if (sidebarBtns.length) {
            sidebarBtns[0].addEventListener('click', function() {
                mostrarModalEditarPerfil();
            });
            sidebarBtns[1].addEventListener('click', function() {
                window.location.href = "mis-publicaciones.html";
            });
            sidebarBtns[2].addEventListener('click', function() {
                window.location.href = "feeds-favoritos.html";
            });
            sidebarBtns[3].addEventListener('click', function() {
                window.location.href = "mensajes.html";
            });
            sidebarBtns[4].addEventListener('click', function() {
                mostrarModalCalendario();
            });
            sidebarBtns[5].addEventListener('click', function() {
                window.location.href = "fotos.html";
            });
        }

        const msgBtn = document.querySelector('.msg-btn');
        if (msgBtn) {
            msgBtn.addEventListener('click', function() {
                window.location.href = "mensajes.html";
            });
        }

        document.querySelectorAll('.comment-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                try {
                    const input = this.querySelector('input');
                    const texto = input.value.trim();
                    if (!texto) throw new Error('El comentario no puede estar vacío.');
                    const div = document.createElement('div');
                    div.className = 'comment';
                    div.textContent = nombreUsuario + ': ' + texto;
                    this.parentNode.insertBefore(div, this);
                    input.value = '';
                } catch (error) {
                    alert(error.message);
                }
            });
        });

        const postForm = document.getElementById('postForm');
        if (postForm) {
            postForm.addEventListener('submit', function(e) {
                e.preventDefault();
                try {
                    const textarea = this.querySelector('textarea');
                    const fileInput = this.querySelector('input[type="file"]');
                    const texto = textarea.value.trim();
                    const archivo = fileInput.files[0];

                    if (!texto && !archivo) {
                        throw new Error('Debes escribir algo o subir una foto.');
                    }

                    const feed = document.querySelector('.feed');
                    const post = document.createElement('article');
                    post.className = 'post';

                    const header = document.createElement('div');
                    header.className = 'post-header';
                    const img = document.createElement('img');
                    img.src = fotoUsuario;
                    img.alt = "Foto";
                    img.className = "post-pic";
                    const author = document.createElement('span');
                    author.className = 'post-author';
                    author.textContent = nombreUsuario;
                    header.appendChild(img);
                    header.appendChild(author);

                    post.appendChild(header);

                    if (texto) {
                        const p = document.createElement('p');
                        p.textContent = texto;
                        post.appendChild(p);
                    }

                    function agregarComentarios(post) {
                        const comments = document.createElement('div');
                        comments.className = 'comments';
                        const h4 = document.createElement('h4');
                        h4.textContent = 'Comentarios';
                        comments.appendChild(h4);

                        const commentForm = document.createElement('form');
                        commentForm.className = 'comment-form';
                        const input = document.createElement('input');
                        input.type = 'text';
                        input.placeholder = 'Agregar comentario...';
                        const button = document.createElement('button');
                        button.type = 'submit';
                        button.textContent = 'Comentar';
                        commentForm.appendChild(input);
                        commentForm.appendChild(button);

                        commentForm.addEventListener('submit', function(e) {
                            e.preventDefault();
                            try {
                                const texto = input.value.trim();
                                if (!texto) throw new Error('El comentario no puede estar vacío.');
                                const div = document.createElement('div');
                                div.className = 'comment';
                                div.textContent = nombreUsuario + ': ' + texto;
                                comments.insertBefore(div, commentForm);
                                input.value = '';
                            } catch (error) {
                                alert(error.message);
                            }
                        });

                        comments.appendChild(commentForm);
                        post.appendChild(comments);
                    }

                    if (archivo) {
                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const imgPost = document.createElement('img');
                            imgPost.src = e.target.result;
                            imgPost.className = 'post-img';
                            post.appendChild(imgPost);
                            agregarComentarios(post);
                            feed.prepend(post);
                        };
                        reader.readAsDataURL(archivo);
                    } else {
                        agregarComentarios(post);
                        feed.prepend(post);
                    }

                    textarea.value = '';
                    fileInput.value = '';
                } catch (error) {
                    alert(error.message);
                }
            });
        }

        function mostrarModalEditarPerfil() {
            let modal = document.getElementById('modalEditarPerfil');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'modalEditarPerfil';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100vw';
                modal.style.height = '100vh';
                modal.style.background = 'rgba(0,0,0,0.5)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = '9999';

                modal.innerHTML = `
                    <div style="background:#fff;padding:32px;border-radius:12px;min-width:300px;display:flex;flex-direction:column;align-items:center;">
                        <h2>Editar perfil</h2>
                        <img id="previewFoto" src="${fotoUsuario}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:16px;">
                        <input type="file" id="inputFoto" accept="image/*" style="margin-bottom:16px;">
                        <input type="text" id="inputNombre" value="${nombreUsuario}" style="margin-bottom:16px;padding:8px;width:90%;">
                        <div style="display:flex;gap:12px;">
                            <button id="guardarPerfil" style="background:#28a745;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Guardar</button>
                            <button id="cancelarPerfil" style="background:#dc3545;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Cancelar</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(modal);

                document.getElementById('inputFoto').addEventListener('change', function(e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function(ev) {
                            document.getElementById('previewFoto').src = ev.target.result;
                        };
                        reader.readAsDataURL(file);
                    }
                });

                document.getElementById('guardarPerfil').addEventListener('click', function() {
                    try {
                        const nuevoNombre = document.getElementById('inputNombre').value.trim();
                        const nuevaFoto = document.getElementById('previewFoto').src;
                        if (!nuevoNombre) throw new Error('El nombre no puede estar vacío.');
                        localStorage.setItem('nombreUsuario', nuevoNombre);
                        localStorage.setItem('fotoUsuario', nuevaFoto);
                        document.querySelectorAll('.profile-name, .sidebar-name').forEach(el => {
                            el.textContent = nuevoNombre;
                        });
                        document.querySelectorAll('.profile-pic, .sidebar-pic').forEach(el => {
                            el.src = nuevaFoto;
                        });
                        document.body.removeChild(modal);
                    } catch (error) {
                        alert(error.message);
                    }
                });

                document.getElementById('cancelarPerfil').addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            }
        }

        function mostrarModalCalendario() {
            let modal = document.getElementById('modalCalendario');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'modalCalendario';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100vw';
                modal.style.height = '100vh';
                modal.style.background = 'rgba(0,0,0,0.5)';
                modal.style.display = 'flex';
                modal.style.alignItems = 'center';
                modal.style.justifyContent = 'center';
                modal.style.zIndex = '9999';

                const hoy = new Date();
                const year = hoy.getFullYear();
                const month = hoy.getMonth();
                const day = hoy.getDate();

                function crearCalendario(year, month) {
                    const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
                    const primerDia = new Date(year, month, 1).getDay();
                    const ultimoDia = new Date(year, month + 1, 0).getDate();

                    let tabla = `<table style="width:100%;text-align:center;border-collapse:collapse;">
                        <tr>${diasSemana.map(d=>`<th style="padding:6px;">${d}</th>`).join('')}</tr><tr>`;

                    for (let i = 0; i < primerDia; i++) {
                        tabla += `<td></td>`;
                    }
                    for (let d = 1; d <= ultimoDia; d++) {
                        const esHoy = d === day && month === hoy.getMonth() && year === hoy.getFullYear();
                        tabla += `<td style="padding:8px;${esHoy?'background:#007bff;color:#fff;border-radius:50%;':''}">${d}</td>`;
                        if ((d + primerDia) % 7 === 0) tabla += `</tr><tr>`;
                    }
                    tabla += `</tr></table>`;
                    return tabla;
                }

                modal.innerHTML = `
                    <div style="background:#fff;padding:32px;border-radius:12px;min-width:320px;display:flex;flex-direction:column;align-items:center;">
                        <h2>Calendario</h2>
                        <div style="margin-bottom:16px;font-weight:bold;">${hoy.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</div>
                        <div>${crearCalendario(year, month)}</div>
                        <button id="cerrarCalendario" style="margin-top:16px;background:#dc3545;color:#fff;border:none;padding:8px 16px;border-radius:4px;cursor:pointer;">Cerrar</button>
                    </div>
                `;
                document.body.appendChild(modal);

                document.getElementById('cerrarCalendario').addEventListener('click', function() {
                    document.body.removeChild(modal);
                });
            }
        }
    }
    // ...código de login y registro para index.html...
});