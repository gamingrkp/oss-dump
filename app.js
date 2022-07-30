const oss = require('./api/oss')
const async = require('async')

// let targetArray = Array.from({length: 800000}, (x, i) => i + 20000 );

// async.eachLimit(targetArray, 150, (userId, callback) => {
//     oss.getUserData(userId, callback)
// })

// do 5000 then rest 30 sec

function delay (ms) {
    return new Promise((resolve,reject) => setTimeout(resolve,ms));
}


async function doReq(beginAt, batchAmount, end, batchDelay, paralelLimit) {
    let range = Array.from({length: batchAmount}, (x, i) => i + beginAt );
    // console.log(range)

    await async.eachLimit(range, paralelLimit, (userId, callback) => {
        oss.getUserData(userId, callback)
    })

    if ((beginAt + batchAmount) < end) {
        console.log(`sleep for ${batchDelay} sec | end: ${beginAt + batchAmount}`)
        await delay(batchDelay * 1000)
        doReq(beginAt + batchAmount, batchAmount, end, batchDelay, paralelLimit)
    } else {
        console.log(`finished at ${beginAt + batchAmount}`)
    }
    
}

doReq(10000, 10, 10100, 10, 2)