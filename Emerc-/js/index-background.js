
      
     //choose user firstname and lastname
chooseName =(doc)=>{
    let html= "";
        const name= doc.data();
        $(".dropbtn").append("Hello"+"&nbsp <strong>"+name.Firstname+"</strong>"+"&nbsp<i class='fa fa-caret-down'></i>"
        );
        $(".userName").append("<li >"+name.Firstname+"&nbsp"+name.lastname+"</li>",
        "<li >Account setting</li>",
        "<li onclick='logout()'id='logOut'>"+"Sign out"+"</li>",
        );

}




defaultName =(data)=>{
    let html= "";
    $(".dropbtn").append("Hello <strong>guest</strong>&nbsp<i class='fa fa-caret-down'></i>");
    $(".userName").append(
    "<li onclick='signinPages()'id='signin'>"+"Sign in"+"</li>",
    "<li onclick='signupPages()'id='signup'>Become a member</li>",
    );
}