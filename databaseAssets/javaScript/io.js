

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
    let dash1 = date.indexOf('-');
    let dash2 = date.slice(dash1 + 1).indexOf('-') + dash1 + 1;

    let userYear = date.slice(0, dash1);
    let userMonth = date.slice(dash1 + 1, dash2);
    let userDay = date.slice(dash2 + 1)

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


function logScore(gameID, score) {

       let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    let currentDay = new Date().getDate();
    let currentHour = new Date().getHours()
    let currentMinute = new Date().getMinutes()
    let currentSecond = new Date().getSeconds()

    firebase.database().ref('/users/' + GLOBAL_user.uid + '/scores/' + gameID).update({
        
         [currentYear+'-'+currentMonth+'-'+currentDay+'-'+currentHour+'-'+currentMinute+'-'+currentSecond]: score

    });
}