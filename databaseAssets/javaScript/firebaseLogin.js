
function googleLoginRequest() {
    console.log('');
    console.log('runing func, googleLoginRequest');
  
if(!isLoggedInCheck()) {
         googleLoginPopup();

}
}

function isLoggedInCheck() {
    console.log('');
    console.log('runing func, isLoggedInCheck');
  if (GLOBAL_user) {
    console.log("user is logged in already");
    return(true);
  } else {
    console.log("user is not logged in");
    return(false);
  }
}



function googleLoginPopup() {
    console.log('');
    console.log('runing func, googleLoginPopup');

  let provider = new firebase.auth.GoogleAuthProvider();

  console.log('attempting to log in')

  firebase.auth().signInWithPopup(provider).then((result) => {

    console.log('user has logged in');
console.log(result)
  });
}


function googleLogoutRequest() {
  firebase.auth().signOut();
  console.log('user has logged out');
}



    firebase.auth().onAuthStateChanged((_user) => {
    GLOBAL_user = _user
    two();
});

function two() {
if(isLoggedInCheck) {

} else {
  document.getElementById('greetingText').value
}
}


function logError(errorMessage) {
  console.log("");
  console.log('their was an error: ');
  console.log(errorMessage);

}