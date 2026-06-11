// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOJKFR3LU95eIa2EgM1cqMuI0VlOIks9E",
  authDomain: "jacob-a-23154ja-12comp-project.firebaseapp.com",
  databaseURL: "https://jacob-a-23154ja-12comp-project-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jacob-a-23154ja-12comp-project",
  storageBucket: "jacob-a-23154ja-12comp-project.firebasestorage.app",
  messagingSenderId: "249853961189",
  appId: "1:249853961189:web:53fd9534d7b185deedc50c"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log("Firebase initialize finished:");
  console.log(firebase);