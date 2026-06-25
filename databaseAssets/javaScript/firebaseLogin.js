
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
     console.log('');
    console.log('runing func, googleLogoutRequest');
  firebase.auth().signOut();
  console.log('user has logged out');
}



    firebase.auth().onAuthStateChanged((_user) => {
      console.log('');
    console.log('runing firebase listener, onAuthStateChanged');
    GLOBAL_user = _user
    console.log('saved google data (or lack of) to variable');
    console.log('calling actual func to get async funtionalaity')
    authStateChangedFuncForAsync();
});

async function authStateChangedFuncForAsync() {
        console.log('');
    console.log('runing func, authStateChangedFuncForAsync');
if(isLoggedInCheck()) {
      console.log('user is logged in so altering page accordingly');
  let username;
  console.log('getting user data from firebase');
  await firebase.database().ref('/users/' + GLOBAL_user.uid + 'gatheredData/username').once('value', (data) => {
        username = data.val();
  });
  if(username){
      document.getElementById('greetingText').innerHTML="Welcome back "+username;
      console.log('username was found, welcoming user back');
  } else {
  document.getElementById('greetingText').innerHTML="Welcome "+GLOBAL_user.displayName;
        console.log('username was not found, welcoming user with their google displayName');

  }
  console.log('updating button to logout button as already logged in');
document.getElementById('logButton').innerHTML="<button onclick='googleLogoutRequest()'>Logout</button>";
} else {
        console.log('user is not logged in so altering page accordingly');
        console.log('seting greetingText to "please log in"');
  document.getElementById('greetingText').innerHTML="Please log in";
    console.log('updating button to login button as user is logged out');
  document.getElementById('logButton').innerHTML="<button onclick='googleLoginRequest()'>Login</button>";
}
}


function logError(errorMessage) {
  console.log("");
  console.log('their was an error: ');
  console.log(errorMessage);

}