
function googleLoginRequest() {
  console.log('');
  console.log('running func, googleLoginRequest');

  if (!isLoggedInCheck()) {
    googleLoginPopup();

  }
}


function googleLoginPopup() {
  console.log('');
  console.log('running func, googleLoginPopup');

  let provider = new firebase.auth.GoogleAuthProvider();

  console.log('attempting to log in')

  firebase.auth().signInWithPopup(provider).then((result) => {

    console.log('user has logged in');
    console.log(result)
  });
}



function googleLogoutRequest() {
  console.log('');
  console.log('running func, googleLogoutRequest');
  firebase.auth().signOut();
  console.log('user has logged out');
}



firebase.auth().onAuthStateChanged((_user) => {
  console.log('');
  console.log('running firebase listener, onAuthStateChanged');
  GLOBAL_user = _user
  console.log('saved google data (or lack of) to variable');
  console.log('calling func to update page')
  updatePage();
});
