const firebaseConfig = {
    apiKey: "AIzaSyD0M0wFOoyDn_mbXksOu_1v3ofHur3lpdk",
    authDomain: "kbw-projects.firebaseapp.com",
    projectId: "kbw-projects",
    storageBucket: "kbw-projects.appspot.com",
    messagingSenderId: "591331615963",
    appId: "1:591331615963:web:044fdb13bf80441220d8fe"
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
  var dashboard = document.getElementById("dashboard");
  var counter = document.getElementById("counter");
  dashboard.classList.remove("hidden");
  counter.classList.add("hidden");
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
  var heading = document.getElementById("heading")
  var count = document.getElementById("count")
  dashboard.classList.add("hidden")
  counter.classList.remove("hidden")
  heading.innerHTML = tasbeeh.toUpperCase();
  count.innerHTML = allTasbeeh[tasbeeh]
}

function changeCounter(type) {
    var count = document.getElementById("count");
    if (type === "plus") {
      if (activeTasbeeh === "subhanallah") {
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

  