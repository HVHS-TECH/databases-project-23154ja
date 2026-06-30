function updatePageCont() {
 firebase.database().ref('/users/' + GLOBAL_user.uid +'/scores/'+gameID).once('value', (data) => {
        if (data.val()) {
        } else {
            document.getElementById('personalHighscore').innerHTML='play the game to get a highscore';
        }
    });
}