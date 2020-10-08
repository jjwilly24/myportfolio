//upload profile image
const shopImage = document.getElementById("shopImage");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

const imageName = "profile_image";
shopImage.addEventListener("change", function(e){
  //get image 
    const file = $(this).get(0).files;
    
    if(file){
      var user = firebase.auth().currentUser.uid;
      //path where image will be store
      var storageRef= firebase.storage().ref(user +'/storeProfileImage/'+imageName);
      //upload image to selected storage reference
      
      var uploadTask=storageRef.put(file[0]);
        //task progress
      uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("upload is"+ progress+"done");
      },function (error){
        //handle error
        console.log(error.message);
      },function(){
        //handle success
        uploadTask.snapshot.ref.getDownloadURL().then(function check(downloadURL){
          //get your upload image url here..
            console.log(downloadURL);
        });
      });
      //display image on screen for user
        const reader = new FileReader();
        
        previewDefaultText.style.display ="none";
        previewImage.style.display="block";
        
        reader.addEventListener("load", function(){
            previewImage.setAttribute("src",this.result);
        });
        reader.readAsDataURL(file[0]);
    }else{
        previewDefaultText.style.display =null;
        previewImage.style.display=null;
        previewImage.setAttribute("src","")
    }
});

