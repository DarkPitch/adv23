const fs = require('fs')

function checkDigit(char){

    return char !== " " && char >= 0 && char <= 9;
}

function parseNumArr(nums){
    const numArr = []
    let currNum = ""
    for(let k=0; k< nums.length;k++){
        const currChar = nums[k]
        if (checkDigit(currChar)){
            currNum = `${currNum}${currChar}`
            if (k === nums.length -1){
                numArr.push(parseInt(currNum))
            }
        } else {
            if (currNum) {
                numArr.push(parseInt(currNum))
            }
            
            currNum = ""
        }
        
    }
    return numArr
}

const race = {t:51926890,d:222203111261225}
222203111261225
365225545541781
const tOptions= race.t+1

// let goodOption;
// let i=1;
// while (!goodOption){
//     let guessOptionHigh;
//     console.debug("trying i=",i)
//     if (i*(race.t-i)>race.d){
//         guessOption = i
//     }
//     i=i*2
// }
// console.log((tOptions )- (2*goodOption))

function getI(starting){
    let i = 1;
    while((starting+i)*(race.t-(starting+i))<race.d) {
    console.debug("starting =",starting)

    console.debug("trying i=",i)

        console.debug("result =", (starting+i)*(race.t-(starting+i)))
        i=i*2
        console.debug("i is now =",i)
    }
    console.debug("checkval = ",(starting+i-1)*(race.t-(starting+i-1)))
    if ((starting+i-1)*(race.t-(starting+i-1))<=race.d){
        return i+starting
    }
    return getI(starting + (i/2))

}

console.log((tOptions )- (2*getI(0)))