
//listen for auth changes
auth.onAuthStateChanged(user =>{
    if (user){
      notificationMsg();
      sessionStorage.setItem("sender", user.uid);
      $("#logOff").empty();
      document.getElementById("logOn").style.display = "block";
      //get data
db.collection('users').doc(user.uid).get().then(doc =>{
  chooseName(doc);
});
    }
    else
    {
      
      if ( document.URL.includes("index.html") ) {
        $("#logOn").empty();
        document.getElementById("logOff").style.display = "block";
        setTimeout(defaultName, 1000);
        localStorage.removeItem("sender");
    }else{  
      $("#logOn").empty();
        document.getElementById("logOff").style.display = "block";
    setTimeout(defaultMinor, 1000);
    localStorage.removeItem("sender");}
    }
    });


    //setup seller store
function openShop(){
  var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    return (dd+sp+mm+sp+yyyy);
    };
  auth.onAuthStateChanged(user =>{
    if (user){
      //get data
      const createForm = document.querySelector('#SellerStore')   
      createForm.addEventListener('submit',(e)=>{
        
        const number =100;
        const tally = 0;
        

        e.preventDefault();
        db.collection('feedback').doc(user.uid).set({
          feedback_Percentage: number,
          overall_Feedback:tally,
          total_positive: tally,
          total_negative:tally
        })
        
        db.collection('sellerStore').doc(user.uid).set({
          storeName: createForm['storeName'].value,
          storeDescription: createForm['StoreDescription'].value,
          sellerUid: user.uid,
          //time of signing up for being a emerc seller
          date_store_created: curday('/')
        }).then(()=>{
          //open shop
          setTimeout(createForm.reset,1000);
          window.location.href="sellerStore.html";
        })
      }) 
    }
    else
    {
      window.location.href="Signup.html";
    }
    });
}
    // signup
    function signup(){
      var curday = function(sp){
        today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //As January is 0.
        var yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (dd+sp+mm+sp+yyyy);
        };
    const signupForm= document.querySelector('#signup-form');
    signupForm.addEventListener('submit',(e) => {
      e.preventDefault();
    
      //get user info
      const email = signupForm['txtEmail'].value;
      const password = signupForm['txtPassword'].value;
    
      //sign up the user
      auth.createUserWithEmailAndPassword(email , password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
          Firstname : signupForm['txtFirstName'].value,
          lastname : signupForm['txtLastName'].value,
          date_member_signup: curday('/'),
          email:email,
          uid:cred.user.uid,
          photoURL:""
        }).then(()=>{ //relocate after signup
          if ( document.URL.includes("Signup.html") ) {
            location.replace("index.html");
            setTimeout(signupForm.reset, 1000);
        }else{closeForm();
          location.reload();}
        })
      }).catch(function(error) {
        // Handle Errors here.
       var incorrect =document.getElementById('emailExist')
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          incorrect.setAttribute("style", "display: block;");
          incorrect.setAttribute("style", "color: red;");
        } else {
          alert(errorMessage);
        }
        console.log(error);
      })
    })
  }
    //Login
function login(){
const Login = document.querySelector('#login-form');
Login.addEventListener('submit', (e) =>{
e.preventDefault();

// get user info
const email = Login['log-email'].value;
const password = Login['log-password'].value;

auth.signInWithEmailAndPassword(email, password).then(cred =>{
  if ( document.URL.includes("login.html") ) {
    location.replace("index.html");
    setTimeout(Login.reset, 1000);
}else{closeForm();
  location.reload();}
}).catch(function(error) {
  // Handle Errors here.
 var incorrect =document.getElementById('incorrect_Entry')
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    incorrect.setAttribute("style", "display: block;");
    incorrect.setAttribute("style", "color: red;");
  } else {
    alert(errorMessage);
  }
  console.log(error);
});
})
}
// logout
function logout(){
  auth.signOut().then(() =>{
    location.replace("index.html");
  });
}

//signin and signup pages
function signinPages(){
  window.location.href="login.html";
}
function signupPages(){
  window.location.href="Signup.html";
} 

//sellerstore
function sellerStore(otherUser){//userUid
  auth.onAuthStateChanged(user =>{
    if (user == otherUser || otherUser==null ){
      db.collection('feedback').doc(user.uid).get().then(doc =>{
        sellerFeedback(doc);
      });
      db.collection('feedback').doc(user.uid).collection('positiveComment').get().then(doc =>{
        getPosComment(doc);
      });
      db.collection('feedback').doc(user.uid).collection('negativeComment').get().then(doc =>{
        getNegComment(doc);
      });
db.collection('sellerStore').doc(user.uid).get().then(doc =>{
        sellerShop(doc);
        showimage();
      });
    }else{
      displaySellerContact(otherUser);
  db.collection('sellerStore').doc(otherUser).get().then(doc =>{
    sellerShopDefault(doc);
    showimageDefault();
  });
  db.collection('feedback').doc(otherUser).get().then(doc =>{
    sellerFeedback(doc);
  });
  db.collection('feedback').doc(otherUser).collection('positiveComment').get().then(doc =>{
    getPosComment(doc);
  });
  db.collection('feedback').doc(otherUser).collection('negativeComment').get().then(doc =>{
    getNegComment(doc);
  });
    }

    });
}


