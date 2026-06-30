function updatePage() {
 firebase.database().ref('/users/' + GLOBAL_user.uid +'/scores/'+gameID).once('value', (data) => {
        if (data.val()) {
            console.log('gotdata')
        } else {
                        console.log('gotdatanot')

            document.getElementById('personalHighscore').innerHTML='play the game to get a highscore';
        }
    });
}