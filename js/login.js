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
                        show_div();
                        check_data(" you entered wrong password ");
                        // relode after 3 seconds
                        setTimeout("location.reload()",4000)
                    }
                    else
                    {   // if already logined redirect to take attendance 
                        let employee = await fetch(`http://localhost:3000/employee?user_name=${username.value}`)
                        let employee_Row = await employee.json();
                        
                        if(employee_Row.length > 0)
                        {
                            if(employee_Row[employee_Row.length-1].day == new Date().toISOString().slice(0, 10) )
                            {
                                //redirect to this page 
                                setTimeout(function(){location.href='./home.html'} , 2000);   
                               
                            }
                         // else login first then confirm attendance
                            else
                            {
                                let the_data = {
                                    "fullName": user_Row[0].fname+' '+user_Row[0].lname, 
                                    "login_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                                    "day": new Date().toISOString().slice(0, 10) }  //"2023-01-10T02:00:00Z"   
                                
                                await fetch('http://localhost:3000/employee', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(the_data),
                                    })
                                    setTimeout(function(){location.href='./home.html'} , 2000);
                               
                            }
                        } 
                        else
                        // login first  not logiend 
                        {
                            let the_data = {
                                "full_name": user_Row[0].fname+' '+user_Row[0].lname, 
                                "user_name" : username.value,
                                "login_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                                "day": new Date().toISOString().slice(0, 10) }     
                            
                            await fetch('http://localhost:3000/employee', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(the_data),
                                })
                           
                        }  
                    }  
                }
                
                else
                {
                    show_div();
                    check_data(" Wrong User Name, User Name Does Not Exist");
                    setTimeout("location.reload()",3000)
                }
            }
            else
            {
                show_div();
                check_data("Empty data, You should Enter User Name and Password");
                setTimeout("location.reload()",3000)
            }                                
        }) 
   
       
    }   
})

function show_div() {
    var element = document.getElementById("thediv");
    element.classList.add("mystyle");
 }

 // to show data
 function check_data(displayed) {

    let node = document.createElement("H4");
    let node2 = document.createElement("span")
    let textnode = document.createTextNode(displayed);
    node.appendChild(textnode);
    
 }

