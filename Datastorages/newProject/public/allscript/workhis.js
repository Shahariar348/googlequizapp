import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase,ref,update,onValue,query,orderByChild,equalTo} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

//Form
const workhistoryform=document.getElementById("workhistoryform")
const editform=document.getElementById("editform")

//Table
const siglepersonworkhistorytable=document.getElementById("siglepersonworkhistorytable")
const salaryInfotable=document.getElementById("salaryInfo")
const editTable=document.getElementById("editTable")
//singlealerworkhistorytone
const workhistoryalert=document.getElementById("singlealerworkhistorytone")
const updatealerworkhistorytone =document.getElementById("updatealerworkhistorytone")
const UpdateAttendance=document.getElementById("UpdateAttendance")

workhistoryform.addEventListener("submit",function(workhistoryformEvent){
     workhistoryformEvent.preventDefault()
     let searchObj={}
     let valid=validetor(workhistoryform)
     ;[...this].forEach(value=>{
         if(value.type!=="submit"){
             searchObj[value.name]=value.value
         }

     })
     if(valid==false){
      searchbyid(searchObj)
     }
   
})

function validetor(workhistoryform){
  let selectdate=selectdatevalidetor(workhistoryform)
  let s_id=searchidvalidetor(workhistoryform)
  if(selectdate!==false && s_id!==false)
  {
      return false
  }
  else{
      return true
  }
}

