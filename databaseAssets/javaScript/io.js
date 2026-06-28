

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
  console.log('their was an error: ');
  console.log(errorMessage);
  HTML_OUTPUT.innerHTML = errorMessage;

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

