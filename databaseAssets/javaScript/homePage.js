async function updatePage() {
    console.log('');
    console.log('running func, updatePage');
    if (isLoggedInCheck()) {
document.getElementById("accountButton").innerHTML='<div id="profilePicHome"></div> Account';
document.getElementById("profilePicHome").innerHTML='<img src="' + GLOBAL_user.photoURL + '" alt="Profile Picture">';
    } else {
        document.getElementById("accountButton").innerHTML='<div id="profilePicHome"></div> Sign in / Sign up';
        document.getElementById("profilePicHome").innerHTML='';
    }
    updateForm();
}