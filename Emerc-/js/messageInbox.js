function iniateMessage(){
    RecievedMessage();
    sendMessage();
}

//setup seller store
function RecievedMessage(){
        //get data
        let removed ="removed"
        var Id=sessionStorage.getItem("sender");
        db.collectionGroup("messages").where('recieverId', "==", Id).orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>{
          let changes = snapshot.docChanges();
          changes.forEach(change => {
            const chat= change.doc.data();
            if(chat.deleted !==Id  ){
              if(chat.deleted !== removed){
                if(chat.status === null){
                  var ts =  chat.timestamp;
                  time =  ts.toDate();
                  $(".displayRec").append("<tr>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;cursor: pointer;background-color:#F4F8F8' ><input onclick='delRec()' type='checkbox' id='checkDel'"+"value='"+chat.senderId+"' /></td>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;background-color:#F4F8F8'><p style='font-weight: bold;'name='messagePtags' class='messagePtags'+ onclick="+"setSession('"+chat.senderId+"')"+">"+chat.sendername+"</p></td>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;background-color:#F4F8F8'><p style='font-weight: bold;' name='messagePtags' class='messagePtags' onclick="+"setSession('"+chat.senderId+"')"+">"+chat.text+"</p></td>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;text-align:right;background-color:#F4F8F8'><p style='font-weight: bold;' name='messagePtags' class='messagePtags' onclick="+"setSession('"+chat.senderId+"')"+">"+time.toLocaleString()+"</p></td>",
                  "<tr>"
                  );
                }
                else{
                  var ts =  chat.timestamp;
                  time =  ts.toDate();
                  $(".displayRec").append("<tr>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;cursor: pointer;' ><input onclick='delRec()' type='checkbox' id='checkDel'"+"value='"+chat.senderId+"' /></td>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;'><p name='messagePtags' class='messagePtags'+ onclick="+"setSession('"+chat.senderId+"')"+">"+chat.sendername+"</p></td>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;'><p name='messagePtags' class='messagePtags' onclick="+"setSession('"+chat.senderId+"')"+">"+chat.text+"</p></td>",
                  "<td name='fixTd' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;text-align:right'><p name='messagePtags' class='messagePtags' onclick="+"setSession('"+chat.senderId+"')"+">"+time.toLocaleString()+"</p></td>",
                  "<tr>"
                  );
                }
          }
        }else{
         var id= change.doc.id
         for (var i = 0; i < 4; i++) {
          var tr = document.getElementById(id);
          // If an element for that message exists we delete it.
          if (tr) {
            tr.parentNode.removeChild(tr)[i];
          }
        }
        }
        });
        })
       // setTimeout(unreadRecMsg, 5000);
  }
  // deal with send messages
  function sendMessage(){
        //get data
        let removed ="removed"
        var Id=sessionStorage.getItem("sender");
        db.collectionGroup("messages").where('senderId', "==", Id).orderBy('timestamp', 'desc')
        .onSnapshot(snapshot =>{
          let changes = snapshot.docChanges();
          changes.forEach(change => {
            const chat= change.doc.data();
            if(chat.deleted !==Id  ){
              if(chat.deleted !== removed){
            var ts =  chat.timestamp;
            time =  ts.toDate();
            $(".displaySend").append("<tr>",
            "<td name='fixTdSend' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;cursor: pointer;' ><input onclick='delSend()' type='checkbox' id='checkDel'"+"value='"+chat.recieverId+"' /></td>",
            "<td name='fixTdSend' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;'><p name='messagePtagsSend' class='messagePtags' onclick="+"setSession('"+chat.recieverId+"')"+">To:"+chat.recievername+"</p></td>",
            "<td name='fixTdSend' class='fixTd' id='"+change.doc.id+"'style='border-bottom: 1px solid #ddd;'><p name='messagePtagsSend' class='messagePtags' onclick="+"setSession('"+chat.recieverId+"')"+">"+chat.text+"</p></td>",
            "<td name='fixTdSend' class='fixTd' id='"+change.doc.id+"' style='border-bottom: 1px solid #ddd;text-align:right'><p name='messagePtagsSend' class='messagePtags' onclick="+"setSession('"+chat.recieverId+"')"+">"+time.toLocaleString()+"</p></td>",
            "<tr>"
            );}
        }else{
         var id= change.doc.id
         for (var i = 0; i < 4; i++) {
          var tr = document.getElementById(id);
          // If an element for that message exists we delete it.
          if (tr) {
            tr.parentNode.removeChild(tr)[i];
          }
        }
        }
        });
        })
      //  setTimeout(unreadSendMsg, 5000);
  }


  //set id base on state
  function setSession(sender){
      var currentSender=""
      var currentReciever=""
    auth.onAuthStateChanged(user =>{
    currentSender= user.uid;
    currentReciever= sender;
    sessionStorage.setItem("reciever", currentReciever);
    sessionStorage.setItem("sender", currentSender);

      window.location.href = "chat.html"; 
    });
  }
