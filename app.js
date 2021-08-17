const displayBox = document.getElementById("color-display");
const body = document.getElementsByTagName("body")[0];
var firstClick = false;
var t1;
var t2;
var differenceMilliseconds;
var differenceSeconds;
var myTimer;

// For the Game...
// Use Date object
// During event one (i.e. flash), get current date/time = start time
// During 2nd event (user click), get current date/time = end time
// Take difference (should be positive. If negative, then the user premitively clicked before the flash)
// 

function filterTwoDigits(value) {

    const stringValue = value.toString();
    const stringLength = stringValue.length;
    var newNumberString;

    // Regex function Search will return position of match or -1 if no match 
    var regex = "\\.";
    var regexPosition = stringValue.search(regex);

    // if no decimal & non-empty, add decimal
    if (regexPosition == -1 && stringValue !== "") {
        newNumberString = stringValue + ".00";
    }

    // if decimal exists, but no digits
    else if (regexPosition == stringLength - 1) {
        newNumberString = stringValue + "00";
    }

    // if decimal exists, but only 1 digit
    else if (regexPosition == stringLength - 2) {
        newNumberString = stringValue + "0";
    }

    // decimal exists and has 2 or more digits, we should trim (sorry no rounding)
    else {
        var cutOff = regexPosition + 3;
        newNumberString = stringValue.substring(0, cutOff);
    }

    return newNumberString;
}

function main() {

    if (!firstClick) {
        console.log("First click, new timer");
        firstClick = true;
        t1 = new Date();
        body.style.backgroundColor="#81b29a";

        myTimer = setInterval(function () {

            t2 = Date.now();
            differenceMilliseconds = t2 - t1;
            differenceSeconds = filterTwoDigits(differenceMilliseconds / 1000);
            
            // Update UI
            displayBox.innerHTML = differenceSeconds;

        }, 10); // calculation & update happens every 10 milliseconds
    }

    else {
        console.log("second click, stopping timer");
        clearInterval(myTimer);
        body.style.backgroundColor = "#e07a5f";
        firstClick = false;
    }
}

window.addEventListener("click", function(event) {
    main();
});