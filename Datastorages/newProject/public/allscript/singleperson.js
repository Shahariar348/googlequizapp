import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase,ref,onValue} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

//table 
const singleTable=document.getElementById("singlepersontable")

//singleform
const findone=document.getElementById("singleform") 
//Alert
const alertshow=document.getElementById("singlealert")
const alertshowone=document.getElementById("singlealertone")




findone.addEventListener("submit",function(singleevent){
    singleevent.preventDefault()
   let validId= idvalidation(findone[0].value.toUpperCase().trim())
        if(validId){
            findpersonbydate(findone[0].value.toUpperCase().trim())
         }
         else{
            errors(alertshow,"Worng ID Fermet SS-XXXXXX")
         }
        
})

function idvalidation(getId){
    if(getId.indexOf("SS-")>-1 && getId !=="" && getId.length==9 ){
       return true
     }
    else{
        return false
    }
}

function findpersonbydate(id){
     try{
        onValue(ref(dataBase,`Employees/${id}`),snapshot=>{
              if (snapshot.exists()) {
                showsingleData(snapshot.val())
                 seccess(alertshowone,"Your Data find out")
                }
               else {
                errors(alertshowone,"No data available")
              }
            
        })
     }catch(err){
        console.log(err)
     errors(alertshowone,"Data Is Not Found")
    }
    
}
 
function showsingleData(valueofdateBase){
    let ttbody=singleTable.tBodies.item(0)
    let s_tr =ttbody.rows
    
    s_tr[0].cells[1].innerHTML=valueofdateBase.E_Id
    s_tr[1].cells[1].innerHTML=valueofdateBase.name
    s_tr[2].cells[1].innerHTML=valueofdateBase.phone
    s_tr[3].cells[1].innerHTML=valueofdateBase.address
    s_tr[4].cells[1].innerHTML=valueofdateBase.position
    s_tr[5].cells[1].innerHTML=valueofdateBase.salary
    s_tr[6].cells[1].innerHTML=valueofdateBase.joindate
    s_tr[7].cells[1].innerHTML=`<a href="../allHtml/workhistory.html?id=${valueofdateBase.E_Id}&&date=${"true"}" class="btn btn-info">See more</a>`


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