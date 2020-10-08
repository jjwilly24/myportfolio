//display user name when log in
displayName= document.querySelector('.userName');


//choose user firstname and lastname
chooseName =(doc)=>{
   
    let html= "";
        const name= doc.data();
        $(".dropbtn").append("Hello"+"&nbsp <strong>"+name.Firstname+"</strong>"+"&nbsp<i class='fa fa-caret-down'></i>"
        );
        $(".userName").append("<li id='logon' >"+name.Firstname+"&nbsp"+name.lastname+"</li>",
        "<li >Account setting</li>",
        "<li onclick='logout()'id='logOut'>"+"Sign out"+"</li>",
        );

}
/*const chooseName =(data)=>{
    let html= "";
    data.forEach(doc =>{
        const name= doc.data();
        $(".userName").append("<li >"+name.Firstname+"&nbsp"+name.lastname+"</li>",
        "<li >Account setting</li>",
        "<li onclick='logout()'id='logOut'>"+"Sign out"+"</li>"
        );
    });
}*/
defaultMinor=(data)=>{
   
    let html= "";
    $(".dropbtn").append("Hello <strong>guest</strong>&nbsp<i class='fa fa-caret-down'></i>");
    $(".userName").append(
    "<li onclick='openForm()'id='signin'>"+"Sign in"+"</li>",
    "<li onclick='openForm2()'id='signup'>Become a member</li>",
    );
}

/*    
      <a onclick="logout()" id="logOut" href="#">Sign in</a>
      <a href="#">Become a member</a>*/