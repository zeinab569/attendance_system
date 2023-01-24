window.addEventListener('load', function () {
    
    let fulname = localStorage.getItem("FullName");
    name_of_employee = document.getElementById('name_of_emp');
    name_of_employee.innerHTML += fulname;

    name2_of_employee = document.getElementById('name2_of_emp');
    name2_of_employee.innerHTML += fulname;

    let usrname = localStorage.getItem("UserName");

    let attend_time = localStorage.getItem("Time");

    // with calender
    document.querySelector('jsuites-calendar').addEventListener('onchange', async function(e) {
        let users = await fetch(`http://localhost:3000/theusers?user_name=${usrname}`)
            let user_Row = await users.json();

            let employees = await fetch(`http://localhost:3000/employee?user_name=${usrname}`)
            let employee_Row = await employees.json();
           
            for (let i = 0; i < employee_Row.length; i++) 
            {
                if( e.target.value == employee_Row[i].day ){
                    alert("yes");
                }
                else{
                    alert(employee_Row[i].day +"and"+ e.target.value);
                }
            }
    });

    document.querySelector('jsuites-calendar').addEventListener('onclose', function(e) {
        console.log('Calendar is closed');
    });

 // without calender
     //daily 
    // (fname) (lname) (logintime) (logout time) (age) (address)
    daily_button = document.getElementById('DayButton')
    if(daily_button){
        daily_button.addEventListener('click', async function(e) {
            e.preventDefault();

            let users = await fetch(`http://localhost:3000/theusers?user_name=${usrname}`)
            let user_Row = await users.json();
            
            let employees = await fetch(`http://localhost:3000/employee?user_name=${usrname}`)
            let employee_Row = await employees.json();

            // div1
            day_div = document.getElementById('this_Day')
            day_div.innerHTML += attend_time
            
            create_element("li",`First Name :-  ${user_Row[0].fname}`,'this_Day')
            create_element("li",`Last Name  :- ${user_Row[0].lname}`,'this_Day')
            create_element("li",`The Age of emp  :-${user_Row[0].age}`,'this_Day')
            create_element("li",`Address    :-${user_Row[0].address}`,'this_Day')
            create_element("li",`Logout_Time:-${employee_Row[0].logout_time}`,'this_Day')

            document.getElementById('DayButton').disabled = true
        });
    }
 
    // monthly 
    // (Attendance_Times) (Absence_Times) (Late_Times) (Absence Rate)
    monthly_button = document.getElementById('monbtn')
    if(monthly_button){
        monthly_button.addEventListener('click', async function(e) {
            e.preventDefault();
    
            let users = await fetch(`http://localhost:3000/theusers?user_name=${usrname}`)
            let user_Row = await users.json();
    
            let employees = await fetch(`http://localhost:3000/employee?user_name=${usrname}`)
            let employee_Row = await employees.json();
    
            attindance_days = [];  
            for (let i = 0; i < employee_Row.length; i++) 
            {
                
                attindance_days.push(employee_Row[i].day)
    
            }
            let Attendance_Times = attindance_days.length;
            let Absence_Times = 26-attindance_days.length; // only friday off
            
            
            let Late_Times = 0
            for (let i = 0; i < employee_Row.length; i++) 
            {
                if( employee_Row[i].login_time !=  "08:30 AM" )
                {
                    Late_Times = Late_Times +1;
                }
            } 
            
            // absence rate
            let Absence_Rate_in_month=((Absence_Times / 26)*100).toFixed(2);

            create_element("li",`Attendance Times :-  ${Attendance_Times}`,'monthly');
            create_element("li",`Late Times   :- ${Late_Times}`,'monthly');
            create_element("li",`Absence Times :- ${Absence_Times}`,'monthly');
            create_element("li",`Absence Rate :- ${Absence_Rate_in_month}`,'monthly');
            document.getElementById('monbtn').disabled = true
        });
    }
});


function create_element(tag_name,text,id) {
    let node = document.createElement(tag_name);
    let textnode = document.createTextNode(text);
    node.appendChild(textnode);
    document.getElementById(id).appendChild(node);
}