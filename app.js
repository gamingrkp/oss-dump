const oss = require('./api/oss')
const async = require('async')

// oss.getUserData(1)

// try 1 - 100.000
// for (let i = 1; i < 10000; i++) {
//     oss.getUserData(i)
    
// }

// 1 - 1000
let targetArray = Array.from({length: 10000}, (x, i) => i + 1 );

async.eachLimit(targetArray, 10, (userId, callback) => {
    oss.getUserData(userId, callback)
})

console.log(targetArray)