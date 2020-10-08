//listen for auth changes
auth.onAuthStateChanged(user =>{
if (user){
  console.log('user log in:',user);
}
else
{
  console.log('user log out')
}
});


// signup

const signupForm= document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
  e.preventDefault();

  //get user info
  const email = signupForm['txtEmail'].value;
  const password = signupForm['txtPassword'].value;
  const Firstname = signupForm['txtFirstName'].value;
  const Lastname = signupForm['txtLastName'].value;

  //sign up the user
  auth.createUserWithEmailAndPassword(email , password).then(cred => {
    signupForm.reset();
    location.replace("index.html");
    
  });


})

/*function saveNames( Firstname, Lastname){
var newSaveName = saveName.push();
newSaveName.set({
  Firstname:txtFirstName,
  Lastname:txtLastName
})
}*/