//delete send messages
  function deleteSendMsg(){
swal({
    title: "Are you sure?",
    text: "Once deleted, all messages send to this user will be erase!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {

//Reference the Table.

var tbl = document.getElementById("displaySend");
//Reference all the CheckBoxes in Table.
var chks = tbl.getElementsByTagName("INPUT");


// Loop through the checked CheckBox value .
for (var i = 0; i < chks.length; i++) {
    if (chks[i].checked) {
        var user2=chks[i].value;
     var user1 = sessionStorage.getItem("sender");
        var jobskill_query = db.collectionGroup('messages').where('senderId','==',user1).where('recieverId', "==", user2);
        jobskill_query.get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            const chat= doc.data();
            if(chat.deleted !==null){
              //doc.ref.delete();
              secondSendDeleted(user2);
            }
            else{FirstSendDeleted(user2);}
          });
        });
    }
}
      swal("Your messages has been deleted!", {
        icon: "success",
      })
    } else {
      
    }
  });
}
function FirstSendDeleted(user2){
  var user1 = sessionStorage.getItem("sender");
 db.collectionGroup('messages').where('senderId','==',user1).where('recieverId', "==", user2).where('deleted', "==", null).get()
.then(querySnapshot => {
  for (var i = 0; i < querySnapshot.docs.length; i++) {
    const snapshot = querySnapshot.docs[i]  // loop through documents if there more than one
    const documentRef = snapshot.ref  // now you have a DocumentReference
      //  ... use your DocumentReference ...
      documentRef.update({
        deleted: user1
      })
    }
})
}
function secondSendDeleted(user2){
  var user1 = sessionStorage.getItem("sender");
  var removed="removed";
 db.collectionGroup('messages').where('senderId','==',user1).where('recieverId', "==", user2).where('deleted', "==", user2).get()
.then(querySnapshot => {
  for (var i = 0; i < querySnapshot.docs.length; i++) {
    const snapshot = querySnapshot.docs[i]  // loop through documents if there more than one
    const documentRef = snapshot.ref  // now you have a DocumentReference
      //  ... use your DocumentReference ...
      documentRef.update({
        deleted: removed
      })
    }
})
}

function delRec() {
  var tblRec = document.getElementById("displayRec");
//Reference all the CheckBoxes in Table.
var chks = tblRec.getElementsByTagName("INPUT");


// Loop through the checked CheckBox value .
for (var i = 0; i < chks.length; i++) {
  var binRec = document.getElementById("binRec");
    if (chks[i].checked==true ) {
      binRec.style.display = 'block';
      break;
    } else {
       binRec.style.display = "none";
    }
  }
    
}

