window.addEventListener('load', async function(e) {
    
    e.preventDefault();

    let users = await fetch(`http://localhost:3000/theusers`)
    let user_Row = await users.json();
    
    for (let i = 0; i < user_Row.length; i++) 
    {
        
        let employee = await fetch(`http://localhost:3000/employee?user_name=${user_Row[i].user_name}`)
        let employee_Row = await employee.json();
        
        attindance_days = [];
        for (let j = 0; j < employee_Row.length; j++) 
        {
            attindance_days.push(employee_Row[j].day)
        }

        let Attendance_Times = attindance_days.length;
        let Absence_Times = 26 -attindance_days.length;  // only friday off
        
    
        let Late_Times = 0
        for (let x = 0; x < employee_Row.length; x++) 
        {   
            if( "08:30 AM" != employee_Row[x].login_time)
            {
                Late_Times = Late_Times +1;    
            }
        } 

        let Absence_Rate_in_month=((Absence_Times / 26)*100).toFixed(2);

        full_name = user_Row[i].fname+' '+user_Row[i].lname 

        table_data1(full_name,Attendance_Times,Late_Times,Absence_Times,Absence_Rate_in_month)
        table_data2(full_name,Late_Times )    
        table_data3(full_name,Attendance_Times,Absence_Times)
        table_data4(user_Row[i].fname,user_Row[i].lname,user_Row[i].age,user_Row[i].address)
    }

});

function table_data1(name, attendance, late, Absence_Times,Absence_Rate) {
    let table = document.getElementById("allemp");
    let row = table.insertRow(0);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerHTML = name;
    cell2.innerHTML = attendance;
    cell3.innerHTML = late;
    cell4.innerHTML = Absence_Times;
    cell5.innerHTML = Absence_Rate;
}    
function table_data2(empname,late) {
    var table = document.getElementById("late");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = empname;
    cell2.innerHTML = late;
    
}
function table_data3(empname,att,excuse) {
    var table = document.getElementById("excuse");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = empname;
    cell2.innerHTML = att;
    cell3.innerHTML = excuse;
    
}
function table_data4(fname,lname,age,add) {
    var table = document.getElementById("data");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = fname;
    cell2.innerHTML = lname;
    cell3.innerHTML = age;
    cell4.innerHTML = add;
    
}                