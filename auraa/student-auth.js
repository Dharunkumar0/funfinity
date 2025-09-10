// Lightweight localStorage-based student auth and routing
// Keys
var STUDENT_PROFILE_KEY = 'studentProfile';

function getStudentProfile() {
    try {
        var raw = localStorage.getItem(STUDENT_PROFILE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function saveStudentProfile(profile) {
    localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
}

function isStudentSignedIn() {
    return !!getStudentProfile();
}

function goToGradeSelection() {
    window.location.href = 'grade.html';
}

function goToStudentLogin() {
    window.location.href = 'login.html';
}

function goToStudentSignup() {
    window.location.href = 'signup.html';
}

// Attach to signup form
(function(){
    var signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(ev){
            ev.preventDefault();
            var fullName = signupForm.querySelector('#full-name').value.trim();
            var institution = signupForm.querySelector('#institution').value.trim();
            var teacherName = signupForm.querySelector('#teacher-name').value.trim();
            var username = signupForm.querySelector('#username').value.trim();
            var email = signupForm.querySelector('#email').value.trim();
            var password = signupForm.querySelector('#password').value;
            var confirmPassword = signupForm.querySelector('#confirm-password').value;
            
            if (!fullName || !institution || !teacherName || !username || !email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            var profile = {
                fullName: fullName,
                institution: institution,
                teacherName: teacherName,
                username: username,
                email: email,
                password: password
            };
            
            saveStudentProfile(profile);
            goToGradeSelection();
        });
    }
})();

// Attach to login form
(function(){
    var loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(ev){
            ev.preventDefault();
            var institution = loginForm.querySelector('#institution').value.trim();
            var username = loginForm.querySelector('#username').value.trim();
            var password = loginForm.querySelector('#password').value;
            var profile = getStudentProfile();
            
            if (profile && profile.institution === institution && profile.username === username && profile.password === password) {
                goToGradeSelection();
            } else {
                var errorDiv = loginForm.querySelector('.error-message');
                if (errorDiv) {
                    errorDiv.textContent = 'Invalid credentials. Please check your details.';
                    errorDiv.style.display = 'block';
                } else {
                    alert('Invalid credentials. Please check your institution, username, and password.');
                }
            }
        });
    }
})();

// Hook Start Learning buttons where present
(function(){
    var studentButtons = document.querySelectorAll('.start-learning, #go-student, [data-nav="student"]');
    if (studentButtons.length) {
        studentButtons.forEach(function(btn){
            btn.addEventListener('click', function(){
                if (isStudentSignedIn()) { 
                    goToGradeSelection(); 
                } else { 
                    goToStudentLogin(); 
                }
            });
        });
    }
})();
