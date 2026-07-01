async function updatePageCont() {
    firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID).once('value', (data) => {
        if (data.val()) {

            document.getElementById('personalHighscore').innerHTML = 'Your highscore: <span id="userHighscore"></span> &nbsp;&nbsp;&nbsp;&nbsp; You are <span id="userPlaceInLeaderboard"></span> place';

            firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID + '/score').once('value', (data) => {
                document.getElementById('userHighscore').innerHTML = data.val();
            });

        } else {
            document.getElementById('personalHighscore').innerHTML = 'play the game to get a highscore';
        }
    });
    await updateHighscore(gameID)
    displayHighscores(gameID);
}


async function displayHighscores(gameID) {

    document.getElementById('leaderboardContainer').innerHTML = '';
    firebase.database().ref('/highscores/' + gameID).orderByChild('score').once('value', (data) => {
        let highscoreArray = [];
        let keyArray = [];
        let place = false;

        data.forEach((data2) => {
            highscoreArray.push(data2.val());
            keyArray.push(data2.key);
        })
        highscoreArray.reverse();
        keyArray.reverse();

        keyArray.forEach((IDuid) => {
            console.log(IDuid)
        })
        for (let i = 0; i < keyArray.length; i++) {
            if (GLOBAL_user.uid == keyArray[i]) {
                place = i + 1;
            }
        }

        highscoreArray.forEach((highscore) => {
            document.getElementById('leaderboardContainer').innerHTML = document.getElementById('leaderboardContainer').innerHTML + '<tr><td>' + preventCodeInjection(highscore.username) + '</td><td>' + preventCodeInjection(highscore.score) + '</td><td>' + preventCodeInjection(returnDates(highscore.date, 'all')) + '</td></tr>';
        });
        if (place) {
            document.getElementById('userPlaceInLeaderboard').innerHTML = place + returnNumSuffix(place);
        }
    });
}