const minAge = 5;
const maxAge = 150;
let accountCreation;

async function submitForm() {
    console.log('');
    console.log('attempting to submit form');
    const username = document.getElementById("username").value;
    const birthDate = document.getElementById("birthDate").value;

    // replace doc get el by id in all files with const's at top, maybe, needs to update / check when called

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

    await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
        if (!data.val()) {
            accountCreation = true;
        } else {
            accountCreation = false;
        }
    });

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

    });

    updatePage();
    successConfetti();

}


async function updatePage() {
    console.log('');
    console.log('running func, updatePage');
    if (isLoggedInCheck()) {
        updateIDStuff(true);
    } else {
        updateIDStuff(false);
    }
    updateForm();
}

async function updateIDStuff(isLoggedIn) {
    if (isLoggedIn) {
        console.log('user is logged in so altering page accordingly');
        let username;
        console.log('getting user data from firebase');
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/gatheredData/username').once('value', (data) => {
            username = data.val();
        });
        if (username) {
            if (accountCreation) {
                document.getElementById('greetingText').innerHTML = "account created";
                console.log('username was found as account was just created');
                accountCreation = false;
            } else {
                document.getElementById('greetingText').innerHTML = "Welcome back " + username;
                console.log('username was found, welcoming user back');
            }
        } else {
            if (document.getElementById('username').value) {
                document.getElementById('greetingText').innerHTML = "Welcome " + document.getElementById('username').value + ", submit this form to create your account.";
                console.log('username was not found, welcoming user with username in form');
            } else {
                document.getElementById('greetingText').innerHTML = "Welcome " + GLOBAL_user.displayName + ", submit this form to create your account.";
                console.log('username was not found, welcoming user with their google displayName');
            }
        }
        console.log('updating button to logout button as already logged in');
        document.getElementById('logButton').innerHTML = "<button onclick='googleLogoutRequest()'>Logout</button>";
        document.getElementById('profilePicAccount').innerHTML = '<img src="' + GLOBAL_user.photoURL + '" alt="Profile Picture">';
    } else {
        console.log('user is not logged in so altering page accordingly');
        console.log('setting greetingText to "please log in"');
        document.getElementById('greetingText').innerHTML = "Please log in";
        console.log('updating button to login button as user is logged out');
        document.getElementById('logButton').innerHTML = "<button onclick='googleLoginRequest()'>Login with Google</button>";
        document.getElementById('profilePicAccount').innerHTML = '';
    }
}

async function updateForm() {
    await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
        let info = data.val();
        if (info) {
            if (fieldIsNull(document.getElementById("username").value)) {
                document.getElementById("username").value = info.gatheredData.username;
            }
            if (fieldIsNull(document.getElementById("birthDate").value)) {
                document.getElementById("birthDate").value = info.gatheredData.birthDate;
            }
        } else if (fieldIsNull(document.getElementById("username").value) && GLOBAL_user.displayName) {
            document.getElementById("username").value = GLOBAL_user.displayName;
        }
    }, logError);
}

