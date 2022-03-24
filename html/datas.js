
import {quizdata} from '../Datastorages/data.js'
let newquiz=[...quizdata]
let question =document.getElementById('question1')
let count =document.getElementById('count')
let btn =document.getElementById('btn')
let addopt=document.getElementById('addopt')

// let input=document.querySelectorAll('input')

let score=0


let optiona =document.getElementById('aoption')
let optionb =document.getElementById('boption')
let optionc =document.getElementById('coption')
let optiond =document.getElementById('doption')

console.log(quizdata)
let inans=0
let indext =0
quiz(indext)


btn.addEventListener('click',function(e){
    e.preventDefault()
    let input=document.getElementsByName('option')
try{

    for (let radio of input)
    {
       
     if (radio.checked) {
        let errro =document.getElementById('errro')  
        errro.style.visibility='hidden' 
        if(newquiz[inans].answer==radio.value){
            score+=10
        inans+=1
        let ind = indext+=1
        quiz(ind)
        radio.checked=false
         }
         else{
            let ind = indext+=1
              quiz(ind)
              radio.checked=false
         }

    }
    
    let errro =document.getElementById('errro')  
     errro.innerText='Check any one'
     errro.style.color='red'
 }  

}
catch(e){
    let finish =document.getElementById('finish')
    let point =document.getElementById('score')
       
    point.innerText=`Your Score is ${score}`

    finish.innerText='Quiz Finished Wait For Next Quiz (^_^)'
}
})


function quiz(ind){

   for(let i=ind; i<=ind;i++){
    question.innerText=newquiz[i].Question
    let li =document.createElement('li')
    li.innerHTML=`<input type="radio" data-answers="${newquiz[i].answer}"name="option" `
    addopt.append(li)
   }


    // count.innerText=`${ind+1}/${quizdata.length}`
    // optiona.innerText=newquiz[ind].option.a
    // optionb.innerText=newquiz[ind].option.b
    // optionc.innerText=newquiz[ind].option.c
    // optiond.innerText=newquiz[ind].option.d
   
}




// const ans='Amazon River'
// const ansd='Sodium'  

// // })
// let n=0
// let condito=(len)=>{
   
//     console.log(`
//     Number Of question : ${quizdata[len].number}
//     Question : ${quizdata[len].Question}
//       ${quizdata[len].option.a}
//       ${quizdata[len].option.b}
//       ${quizdata[len].option.c}
//       ${quizdata[len].option.d}
//     `)
// }
// condito(n)

// if(quizdata[n].answer==ans || quizdata[n].answer==ansd ){
//     let count =2
//     condito(count)
// }
// else{

//     console.log('sprry')
// }

// let ind = indext+=1
// quiz(ind)
// for (var radio of radios)
// {
//     if (radio.checked) {
//         alert(radio.value);
//     }
// }