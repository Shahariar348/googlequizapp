import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase,ref,set,onValue,query,orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

// table
const attendacneTable=document.getElementById("attendacnetable")

//shift 
const setectdshift=document.getElementById("inputGroupAttendSelect01")

//Attendacen 
const attendacneFrom=document.getElementById("attendacneform")
// AttendacneAlert
const attendacnealert=document.getElementById("attendacnealert")


attendacne()
function attendacne(){
  onValue(ref(dataBase,"Employees"),(snapshot)=>{
    let tbody=attendacneTable.tBodies.item(0)
        tbody.innerHTML=""
    for(let snapshots in snapshot.val()){
          let tr=tbody.insertRow(0)
          let cells=tr.insertCell(0).innerHTML=snapshot.val()[snapshots].E_Id
          let cells2=tr.insertCell(1).innerHTML=snapshot.val()[snapshots].name
          let cells3=tr.insertCell(2).innerHTML=snapshot.val()[snapshots].shift
          let cells4=tr.insertCell(3).innerHTML=`
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input id="checkbox" class="form-check-input" type="checkbox">
          `
        }
  })
}

let filterarray=[]
setectdshift.onchange=()=>{
  let shift=setectdshift.value.toUpperCase().trim()
  let tbody=attendacneTable.tBodies.item(0)
  let tr=tbody.rows
 ;[...tr].forEach(value=>{
       let td=value.cells[2].innerText.toUpperCase()
         if(shift==td){
          value.style.display=''
         }
         else{
          value.style.display='none'
         
         }

})
 
let filter=[...tr].filter(value=>{
  if(value.children[2].innerText.toUpperCase()==shift){
       return value
      }
})
filterarray=[...filter]
}

attendacneFrom.addEventListener("submit",function(attendacnevent){
    attendacnevent.preventDefault()
     let attendTime={}
  let valid=validetor(attendacneFrom)
     ;[...this].forEach(value=>{
       if(value.type!=="submit")
       attendTime[value.name]=value.value
     })
     if(valid==false){
      getattend(attendTime)
      attendacneFrom.reset()
      setectdshift.value=setectdshift[0].value
      }
   
})
//==================================================================

function validetor(attendacneFrom){
  let date=datevalidetor(attendacneFrom)
  let s_time=startvalidetor(attendacneFrom)
  let e_time=endvalidetor(attendacneFrom)
  if(date!==false && s_time!==false && e_time!==false)
  {
      return false
  }
  else{
      return true
  }
}

function datevalidetor(attendacneFrom){
 if(attendacneFrom[0].value==""){
     invalid(attendacneFrom[0])
     return false
 }
 else{
     valid(attendacneFrom[0])
     return true
     
 }
}
function startvalidetor(attendacneFrom){
 if(attendacneFrom[1].value==""){
     invalid(attendacneFrom[1])
     return false
 }
 else{
     valid(attendacneFrom[1])
     return true
     
 }
}
function endvalidetor(attendacneFrom){
 if(attendacneFrom[2].value==""){
     invalid(attendacneFrom[2])
     return false
 }
 else{
     valid(attendacneFrom[2])
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
//===================================================================
function getattend(attendTime){
     const{todaydate,startingtime,endtime}=attendTime

     let dateis=  dateFormeting(todaydate)
     let startingTime=timeFormatter(startingtime)
     let endingTime=timeFormatter(endtime)

     const  workobject ={}
  filterarray.forEach(value=>{
        let checks=value.querySelectorAll("#checkbox") 
        let workeingID=`WR-${rendomId()}`
      
         for(let check of checks) {
            workobject.workeingID=workeingID,
            workobject.empolyeesId=value.children[0].innerText,
            workobject.empolyeesShift=value.children[2].innerText,
            workobject.attendance=check.checked?"P":"A",
            workobject.checksBox=check.checked?"checked":"",
            workobject.monthNameis=dateis.monthName,
            workobject.dayNameis=dateis.dayName,
            workobject.date=todaydate,
            workobject.searchbydate=`${dateis.month}${dateis.year}`,
            workobject.w_startF=startingTime,
            workobject.w_endF=endingTime,
            workobject.w_startNF=startingtime,
            workobject.w_endNF=endtime  
           
      } 
 
onValue(ref(dataBase,'Employees/'+`${value.children[0].innerText}/work/`),snapshot=>{
if(snapshot.exists())
  {
    const mostViewedPosts = query(ref(dataBase,'Employees/'+`${value.children[0].innerText}/work/`),orderByChild('date'),equalTo(todaydate))
    onValue(mostViewedPosts,(shnapshot)=>{
      if(shnapshot.exists())
      {
          errors(attendacnealert,"Allready Exists")
      }
      else{
          set(ref(dataBase,'Employees/'+`${value.children[0].innerText}/work/`+`${workeingID}`),workobject)
          seccess(attendacnealert,"Data save")
      }

     })
  }
  else{
      set(ref(dataBase,'Employees/'+`${value.children[0].innerText}/work/`+`${workeingID}`),workobject)
      seccess(attendacnealert,"Data save")
   }
  })
})
}

function dateFormeting(todaydate){
      const[year,month,day]=todaydate.split("-")
      let getMonthName=""
      const monthName=["","January","February","March","April","May","june","july","August","September","October","November","December"]
      monthName.forEach((monthn,index)=>{
        if(index==month){
          getMonthName=monthn
         }
      })
      // console.log(getMonthName)
      let getmonthLength = new Date(year,month,0).getDate()
      let dayName=['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      let daynumber=new Date(`${month}-${day}-${year}`).getDay()
      let getDayName=dayName[daynumber] 
     
      return {
           year,
           month,
           day,
           monthName:getMonthName,
           monthLength:getmonthLength,
           dayName:getDayName
      }
      
}

function timeFormatter(time){
  let [hour,min]=time.split(":")
  let hours = hour;
  let minutes = min;    
const ampm = hours >= 12 ? 'pm' : 'am';
hours %= 12;
hours = hours || 12;    
minutes = minutes < 10 ? `${minutes}` : minutes;

const strTime = `${hours}:${minutes} ${ampm}`;
 return strTime;
}
function rendomId(){
  let e_id=0
  for(let i=0;i<2;i++){
     let rendompick=Math.floor(100000 + Math.random() * 9000)
     e_id+=rendompick
  }
  return  e_id
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