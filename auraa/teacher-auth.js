// Lightweight localStorage-based teacher auth and routing
// Keys
var TEACHER_PROFILE_KEY = 'teacherProfile';

function getTeacherProfile() {
    try {
        var raw = localStorage.getItem(TEACHER_PROFILE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        return null;
    }
}

function saveTeacherProfile(profile) {
    localStorage.setItem(TEACHER_PROFILE_KEY, JSON.stringify(profile));
}

function isTeacherSignedIn() {
    return !!getTeacherProfile();
}

function goToDashboard() {
    window.location.href = 'teacher-dashboard-responsive.html';
}

function goToTeacherLogin() {
    window.location.href = 'teacher-login.html';
}

// Attach to signup form
(function(){
    var signupForm = document.querySelector('#teacher-signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(ev){
            ev.preventDefault();
            var name = signupForm.querySelector('[name="name"]').value.trim();
            var institution = signupForm.querySelector('[name="institution"]').value.trim();
            var email = signupForm.querySelector('[name="email"]').value.trim();
            var password = signupForm.querySelector('[name="password"]').value;
            if (!name || !institution || !email || !password) return;
            saveTeacherProfile({ name: name, institution: institution, email: email, password: password });
            goToDashboard();
        });
    }
})();

// Attach to login form
(function(){
    var loginForm = document.querySelector('#teacher-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(ev){
            ev.preventDefault();
            var name = loginForm.querySelector('[name="name"]').value.trim();
            var institution = loginForm.querySelector('[name="institution"]').value.trim();
            var email = loginForm.querySelector('[name="email"]').value.trim();
            var password = loginForm.querySelector('[name="password"]').value;
            var profile = getTeacherProfile();
            if (profile && profile.email === email && profile.password === password && profile.name === name && profile.institution === institution) {
                goToDashboard();
            } else {
                var err = loginForm.querySelector('.error-message');
                if (err) { err.textContent = 'Invalid credentials. Please check your details.'; err.style.display = 'block'; }
                else {
                    alert('Invalid credentials.');
                }
            }
        });
    }
})();

// Hook Teacher View buttons where present
(function(){
    var teacherButtons = document.querySelectorAll('.teacher-view, #go-teacher, [data-nav="teacher"]');
    if (teacherButtons.length) {
        teacherButtons.forEach(function(btn){
            btn.addEventListener('click', function(){
                if (isTeacherSignedIn()) { goToDashboard(); } else { goToTeacherLogin(); }
            });
        });
    }
})();

// Note: Student routing is now handled by student-auth.js


