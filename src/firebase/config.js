import firebase from "firebase/app"
import "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCdVlmXVISdn1LGFWKfVTc9wu-GGomJbEk",
  authDomain: "movies-project-a46f1.firebaseapp.com",
  projectId: "movies-project-a46f1",
  storageBucket: "movies-project-a46f1.appspot.com",
  messagingSenderId: "1025398034847",
  appId: "1:1025398034847:web:03daa9067eacf2ed22adaa"
};


// počáteční nastavení firebase (init)
firebase.initializeApp(firebaseConfig)


// počáteční nastavení služeb (services)
const projectFirestore = firebase.firestore()


export { projectFirestore }