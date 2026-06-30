async function updatePage() {
    if (await hasAccountAndIsLoggedInCheck()) {
    } else {
        location.href = '../../../';
    }
    if (typeof updatePageCont === "function") {
        updatePageCont();
    }
}