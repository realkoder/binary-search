"use strict"

const fs = require("fs");

const stream = require("stream");

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
    
    

});