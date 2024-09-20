const firebaseConfig = {
  apiKey: "AIzaSyD0M0wFOoyDn_mbXksOu_1v3ofHur3lpdk",
  authDomain: "kbw-projects.firebaseapp.com",
  projectId: "kbw-projects",
  storageBucket: "kbw-projects.appspot.com",
  messagingSenderId: "591331615963",
  appId: "1:591331615963:web:044fdb13bf80441220d8fe",
};
var provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var auth = firebase.auth();

var userData = {};
var subhanallah = 0;
var alhamdulillah = 6;
var allahUakbar = 0;
var duroodEPak = 0;
var activeTasbeeh = "";

function dashboadClick() {
  var allTasbeeh = {
    subhanallah,
    alhamdulillah,
    allahUakbar,
    duroodEPak,
  };
  var dashboard = document.getElementById("dashboard");
  var counter = document.getElementById("counter");
  dashboard.classList.remove("hidden");
  counter.classList.add("hidden");

  var tasbeehCount;

  Object.keys(allTasbeeh).map((tasbeeh) =>{
    db.collection(tasbeeh).where("uid","==",userData.uid)
    .get()
    .then((res) => {
      if (res.empty){
        tasbeehCount = 0;
      }else{
        tasbeehCount = res.docs[0].data().count
      }
      document.getElementById(`${tasbeeh}Count`).innerHTML = tasbeehCount+" times";
    })
  })
}

function tasbeehClick(tasbeeh) {
  var allTasbeeh = {
    subhanallah,
    alhamdulillah,
    allahUakbar,
    duroodEPak,
  };
  activeTasbeeh = tasbeeh;
  var dashboard = document.getElementById("dashboard");
  var counter = document.getElementById("counter");
  var heading = document.getElementById("heading");
  var count = document.getElementById("count");
  dashboard.classList.add("hidden");
  counter.classList.remove("hidden");
  heading.innerHTML = tasbeeh.toUpperCase();

  db.collection(activeTasbeeh)
    .where("uid", "==", userData.uid)
    .get()
    .then((res) => {
      if (!res.empty) {
        res.forEach((element) => {
          var countData = element.data();
          count.innerHTML = countData.count;
          allTasbeeh[activeTasbeeh] = countData.count;
          subhanallah = allTasbeeh.subhanallah;
          alhamdulillah = allTasbeeh.alhamdulillah;
          allahUakbar = allTasbeeh.allahUakbar;
          duroodEPak = allTasbeeh.duroodEPak
          console.log("variable check",allTasbeeh[activeTasbeeh])
        });
      } else {
        count.innerHTML = 0;
        db.collection(activeTasbeeh)
          .add({
            count: 0,
            uid: userData.uid,
          })
          .then(() => {
            console.log("collection created succesfully");
          })
          .catch((e) => {
            console.log(e);
          });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}

function changeCounter(type) {
  var count = document.getElementById("count");
  if (type === "plus") {
    if (activeTasbeeh === "subhanallah") {
      console.log(subhanallah)
      subhanallah++;
      count.innerHTML = subhanallah;
    }
    if (activeTasbeeh === "alhamdulillah") {
      alhamdulillah++;
      count.innerHTML = alhamdulillah;
    }
    if (activeTasbeeh === "allahUakbar") {
      allahUakbar++;
      count.innerHTML = allahUakbar;
    }
    if (activeTasbeeh === "duroodEPak") {
      duroodEPak++;
      count.innerHTML = duroodEPak;
    }
  } else {
    if (Number(count.innerHTML) > 0) {
      if (activeTasbeeh === "subhanallah") {
        subhanallah--;
        count.innerHTML = subhanallah;
      }
      if (activeTasbeeh === "alhamdulillah") {
        alhamdulillah--;
        count.innerHTML = alhamdulillah;
      }
      if (activeTasbeeh === "allahUakbar") {
        allahUakbar--;
        count.innerHTML = allahUakbar;
      }
      if (activeTasbeeh === "duroodEPak") {
        duroodEPak--;
        count.innerHTML = duroodEPak;
      }
    }
  }
}

function login() {
  event.preventDefault();

  var loginEmail = document.getElementById("loginEmail").value;
  var loginPass = document.getElementById("loginPassword").value;
  console.log(loginEmail, loginPass);
  auth
    .signInWithEmailAndPassword(loginEmail, loginPass)
    .then((data) => {
      localStorage.setItem("Firebase__uid", data.user.uid);
      getMyData(data.user.uid);
    })
    .catch((e) => {
      console.log(e);
    });
}

function signUp() {
  event.preventDefault();
  var fullName = document.getElementById("signupName").value;
  var signUpEmail = document.getElementById("signupEmail").value;
  var signUpPass = document.getElementById("signupPassword").value;

  auth
    .createUserWithEmailAndPassword(signUpEmail, signUpPass)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Account succesfully created");
      console.log("USER ==>>",user);

      db.collection("users")
        .add({
          fullName: fullName,
          email: signUpEmail,
          uid: user.uid,
        })
        .then((res) => {
          console.log("User succesfully created");
        })
        .catch((e) => {
          console.log(e);
        });
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
}

function getMyData(uid) {
  db.collection("users")
    .where("uid", "==", uid)
    .get()
    .then((res) => {
      res.forEach((element) => {
        userData = element.data();
        console.log(userData);
      });
      var signUpBtn = document.getElementById("login-signup");
      var accountName = document.getElementById("accName");
      var accEmail = document.getElementById("accEmail");

      signUpBtn.remove();
      accountName.innerHTML = userData.fullName;
      accEmail.innerHTML = userData.email;
    }).catch((e) => {
      console.log(e)
    })
    
    
}

function onReload() {


  let uid = localStorage.getItem("Firebase__uid");
  if (uid) {
    getMyData(uid);
    console.log(uid);
  }
 
}

onReload();

function handleSave() {
  var allTasbeeh = {
    alhamdulillah,
    allahUakbar,
    duroodEPak,
    subhanallah,
  };
  Object.keys(allTasbeeh).map((key) => {
    db.collection(key)
      .where("uid", "==", userData.uid)
      .get()
      .then((res) => {
        if (res.empty) {
          // Add a new entry if none exists
          db.collection(key)
            .add({
              count: allTasbeeh[key],
              uid: userData.uid,
            })
            .then((doc) => {
              console.log(`${key} count saved with ID: `, doc.id);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // Update the existing entry
          res.forEach((doc) => {
            db.collection(key).doc(doc.id).set({
              count: allTasbeeh[key],
              uid: userData.uid,
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
