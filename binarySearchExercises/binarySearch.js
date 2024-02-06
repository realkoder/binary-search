"use strict"

const values = [1, 2, 3, 5, 7, 8, 9, 11, 12, 14, 15];

const binarySearchDivideAndConqure = (value, values) => {
    if (values.length === 0) return;

    let start = 0;
    let end = values.length - 1;
    let middle = 0;


    while (start <= end) {
        console.log("Iterating");
        middle = Math.floor(start + ((end - start) / 2));        

        if (value === values[middle]) {
            return middle;
        } else if (value > values[middle]) {
            start = middle + 1;            
        } else {
            end = middle - 1;            
        }
    }

    return -1;
}

console.log("binarySearchDivideAndConqure", binarySearchDivideAndConqure(100, values));