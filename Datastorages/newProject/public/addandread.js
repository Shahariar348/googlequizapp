import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set,onValue,remove,push,child,update  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

//firebaseConfig
const firebaseConfig = {
  apiKey: "AIzaSyBCzRlF04mVdIDSsHFky428yEEfJVa4XVg",
  authDomain: "so-i-c456b.firebaseapp.com",
  projectId: "so-i-c456b",
  storageBucket: "so-i-c456b.appspot.com",
  messagingSenderId: "411608026725",
  appId: "1:411608026725:web:84b7dcea1b19d6ba14c08c",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase=getDatabase(app)

// Table
let writetable=document.getElementById("addpersontable")

//Form
const registrationForm=document.getElementById("addform")
const updateForm=document.getElementById("updateform")

const close=document.getElementById("upclose")

//selected  
const filterbyshift=document.getElementById("inputGroupSelect01")
const searchbyid=document.getElementById("exampleInputSearch")
//Alert
const alertshow=document.getElementById("alet")
const alertshowone=document.getElementById("aletone")

registrationForm.addEventListener("submit",function(eventregistration){
   eventregistration.preventDefault()
   let addemployee={}
   let validdata=validetor(registrationForm)
   ;[...this].forEach(value=>{
       if(value.type!=="submit" && value.type!=="button"){ 
            addemployee[value.name]=value.value
        }
     })
     if(validdata==false){
       datastorage(addemployee)
       registrationForm.reset()
      }  
})

updateForm.addEventListener("submit",function(eventupdateForm){
  eventupdateForm.preventDefault()
  let updateemployee={}
  let validdata=validetor(updateForm)
  ;[...this].forEach(value=>{
      if(value.type!=="submit" && value.type!=="button"){
        
         
            updateemployee[value.name]=value.value
          
       }
    })
    if(validdata==false){
      upgrade(updateemployee)
      updateForm.reset()
    }
   
})


function validetor(registrationform){
     let name=namevalidetor(registrationform)
     let phone=phonevalidetor(registrationform)
     let address=addressvalidetor(registrationform)
     let position=positionvalidetor(registrationform)
     let salary=salaryvalidetor(registrationform)
     let joindate=joindatevalidetor(registrationform)
     if(name!==false && phone!==false && address!==false &&  position!==false &&  salary!==false && joindate!==false)
     {
         return false
     }
     else{
         return true
     }
}

function namevalidetor(registrationform){
    if(registrationform[1].value==""){
        invalid(registrationform[1])
        return false
    }
    else{
        valid(registrationform[1])
        return true
        
    }
}
function phonevalidetor(registrationform){
    if(registrationform[2].value==""){
        invalid(registrationform[2])
        return false
    }
    else{
        valid(registrationform[2])
        return true
        
    }
}
function addressvalidetor(registrationform){
    if(registrationform[3].value==""){
        invalid(registrationform[3])
        return false
    }
    else{
        valid(registrationform[3])
        return true
        
    }
}
function positionvalidetor(registrationform){
    if(registrationform[4].value==""){
        invalid(registrationform[4])
        return false
    }
    else{
        valid(registrationform[4])
        return true
        
    }
}
function salaryvalidetor(registrationform){
    if(registrationform[5].value==""){
        invalid(registrationform[5])
        return false
    }
    else{
        valid(registrationform[5])
        return true
        
    }
}
function joindatevalidetor(registrationform){
    if(registrationform[6].value==""){
        invalid(registrationform[6])
        return false
    }
    else{
        valid(registrationform[6])
        return true
        
    }
}

function invalid(inputbox){
    inputbox.classList.add("is-invalid")
    inputbox.classList.remove("is-valid")
}
function valid(inputbox){
    inputbox.classList.remove("is-invalid")
}

function rendomId(){
  let e_id=0
  for(let i=0;i<2;i++){
     let rendompick=Math.floor(100000 + Math.random() * 9000)
     e_id+=rendompick
  }
  return  e_id
}

function datastorage(userdeltai){
     let rendomID=`SS-${rendomId()}`
     userdeltai.E_Id=rendomID
     try{
      set(ref(dataBase, 'Employees/'+`${userdeltai.E_Id}`),userdeltai);
      // set(ref(dataBase, 'Employees/'+`${userdeltai.E_Id}/work`),{});
      seccess(alertshow,"Date saved seccessfully")
     }catch(err){
        errors(alertshow,"Data are not seved for internal Error")
     }
    
}


function readdate(){
    onValue(ref(dataBase,`Employees`),(snapshot)=>{
        inputtable(snapshot.val())
 })
}
readdate()
function inputtable(snapshotvalue){
    let tbody=writetable.tBodies.item(0)
           tbody.innerHTML=""
      for(let snapshot in snapshotvalue){
        let tr=tbody.insertRow()
        let td1=tr.insertCell(0).innerHTML=snapshotvalue[snapshot].E_Id
        let td2=tr.insertCell(1).innerHTML=snapshotvalue[snapshot].name
        let td3=tr.insertCell(2).innerHTML=snapshotvalue[snapshot].shift
        let td4=tr.insertCell(3).innerHTML=snapshotvalue[snapshot].position
        let td5 =tr.insertCell(4).innerHTML=`<input type="button"  id="del" class="btn btn-danger mb-1" data-id="${snapshotvalue[snapshot].E_Id}" value="Delete">`
        let td6 =tr.insertCell(5).innerHTML= `<input type="button"  id="edi" class="btn btn-warning mb-1"  data-keyID="${snapshotvalue[snapshot].E_Id}" value="Edit">`
        
      }
 
      let del=document.querySelectorAll("#del")
      ;[...del].forEach(dels=>{
        dels.addEventListener('click',function(events){
           let d_id=events.currentTarget.dataset.id
           if(confirm("Are you sure you want to delete?")){
            remove(ref(dataBase,`Employees/${d_id}`,d_id))
            onValue(ref(dataBase,`Employees/`),(snapshot)=>{
            inputtable(snapshot.val())
             })
           }
           else{
             
           }
           
        })
      })

let edi=document.querySelectorAll("#edi")
      ;[...edi].forEach(edit=>{
        edit.addEventListener('click',function(events){
             edit.setAttribute("data-toggle","modal")
             edit.setAttribute("data-target","#exampleModalup-md")
            let e_id=events.currentTarget.dataset.keyid
            onValue(ref(dataBase,`Employees/${e_id}`),(snapshot)=>{
           
              updateForm[0].value=snapshot.val().E_Id
              updateForm[1].value=snapshot.val().name
              updateForm[2].value=snapshot.val().phone
              updateForm[3].value=snapshot.val().address
              updateForm[4].value=snapshot.val().position
              updateForm[5].value=snapshot.val().salary
              updateForm[6].value=snapshot.val().joindate
              updateForm[7].value=snapshot.val().shift
              
           })
        })
      })
}

function upgrade(userdeltai){
  try{
    update(ref(dataBase, `Employees/${userdeltai.E_Id}`),userdeltai)
    seccess(alertshowone,"Seccessfully Updated")
  }catch(err){
    errors(alertshowone,"Sorry something is worng")
  }
}

   
function seccess(tag,seccessMassage){
  tag.innerHTML=`
    <div class="alert alert-success alert-dismissible fade show" role="alert">
  <strong>${seccessMassage}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
    `
  setTimeout(()=>{
    tag.innerHTML=``
  },3000)  
}
function errors(tag,errormassage){
  tag.innerHTML=`
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
  <strong>${errormassage}</strong>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
    `
  setTimeout(()=>{
    tag.innerHTML=``
  },5000)  
}

filterbyshift.onchange=()=>{
 let filterValue=filterbyshift.value.toUpperCase()
 let tbody=writetable.tBodies.item(0)
 let tr=tbody.rows
 ;[...tr].forEach(value=>{
       let td=value.cells[2].innerText.toUpperCase()
         if(filterValue==td){
          value.style.display=''
         }
         else{
          value.style.display='none'
         
         }
      if(filterValue=="ALLDATA"){
        value.style.display=''
       }
 })
 
}
searchbyid.onkeyup=()=>{
  let searchId=searchbyid.value.toUpperCase().trim()
  let tbody=writetable.tBodies.item(0)
   let tr=tbody.rows
   searchbyid.value=searchId
 ;[...tr].forEach(value=>{
       let td=value.cells[0].innerText.toUpperCase()
         if(td.indexOf(searchId)>-1){
             value.style.display=''
           }
         else{
          value.style.display='none'
              
          }
         
 })
}
