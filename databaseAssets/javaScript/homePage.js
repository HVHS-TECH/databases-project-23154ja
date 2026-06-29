
async function updatePage() {
    console.log('');
    console.log('running func, updatePage');
    if (await hasAccountAndIsLoggedInCheck()) {
        document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Account';
        document.getElementById("profilePicHome").innerHTML = '<img src="' + GLOBAL_user.photoURL + '" alt="Profile Picture">';
    } else {
        document.getElementById("accountButton").innerHTML = '<div id="profilePicHome"></div> Sign in / Sign up';
        document.getElementById("profilePicHome").innerHTML = '';
    }
}

async function goToGamePage(gameName) {
    if(await hasAccountAndIsLoggedInCheck()){
    if (gameName == '01wormLife') {
        location.href = 'databaseAssets/pages/gamePages/01wormLife.html';
    } else if (gameName == '02geoDash') {
        location.href = 'databaseAssets/pages/gamePages/02geoDash.html';
    }
} else {
    alert('please sign in');
}
}