//validate if user have access to the sellerstore
function verify(){
  auth.onAuthStateChanged(user =>{
    if (user){
      db.collection('sellerStore').doc(user.uid).get().then(doc =>{
        if(doc.exists){
        window.location.href="sellerStore.html";
        }
        else{
          window.location.href="setupShop.html";
        }
      });
        }
        else{
          openForm();
        }
      });
    }
//close forms
function openForm() {
  document.getElementById("mySignup").style.display = "none";
  document.getElementById("myForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
        
function openForm2() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("mySignup").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}
 
function closeForm2() {
  document.getElementById("mySignup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function on(){
  document.getElementById("sellerFeedback").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("sellerFeedback").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("positiveComment").style.display = "none";
  document.getElementById("negativeComment").style.display = "none";
}
function openPosComment(){
  document.getElementById("positiveComment").style.display = "block";
  document.getElementById("sellerFeedback").style.display = "none";
}

function openNegComment(){
  document.getElementById("negativeComment").style.display = "block";
  document.getElementById("sellerFeedback").style.display = "none";
}

//submit positive comment
function submitPosFeedback(){
    var curday = function(sp){
      today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //As January is 0.
      var yyyy = today.getFullYear();
      
      if(dd<10) dd='0'+dd;
      if(mm<10) mm='0'+mm;
      return (dd+sp+mm+sp+yyyy);
      };
    var otherUser= "HBHsy10gPKcCiSzIpIXu30xItF23";
    //sub collection with individual comment
    docRef= db.collection('feedback').doc(otherUser);
    console.log(docRef);
    docRef.update({
      total_positive: firebase.firestore.FieldValue.increment(1),
      overall_Feedback: firebase.firestore.FieldValue.increment(1)
    })

           //get data
      const createForm = document.querySelector('#positive')  
      //buyer name
      const name="nicole" 
      createForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        db.collection('feedback').doc(otherUser).collection('positiveComment').add({
         // feedback_Percentage: currentFeedback,
          positive_Feedback: createForm['sellerPosFeedback'].value,
          date_comment_made: curday('/'),
          buyerName:name
        }).then(()=>{
          //open shop
          createForm.reset();
          document.getElementById("overlay").style.display = "none";
          document.getElementById("positiveComment").style.display = "none";
          document.getElementById("negativeComment").style.display = "none";
          swal("feedback submitted", "success");
          //call function to calculate percentage feedback
          getData(otherUser);
        })
      }) 
}
function getData(otherUser){
    //get data
db.collection('feedback').doc(otherUser).get().then(doc =>{
calculate(doc, otherUser);
});
}

  calculate =(doc, otherUser)=>{
      const cal= doc.data();
      var value1 = cal.total_positive;
      var value2 = cal.total_negative;
      var value3 = cal.overall_Feedback;
      var per = (value1 - value2);
      var percent = (per /value3)*100;
      var num = parseFloat(percent).toFixed(1);
      addUpdate(num,otherUser);
    }


addUpdate =(num, otherUser)=>{
  const number =num;
  docRef= db.collection('feedback').doc(otherUser);
  docRef.update({
    feedback_Percentage: number
  })
}


    //submit negative comment
    function submitNegFeedback(){
      var otherUser= "HBHsy10gPKcCiSzIpIXu30xItF23";
      var curday = function(sp){
        today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //As January is 0.
        var yyyy = today.getFullYear();
        
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        return (dd+sp+mm+sp+yyyy);
        };
      //sub collection with individual comment
      docRef= db.collection('feedback').doc(otherUser);
      docRef.update({
        total_negative: firebase.firestore.FieldValue.increment(1),
        overall_Feedback: firebase.firestore.FieldValue.increment(1)
      })
  
             //get data
        const createForm = document.querySelector('#negative')  
        //buyer name
        const name="nicole" 
        createForm.addEventListener('submit',(e)=>{
          e.preventDefault();
          db.collection('feedback').doc(otherUser).collection('negativeComment').add({
           // feedback_Percentage: currentFeedback,
            negative_Feedback: createForm['sellerNegFeedback'].value,
            date_comment_made: curday('/'),
            buyerName:name
          }).then(()=>{
            //open shop
            createForm.reset();
            document.getElementById("overlay").style.display = "none";
            document.getElementById("positiveComment").style.display = "none";
            document.getElementById("negativeComment").style.display = "none";
            swal("feedback submitted", "success");
            //call function to calculate percentage feedback
            getData(otherUser);
          })
        }) 
    }

//notification
function notificationMsg(){

        var Id=sessionStorage.getItem("sender");
        db.collectionGroup("messages").where('recieverId', "==", Id).where('status', "==", null)
        .onSnapshot(snapshot =>{
           var count= snapshot.docs.length;
           document.getElementById("badgeMsg").textContent=count;
        })
}

