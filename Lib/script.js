$(document).ready(function(){

    // set the checkout figure
    if (localStorage.getItem('checkout') == null) 
    {  
        localStorage.setItem('checkout',0);
    }

    //Login 
    // check if user is logged in or logged out..
    var loggedin=localStorage.getItem('loggedIn'); 

    //Login/Logout Changes
    if(loggedin==1) 
    {
        //adds a class to the login icon so when its logged in it changes colour
        $("#loginIcon").addClass('iconChange');

        //shows dropdown menu
        $("#dropdownMenu").removeClass("d-none");
        $("#dropdownMenu").addClass("d-block");

        //checkout access
        $("#checkoutAc").attr("href","Checkout.html");
    }
    else
    {
        //Brings the login icon to its default state
        $("#loginIcon").removeClass('iconChange');

        //hides dropdown menu
        $("#dropdownMenu").addClass("d-none");
        $("#dropdownMenu").removeClass("d-block");

        //stops user from using checkout
        $("#checkoutAc").attr("href","#");
    }    

    //tells you to login to use checkout
    $("#checkoutAc").click(function(){
        if (loggedin!=1) 
        {
            alert("Log in to use checkout");
        }  
    }); 

    $('form[name="Login"]' ).submit(function( event ) 
    {
        var email=$('input[name="Email"]').val();
        var password =$('input[name="Enter Password"]').val();
        if (email=="johndoe@gmail.com" && password=="12345")  
        {   
            // successful login, user redirected to shop.html
            localStorage.setItem('loggedIn',1);    
            window.location.href = "Shop.html";  // redirect to shop page
        }
        else 
        {
            // login unsuccessful, error message appears
            localStorage.setItem('loggedIn',0);
            $("#loginER").addClass("d-block");
        }
        return false;
    });
    
    //logout user
    $("#logoutBut").click(function(){
        if (loggedin==1) 
        {
            // set the flag so that user is not logged in
            localStorage.setItem('loggedIn',0);
            window.location.href = "login.html";
        }  
        else 
        window.location.href = "login.html";
    }); 

    //Checkout
    //Checkout Num
     $("#checkout" ).html(localStorage.getItem('checkout'));

     // check if user is logged in or logged out..
     var loggedin=localStorage.getItem('loggedIn');
    
    //Add to cart Count
    $(".shopbut").click(function(){
        var total=localStorage.getItem('checkout');
        total++;
        localStorage.setItem('checkout',total);
        $("#checkout" ).html(total );
    });

    //checkout reset
    $('form[name="buy"]' ).submit(function( event ) 
    {
        
        // successful login, user redirected to shop.html
        localStorage.setItem('checkout',0);    
        window.location.href = "index.html";  // redirect to shop page
        return false;
    });

     

    //Data Validation
    if (localStorage.getItem('userdetails') === null) {  
        // if userdetails is null, that means it has not been loaded before. we not initialise userdetails object
        var userDetails = {firstName:"John", lastName:"Doe", dob:"1990-12-01",Street:"Down the Lane", Town:"On yon road", County:"Co. Leitrim"};
        // now we store the userdetails object as a localstorage object but localstore only stores text and userdetails is a javascript object
        // we convert a javascript object ot a string using JSON.stringify - we are being expedient!
        localStorage.setItem('userdetails',JSON.stringify(userDetails));
    } else {
        // if localstorage variable userdetails is already created - load it to javascript oject. JSON.parse turns it back into an javascript object
        userDetails=JSON.parse(localStorage.getItem('userdetails'));
    }

    // we only run this code if an id of udetails is on the html page we are currently on - makes the code a little bit more efficient
    // if the length > 0 it means we are on the right page - and we can populdate the form fields!!!
    if ($('#udetails').length > 0) {
        $('input[name="FirstName"]').val(userDetails.firstName);         
        $('input[name="LastName"]').val(userDetails.lastName);
        $('input[name="dob"]').val(userDetails.dob);
        $('input[name="Street"]').val(userDetails.address1);
        $('input[name="Town"]').val(userDetails.address2);
        $('input[name="County"]').val(userDetails.address3);
    }
}); 
