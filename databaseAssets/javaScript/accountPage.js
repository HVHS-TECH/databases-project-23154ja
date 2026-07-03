
/************************
defining global variables
************************/
//setting the min and max age users must be before they can create an account
const minAge = 5;
const maxAge = 150;
// this is a variable that is used when logging in to determine if the user is returning or has just created their account
// it is given a value in the submitForm func
let accountCreation;


/************************
this function is called when the user presses the submit button
************************/
async function submitForm() {
    //gets data from form
    const username = document.getElementById("username").value.slice(0, maxUsernameLength);
    const birthDate = document.getElementById("birthDate").value;

    //if not filled out properly or not logged in with google then return an error
    if (fieldIsNull(username) || fieldIsNull(birthDate)) {
        alert('please fill out all fields');
        return;
    }
    if (!isValidDate(birthDate)) {
        alert('you must be 5 to 150 years old');
        return;
    }
    if (!GLOBAL_user) {
        alert('log in with google');
        return;
    }

    //store whether the user already has an account in a global variable
    await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
        if (!data.val()) {
            accountCreation = true;
        } else {
            accountCreation = false;
        }
    }, logError);

    //update the user's data
    await firebase.database().ref('/users/' + GLOBAL_user.uid).update({
        'gatheredData': {
            'username': username,
            'birthDate': birthDate
        },
        'googleData': {
            "emailAddress": GLOBAL_user.email,
            "phoneNumber": GLOBAL_user.phoneNumber,
            "photoURL": GLOBAL_user.photoURL,
            "googleDisplayName": GLOBAL_user.displayName
        }

    }, logError);

    //change the page to reflect that the user has submitted data / created an account
    updatePage();
    //creates confetti on screen to let the user know that their action was successful
    successConfetti();
}


/************************
this function is called onload after firebase has initialized and checked whether the user is logged in or not
it is also called again whenever the login state has changed or when the user submits the form
it updates the page with the latest info
************************/
function updatePage() {
    //call the updateIDstuff and updateForm modules and lets updateIDstuff know whether you are logged in or not
    if (isLoggedInCheck()) {
        updateIDStuff(true);
        //updateForm only runs when you are logged in
        updateForm();

    } else {
        updateIDStuff(false);
    }
    //call func to update highscores, this is not a module but and external func, 
    // it is being called so that if you change your username, your existing highscores update as well
    updateHighscore('all');
}


/************************
this function is one of the modules of the updatePage func
it updates the stuff at the top of the screen above the form like the profile pic, login/out button, and the greeting text
************************/
async function updateIDStuff(isLoggedIn) {
    //if user is logged in
    if (isLoggedIn) {
        //defining variable that their username will be stored in
        let username;
        // get username (or null) from firebase
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/gatheredData/username').once('value', (data) => {
            // store username in preexisting variable
            username = data.val();
        }, logError);
        //if there is a username in firebase (which means that the user has an account)
        if (username) {
            //if the user just created their account
            if (accountCreation) {
                // let them know that they were successful in creating their account
                document.getElementById('greetingText').innerHTML = "account created";
                accountCreation = false;
                // if it is not the users first time on this account
            } else {
                // welcome the user back with their username
                document.getElementById('greetingText').innerHTML = "Welcome back " + username;
            }
            // if there is no username in firebase meaning the user does not have an account
        } else {
            // if the user has a username entered in the form
            if (document.getElementById('username').value) {
                //greet them with the name entered in the form
                document.getElementById('greetingText').innerHTML = "Welcome " + document.getElementById('username').value + ", submit this form to create your account.";
                //if the user doesn't have anything written in the form
            } else {
                // greet them with their google display name
                document.getElementById('greetingText').innerHTML = "Welcome " + GLOBAL_user.displayName + ", submit this form to create your account.";
            }
        }
        // set the login/out button and profile pick to their logged in state
        document.getElementById('logButton').innerHTML = "<button onclick='googleLogoutRequest()'>Logout</button>";
        document.getElementById('profilePicAccount').innerHTML = '<img src="' + GLOBAL_user.photoURL + '" alt="Profile Picture">';
        //if the user is not logged in with google
    } else {
        // set greeting text, login/out button, and profile pic to their logged out state
        document.getElementById('greetingText').innerHTML = "Please log in";
        document.getElementById('logButton').innerHTML = "<button onclick='googleLoginRequest()'>Login with Google</button>";
        document.getElementById('profilePicAccount').innerHTML = '';
    }
}


/************************
this function is one of the modules of the updatePage func
it updates the account form and only is called when user is logged in with google (but doesn't necessarily have a wormlife plus account)
************************/
async function updateForm(isLoggedIn) {
    //get account data (or lack of)
    await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
        let info = data.val();
        // if the user has a wormlife plus account
        if (info) {
            // if the user hasn't written anything in the username field
            if (fieldIsNull(document.getElementById("username").value)) {
                // fill it with the username saved in their account
                document.getElementById("username").value = info.gatheredData.username.slice(0, maxUsernameLength);
            }
            // if the user hasn't written anything in the birthdate field
            if (fieldIsNull(document.getElementById("birthDate").value)) {
                //fill it with the birthdate saved in their account
                document.getElementById("birthDate").value = info.gatheredData.birthDate;
            }
            //if the user does not have a wormlife account account 
            // and doesn't have anything written in their username field 
            // and is logged in with a google account that has a name attached to it
        } else if (fieldIsNull(document.getElementById("username").value) && GLOBAL_user.displayName) {
            // fill username field with google display name
            document.getElementById("username").value = GLOBAL_user.displayName.slice(0, maxUsernameLength);
        }
    }, logError);
}

