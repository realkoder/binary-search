"use strict"

const fs = require("fs");

let fileStream = fs.createReadStream("binarySearchDictionary/data/ddo_fullforms_2023-10-11.csv");

let fileData = "";

let globalArrayOfWords = [];

fileStream.on("data", chunk => {
    fileData += chunk;
});

fileStream.on("end", () => {
    globalArrayOfWords = fileData.split("\n").map(line => {
        const parts = line.split("\t");
        return {
            variant: parts[0],
            headword: parts[1],
            homograph: parts[2],
            partofspeech: parts[3],
            id: parts[4]
        }
    });
    console.log("LINE 28: ", globalArrayOfWords.length);
    console.log("LINE 28: ", globalArrayOfWords[348363]);

    globalArrayOfWords = globalArrayOfWords.sort((a, b) => a.variant - b.variant);

    const searchWord = "sidelomme";
    console.log(`Index for "${searchWord}": `, binarySearchFunction({ variant: searchWord }, globalArrayOfWords, compareWordVariant));

});


const compareWordVariant = (search, check) => {
    console.log(`comparing ${search.variant} with ${check.variant}`);
    return search.variant.localeCompare(check.variant);
};

const binarySearchFunction = (value, values, compare) => {
    if (values.length === 0) return;

    let start = 0;
    let end = values.length - 1;
    let middle = 0;
    let comparedValue = 0;

    while (start <= end) {
        middle = Math.floor(start + ((end - start) / 2));
        comparedValue = compare(value, values[middle]);

        if (comparedValue === 0) {
            return middle;
        } else if (comparedValue === 1) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }

    return -1;
}