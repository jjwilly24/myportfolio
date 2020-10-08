/*
// Login
const Login = document.querySelector('#login-form');
Login.addEventListener('submit', (e) =>{
e.preventDefault();

// get user info
const email = Login['log-email'].value;
const password = Login['log-password'].value;

auth.signInWithEmailAndPassword(email, password).then(cred =>{
    console.log(cred.user);
    Login.reset();
    location.replace("index.html");
})
})

*/