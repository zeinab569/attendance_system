window.addEventListener('load',function () {
   
    login = document.getElementById('loginbtn');
    username = document.getElementById('user_name')
    the_pass = document.getElementById('password')
    
    usernameerror = document.getElementById('user_name_error')
    passerror = document.getElementById('password_error')
    if(login){
        
        login.addEventListener('click',async function(e) {
           
            e.preventDefault();
            let user = await fetch(`http://localhost:3000/theusers?user_name=${username.value}`)
            let user_Row = await user.json();

            if ( username.value.length > 0 && the_pass.value.length > 0)
            {   // have local data
                if(user_Row.length > 0)
                {
                    if(user_Row[0].password != the_pass.value)
                    {
                       
                        alert("you entered wrong password")
                        setTimeout("location.reload()",4000)
                    }
                    else{
                        setTimeout("location.href = '../home.html';",2000);   
                    }
                }
                
                else
                {
                    alert("Wrong User Name, User Name Does Not Exist")
                    setTimeout("location.reload()",3000)
                }
            }
            else
            {
                
               alert("Empty data, You should Enter User Name and Password")
                setTimeout("location.reload()",3000)
            }                                
        }) 
   
       
    }   
})



