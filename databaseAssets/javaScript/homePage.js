
async function updatePage() {
    console.log('');
    console.log('running func, updatePage');
    if (isLoggedInCheck()) {
        let hasAccount = false;
        await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
            if (data.val()) {
                hasAccount = true;
            }
        });
        if (hasAccount) {
            document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Account';
            document.getElementById("profilePicHome").innerHTML = '<img src="' + GLOBAL_user.photoURL + '" alt="Profile Picture">';
        } else {
            document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Sign in / Sign up';
            document.getElementById("profilePicHome").innerHTML = '';
        }
    } else {
        document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Sign in / Sign up';
        document.getElementById("profilePicHome").innerHTML = '';
    }
}