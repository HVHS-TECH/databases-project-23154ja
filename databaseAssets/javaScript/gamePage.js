
/************************
this thing makes the page reload when clicking the back button in your browser (which is the only way to get back from some games)
without this the highscores do not update as the page isn't refreshing 
************************/
window.onpageshow = function (event) {
    if (event.persisted) {
        window.location.reload();
    }
};


/************************
this func is for sites with the forceLogin.js script which takes the updatePage func, forceLogin.js will call this func
************************/
async function updatePageCont() {
    //get the scores for this game for the user
    firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID).once('value', (data) => {
        // if the user has scores
        if (data.val()) {
            // prepare the text to be filled with the user's highscore data
            document.getElementById('personalHighscore').innerHTML = 'Your highscore: <span id="userHighscore"></span> &nbsp;&nbsp;&nbsp;&nbsp; You are <span id="userPlaceInLeaderboard"></span> place';
            //if the user doesn't have scores
        } else {
            // inform them that they need to play the game to get a highscore 
            document.getElementById('personalHighscore').innerHTML = 'play the game to get a highscore';
        }
    }, logError);
    // update the highscores
    await updateHighscore(gameID);
    // after highscores have been updated, call the func to display them
    displayHighscores(gameID);
}


/************************
function to show everybody's highscores on screen
************************/
async function displayHighscores(gameID) {
    // clear the container that will contain the highscores
    document.getElementById('leaderboardContainer').innerHTML = '';
    // get the highscores and sort them from lowest to highest (firebase is not able to do it the other way around)
    firebase.database().ref('/highscores/' + gameID).orderByChild('score').once('value', (data) => {
        // declare local variables
        let highscoreArray = [];
        let keyArray = [];
        let place = false;

        // put the highscore values and keys (uid's) into separate arrays
        data.forEach((data2) => {
            highscoreArray.push(data2.val());
            keyArray.push(data2.key);
        })
        // reverse the arrays so they are from highest to smallest
        highscoreArray.reverse();
        keyArray.reverse();

        // find users uid and record what place it is
        for (let i = 0; i < keyArray.length; i++) {
            if (GLOBAL_user.uid == keyArray[i]) {
                place = i + 1;
            }
        }

        // for every highscore
        highscoreArray.forEach((highscore) => {
            //display it in the leaderboardContainer
            document.getElementById('leaderboardContainer').innerHTML = document.getElementById('leaderboardContainer').innerHTML + '<tr><td>' + preventCodeInjection(highscore.username) + '</td><td>' + preventCodeInjection(highscore.score) + '</td><td>' + preventCodeInjection(returnDates(highscore.date, 'all')) + '</td></tr>';
        });
        // if the user has a highscore
        if (place) {
            //update the text to show score and what place the user is
            document.getElementById('userPlaceInLeaderboard').innerHTML = place + returnNumSuffix(place);
            firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID + '/score').once('value', (data) => {
                document.getElementById('userHighscore').innerHTML = data.val();
            }, logError);
        }
    }, logError);
}