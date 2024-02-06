
const values = [1, 2, 3, 5, 7, 8, 9, 11, 12, 14, 15];

const binarySearchRecursive = (value, values, start, end) => {    
    if (values.length === 0) return;
   
    let middle = start + Math.floor((end - start) / 2);

    if (value === values[middle]) {
        return middle;
    } else if (start > end) {
        return -1;
    } else if (value > values[middle]) {
        start = middle + 1;        
        return binarySearchRecursive(value, values, start, end);
    } else {
        end = middle - 1;
        return binarySearchRecursive(value, values, start, end);
    }
}

console.log(binarySearchRecursive(200, values, 0, values.length -1));