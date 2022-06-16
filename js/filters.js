function filter(array, cb) {
    let filteredData = [];
    for (const element of array) {
        let result = cb(element);
        if (result) {
            filteredData.push(element);
        }
    }
    return filteredData;
}

function find(array, cb) {
    for (const element of array) {
        let result = cb(element);
        if (result === true) {
            return element;
        }
    }
}

export { filter, find };