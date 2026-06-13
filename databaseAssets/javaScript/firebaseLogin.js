function googleLoginRequest() {
  
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
  let provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then((result) => {

    console.log('user has logged in');

  });
}


firebase.auth().onAuthStateChanged((_user) => {
    GLOBAL_user = _user
});