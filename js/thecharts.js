window.addEventListener('load', function () {
    e.preventDefault();  
    let thech=this.document.getElementById("myChart")
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
            if( "08:30 AM" <= employee_Row[x].login_time)
            {
                Late_Times = Late_Times +1;    
            }
        } 

        let Absence_Rate_in_month=((Absence_Times / 26)*100).toFixed(2);

        full_name = user_Row[i].fname+' '+user_Row[i].lname 



        let xyValues = [
            {x:full_name, y:Attendance_Times},
            {x:full_name, y:Late_Times},
            {x:full_name, y:Absence_Times},
            {x:full_name,y:Absence_Rate_in_month}
            
          ];
          
          new Chart("thech", {
            type: "scatter",
            data: {
              datasets: [{
                pointRadius: 4,
                pointBackgroundColor: "rgb(0,0,255)",
                data: xyValues
              }]
            },
            options: {
              legend: {display: false},
              scales: {
                xAxes: [{ticks: {min: 40, max:160}}],
                yAxes: [{ticks: {min: 6, max:16}}],
              }
            }
          });
        //table_data1(full_name,Attendance_Times,Late_Times,Absence_Times,Absence_Rate_in_month);
        //table_data2(full_name,Late_Times )    
        //table_data3(full_name,Attendance_Times,Absence_Times)
        //table_data4(user_Row[i].id,user_Row[i].fname,user_Row[i].lname,user_Row[i].e_mail,user_Row[i].age,user_Row[i].address,user_Row[i].user_name)
    }

})