function selectdatevalidetor(workhistoryform){
 if(workhistoryform[0].value==""){
     invalid(workhistoryform[0])
     return false
 }
 else{
     valid(workhistoryform[0])
     return true
     
 }
}
function searchidvalidetor(workhistoryform){
 if(workhistoryform[1].value==""){
     invalid(workhistoryform[1])
     return false
 }
 else{
     valid(workhistoryform[1])
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

function searchbyid(searchObj){
  let {selectDate,empolyeeId}=searchObj
   let selecteddate =dateFormeting(selectDate)
   
    try{

      onValue(ref(dataBase,'Employees/'+`${empolyeeId}`),snapshot=>{
            
        const Viewedhistory = query(ref(dataBase,'Employees/'+`${empolyeeId}/work/`),orderByChild('searchbydate'),equalTo(`${selecteddate.month}${selecteddate.year}`))
      
        onValue(Viewedhistory,shnapshot=>{
              if(shnapshot.exists()){
              let tbody=siglepersonworkhistorytable.tBodies.item(0)
                   tbody.innerHTML=""
               shnapshot.forEach(getvalue=>{
               let tr =tbody.insertRow(0)
               let cell0=tr.insertCell(0).innerHTML=getvalue.val().empolyeesShift
               let cell1=tr.insertCell(1).innerHTML=getvalue.val().date
               let cell2=tr.insertCell(2).innerHTML=getvalue.val().dayNameis
               let cell3=tr.insertCell(3).innerHTML=getvalue.val().w_startF
               let cell4=tr.insertCell(4).innerHTML=getvalue.val().w_endF
               let cell5=tr.insertCell(5).innerHTML=getvalue.val().attendance
               let cell6=tr.insertCell(6).innerHTML=`
               <input id="attendEdit" type="button" data-shift="${getvalue.val().empolyeesShift}" data-eid="${getvalue.val().empolyeesId}" data-wid="${getvalue.val().workeingID}" class="btn btn-warning mb-1" data-toggle="modal" data-target="#exampleModal"  value="Edit">
               `  
               saralaycalculation(getvalue.val().monthNameis,selecteddate.workingday,selecteddate.monthLength,shnapshot,snapshot.val().salary)
              })

              let e_edit=document.querySelectorAll("#attendEdit")
               editeforattend(e_edit)
               seccess(workhistoryalert,"Successfully Data Get")
              
              }else{
                errors(workhistoryalert,"No Data Available")
               }
            })
      })
     
    }catch(error){
       errors(workhistoryalert,"Something is Worng")
       
    }
 
}



function geturl(){
  let stbody=salaryInfotable.tBodies.item(0)

  stbody.rows[0].cells[0].innerHTML=`All Month`
  stbody.rows[0].cells[1].innerHTML=`Present`
  stbody.rows[0].cells[2].innerHTML=`Absence`
  stbody.rows[0].cells[3].innerHTML=`Salary`

  let currentUrl=window.location.href
  let paramiter=(new URL(currentUrl)).searchParams
  let paramwithid=paramiter.get('id')
  workhistoryform[1].value=paramwithid 
  paramiter.set("vu","id")
  const Viewedhistory = query(ref(dataBase,'Employees/'+`${paramwithid}/work/`),orderByChild('empolyeesId'),equalTo(`${paramwithid}`))
  onValue(Viewedhistory,shnapshot=>{
    if(shnapshot.exists()){
    let tbody=siglepersonworkhistorytable.tBodies.item(0)
         tbody.innerHTML=""
    shnapshot.forEach(getvalue=>{
     let tr =tbody.insertRow(0)
     let cell0=tr.insertCell(0).innerHTML=getvalue.val().empolyeesShift
     let cell1=tr.insertCell(1).innerHTML=getvalue.val().date
     let cell2=tr.insertCell(2).innerHTML=getvalue.val().dayNameis
     let cell3=tr.insertCell(3).innerHTML=getvalue.val().w_startF
     let cell4=tr.insertCell(4).innerHTML=getvalue.val().w_endF
     let cell5=tr.insertCell(5).innerHTML=getvalue.val().attendance
     let cell6=tr.insertCell(6).innerHTML=`
     <input type="button"  id="attendEdit" data-shift="${getvalue.val().empolyeesShift}" data-eid="${getvalue.val().empolyeesId}" data-wid="${getvalue.val().workeingID}" class="btn btn-warning mb-1" data-toggle="modal" data-target="#exampleModal"  value="Edit">
     `  
     })
     let e_edit=document.querySelectorAll("#attendEdit")
      editeforattend(e_edit)
      seccess(workhistoryalert,"Successfully Data Get") 
     
    } else{
      //  errors(workhistoryalert,"No Data available")
    }
  })
  
  
}
geturl()
function editeforattend(e_edit){
  ;[...e_edit].forEach(edit=>{
     edit.onclick=function(editevent){
       let EID=editevent.target.dataset.eid
       let WID=editevent.target.dataset.wid
       let shift=editevent.target.dataset.shift
       const edithistory = query(ref(dataBase,'Employees/'+`${EID}/work/`),orderByChild('workeingID'),equalTo(`${WID}`))
       onValue(edithistory,(editsnapshot)=>{
        editform[0].value=EID
        editform[1].value=shift
        editform[2].value=editsnapshot.val()[WID].date
        editform[3].value=editsnapshot.val()[WID].w_startNF
        editform[4].value=editsnapshot.val()[WID].w_endNF
    
            let tBody= editTable.tBodies.item(0)
              tBody.rows[0].cells[0].innerHTML=editsnapshot.val()[WID].workeingID
              tBody.rows[0].cells[1].innerHTML=editsnapshot.val()[WID].dayNameis
              tBody.rows[0].cells[2].innerHTML=`
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input id="checkbox" class="form-check-input" type="checkbox" ${editsnapshot.val()[WID].checksBox}>    
              &nbsp;&nbsp;Attend
              ` 
            })

     }
   
  })
 
}
UpdateAttendance.addEventListener("click",function(UpdateAttendanceEvent){

  let fianltBody= editTable.tBodies.item(0) 
  let empolyeeiid=editform[0].value
  let editShift=editform[1].value
  let editdate=dateFormeting(editform[2].value)
  let startTime=timeFormatter(editform[3].value)
  let entTime=timeFormatter(editform[4].value)

  let getworkId=fianltBody.rows[0].children[0].innerText
  let getCheckbox=fianltBody.rows[0].children[2].children[0]
 console.log(editdate.dayName)
  const updateWork={
    workeingID:getworkId,
    empolyeesId:empolyeeiid,
    empolyeesShift:editShift,
    attendance:getCheckbox.checked?"P":"A",
    checksBox:getCheckbox.checked?"checked":"",
     monthNameis:editdate.monthName,
     dayNameis:editdate.dayName,
     date:editform[2].value,
     searchbydate:`${editdate.month}${editdate.year}`,
     w_startF:startTime,
     w_endF:entTime,
     w_startNF:editform[3].value,
     w_endNF:editform[4].value 
   }
   update(ref(dataBase,'Employees/'+`${empolyeeiid}/work/${getworkId}`),updateWork)
   seccess(updatealerworkhistorytone,"Successfully Update")
})

function saralaycalculation(MonthName,Workday,Monthlength,getvalue,salary){
  let stbody=salaryInfotable.tBodies.item(0)
  let perday=Math.floor(salary.split(",").join(""))/Math.floor(Workday)
  let attendAbsent=[]
  getvalue.forEach(gvalue=>{
       attendAbsent.push(gvalue.val().attendance)
   })
       let presentfilter=attendAbsent.filter(value=>{
               if(value=="P"){
               return value
            }    
        })
       
       let absentfilter=attendAbsent.filter(value=>{
               if(value=="A"){
                  return value
              }    
       })
     
            let totalSaralywas=presentfilter.length*perday
           stbody.rows[0].cells[0].innerHTML=`${MonthName} 
            ${Monthlength}
           Work Day ${Workday}
            `
            stbody.rows[0].cells[1].innerHTML=`Present&nbsp;:&nbsp;${presentfilter.length} day`
            stbody.rows[0].cells[2].innerHTML=`Absence&nbsp;:&nbsp;${absentfilter.length} day`
            stbody.rows[0].cells[3].innerHTML=`Salary ${Math.floor(totalSaralywas).toFixed(2)}`
  
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


  let holiday=[]
     for(let i=1;i<getmonthLength+1;i++){
        let dayIndex=new Date(`${month}-${i}-${year}`).getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        if(days[dayIndex]=="Friday"){
            holiday.push(days[dayIndex])
         }  
     }
  
     let workingday=getmonthLength-holiday.length
return {
       year,
       month,
       day,
       monthName:getMonthName,
       monthLength:getmonthLength,
       dayName:getDayName,
       workingday
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




