// style the register validate
window.addEventListener('load',function(){

// Using Node.js `require()`
//const { generateFromEmail, generateUsername } = require("unique-username-generator");
// Using ES6 imports
//import {generateFromEmail, generateUsername} from '../node_modules/unique-username-generator';

    userfirstname = document.getElementById('first_name');
    userlastname = document.getElementById('last_name');
    userage = document.getElementById('the_age');
    useradd = document.getElementById('the_address');
    useremail = document.getElementById('the_Email');
    
    
    fname_error = document.getElementById('fname_error');
    lname_error = document.getElementById('lname_error');
    age_error = document.getElementById('age_error');
    address_error = document.getElementById('address_error');
    email_error = document.getElementById('email_error');
    
    
    // first Name 
    if(userfirstname){
        userfirstname.addEventListener('blur', function () {
            if (!isuserfnamevalide()) {
                userfirstname.focus();
                userfirstname.select();
                fname_error.style.display = 'block';
                userfirstname.classList.add("error");
                
                
            } else {
                fname_error.style.display = 'none';
                userfirstname.classList.remove("error");
                
            }
            check_regester_btn();
    
        });

    }
    
    //last Name
    if(userlastname){
        userlastname.addEventListener('blur', function () {

            if (!isuserlnamevalide()) {
                userlastname.focus();
                userlastname.select();
                lname_error.style.display = 'block';
                userlastname.classList.add("error");
                
            } else {
                lname_error.style.display = 'none';
                userlastname.classList.remove("error");
                
            }
            check_regester_btn();
    
        });
    }
   
   // the Age
   if(userage){
    userage.addEventListener('blur',function(){
        if (!isuseragevalide()) {
            // login
            userage.focus();
            userage.select();
            age_error.style.display = 'block';
            userage.classList.add("error");
            
        } else {
            age_error.style.display = 'none';
            userage.classList.remove("error");
            
        }
        check_regester_btn();
    });	
   }
    
   // Address
   if(useradd){
    useradd.addEventListener('blur',function(){
        if (!isuseraddvalide()) {
            useradd.focus();
            useradd.select();
            address_error.style.display = 'block';
            useradd.classList.add("error");
            
        } else {
            address_error.style.display = 'none';
            useradd.classList.remove("error");
            
        }
        check_regester_btn();

    });	
   }
    // email
    if(useremail){
        useremail.addEventListener('blur',function(){
            if (!isuseremailvalide()) {
                useremail.focus();
                useremail.select();
                email_error.style.display = 'block';
                useremail.classList.add("error");
                
            } else {
                email_error.style.display = 'none';
                useremail.classList.remove("error");
            }
            check_regester_btn();
        });	
    }
    

});


function check_regester_btn() {
    if(userfirstname.value.length>0 && userlastname.value.length>0 && userage.value.length>0 && useradd.value.length>0 && useremail.value.length>0)
    {
        document.getElementById('regester_btn').disabled = false
    }
}

// the Validation with Regex
function isuserfnamevalide() {
    return userfirstname.value.match(/^[A-Za-z]+$/);
}
function isuserlnamevalide() {
    return userlastname.value.match(/^[A-Za-z]+$/);
}
function isuseragevalide(){
    return userage.value.match(/^[0-9]{1,2}$/);
}
function isuseraddvalide(){
    return useradd.value.match(/^[A-Za-z-0-9]+$/);
}
function isuseremailvalide() {
    return useremail.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
}

// go to login
function goto_login(){
    document.getElementById("log_btn").addEventListener('click', () => {
        window.location.href = '../htmls/login.html'
    }); 
}

login = document.getElementById("log_btn");
if(login){
    login.addEventListener('click',goto_login())
}

// when click register we send data to server and create password and user name randum
the_register = document.getElementById("regester_btn")
if(the_register){
    the_register.addEventListener('click',async function(e) {
        e.preventDefault();
        
        userfirstname = document.getElementById('first_name');
        userlastname = document.getElementById('last_name');
        userage = document.getElementById('the_age');
        useradd = document.getElementById('the_address');
        useremail = document.getElementById('the_Email');

      let theem= useremail.value
    
        // get random data for password and user name 
        //const username = generateFromEmail(
          //  useremail.value,
          //  3 ,// 3 digit
         // );
         function generate_Random_Name() {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( let i = 0; i < 7; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
           userName = generate_Random_Name();
           console.log(userName);
          // generate password
          function generate_Random_Password() {
            charset = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ",
            pass = "";
            let n = charset.length;
            for (let i = 0; i < 5; ++i) {
                pass += charset.charAt(Math.floor(Math.random() * n));
            }
            return pass;}
           the_password = generate_Random_Password();
    
        let the_data = {
            "fname": userfirstname.value,
            "lname": userlastname.value,
            "age": userage.value,
            "e_mail": useremail.value,
            "address" : useradd.value,
            "user_name" : userName,
            "password":the_password,
        }
        
        
        getAllEmail(theem).then((data)=>{
            if(data.length>0){
             alert("email is here");
            }
            else{
                 fetch('http://localhost:3000/pending', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(the_data),
                    })
            }
        }
       // setTimeout(function(){location.href='../htmls/login.html'} , 2000);
        )  
    })
}

  function getAllEmail(_email)
{
    return fetch(`http://localhost:3000/pending?e_mail=${_email}`)
    .then(response => response.json())
    .then(data=> { 
        return data;
     })
    .catch(function(err) {
        console.log(`Error: ${err}`)
    });
}


  function checkDuplicateEmail(_email){
    getAllEmail(_email).then(employee=>{
        if(employee.length >0) 
            return true
        else 
            return false
    });}







function Sendmail(){
    Email.send({
        SecureToken : "4ad3b8bf-309d-446f-adaf-af6ea8a88b3a",
        To :useremail.value ,
        From : "zeinabelazab123@gmail.com",
        Subject : "This is the subject",
        Body : `
        <h4>Employee Data</h4>s
        <table width="100%" border="1">
        <thead>
          <tr>
            <th>Full-Name</th>
            <th>First-Name</th>
            <th>Last-Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Age</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${userfirstname.value}  ${userlastname.value}</th>
            <td>${userfirstname.value}</td>
            <td>${userlastname.value}</td>
            <td>${useradd.value}</td>
            <td>${useremail.value}</td>
            <td>${userage.value}</td>
            <td>${username}</td> 
            <td>${the_password}</td> 
          </tr>
        </tbody>
      </table>      
        `
    }).then(
        message => alert(message)
      );
}


