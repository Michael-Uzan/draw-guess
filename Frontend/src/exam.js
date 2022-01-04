// [1,0,0,0,1,1]

function (nums) {
    const zeroCount = nums.reduce((acc, item) => { // length*C
        if (!item) acc.zero++
    }, 0)

    for (let i = 0; i < zeroCount; i++) { // length *C
        nums[i] = 0
    }

    for (let i = (nums.length - mapNums.zero); i < nums.length; i++) {
        nums[i] = 1
    }

    return nums
}


// //////////////////////////////////

// Implement limit:

const logHello = () => console.log('hello')

const limitedLogHello = limit(logHello, 2000)

limitedLogHello() // logs 'hello'
limitedLogHello() // does nothing

// After waiting 2 seconds… 

// (SetTimout)
limitedLogHello() // logs ‘hello’
limitedLogHello() // does nothing

setTimeout(() => {
    limitedLogHello() // logs hello after 2001ms
}, 2001)

////////////////////////////////////////

function limit(func, delay) {
    let isWaiting = false
    return () => {

        if (!isWaiting) {
            setTimeout(() => {
                isWaitng = false
            }, delay)
            func()
            isWaiting = true
        }
    }

}

const logGoodbye = () => console.log('goodbye')
const limitedGoodbye = limit(logGoodbye, 2000)

limitedGoodbye()
limitedLogHello()