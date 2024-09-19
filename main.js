function showForm(formId) {
    document.getElementById(formId).style.display = 'block'
}

function closeForm(formId) {
    document.getElementById(formId).style.display = 'none'
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

document.getElementById('loginFormContent').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Login Attempt')
})

document.getElementById('signUpFormContent').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Sign up Attempt')
})

document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('forgot Attempt')
})

document.getElementById('createFormContent').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('create project form Attempt')
})

function login_openForm() {
    showForm('loginForm')
}

function create_openForm() {
    showForm('createForm')
}