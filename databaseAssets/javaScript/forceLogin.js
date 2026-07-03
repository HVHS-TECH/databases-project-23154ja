
/************************
this function stops people from going to pages they are not supposed to when not logged in
this function takes the place of the updatePage func as it needs to run as soon as firebase has initialized
************************/
async function updatePage() {
    // if user is not logged into a wormlife plus account (can still be just logged in with google)
    if (await hasAccountAndIsLoggedInCheck()) {
    } else {
    // take them to the home page
    // there will be no error as the only way to trigger this func is by hacking
    // just so happens that all the html pages with this script can follow this local path to get to the home page
        location.href = '../../../';
    }
    // this function replaces the updatePage func but some html pages still need this (everything except the actual games)
    // therefore the code checks to see if another file has the func to update page when using this script and if so will call it
    if (typeof updatePageCont === "function") {
        updatePageCont();
    }
}