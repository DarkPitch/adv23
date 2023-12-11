const fs = require('fs')

const test = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

function checkDigit(char){

    return char !== " " && (char >= 0 && char <= 9 || char === "-");
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

const fileContents = fs.readFileSync('./input.txt').toString()

const lines = fileContents.split("\n")
// const lines = test.split("\n")

const lineArrs = lines.map(parseNumArr)


function getLinediffArr(linArr) {
    const diffArr = []
    for (let i = 1; i < linArr.length; i++) {
        diffArr.push(linArr[i] - linArr[i-1])
        
    }
    return diffArr
} 

function getLimit(linArr){
    const pyr = [linArr]
    while (!pyr.slice(-1)[0].every(item => item === 0)) {
        pyr.push(getLinediffArr(pyr.slice(-1)[0]))
    }
    return pyr

}

function getNextNumber(linePyr){
    return linePyr.map(item => item.slice(-1)[0]).reduce((prev,curr)=> prev +curr)
}

function getPrevNumber(linePyr){

    const y = []
    for (let i = linePyr.length -1; i >= 0; i--) {
        if (i === linePyr.length -1){
            y.push(0)
            continue
        }
        y.push(linePyr[i][0]-y.slice(-1)[0])
        
    }

    return y.slice(-1)[0];

}

const allLimits = lineArrs.map(getLimit)

const nextNums = allLimits.map(getNextNumber)

const prevNums = allLimits.map(getPrevNumber)


console.debug("pt 1 is", nextNums.reduce((prev,curr)=> prev + curr))
console.debug("pt 2 is", prevNums.reduce((prev,curr)=> prev + curr))
