

// const roads=["Alices House-Bob's house","Daria's House-Ernie's house",
// "Daria's House-Town hall","Alices House-Bob's house1","Town hall-Bob's house1"
// ]
// function bulidGraph(edges){
//     let graph={}
//      function addadges(from,to){
        
//          if(graph[from]==null){
//              graph[from]=[to]
           
//          }
//          else{
//              graph[from].push(to)
//          }
//      }
//      for(let [from,to] of edges.map(r=>r.split("-"))){
//         console.log(from + " "+ to)
//         addadges(from,to)
//         addadges(to,from)
        
//      }
//      console.log(graph)
// }
// bulidGraph(roads)


// const pipline=(initial,first,second)=>{
//    return second(first(initial))
// }

// const onrigal=" this is original text"
// const trims=(text)=>{
//     return text.trim()
// }
// const reples=(text)=>{
//     return text.replace(/ /g, '.')
// }

// const result = pipline(onrigal,trims,reples)

const pipline2=(valuess,oparetion)=>{
 let result2=[]
   for(let v of valuess){
       result2.push(oparetion(v))
   }
   return result2
}
const dateis=["one","two","three","four","five"]


/*console.log(`some ${dateis.some(
    (x)=>{
        return x.length > 4
    }
)}`) */
const piplineresults=pipline2(dateis,(date)=>{
       if(date.length>4){
           return true
       }
       else{
           return false
       }
})



console.log(piplineresults)