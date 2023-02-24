window.addEventListener('load', function() {
    username = document.getElementById('username')
    confirm = document.getElementById('confirm-attendance')
    log_out_time=this.document.getElementById('logout')

    if(confirm){
        confirm.addEventListener('click', async function (e) {
            e.preventDefault();
            let users = await fetch(`http://localhost:3000/theusers?user_name=${username.value}`)
            let user_Row = await users.json();
            
            for (let i = 0; i < user_Row.length; i++)
            {
                    if(user_Row[i].day == new Date().toISOString().slice(0, 10))
                    {   
                        show_div();
                        let the_data = {
                            "fullName": user_Row[0].fname+' '+user_Row[0].lname, 
                            "login_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                            "day": new Date().toISOString().slice(0, 10)  //"2023-01-10T02:00:00Z"
                        }    
                        await fetch('http://localhost:3000/employee', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(the_data),
                            })
                            
                        diplay_data(fulname,usrname,Time)
                        setTimeout("location.href = '../htmls/report.html';",4000);   
                    }    
            }
              
        })
    }
    
    // time leave
    if(log_out_time){
        log_out_time.addEventListener('click', async function (e) {
            e.preventDefault();
            let employee = await fetch(`http://localhost:3000/employee?user_name=${username.value}`)
            let employee_Row = await employee.json();
            for (let i = 0; i < employee_Row.length; i++)
            {
                if(employee_Row[i].day == new Date().toISOString().slice(0, 10))
                {
                    let the_data = {
                        "logout_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                          }   
                        await fetch(`http://localhost:3000/employee/${employee_Row[0].id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(the_data)
                        })
                }
            }  
        })
    }
});

function show_div() {
    var element = document.getElementById("div_show_data");
    element.classList.add("mystyle");
}

function diplay_data(fullname,username,time) {

    let node1 = document.createElement("p");
    let node2 = document.createElement("p");
    let node3 = document.createElement("p");
    
    
    let textnode1 = document.createTextNode(fullname);
    let textnode2 = document.createTextNode(username);
    let textnode3 = document.createTextNode(time);

    node1.appendChild(textnode1);
    node2.appendChild(textnode2);
    node3.appendChild(textnode3);
    
    document.getElementById("div_show_data").appendChild(node1);
    document.getElementById("div_show_data").appendChild(node2);
    document.getElementById("div_show_data").appendChild(node3);
    
}    
   