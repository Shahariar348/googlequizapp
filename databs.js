import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set,onValue,push,child,update  } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


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
const database=getDatabase(app)


function writeUserData(userId, name, email, imageUrl) {
  set(ref(database, `users/${userId}`),
   {username: name,
    email: email,
    profile_picture : imageUrl,
   }
  );
}

function readUserDate(){
  const datebateLocation=ref(database, 'users/' )
   onValue(datebateLocation,(snapshot) =>{
       console.log(snapshot.val())
   })
}
function readUserOneDate(userId){
  const datebateLocation=ref(database, 'users/'+userId)
   onValue(datebateLocation,(snapshot) =>{
       console.log(snapshot.val())
   })
  }
  function writeNewPost(uid, username, picture, title, body) {
    const db = getDatabase();
  
    // A post entry.
    const postData = {
      author: username,
      uid: uid,
      body: body,
      title: title,
      starCount: 0,
      authorPic: picture
    };
  
    // Get a key for a new Post.
    const newPostKey = push(child(ref(db), 'posts')).key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
    return update(ref(db), updates);
  }
  function updateUserDate(userId,name,email,image){
    const datebateLocation=ref(database, 'users/'+userId)
  
    onValue(datebateLocation,(snapshot) =>{
      let vate=snapshot.val()[0].working.push("new")
      set(datebateLocation,[{
        username: name,
        email: email,
        profile_picture :image,
        working:snapshot.val()[0].working
         }
        ]
      );
  })
   
  }
  // function writeUserData12( wrId,name,email,image){
  // const datebateLocation=(ref(database, 'users-post/'+wrId))
  //   set(datebateLocation,{
  //     username: name,
  //     email: email,
  //     profile_picture :image,
  //     onject:{
  //       work:12,
  //       houer:8
  //     }
  //   });
  // }
  function workingHour(userId,WRId,worObj){
   
      set(ref(database, `users/${userId}/work/${WRId}`),
      worObj
     );
   //  update(ref(database, `users/${userId}/work/${WRId}`),worObj)
}

let workingid={}
function workingMin(userId){ 
  const datebateLocation=ref(database, 'users/'+userId )
  onValue(datebateLocation,(snapshot) =>{
      let bai=snapshot.val()
      workingid=bai.work
      console.log(workingid)
      let object={
        username: "Alomk",
        email: "ashik@gamil.com",
        profile_picture : "imageUrl",
        work:workingid 
      }
      update(ref(database, 'users/'+userId),object)
  })
  
}
 

  let worObj={
    workId:"WR-Khan", 
    workmonth:"May"
   }
 writeUserData("SS-56489", "shakib", "ShahariarAlom@gamil.com", "./html/pngwing.com.png")
 //writeUserData("SS-56488", "Shahariar", "ShahariarAlom@gamil.com", "./html/pngwing.com.png",worObj)
 workingMin("SS-56488")
 readUserDate()
 workingHour("SS-56488","WR-Khan",worObj)
 //writeUserData12("SS-564848", "WR-Shahariar", "ShahariarAlom@gamil.com", "./html/pngwing.com.png")
// let th=writeNewPost
// th("SS-5648895", "7845", "ShahariarAlom@gamil.com", "./html/pngwing.com.png","hjj")

//  readUserOneDate("SS-5648")
// writeUserDatawork("SS-56488","work2","Wr-255881")
// writeUserDatawork("SS-56484","work2")
// updateUserDate("SS-56484", "Shahariar Alom", "shahariarslom5648@gamil.com", "./html/pngwing.com.png")

let url = 'https://www.example.com?name=n1&name=n2';
let params = (new URL(url)).searchParams;
params.get('name') // "n1"
params.getAll('name')
console.log(params.get('name'))