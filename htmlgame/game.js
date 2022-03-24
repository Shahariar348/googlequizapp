window.onload = function() {
    // Some code
    let gh=localStorage.getItem('H_point')
    let print_h=document.getElementById('humanpoint')
    print_h.innerText=gh
    let gc=localStorage.getItem('C_point')
    let print_c=document.getElementById('computerpoint')
    print_c.innerText=gc
};
let win={
    'rock':{
        'rock':'draw',
        'scissor':'win',
        'paper':'lose'
    },
    'scissor':{
        'rock':'lose',
        'scissor':'draw',
        'paper':'win'
    },
    'paper':{
        'rock':'win',
        'scissor':'lose',
        'paper':'draw'
    },
}

let icon=function getIcon(iconName){
    if(iconName=='rock'){
        return `far fa-hand-rock`
    }
    if(iconName=='scissor'){
        return `far fa-hand-scissors`
    }
    else{
        return `far fa-hand-paper`
    }
}

function human(index){

let computer=Math.floor(Math.random()*3)

let computerChosen=['rock','scissor', 'paper'][computer]
let humanChosen=['rock','scissor', 'paper'][index]

 console.log(humanChosen +" "+computerChosen)
 let reincon=icon(humanChosen)
let comincon=icon(computerChosen)
 let html=document.createElement('i')
   html.classList=reincon
   let parent=document.getElementById('human')
    parent.prepend(html)

    let html1=document.createElement('i')
    html1.classList=comincon
    let parent1=document.getElementById('computer')
     parent1.prepend(html1)

setTimeout(()=>{
    let computerWin=win[computerChosen][humanChosen]
   // console.log(`Coomputer pick ${computerChosen} and Human pick ${humanChosen}  ` ) 
let winners=document.getElementById('winner')
if(computerWin=='win'){
    winners.innerText='*** Compter WIN *** Human Lose '

      let getComputerPoint=localStorage.getItem('C_point')
        let updateComputerPorint =parseInt(getComputerPoint)
             console.log(updateComputerPorint)
           if(isNaN(updateComputerPorint)){
                updateComputerPorint=1
                 localStorage.setItem('C_point',updateComputerPorint)
                 let print_c=document.getElementById('computerpoint')
                    print_c.innerText=updateComputerPorint
              }
             else{
                console.log(updateComputerPorint)
                   updateComputerPorint+=1
                    localStorage.setItem('C_point',updateComputerPorint)
                    let getComputerPointlocalStorage=localStorage.getItem('C_point')
                    let print_c=document.getElementById('computerpoint')
                    print_c.innerText=getComputerPointlocalStorage
                 }
 
}
else if(computerWin=='lose'){
 // console.log('Human win Compter Lose')
  winners.innerText='*** Human WIN *** Compter Lose '
   
  let getHumanPoint=localStorage.getItem('H_point')
  let updateHumanPorint =parseInt(getHumanPoint)
  console.log(updateHumanPorint)
     if(isNaN(updateHumanPorint)){
          updateHumanPorint=1
          console.log(updateHumanPorint)
           localStorage.setItem('H_point',updateHumanPorint)
           let print_h=document.getElementById('humanpoint')
          print_h.innerText=updateHumanPorint
        }
       else{
           updateHumanPorint+=1
              localStorage.setItem('H_point',updateHumanPorint)
              let getHumanPointlocalStorage=localStorage.getItem('H_point')
              let print_h=document.getElementById('humanpoint')
              print_h.innerText=getHumanPointlocalStorage
           }

}
else{
   // console.log('Human and Compter draw')
  winners.innerText='*** Match Draw ***'

}

parent.removeChild(html)
parent1.removeChild(html1)
},10000)

}



