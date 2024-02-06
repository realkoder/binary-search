"use strict"

const ordliste = ["andedam", "andegård", "bondefanget", "bondegård", "børnearbejde", "gadefejer", "gær", "gødning", "gårdejer", "kalapøjser", "kalundborg", "kørt", "kårde", "ålborg", "aarhus"];

const persons = [{ name: "Draco Malfoy", house: "Slytherin" },
{ name: "Harry Potter", house: "Gryffindor" },
{ name: "Hermione Granger", house: "Gryffindor" },
{ name: "Neville Longbottom", house: "Gryffindor" },
{ name: "Ron Weasley", house: "Gryffindor" }];


const strcmp = (search, check) => {
    return search.localeCompare(check, 'da');
}

const binarySearchFunction = (value, values, compare) => {
    if (values.length === 0) return;

    let start = 0;
    let end = values.length - 1;
    let middle = 0;
    let comparedValue = 0;

    while (start <= end) {
        middle = Math.floor(start + ((end - start) / 2));
        comparedValue = compare(values[middle], value);

        if (comparedValue === 0) {
            return middle;
        } else if (comparedValue === -1) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }

    return -1;
}



console.log("binarySearchFunctionWithCompare for string \"gårdejer\" placed at index: ", binarySearchFunction("gårdejer", ordliste, strcmp));
console.log("binarySearchFunctionWithCompare for object person with name \"Hermione Granger\" placed at index: ",
    binarySearchFunction({name: "Hermione Granger"}, persons, (search, check) => search.name.localeCompare(check.name)));