const tag=[
    {
        video:{
           videoname:'How to',
           videoUrl:'https://www.youtube.com/watch?v=2Hpet11EHrM',
           videolength:'150 MB',
           tags:['how to','make','coffe' ],
          }
       
     },
    {
       
        video:{
           videoname:'how to make a cup of tea',
           videoUrl:'https://www.youtube.com/watch?v=2Hpet11EHrM',
           videolength:'15 MB',
           tags:['how to make','tea' ],
           
        }
    },
    {video:{
           videoname:'top 10 funny video',
           videoUrl:'https://www.youtube.com/watch?v=2Hpet11EHrM',
           videolength:'15 MB',
           tags:['top 10' ,'funny video' ],
           
        }
    
    }
    ,
    {
        video:{
           videoname:'dad villa',
           videoUrl:'https://www.youtube.com/watch?v=2Hpet11EHrM',
           videolength:'110 MB',
           tags:['how to','how to creat', ],
           }
    },
    
    {
        video:{
           videoname:'how to creat a website',
           videoUrl:'https://www.youtube.com/watch?v=2Hpet11EHrM',
           videolength:'220 MB',
           tags:['how to','website','creat' ],
        }
    },
    {
        video:{
           videoname:'how to get a Domain and Hosting',
           videoUrl:'https://www.youtube.com/watch?v=2Hpet11EHrM',
           videolength:'22 MB',
           tags:['how to ', 'get','domain and dosting' ],
        }
    },
    ]
    localStorage.setItem('tagage',JSON.stringify(tag))
    let pas=JSON.parse(localStorage.getItem('tagage'))
    console.log(pas)
     
        //  pas.forEach(i=>{
        //      console.log(i.video.videoname)
        //  })
    
    
    let returnTag =pas.filter(item=>{
        item.video.tags.push(item.video.videoname)
      for(i in item.video.tags){
          let tagTostring=item.video.tags.join('')
          if(tagTostring.match('dad')){
            if(item.video.tags[i].match('dad')){
                return item.video 
            }
         
       }
          
      }
    })
    returnTag.forEach(i=>{
         console.log(i.video)
    })
    
    