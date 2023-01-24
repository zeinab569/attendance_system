window.addEventListener('load', function() {
    username = document.getElementById('username')
    confirm = document.getElementById('confirm-attendance')
    log_out_time=this.document.getElementById('logout')

    if(confirm){
        confirm.addEventListener('click', async function (e) {
            e.preventDefault();
            
            let emp_record = await fetch(`http://localhost:3000/employee?user_name=${username.value}`)
            let emp_records = await emp_record.json();
            
            
            for (let i = 0; i < emp_records.length; i++)
            {
                if(emp_records[i].user_name == username.value){
                    if(emp_records[i].day == new Date().toISOString().slice(0, 10))
                    {
                        show_div();
                        fulname = `Name : ${emp_records[i].full_name}`
                        localStorage.setItem("FullName", emp_records[i].full_name);
                        usrname = `User Name : ${emp_records[i].user_name}`
                        localStorage.setItem("UserName", emp_records[i].user_name);
                        Time = `Time : ${emp_records[i].login_time}`
                        localStorage.setItem("Time", emp_records[i].login_time);
                        diplay_data(fulname,usrname,Time)
                        setTimeout("location.href = '../htmls/report.html';",5000);   
                    }
                }
                else{
                    alert("user Name not found plese enter another user name ")
                }
            }
              
        })
    }
    
    if(log_out_time){
        log_out_time.addEventListener('click', async function (e) {
            e.preventDefault();
            let emp_record = await fetch(`http://localhost:3000/employee?user_name=${username.value}`)
            let emp_records = await emp_record.json();
            for (let i = 0; i < emp_records.length; i++)
            {
                if(emp_records[i].day == new Date().toISOString().slice(0, 10))
                {
                    let the_data = {
                        "logout_time" :  new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
                          }   
                        await fetch(`http://localhost:3000/employee/${emp_records[0].id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(the_data),
                        })
                }
            }  
        })
    }
});

function show_div() {
    var element = document.getElementById("myDIV");
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
    
    document.getElementById("myDIV").appendChild(node1);
    document.getElementById("myDIV").appendChild(node2);
    document.getElementById("myDIV").appendChild(node3);
    
}    
   