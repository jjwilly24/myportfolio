//choose user firstname and lastname
selectedUser =(doc)=>{
   
    let html= "";
       // const name= doc.data();
       $(".sellerdetails").append(
        "<h4 >Seller information</h4>",
        "<p class='storeName' style='color: #04ADF3'>Electronics retail</p>",
        "<p class='feedback' style='color:#04ADF3;'>Positive feedback:100%</p>",
        "<img class='rating' style='width: 70px; height: 20px;padding-bottom: 5px;' src='pictures/IMG_7942.JPG' /><br>",
        "<a class='contactSeller' href='#' style='font-size: 14px;color:#04ADF3;background-color: #FDFDFE'>Contact seller</a>",
        "<a class='sellerStore' href='sellerStore.html' style='font-size: 14px;color:#04ADF3;background-color: #FDFDFE'>Seller store</a>"
        );
        $(".detailrow").append(
        "<p style='font-size: 20px' >Seller information:</p>",
        "<p class='storeName' style='font-size: 14px'>Electronics retail</p>",
        "<p class='feedback' style='font-size: 14px'>Positive feedback:100%</p>",
        "<img class='rating' style='width: 70px; height: 20px;padding-bottom: 5px;' src='pictures/IMG_7942.JPG'/><br>",
        "<a class='contactSeller' href='#' style='font-size: 14px;color:#04ADF3;background-color: #FDFDFE'>Contact seller</a>",
        "<a class='sellerStore' href='#'style='font-size: 14px;color:#04ADF3;background-color: #FDFDFE'>yeah store</a>"
        );
        $(".sellerInfo").append(
            "<a class='contactSeller' href='#' style='font-size: 1vw;color:#86A3A8;background-color: #FDFDFE;float: right'>Contact seller</a>",
            "<a class='sellerStore' href='sellerStore.html'style='font-size: 1vw;color:#86A3A8;background-color: #FDFDFE;float: right'>Seller store</a>",
            "<p class='storeName' style='text-align: left'>Seller:<a style='color: #86A3A8;font-size: 1vw;'>Electronics retail</a></p>",
            "<p class='feedback' style='text-align: leftt'>Positive feedback:<a style='color: #86A3A8;font-size: 12px;'>100%</a></p>",
            );
}


    
    
    
    
    



         
         
         
         