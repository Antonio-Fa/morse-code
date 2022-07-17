const toMorseRef = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: ".--",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    0: "-----",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "'": ".----.",
    "!": "-.-.--",
    "/": "-..-.",
    "(": "-.--.",
    ")": "-.--.-",
    "&": ".-...",
    ":": "---...",
    ";": "-.-.-.",
    "=": "-...-",
    "+": ".-.-.",
    "-": "-....-",
    _: "..--.-",
    '"': ".-..-.",
    $: "...-..-",
    "@": ".--.-.",
};

const toEngRef = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    ".-.-.-": ".",
    "--..--": ",",
    "..--..": "?",
    ".----.": "'",
    "-.-.--": "!",
    "-..-.": "/",
    "-.--.": "(",
    "-.--.-": ")",
    ".-...": "&",
    "---...": ":",
    "-.-.-.": ";",
    "-...-": "=",
    ".-.-.": "+",
    "-....-": "-",
    "..--.-": "_",
    ".-..-.": '"',
    "...-..-": "$",
    ".--.-.": "@",
};

function translate(input) {
    //Check if the string contains any letters of the alphabet, if there is, we can assume it is in english and can now translate into morse. Otherwise, we can assume it is morse and translate into engish.
    if (/[a-z]/gi.test(input)) {
        const toMorse = input
            .toUpperCase()
            //seperates words into an array of words
            .split(" ")
            //passes in the array to make each word into its own array
            .map((subarr) => {
                return (
                    subarr
                        //seperates characters of each individual word and stores then in their own sub-array
                        .split("")
                        //checks each character in the subarray against the object key, if there is a match, replaces the character with the value of that key. Otherwise, character stays the same.
                        .map((char) => {
                            return toMorseRef[char] ? toMorseRef[char] : char;
                        })
                        //joins characters back together to make the full word again as a string. Gets stored back in the array of words.
                        .join(" ")
                );
            })
            //Joins the morse code words in the array together to create a string of words seperated by ' / '
            .join(" / ");
        return toMorse;
    } else {
        //same as above, just with conditions specific to morse into english for the splits.
        const toEng = input
            .split(" / ")
            .map((subarr) => {
                return subarr
                    .split(" ")
                    .map((char) => {
                        return toEngRef[char] ? toEngRef[char] : char;
                    })
                    .join("");
            })
            .join(" ");
        return toEng;
    }
}

// Same as above but as two seperate functions (no check to pick between the two)
// function translateToMorse(input) {
//     const toMorse = input
//         .toUpperCase()
//         .split(" ")
//         .map((subarr) => {
//             return subarr
//                 .split("")
//                 .map((char) => {
//                     return toMorseRef[char] ? toMorseRef[char] : char;
//                 })
//                 .join(" ");
//         })
//         .join("  ");
//     return toMorse;
// }

// function translateToEng(input) {
//     const toEng = input
//         .split("  ")
//         .map((subarr) => {
//             return subarr
//                 .split(" ")
//                 .map((char) => {
//                     return toEngRef[char] ? toEngRef[char] : char;
//                 })
//                 .join("");
//         })
//         .join(" ");
//     return toEng;
// }

const translationUpperDisplay = document.getElementById(
    "translationUpperDisplay",
);
const translationLowerDisplay = document.getElementById(
    "translationLowerDisplay",
);
const userInput = document.getElementById("userInput");
const translationButton = document.getElementById("getTranslation");

//When the translate button is clicked, it will take the textarea's value and store it, then parse it into our function and change our innerText to reflect.
translationButton.addEventListener("click", () => {
    const inputValue = userInput.value;
    //parses users input directly into the upper display to show what needs to be translated.
    translationUpperDisplay.innerText = inputValue;
    //changes lowerDisplay to show the translation of the upperdisplay (Using our translate function and passing in the userInput's value)
    translationLowerDisplay.innerText = translate(inputValue);
    //resets the textarea's value to be empty
    userInput.value = "";
});
