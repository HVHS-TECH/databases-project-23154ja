function updatePageCont() {
    firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID).once('value', (data) => {
        if (data.val()) {

            document.getElementById('personalHighscore').innerHTML = 'Your highscore: <span id="userHighscore"></span> &nbsp;&nbsp;&nbsp;&nbsp; You are <span id="userPlaceInLeaderboard"></span> place';

            firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID + '/score').once('value', (data) => {
                document.getElementById('userHighscore').innerHTML = data.val();
            });

        } else {
            document.getElementById('personalHighscore').innerHTML = 'play the game to get a highscore';
        }
        displayHighscores(gameID);
    });
}


async function displayHighscores(gameID) {

    document.getElementById('leaderboardContainer').innerHTML = '';
    firebase.database().ref('/highscores/' + gameID).orderByChild('score').once('value', (data) => {
        let highscoreArray = [];
        data.forEach((data2) => {
            highscoreArray.push(data2.val());
        })
        highscoreArray.reverse();

        highscoreArray.forEach((highscore) => {

            document.getElementById('leaderboardContainer').innerHTML = document.getElementById('leaderboardTable').innerHTML + '<tr><td>' + highscore.username + '</td><td>' + highscore.score + '</td><td>' + returnDates(highscore.date, 'all') + '</td></tr>';
        });
    });
}