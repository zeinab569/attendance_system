window.addEventListener('load', function () {
    name_of_employee = document.getElementById('name_of_emp');
    name2_of_employee = document.getElementById('name2_of_emp');
    let username = localStorage.getItem("UserName");
    let user_Name = document.getElementById('the_user_name');

    // with calender daily
    document.querySelector('jsuites-calendar').addEventListener('onchange', async function(e) {
        let users = await fetch(`http://localhost:3000/theusers?user_name=${user_Name.value}`)
            let user_Row = await users.json();

            let employees = await fetch(`http://localhost:3000/employee?user_name=${user_Name.value}`)
            let employee_Row = await employees.json();
            name_of_employee.innerHTML = `${user_Row[0].fname} ${user_Row[0].lname}`;
            for (let i = 0; i < employee_Row.length; i++) 
            {
                if( e.target.value.slice(0,10) == employee_Row[i].day ){
                   table_data1(user_Row[0].id,user_Row[0].fname,user_Row[0].lname,employee_Row[i].login_time,user_Row[0].age,user_Row[0].address,employee_Row[i].logout_time,employee_Row[i].day);
                } 
            }  
    });
   
    // with calender range in monthly
    document.getElementById('from').addEventListener('onclose', async function(e) {
        document.getElementById('to').addEventListener('onclose', async function(e2){
           
            let users = await fetch(`http://localhost:3000/theusers?user_name=${user_Name.value}`)
            let user_Row = await users.json();

            let employees = await fetch(`http://localhost:3000/employee?user_name=${user_Name.value}`)
            let employee_Row = await employees.json();

            name2_of_employee.innerHTML = `${user_Row[0].fname} ${user_Row[0].lname}`;

            let from_time = e.target.value.slice(0,10);
            let to_time = e2.target.value.slice(0,10);

            //alert(from_time);
            //alert(to_time);
           // alert(employee_Row[i].day)
            for (let i = 0; i < employee_Row.length; i++) {

                if( from_time <= employee_Row[i].day &&employee_Row[i].day <=to_time){
                    attindance_days = [];  
                    attindance_days.push(employee_Row[i].day)
                    let Attendance_Times = attindance_days.length;
                    let Absence_Times = 26-attindance_days.length; // only friday off
                    let Late_Times = 0

                    if(   "08:30 AM" <= employee_Row[i].login_time)
                         {
                             Late_Times = Late_Times +1;
                         }
                      
                      // absence rate
                    let Absence_Rate_in_month=((Absence_Times / 26)*100).toFixed(2);

                    table_data2(user_Row[0].id,user_Row[0].fname,user_Row[0].lname,Attendance_Times,Late_Times,Absence_Times,Absence_Rate_in_month);
                }
            }
                  monthly_button.disabled = true;
        })  
    });

 // without calender daily use button
// (fname) (lname) (logintime) (logout time) (age) (address)
    daily_button = document.getElementById('DayButton')
    if(daily_button){
        daily_button.addEventListener('click', async function(e) {
            e.preventDefault();
           
           let users = await fetch(`http://localhost:3000/theusers?user_name=${user_Name.value}`)
           let user_Row = await users.json();

           let employee = await fetch(`http://localhost:3000/employee?user_name=${user_Name.value}`)
           let employee_Row = await employee.json();
           name_of_employee.innerHTML = `${user_Row[0].fname} ${user_Row[0].lname}`;

        for (let i = 0; i < employee_Row.length; i++) 
             {
               table_data1(user_Row[0].id,user_Row[0].fname,user_Row[0].lname,employee_Row[i].login_time,user_Row[0].age,user_Row[0].address,employee_Row[i].logout_time,employee_Row[i].day);
          }
          // document.getElementById('tabled').datatable({});
            document.getElementById('DayButton').disabled = true
        });
    }
 
//without calender  monthly use button
// (Attendance_Times) (Absence_Times) (Late_Times) (Absence Rate)
    monthly_button = document.getElementById('monbtn')
    if(monthly_button){
        monthly_button.addEventListener('click', async function(e) {
            e.preventDefault();
            let users = await fetch(`http://localhost:3000/theusers?user_name=${user_Name.value}`)
            let user_Row = await users.json();
    
            let employees = await fetch(`http://localhost:3000/employee?user_name=${user_Name.value}`)
            let employee_Row = await employees.json();
           
            name2_of_employee.innerHTML = `${user_Row[0].fname}  ${user_Row[0].lname}`;

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
                if( employee_Row[i].login_time >=  "08:30 AM" )
                {
                    Late_Times = Late_Times +1;
                }
            } 
            // absence rate
            let Absence_Rate_in_month=((Absence_Times / 26)*100).toFixed(2);
            table_data2(user_Row[0].id,user_Row[0].fname,user_Row[0].lname,Attendance_Times,Late_Times,Absence_Times,Absence_Rate_in_month)
            monthly_button.disabled = true
        });
    }
});

function table_data1(ID, fname, lname, AttendanceTime ,age,addree,log_outT,day) {
    let table = document.getElementById("Dailytable");
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);
    let cell8 = row.insertCell(7);
    cell1.innerHTML = ID;
    cell2.innerHTML = fname;
    cell3.innerHTML = lname;
    cell4.innerHTML = AttendanceTime;
    cell5.innerHTML = age;
    cell6.innerHTML = addree;
    cell7.innerHTML = log_outT;
    cell8.innerHTML = day;
}

function table_data2(ID, fname, lname, AttendanceTime ,age,addree,log_outT) {
    let table = document.getElementById("monthtable");
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);
    let cell7 = row.insertCell(6);

    cell1.innerHTML = ID;
    cell2.innerHTML = fname;
    cell3.innerHTML = lname;
    cell4.innerHTML = AttendanceTime;
    cell5.innerHTML = age;
    cell6.innerHTML = addree;
    cell7.innerHTML = log_outT;
}
