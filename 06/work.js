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

const tOptions= race.t+1

let goodOption;
let i=0;
while (!goodOption){
    console.debug("trying i=",i)
    if (i*(race.t-i)>race.d){
        goodOption = i
    }
    i++
}
console.log((tOptions )- (2*goodOption))



