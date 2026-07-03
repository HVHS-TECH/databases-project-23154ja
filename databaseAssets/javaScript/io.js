
/************************
this function calls the library I downloaded from https://confettijs.org/ and creates confetti
************************/
function successConfetti() {
    confetti({
        position: { x: innerWidth / 2, y: innerHeight / 2 },
        count: 1000,
        size: 1,
        velocity: 200,
        fade: false
    });
}


/************************
this function checks if a piece of data is empty 
************************/
function fieldIsNull(data) {
    // checks if is null or is just whitespace
    if ((data == null) || (data.trim() == "")) {
        return (true);
    } else {
        return (false);
    }
}


/************************
this function logs an error if a firebase read or write was unsuccessful
************************/
function logError(errorMessage) {
    // checks to make sure error message is not null
    if (errorMessage) {
        console.log("");
        console.log('there was an error: ');
        console.log(errorMessage);
    }
}


/************************
this function checks if user is signed in with google (does not mean they are logged into a wormlife plus account)
************************/
function isLoggedInCheck() {
    if (GLOBAL_user) {
        return (true);
    } else {
        return (false);
    }
}


/************************
this function compares the inputted date to the current date and checks to see if it is in between the min and max ages
************************/
function isValidDate(date) {
    // gets the year month and day of the inputted date string
    let userYear = returnDates(date, 'year');
    let userMonth = returnDates(date, 'month');
    let userDay = returnDates(date, 'day');
    // gets the current year month and day
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    // if the year is in between min and max return true
    if (currentYear - userYear > minAge && currentYear - userYear < maxAge) {
        return true;
        // else if the year is the minimum, call func that compares down to the specific day
    } else if (currentYear - userYear == minAge) {
        return compareDaysAndMonths(currentMonth, userMonth, 'min', currentDay, userDay);
        // else if the year is the max, call func that compares down to the specific day
    } else if (currentYear - userYear == maxAge) {
        return compareDaysAndMonths(currentMonth, userMonth, 'max', currentDay, userDay);
    } else {
        // if none of these are true that means the year is greater than the max age or less than the min age so return false
        return false;
    }

}


/************************
this func takes a text input with dates in the format: yyyy-mm-dd(-....) where the brackets are optional
it returns the specific value that was asked for
************************/
function returnDates(string, ymORd) {
    // calculates positioning of dashes
    let dash1 = string.indexOf('-');
    let dash2 = string.slice(dash1 + 1).indexOf('-') + dash1 + 1;
    let dash3 = string.slice(dash2 + 1).indexOf('-') + dash2 + 1;

    // if the string doesn't have a third dash then dash3 will equal dash2
    if (dash3 == dash2) {
        // set dash 3 to three more than dash two, this accounts for dash two and the two day characters
        dash3 = dash2 + 3;
    }
    // returns the specific value that was asked for
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


/************************
this function compares the inputted months and days to the current months and days 
it checks to see if it is in between the min and max ages
it is called when the max or min year and the inputted year are the same
************************/
function compareDaysAndMonths(current, user, minmax, currentDay, userDay) {
    // if month is not max or min return true
    if (compareMonths(current, user, minmax) == 'continue') {
        return true;
        //if month is greater than max or less than min, return false
    } else if (compareMonths(current, user, minmax) == 'break') {
        return false;
        // if months is a max or min compare days, return true if less than max or greater than min, otherwise return false
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


/************************
this function is called by compareDaysAndMonths to compare months
if months is greater than max or less than min, return break
if months is less than max or greater than min, return continue
if months is equal to the max or min, return tryDays
************************/
function compareMonths(current, user, minmax) {
    if (minmax == 'max') {
        if (current < user) {
            return 'continue';
        } else if (current == user) {
            return 'tryDays';
        } else {
            return 'break';
        }
    } else if (minmax == 'min') {
        if (current > user) {
            return 'continue';
        } else if (current == user) {
            return 'tryDays';
        } else {
            return 'break';
        }
    }
}


/************************
this function checks if user is logged in to a wormlife plus account (not just signed in with google)
************************/
async function hasAccountAndIsLoggedInCheck() {
    // if user is signed in with google
    if (isLoggedInCheck()) {
        // set hasAccount to true or false depending on whether the user has an account
        let hasAccount = false;
        await firebase.database().ref('/users/' + GLOBAL_user.uid).once('value', (data) => {
            if (data.val()) {
                hasAccount = true;
            }
        }, logError);
        // return whether the user is signed in, and if signed in return whether they have an account
        return hasAccount;
    } else {
        return false;
    }
}


/************************
this function saves a score to firebase
************************/
async function logScore(gameID, score) {

    // gets time score was achieved - needs to be specific as it will be the unique key of the score
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours()
    let currentMinute = new Date().getMinutes()
    let currentSecond = new Date().getSeconds()
    let currentMillisecond = new Date().getMilliseconds()

    // adds the score to the database
    await firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/allScores/' + gameID).update({
        [currentYear + '-' + currentMonth + '-' + currentDay + '-' + currentHour + '-' + currentMinute + '-' + currentSecond + '-' + currentMillisecond]: score
    }, logError);
    updateHighscore(gameID);
}


/************************
this function updates the highscores stored in firebase
************************/
async function updateHighscore(gameID) {
    let highscore = -1;
    let date = '';
    let username = '';

    // if requested to update all, call this function again for every gameID there is
    if (gameID == 'all') {
        await firebase.database().ref('/highscores/').once('value', (data) => {
            data.forEach((gameIDs) => {
                updateHighscore(gameIDs.key);
            })
        }, logError);
    } else {
        // otherwise get the score data for the specific game being updated
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/allScores/' + gameID).once('value', (data) => {

            //sorts through the scores and finds the highest
            data.forEach((data2) => {
                if (data2.val() >= highscore) {
                    highscore = data2.val();
                    date = data2.key;
                }
            })
        }, logError);
        // if no scores
        if (highscore == -1) {
            // erase the highscores in both locations they are saved
            await firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID).set({}, logError);
            await firebase.database().ref('/highscores/' + gameID + '/' + GLOBAL_user.uid).set({}, logError);
            return;
        }
        //gets the username
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/gatheredData/username').once('value', (data) => {
            username = data.val();
        }, logError);

        // saves the highscores in both the placed they are saved
        await firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/highscores/' + gameID).set({
            'score': highscore,
            'date': date,
            'username': username
        }, logError);
        await firebase.database().ref('/highscores/' + gameID + '/' + GLOBAL_user.uid).set({
            'score': highscore,
            'date': date,
            'username': username
        }, logError);

    }
}

/************************
this function this function returns the appropriate suffix for an inputted num, eg 1 = st, 13 = th, 27 = th, 102 = nd
************************/
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

/************************
this function replaces characters that could be executed with fancy identifiers  
the browser will read them and display the original symbol without running it
************************/
function preventCodeInjection(string) {
    if (!string) return '';
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}