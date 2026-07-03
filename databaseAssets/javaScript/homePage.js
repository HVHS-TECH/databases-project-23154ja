
/************************
this func is triggered when firebase loads and anytime after that the login state changes
************************/
async function updatePage() {
    //if is logged into wormlife plus account
    if (await hasAccountAndIsLoggedInCheck()) {
        // update the account button accordingly
        document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Account';
        document.getElementById("profilePicHome").innerHTML = '<img src="' + GLOBAL_user.photoURL + '" alt="Profile Picture">';
        // if not logged into wormlife plus account
    } else {
        // update account button accordingly
        document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Sign in / Sign up';
        document.getElementById("profilePicHome").innerHTML = '';
    }
}


/************************
this func is called by the game buttons
************************/
async function goToGamePage(gameName) {
    // goes to page if logged into wormlife plus account
    if (await hasAccountAndIsLoggedInCheck()) {
        if (gameName == '01wormLife') {
            location.href = 'databaseAssets/pages/gamePages/01wormLife.html';
        } else if (gameName == '02geoDash') {
            location.href = 'databaseAssets/pages/gamePages/02geoDash.html';
        }
    } else {
        alert('please sign in');
    }
}