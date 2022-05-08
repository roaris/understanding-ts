"use strict";
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
var mergedObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergedObj.age);
var mergedObj2 = merge({ name: 'Max' }, { age: 30 });
