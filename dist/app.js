"use strict";
var e1 = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
var result = add('Hello ', 'TypeScript');
result.split(' ');
var userInput = '';
var storeData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT';
console.log(storeData);
