/*==================================================
KIANGINI ICT AUTH
Modern SaaS Authentication
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    REMOVE ERRORS WHILE TYPING
    =========================================*/

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {

        input.addEventListener("input", () => {

            input.classList.remove("input-error");

            const error = input.parentElement.querySelector(".field-error");

            if (error) {
                error.remove();
            }

        });

    });


    /*=========================================
    PASSWORD STRENGTH
    =========================================*/

    const password = document.querySelector('input[name="password1"]');

    if (password) {

        const strength = document.createElement("div");
        strength.className = "password-strength";
        strength.innerHTML = "<span></span>";

        password.parentElement.appendChild(strength);

        password.addEventListener("input", () => {

            const value = password.value;

            let score = 0;

            if (value.length >= 6) score++;

            if (/[A-Z]/.test(value)) score++;

            if (/[a-z]/.test(value)) score++;

            if (/\d/.test(value)) score++;

            if (/[^A-Za-z0-9]/.test(value)) score++;

            strength.className = "password-strength";

            if (value.length === 0) {

                strength.querySelector("span").style.width = "0";

            }

            else if (score <= 2) {

                strength.classList.add("weak");

            }

            else if (score <= 4) {

                strength.classList.add("medium");

            }

            else {

                strength.classList.add("strong");

            }

        });

    }


    /*=========================================
    PASSWORD MATCH
    =========================================*/

    const confirmPassword = document.querySelector('input[name="password2"]');

    if (password && confirmPassword) {

        confirmPassword.addEventListener("input", () => {

            if (confirmPassword.value.length === 0) {

                confirmPassword.classList.remove("input-error");
                confirmPassword.classList.remove("input-success");
                return;

            }

            if (password.value === confirmPassword.value) {

                confirmPassword.classList.remove("input-error");
                confirmPassword.classList.add("input-success");

            }

            else {

                confirmPassword.classList.remove("input-success");
                confirmPassword.classList.add("input-error");

            }

        });

    }


    /*=========================================
    SHOW / HIDE PASSWORD
    =========================================*/

    document.querySelectorAll('input[type="password"]').forEach(input => {

        const wrapper = input.parentElement;

        wrapper.style.position = "relative";

        const icon = document.createElement("i");

        icon.className = "fas fa-eye";

        icon.style.position = "absolute";
        icon.style.right = "15px";
        icon.style.top = "42px";
        icon.style.cursor = "pointer";
        icon.style.color = "#94a3b8";

        wrapper.appendChild(icon);

        icon.addEventListener("click", () => {

            if (input.type === "password") {

                input.type = "text";

                icon.className = "fas fa-eye-slash";

            }

            else {

                input.type = "password";

                icon.className = "fas fa-eye";

            }

        });

    });


    /*=========================================
    AUTO HIDE SUCCESS ALERTS
    =========================================*/

    document.querySelectorAll(".alert-success").forEach(alert => {

        setTimeout(() => {

            alert.style.transition = ".4s";

            alert.style.opacity = "0";

            alert.style.transform = "translateY(-10px)";

            setTimeout(() => {

                alert.remove();

            }, 400);

        }, 4000);

    });


    /*=========================================
    DISABLE BUTTON AFTER SUBMIT
    =========================================*/

    const form = document.querySelector("form");

    if (form) {

        form.addEventListener("submit", () => {

            const btn = form.querySelector("button[type='submit']");

            if (!btn) return;

            btn.disabled = true;

            btn.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Please wait...
            `;

        });

    }

});