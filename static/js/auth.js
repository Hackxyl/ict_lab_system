/*==================================================
KIANGINI ICT LAB
AUTHENTICATION JAVASCRIPT
Modern SaaS Authentication
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
    REMOVE ERRORS WHILE TYPING
    =========================================*/

    document.querySelectorAll("input").forEach(input => {

        input.addEventListener("input", () => {

            input.classList.remove("input-error");

            const error = input.parentElement.querySelector(".field-error");

            if (error) {
                error.remove();
            }

        });

    });

    /*=========================================
    FLOATING LABEL SUPPORT
    =========================================*/

    document.querySelectorAll(".floating-group input").forEach(input => {

        const updateState = () => {

            if (input.value.trim() !== "") {

                input.classList.add("has-value");

            } else {

                input.classList.remove("has-value");

            }

        };

        updateState();

        input.addEventListener("input", updateState);

        input.addEventListener("blur", updateState);

    });

    /*=========================================
    PASSWORD STRENGTH
    REGISTER PAGE ONLY
    =========================================*/

    const password = document.querySelector("#password1");

    if (password) {

        const strength = document.createElement("div");

        strength.className = "password-strength";

        strength.innerHTML = "<span></span>";

        password.parentElement.appendChild(strength);

        password.addEventListener("input", () => {

            const value = password.value;

            let score = 0;

            if (value.length >= 8) score++;

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

    const confirmPassword = document.querySelector("#password2");

    if (password && confirmPassword) {

        const validatePasswords = () => {

            if (confirmPassword.value === "") {

                confirmPassword.classList.remove("input-success");

                confirmPassword.classList.remove("input-error");

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

        };

        password.addEventListener("input", validatePasswords);

        confirmPassword.addEventListener("input", validatePasswords);

    }

    /*=========================================
    SHOW / HIDE PASSWORD
    =========================================*/

    document.querySelectorAll(".password-toggle").forEach(toggle => {

        toggle.addEventListener("click", () => {

            const input = toggle.parentElement.querySelector("input");

            if (!input) return;

            if (input.type === "password") {

                input.type = "text";

                toggle.classList.remove("fa-eye");

                toggle.classList.add("fa-eye-slash");

            }

            else {

                input.type = "password";

                toggle.classList.remove("fa-eye-slash");

                toggle.classList.add("fa-eye");

            }

        });

    });

    /*=========================================
    AUTO HIDE SUCCESS ALERTS
    =========================================*/

    document.querySelectorAll(".alert-success").forEach(alert => {

        setTimeout(() => {

            alert.style.transition = ".35s";

            alert.style.opacity = "0";

            alert.style.transform = "translateY(-12px)";

            setTimeout(() => {

                alert.remove();

            }, 350);

        }, 4000);

    });

    /*=========================================
    BUTTON LOADING
    =========================================*/

    document.querySelectorAll("form").forEach(form => {

        form.addEventListener("submit", () => {

            const button = form.querySelector("button[type='submit']");

            if (!button) return;

            button.disabled = true;

            button.classList.add("loading");

            const originalText = button.innerHTML;

            button.dataset.originalText = originalText;

            button.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Please wait...
            `;

        });

    });

});