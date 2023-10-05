const passwordInput = document.getElementById('password-input');
        const passwordRequirements = document.querySelector('.password-requirements');
        const passwordError = document.getElementById('password-error');
        const signUpForm = document.getElementById('signup-form');

        // Variables to store user input
        let usernameValue = '';
        let emailValue = '';

        // Function to update stored values
        function updateStoredValues() {
            usernameValue = document.querySelector('input[name="username"]').value;
            emailValue = document.querySelector('input[name="email"]').value;
        }

        // Function to check password requirements and add checkmarks
        function checkPasswordRequirements() {
            updateStoredValues(); // Update stored values

            const lengthRequirement = document.getElementById('requirement-length');
            const uppercaseRequirement = document.getElementById('requirement-uppercase');
            const lowercaseRequirement = document.getElementById('requirement-lowercase');
            const numberRequirement = document.getElementById('requirement-number');

            // Reset error message and remove checkmarks
            passwordError.textContent = '';
            lengthRequirement.classList.remove('checkmark');
            uppercaseRequirement.classList.remove('checkmark');
            lowercaseRequirement.classList.remove('checkmark');
            numberRequirement.classList.remove('checkmark');

            // Check if each requirement is fulfilled and add checkmarks
            if (passwordInput.value.length >= 8) {
                lengthRequirement.innerHTML = '✅ At least 8 characters';
                lengthRequirement.classList.add('checkmark');
            } else {
                lengthRequirement.innerHTML = ' At least 8 characters';
                passwordError.textContent += 'Password must be at least 8 characters long. ';
            }

            if (/[A-Z]/.test(passwordInput.value)) {
                uppercaseRequirement.innerHTML = '✅ Must contain at least one uppercase letter';
                uppercaseRequirement.classList.add('checkmark');
            } else {
                uppercaseRequirement.innerHTML = ' Must contain at least one uppercase letter';
                passwordError.textContent += 'Password must contain at least one uppercase letter. ';
            }

            if (/[a-z]/.test(passwordInput.value)) {
                lowercaseRequirement.innerHTML = '✅ Must contain at least one lowercase letter';
                lowercaseRequirement.classList.add('checkmark');
            } else {
                lowercaseRequirement.innerHTML = ' Must contain at least one lowercase letter';
                passwordError.textContent += 'Password must contain at least one lowercase letter. ';
            }

            if (/\d/.test(passwordInput.value)) {
                numberRequirement.innerHTML = '✅ Must contain at least one number';
                numberRequirement.classList.add('checkmark');
            } else {
                numberRequirement.innerHTML = ' Must contain at least one number';
                passwordError.textContent += 'Password must contain at least one number. ';
            }
        }

        // Comment: The form submission handling is currently commented out. You can uncomment and modify this part to handle form submission.
        // signUpForm.addEventListener('submit', (e) => {
        //     e.preventDefault(); // Prevent the default form submission behavior
        //     // Assuming sign-up is successful, redirect to the sign-in page
        //     window.location.href = '/auth/login';
        // });

        passwordInput.addEventListener('focus', () => {
            passwordRequirements.style.display = 'block';
        });

        passwordInput.addEventListener('blur', () => {
            passwordRequirements.style.display = 'none';
        });

        // Check requirements when the user types in the password field
        passwordInput.addEventListener('input', checkPasswordRequirements);

        // Store username and email input values on blur
        document.querySelector('input[name="username"]').addEventListener('blur', () => {
            updateStoredValues();
        });

        document.querySelector('input[name="email"]').addEventListener('blur', () => {
            updateStoredValues();
        });

        // Restore stored values to fields on focus
        passwordInput.addEventListener('focus', () => {
            document.querySelector('input[name="username"]').value = usernameValue;
            document.querySelector('input[name="email"]').value = emailValue;
        });