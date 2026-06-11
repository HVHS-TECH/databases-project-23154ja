function googleLoginRequest() {
  let pressed = true;
  firebase.auth().onAuthStateChanged((_user) => {
    if (pressed) {
        //call isloggenchech to see 
      googleLoginMiddleMan(_user);
    }
    pressed = false;
  });
}

function isLoggedInCheck(_user) {
    console.log('');
    console.log('runing func, isLoggedInCheck');
  if (_user) {
    console.log("user is logged in already");
    return(true);
  } else {
    console.log("user is not logged in");
    return(false);
  }
}