function delSend() {
  var tblRec = document.getElementById("displaySend");
//Reference all the CheckBoxes in Table.
var chks = tblRec.getElementsByTagName("INPUT");


// Loop through the checked CheckBox value .
for (var i = 0; i < chks.length; i++) {
  var binSend = document.getElementById("binSend");
    if (chks[i].checked==true ) {
      binSend.style.display = 'block';
      break;
    } else {
       binSend.style.display = "none";
    }
  }
    
}

//delete recieve messages
function deleteRecMsg(){
  swal({
      title: "Are you sure?",
      text: "Once deleted, all messages recieved from this user will be deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
  
  //Reference the Table.
  
  var tbl = document.getElementById("displayRec");
  //Reference all the CheckBoxes in Table.
  var chks = tbl.getElementsByTagName("INPUT");
  //start here
  console.log(chks)
  
  // Loop through the checked CheckBox value .
  for (var i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
          var user2=chks[i].value;
       var user1 = sessionStorage.getItem("sender");
          var jobskill_query = db.collectionGroup('').where('recieverId','==',user1).where('senderId', "==", user2);
          jobskill_query.get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              const chat= doc.data();
              if(chat.deleted !=null){
               // doc.ref.delete();
               secondRecDeleted(user2)
              }
              else{FirstRecDeleted(user2);}
            });
          });
      }
  }
        swal("Your messages has been deleted!", {
          icon: "success",
        })
        
      } else {
        
      }
    });
  }
  function FirstRecDeleted(user2){
    var user1 = sessionStorage.getItem("sender");
   db.collectionGroup('messages').where('recieverId','==',user1).where('senderId', "==", user2).where('deleted', "==", null).get()
  .then(querySnapshot => {
    for (var i = 0; i < querySnapshot.docs.length; i++) {
      const snapshot = querySnapshot.docs[i]  // loop through documents if there more than one
      const documentRef = snapshot.ref  // now you have a DocumentReference
        //  ... use your DocumentReference ...
        documentRef.update({
          deleted: user1
        })
      }
  })
  }

  function secondRecDeleted(user2){
    var removed="removed";
    var user1 = sessionStorage.getItem("sender");
   db.collectionGroup('messages').where('recieverId','==',user1).where('senderId', "==", user2).where('deleted', "==", user2).get()
  .then(querySnapshot => {
    for (var i = 0; i < querySnapshot.docs.length; i++) {
      const snapshot = querySnapshot.docs[i]  // loop through documents if there more than one
      const documentRef = snapshot.ref  // now you have a DocumentReference
        //  ... use your DocumentReference ...
        documentRef.update({
          deleted: removed
        })
      }
  })
  
  }
  
// function unreadRecMsg() {
//   //recieve msg
//   var unread = "unread"
//   var Id = sessionStorage.getItem("sender");
//   var tbl = document.getElementById("displayRec");
//   //Reference all the td in Table.
//   var pTag = tbl.getElementsByTagName("P");
//   var tdTag = tbl.getElementsByTagName("TD");
//   // Loop through the checked CheckBox value .
//   for (var i = 0; i < pTag.length; i++) {

//     document.getElementsByName("messagePtags")[i].style.fontWeight = 'bold';
//   }
//   for (var i = 0; i < tdTag.length; i++) {

//     document.getElementsByName("fixTd")[i].style.backgroundColor = "#F4F8F8";
//   }

// }

// function unreadSendMsg() {
//   //send msg
//   var tbl = document.getElementById("displaySend");
//   //Reference all the td in Table.
//   var pTag = tbl.getElementsByTagName("P");
//   var tdTag = tbl.getElementsByTagName("TD");
//   // Loop through the checked CheckBox value .
//   console.log(pTag.length)
//   console.log(tdTag.length);
//   for (var i = 0; i < 36; i++) {

//     document.getElementsByName("messagePtagsSend")[i].style.fontWeight = 'bold';
//   }
//   for (var i = 0; i < 48; i++) {


//     document.getElementsByName("fixTdSend")[i].style.backgroundColor = "#F4F8F8";
//   }
// }