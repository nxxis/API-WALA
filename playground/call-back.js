// const sum = function (num1, num2, callback) {
//     setTimeout(() => {
//         result = sum(num1, num2)
//         callback(result);
//     }, 2000)
// }
// const add = function(num1, num2) {
//     sum = num1 + num2
// }
// sum(1,2, add)

const sum = (num1, num2, callback) => {
setTimeout(() => {
    result = num1 + num2;
    callback(result);
}, 2000)
}

sum(1,2, (result) => {
    console.log(result);
})