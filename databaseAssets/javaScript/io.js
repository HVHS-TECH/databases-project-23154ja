

function successConfetti() {
    confetti({
        position: { x: innerWidth / 2, y: innerHeight / 2 },
        count: 1000,
        size: 1,
        velocity: 200,
        fade: false
    });
}


function fieldIsNull(data) {
    console.log("");
    console.log("running func: fieldIsNull");
    if ((data == null) || (data.trim() == "")) {
        console.log("is Null")
        return (true);
    } else {
        console.log("field has content")
        return (false);
    }
}

function logError(errorMessage) {
    console.log("");
    console.log('there was an error: ');
    console.log(errorMessage);
}


function isLoggedInCheck() {
    console.log('');
    console.log('running func, isLoggedInCheck');
    if (GLOBAL_user) {
        console.log("user is logged in already");
        return (true);
    } else {
        console.log("user is not logged in");
        return (false);
    }
}

function isValidDate(date) {

    let userYear = returnDates(date, 'year');
    let userMonth = returnDates(date, 'month');
    let userDay = returnDates(date, 'day');
    console.log(userDay)


    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();

    console.log(userDay + ', ' + userMonth + ', ' + userYear)

    if (currentYear - userYear > minAge && currentYear - userYear < maxAge) {
        return true;
    } else if (currentYear - userYear == minAge) {
        return compareDays(currentMonth, userMonth, 'min', currentDay, userDay);
    } else if (currentYear - userYear == maxAge) {
        return compareDays(currentMonth, userMonth, 'max', currentDay, userDay);
    } else {
        return false;
    }

}


function returnDates(string, ymORd) {
    let dash1 = string.indexOf('-');
    let dash2 = string.slice(dash1 + 1).indexOf('-') + dash1 + 1;
    let dash3 = string.slice(dash2 + 1).indexOf('-') + dash2 + 1;

    if (dash3 == dash2) {
        dash3 = dash2 + 3;
    }
    if (ymORd == 'year') {
        return string.slice(0, dash1);
    } else if (ymORd == 'month') {
        return string.slice(dash1 + 1, dash2);
    } else if (ymORd == 'day') {
        return string.slice(dash2 + 1, dash3);
    } else if (ymORd == 'all') {
        return string.slice(dash2 + 1, dash3) + ' - ' + string.slice(dash1 + 1, dash2) + ' - ' + string.slice(0, dash1);
    }
}



function compareDays(current, user, minmax, currentDay, userDay) {

    if (compareMonths(current, user, minmax) == 'continue') {
        return true;
    } else if (compareMonths(current, user, minmax) == 'break') {
        return false;
    } else if (minmax == 'max') {
        if (currentDay < userDay) {
            return true;
        } else if (currentDay == userDay) {
            return false;
        } else {
            return false;
        }
    } else if (minmax == 'min') {
        if (currentDay > userDay) {
            return true;
        } else if (currentDay == userDay) {
            return true;
        } else {
            return false;
        }
    }

}



function compareMonths(current, user, minmax) {
    if (minmax == 'max') {
        if (current < user) {
            return 'continue';
        } else if (current == user) {
            return 'again';
        } else {
            return 'break';
        }
    } else if (minmax == 'min') {
        if (current > user) {
            return 'continue';
        } else if (current == user) {
            return 'again';
        } else {
            return 'break';
        }
    }
}

async function hasAccountAndIsLoggedInCheck() {
    if (isLoggedInCheck()) {
        let hasAccount = false;
        await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
            if (data.val()) {
                hasAccount = true;
            }
        });
        return hasAccount;
    } else {
        return false;
    }
}


async function logScore(gameID, score) {

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours()
    let currentMinute = new Date().getMinutes()
    let currentSecond = new Date().getSeconds()
    let currentMillisecond = new Date().getMilliseconds()

    await firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/allScores/' + gameID).update({
        [currentYear + '-' + currentMonth + '-' + currentDay + '-' + currentHour + '-' + currentMinute + '-' + currentSecond + '-' + currentMillisecond]: score
    });
    updateHighscore(gameID);
}



async function updateHighscore(gameID) {
    let highscore = -1;
    let date = '';
    let username = '';

    if (gameID == 'all') {
        await firebase.database().ref('/highscores/').once('value', (data) => {
            data.forEach((gameIDs) => {
                console.log(gameIDs.key)
                updateHighscore(gameIDs.key);
            })
        });
    } else {
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/allScores/' + gameID).once('value', (data) => {

            if (!data.hasChildren()) {
                return;
            }
            data.forEach((data2) => {
                if (data2.val() >= highscore) {
                    highscore = data2.val();
                    date = data2.key;
                }
            })
        });
        if (highscore==-1) {
            return;
        }
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/gatheredData/username').once('value', (data) => {
            username = data.val();
        });

        firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID).set({
            'score': highscore,
            'date': date,
            'username': username
        });
        firebase.database().ref('/highscores/' + gameID + '/' + GLOBAL_user.uid).set({
            'score': highscore,
            'date': date,
            'username': username
        });

    }
}

function returnNumSuffix(num) {
    if (num == 11 || num == 12 || num == 13) {
        return 'th';
    } else if (num % 10 == 1) {
        return 'st';
    } else if (num % 10 == 2) {
        return 'nd';
    } else if (num % 10 == 3) {
        return 'rd';
    } else {
        return 'th';
    }
}