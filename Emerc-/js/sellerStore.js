//display seller store info when log in
const storeName= document.querySelector('.sellerName');
const shopImage = document.getElementById("profilePic");
//setupshop
const sellerShop =(doc)=>{
    let html= "";
       const name= doc.data();
       shopImage.setAttribute("src",name.imagePath);
        $(".sellerName").append("<p>"+ name.storeName +"</p>"
        );
        $(".Seller-info").append("<p>"+ name.storeName +"</p>",
        "<p >"+name.storeDescription+"</p>"
        ); 
        $(".sellerSince").append("Seller since:"+ name.date_store_created
        );    
}
const sellerFeedback =(doc)=>{
  let html= "";
const percentage= doc.data();
 $(".sellerFeedback").append("Seller feedback:"+percentage.feedback_Percentage +"%");
 $(".overalFeedbackPer").append("<p style='display: inline-block;color: green'>"+"Positive feedbacks&nbsp("+percentage.total_positive+")</p>&nbsp;&nbsp;<p style='display: inline-block;color: red'>Negative feedbacks&nbsp("+percentage.total_negative+")</p>",
 );
    }
function showimage() {
    var user = firebase.auth().currentUser.uid;
    const imageName = "profile_image";
    var storageRef = firebase.storage().ref();
    //var spaceRef = storageRef.child(user +'/storeProfileImage/'+ profile_image);
    storageRef.child(user +'/storeProfileImage/'+ imageName).getDownloadURL().then(function(url) {
  var img = document.getElementById('profilePic');
  img.src = url;

    }).catch(function(error) {

    });
}
//default display
function showimageDefault() {
  var user = "HBHsy10gPKcCiSzIpIXu30xItF23";
  const imageName = "profile_image";
  var storageRef = firebase.storage().ref();
  //var spaceRef = storageRef.child(user +'/storeProfileImage/'+ profile_image);
  storageRef.child(user +'/storeProfileImage/'+ imageName).getDownloadURL().then(function(url) {
var img = document.getElementById('profilePic');
img.src = url;

  }).catch(function(error) {

  });
}

const sellerShopDefault =(doc)=>{
  let html= "";
     const name= doc.data();
     shopImage.setAttribute("src",name.imagePath);
      $(".sellerName").append("<p>"+ name.storeName +"</p>"
      );
      $(".Seller-info").append("<p>"+ name.storeName +"</p>",
      
      "<p >"+name.storeDescription+"</p>"
      ); 
      $(".sellerSince").append("Seller since:&nbsp;"+ name.date_store_created
        );    
}

const displaySellerContact =(otherUser)=>{
  var refId='';
  refId = otherUser;
  
  document.getElementById("combine").onclick = function() {
    auth.onAuthStateChanged(user =>{
      if(user){
      var currentUserId =user.uid;
      sessionStorage.setItem("reciever", refId);
      sessionStorage.setItem("sender", currentUserId);
      window.location.href="chat.html";}
      else{
        openForm().then(()=>{
      var currentUserId =user.uid;
      sessionStorage.setItem("reciever", refId);
      sessionStorage.setItem("sender", currentUserId);
      window.location.href="chat.html";
        });
      }
    })
  }
    
  //addEventListener("click", myFunction(otherUser))
};


/*display comments*/
const getPosComment =(data)=>{
  let html= "";
/*Positive*/
    data.forEach(doc =>{
        const comment= doc.data();
        $(".displayPos").append("<tr>",
          "<td style='border-bottom: 1px solid #ddd;' >"+comment.positive_Feedback+"</td>",
          "<td style='border-bottom: 1px solid #ddd;'  >"+comment.buyerName+"</td>",
          "<td style='border-bottom: 1px solid #ddd;' >"+comment.date_comment_made+"</td>",
          "<tr>"
        );
    });
}

/*Negative */
const getNegComment =(data)=>{
  let html= "";
  data.forEach(doc =>{
    const comment= doc.data();
    $(".displayNeg").append("<tr>",
    "<td style='border-bottom: 1px solid #ddd;' >"+comment.negative_Feedback+"</td>",
    "<td style='border-bottom: 1px solid #ddd;'  >"+comment.buyerName+"</td>",
    "<td style='border-bottom: 1px solid #ddd;' >"+comment.date_comment_made+"</td>",
    "<tr>"
  );
});
}


function openComment() {
  document.getElementById("displayComments").style.display = "block";
  document.getElementById("closeCom").style.display = "block";
  document.getElementById("openCom").style.display = "none";
}
function closeComment() {
  document.getElementById("displayComments").style.display = "none";
  document.getElementById("closeCom").style.display = "none";
  document.getElementById("openCom").style.display = "block";
}
        
function displayPositive() {
  document.getElementById("displayNegativeComment").style.display = "none";
  document.getElementById("displayPositiveComment").style.display = "block";
 document.getElementById("positiveBtn").style.backgroundColor  = 'green';
 document.getElementById("negativeBtn").style.backgroundColor  = 'white';
 document.getElementById("negativeBtn").style.color  = 'black';
 document.getElementById("positiveBtn").style.color  = 'white';
}
function displayNegative(){
    document.getElementById("displayPositiveComment").style.display = "none";
  document.getElementById("displayNegativeComment").style.display = "block";
  document.getElementById("negativeBtn").style.backgroundColor  = 'red';
   document.getElementById("positiveBtn").style.backgroundColor  = 'white';
     document.getElementById("negativeBtn").style.color  = 'white';
 document.getElementById("positiveBtn").style.color  = 'black';
}