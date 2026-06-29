async function updatePage() {
    if (await hasAccountAndIsLoggedInCheck()) {
    } else {
        location.href = '../../../';
    }
}