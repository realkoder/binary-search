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
    const maxGuessAmount = Math.ceil(Math.log2(globalArrayOfWords.length - 1));
    globalArrayOfWords = globalArrayOfWords.sort((a, b) => a.variant.localeCompare(b.variant));

    const searchWord = "hestevogn";
    console.log("Max iteration for finding a word within globalArrayOfWords = ", maxGuessAmount);
    console.log(`Index for "${searchWord}": `, binarySearchFunction({ variant: searchWord }, globalArrayOfWords, compareWordVariant));
    console.log("Index for searchword with js find method: ", globalArrayOfWords.findIndex(word => word.variant === searchWord));


    // ----------------------------------------------------------------------
    // NOW TIME FOR MEASUREMENTS
    // Home made binary search
    performance.mark("binary-search-start");
    binarySearchFunction({ variant: searchWord }, globalArrayOfWords, compareWordVariant);
    performance.mark("binary-search-end");
    performance.measure("binary-search", "binary-search-start", "binary-search-end");

    // Javascripts own find method:
    performance.mark("find-method-start");
    globalArrayOfWords.findIndex(word => word.variant === searchWord)
    performance.mark("find-method-end");
    performance.measure("find-method", "find-method-start", "find-method-end");

    // Let's see the results
    console.log("BINARY SEARCH PERFOMANCE: ", performance.getEntriesByName("binary-search"));
    console.log("FIND METHOD PERFOMANCE: ", performance.getEntriesByName("find-method"));
});


const compareWordVariant = (search, check) => {
    return search.variant.localeCompare(check.variant);
};

const binarySearchFunction = (value, values, compare) => {
    if (values.length === 0) return;

    let start = 0;
    let end = values.length - 1;

    while (start <= end) {
        const middle = Math.floor(start + ((end - start) / 2));
        const comparedValue = compare(value, values[middle]);

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