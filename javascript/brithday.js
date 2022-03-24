var btn=document.getElementById("btn23")


  function fullnames(){ 
  var name1=document.getElementById("inputText").value
  if(name1.length==0){
    document.getElementById("vali1").style.visibility="visible"
    document.getElementById("vali1").style.color="red"
   
  }
  else{
    document.getElementById("vali1").style.visibility="hidden"
 
  }


}

function days(){
var date1=document.getElementById("inputNumber1").value
  if(date1.length==0 || date1>=32)
  {
    document.getElementById("vali2").style.visibility="visible"
    document.getElementById("vali2").style.color="red"
  }
  else{
    document.getElementById("vali2").style.visibility="hidden"
  }
}
function months(){
  var month1=document.getElementById("inputNumber2").value
  if(month1.length==0 || month1>=13)
  {
    document.getElementById("vali3").style.visibility="visible"
    document.getElementById("vali3").style.color="red"
  }
  else{
    document.getElementById("vali3").style.visibility="hidden"
  }

}
function years(){
  var year1=document.getElementById("inputNumber3").value
  if(year1.length==0 || year1.length>=5)
  {
    document.getElementById("vali4").style.visibility="visible"
    document.getElementById("vali4").style.color="red"
  }
  else{
    document.getElementById("vali4").style.visibility="hidden"
  }
}


btn.addEventListener('click',function(e){
    e.preventDefault()
     var name2=document.getElementById("inputText").value
    var date2=document.getElementById("inputNumber1").value
    var month2=document.getElementById("inputNumber2").value
    var year2=document.getElementById("inputNumber3").value
     
    //********validation check
   let valit=inputvalidation(name2,date2,month2,year2);

     if(valit==true){

        agecalculator(name2,date2,month2,year2)
         console.log("ture")
         
     }
     else{
        console.log("false")
     }
     // ********validation check

  });

   
 function agecalculator(n2,d2,m2,y2){
  
    var today = new Date();
    var yy = today.getFullYear();
    var mm = today.getMonth()+1;
    var dd = today.getDate();

    var year;
    var month;
    var day;
    var y = parseInt(y2);
      var year=yy-y;
      var m =parseInt(m2);
      if(m>0 && m<13){
       month = mm-m;;
         if (month<0)
         {
            month = m-mm;
         }
       else{
        month = mm-m;
           }    
          
           }
      else{
          alert("Sorry Your Birthday is not found MONTH ERROR");
          month=" {MONTH ERROR} ";
      }  
      
      var d =parseInt(d2);     
      if(d>0 && d<32){
        day = dd-d;
         if (day<0)
         {
          day = d-dd;
         }
       else{
         day = dd-d;
           }    
          
           }
      else{
          alert("Sorry Your Birthday is not found DAY ERROR" );
          day=" {DAY ERROR}";
      }  
      if(month==month || day==day){
        localStorage.setItem("name",n2)
        localStorage.setItem("yy",year)
        localStorage.setItem("mm",month)
        localStorage.setItem("dd",day)


        if(month==0)
          {
         mon(mm);
         if(day==0)
           {
            document.getElementById("text5").style.color="rgba(4, 241, 115, 0.801)"
            document.getElementById("text4").style.color="rgba(4, 241, 115, 0.801)"
            document.getElementById("text4").innerHTML=" Today Your Age is "
            var age=document.getElementById("text5").innerHTML=(year +" Year ")+(month+" Month " )+(day+" Days")+"";
            document.getElementById("text6").style.visibility="visible"
            document.getElementById("text6").innerHTML=" HAPPY BIRTHDAY TO YOU "
             
         }
         else{
          var age=document.getElementById("text5").innerHTML=(year +" Year ")+(month+" Month " )+(day+" Days");
          document.getElementById("text6").style.visibility="hidden"
        }
      // var age1=document.getElementById("na").innerHTML=" Today Your Age is " 
      // var age=document.getElementById("ma").innerHTML=(year +" Year ")+("Running Month")+(day+" Days");
    } else{
      var age=document.getElementById("text5").innerHTML=(year +" Year ")+(month+" Month " )+(day+" Days");
      document.getElementById("text6").style.visibility="hidden"
    }

      }
     else{
        var age=document.getElementById("text5").innerHTML=("SORRY");
        document.getElementById("text6").style.visibility="hidden"
     }
      // var age =parseInt(document.getElementById("int4").value=(y-yy+" Year")+(m-mm+" Month")+(dd-d+" Days"));
     



}
function mon(na){
if(na==1){
console.log("January");  
}
else if(na==2)
{
console.log("February");  
}
else if(na==3)
{
console.log("March");  
}
else if(na==4)
{
console.log("April");  
}
else if(na==5)
{
console.log("May");  
}
else if(na==6)
{
console.log("June");  
}
else if(na==7)
{
console.log("July");  
}
else if(na==8)
{
console.log("August");  
}
else if(na==9)
{
console.log("September");  
}
else if(na==10)
{
console.log("October");  
}
else if(na==11)
{
console.log("November");  
}
else if(na==12)
{
console.log("December");  
}

}




  function inputvalidation(n,d,m,y){
   if(n==""){
     alert("Enter all input fill")
     return false;
   } 
  if(d==0 || d>=32){
    alert("Enter all input fill")
    return false;
  }
 if(m==0 || m>=13){
  alert("Enter all input fill")
    return false;
  }
  if(y==0){
    alert("Enter all input fill")
    return false;
   }
 else{
  return true
 }


  }

var getname=localStorage.getItem("name") 
var getyear= localStorage.getItem("yy") 
var getmonth= localStorage.getItem("mm") 
var getday= localStorage.getItem("dd") 

document.getElementById("text7").innerText=getname  
document.getElementById("text8").innerHTML=(getyear +" Year ")+(getmonth+" Month " )+(getday+" Days");


let bk=document.getElementById("btn23456")
bk.addEventListener("click",function(e){
e.preventDefault()
 let tag=document.createElement("div")
 tag.innerHTML="Ename"
 tag.className="alert alert-warning alert-dismissible fade show"
 let pa =document.getElementById("div123456")
 pa.appendChild(tag)

})