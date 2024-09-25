function showForm(formId) {
    document.getElementById(formId).style.display = 'block';
    const sidePanel = document.querySelector('.side-panel');
    const toggleButton = document.getElementById('toggleSidePanel');
    sidePanel.classList.remove('open');
    toggleButton.textContent = '☰';
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none';
}

function showLogin() {
    showForm('loginForm');
    closeForm('forgotPasswordForm');
    closeForm('signUpForm');
}

function showForgotPassword() {
    showForm('forgotPasswordForm');
    closeForm('loginForm');
}

function showSignUp() {
    showForm('signUpForm');
    closeForm('forgotPasswordForm');
}

document.getElementById('loginFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Login Attempt');
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (username === '' || password === '') {
        alert('Please enter both username and password.');
        return;
    }

    // Send AJAX request to PHP for login check
    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            // Redirect or handle successful login
        } else {
            alert(data.message || 'Login failed. Please check your username and password.');
        }
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('signUpFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById("signUpUsername").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const password_confirm = document.getElementById("signUpConfirmPassword").value;
    if (password === password_confirm) {
        fetch('basic.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            if (data.success) {
                alert('User registered successfully with ID: ' + data.userId);
                closeForm('signUpForm');
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
    } else {
        alert('Passwords do not match');
    }
});

document.getElementById('forgotPasswordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('resetEmail').value.trim();

    if (email === '') {
        alert('Please enter your email address.');
        return;
    }

    // Send a password reset request to PHP
    fetch('forgot_password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message || 'An error occurred. Please try again later.');
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('createFormContent').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Create Project Form Attempt');
});

function login_openForm() {
    showForm('loginForm');
}

function create_openForm() {
    showForm('createForm');
}

document.addEventListener('DOMContentLoaded', function () {
    const sidePanel = document.querySelector('.side-panel');
    const toggleButton = document.getElementById('toggleSidePanel');

    const sections = {
        home: ["Popular", "Best", "Explore", "New"],
        pre_production: ["Concept Development", "Budgeting", "Casting", "Location Scouting", "Scheduling", "Storyboarding", "Hiring Crew"],
        production: ["Shooting", "Direction", "Cinematography", "Sound Recording", "Production Design", "Makeup and Hair"],
        post_production: ["Editing", "Sound Design", "Visual Effects (VFX)", "Color Correction", "Music Scoring", "ADR", "Subtitles and Dubbing"],
        distribution: ["Marketing", "Film Festivals", "Premiere", "Release"],
        post_release: ["Audience Feedback", "Box Office Analysis", "Awards", "Home Media"],
    };

    const sectionButtons = {
        home: document.getElementById('home'),
        pre_production: document.getElementById('pre_production'),
        production: document.getElementById('production'),
        post_production: document.getElementById('post_production'),
        distribution: document.getElementById('distribution'),
        post_release: document.getElementById('post_release'),
    };

    function updateSidePanel(buttons_list) {
        const buttons = sidePanel.querySelectorAll('button');
        buttons.forEach(button => {
            if (button.getAttribute('data-flag') != 'all') {
                button.remove();
            }
        });

        buttons_list.forEach(item => {
            const flag_button = document.createElement('button');
            flag_button.classList.add('sort-button');
            flag_button.setAttribute('data-flag', 'new');
            flag_button.innerText = item;
            sidePanel.appendChild(flag_button);
        });
        if (!sidePanel.classList.toggle('open')) {
            sidePanel.classList.toggle('open');
            toggleButton.textContent = sidePanel.classList.contains('open') ? '✖' : '☰';
        }
    }

    Object.keys(sectionButtons).forEach(key => {
        sectionButtons[key].addEventListener('click', () => {
            updateSidePanel(sections[key]);
        });
    });

    toggleButton.addEventListener('click', function () {
        sidePanel.classList.toggle('open');
        toggleButton.textContent = sidePanel.classList.contains('open') ? '✖' : '☰';
    });
});

function main_DisplaySetup() {
    const display_setup = document.getElementById('display');
    if (display_setup.textContent === '☰') {
        display_setup.textContent = '+';
    } else {
        display_setup.textContent = '☰';
    }
}