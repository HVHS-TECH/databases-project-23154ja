
// defines a global variable that stores the google data obtained when logging in
let GLOBAL_user;


/************************
this function is called when the user presses the login button
************************/
function googleLoginRequest() {
  // if the user is not logged in call the popup
  // this is just a precaution, the user shouldn't be able to click the login button when already logged in
  if (!isLoggedInCheck()) {
    googleLoginPopup();

  }
}


/************************
this function is called by the googleLoginRequest func
it triggers the popup where you can log in with google 
************************/
function googleLoginPopup() {
  // lets firebase know to use google to sign in
  let provider = new firebase.auth.GoogleAuthProvider();
  // triggers popup
  firebase.auth().signInWithPopup(provider).then((result) => {
    console.log('user has logged in');
    console.log(result)
  });
}


/************************
this function is called when the user presses the logout button
************************/
function googleLogoutRequest() {
  // signs the user out
  firebase.auth().signOut();
}


/************************
this is a listener that runs when the the page loads and when the google login state changes (when you log in or out)
************************/
firebase.auth().onAuthStateChanged((_user) => {
  //saves the google data (or lack of) to the global variable
  GLOBAL_user = _user
  // every html page has a js file with an update page func
  // when the login state changes the page will update accordingly
  updatePage();
});
