window.addEventListener('load',async function () {
    
    newdata();

})
  // functiom=n to display table and get data from json
async function newdata(){
    let returnData=await fetch('http://localhost:3000/pending');
    let normal= await returnData.json();
    console.log(normal);
    for(let i=0;i<normal.length;i++){
     let newrow =document.createElement('tr');
   
    //add check icon
     let accept = document.createElement("td");
     accept.innerHTML='<i class="fa fa-check" style="font-size:20px;color:red"></i>'
     accept.addEventListener("click",sendToEmp);
   
   //add ignore icon    
          let ignore = document.createElement("td");
          ignore.innerHTML='<i class="fa fa-close" style="font-size:20px;color:red"></i>'
          ignore.children[0].addEventListener("click",ignoreRequest);
   
     $(newrow).append('<td>'+normal[i].fname+'</td>')
     $(newrow).append('<td>'+normal[i].lname+'</td>')
     $(newrow).append('<td>'+normal[i].e_mail+'</td>')
     $(newrow).append('<td>'+normal[i].address+'</td>')
     $(newrow).append('<td>'+normal[i].age+'</td>')
     $(newrow).append('<td>'+normal[i].user_name+'</td>')
     $(newrow).append('<td>'+normal[i].password+'</td>')
     $(newrow).append(accept)
     $(newrow).append(ignore)
     
     $('#tbody').append(newrow);
   }
    // $('#example')
    // .DataTable();
   }
   // to remove requset
async function ignoreRequest(e){
  let name=e.target.parentElement.parentElement.children[0].innerHTML;
  console.log(name);
  let userData= await fetch(`http://localhost:3000/pending?fname=${name}`);
  let userDataObject= await userData.json();
  fetch(`http://localhost:3000/pending/${userDataObject[0].id}`, {method: 'DELETE',})

}

// to accept requset
async function sendToEmp(e){
    let name=e.target.parentElement.parentElement.children[0].innerHTML;
    let userData= await fetch(`http://localhost:3000/pending?fname=${name}`);
    let userDataObject= await userData.json();
  
   emailjs.send("service_hglnp7m","template_m6twmph",{
      from_name: "Admin",
      firstName: userDataObject[0].fname,
      userName:   generate_Random_Name(),
      password:   generate_Random_Password(),
      to: userDataObject[0].email,
      }).then(()=>{
           fetch(`http://localhost:3000/pending/${userDataObject[0].id}`,{method:'DELETE'})
           fetch(`http://localhost:3000/theusers`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(userDataObject[0]),  
          })
      })
  }
   
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
