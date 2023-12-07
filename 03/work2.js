const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()

const c = fileContents.split("\n");

const length = c.length

function checkDigit(char){

    return char >= 0 && char <= 9;
}

const gears = []

let workingLine = "";

let currLine;
let prevLine = "";
let nextline;

for(let i=0;i<length; i++){
    if (i>0){
        prevLine = c[i-1]
    }
    currLine = c[i]
    nextline = c[i+1]
    const lineLength = currLine.length
    for(let j=0;j< lineLength; j++){
        const char = currLine[j]
        let adjNums = []
        if (char === "*"){
            [currLine, prevLine, nextline].forEach((workingLine)=>{
                let currNum = ""
                let currNumGood = false
                for(let k=0; k< workingLine.length;k++){
                    const currChar = workingLine[k]
                    if (checkDigit(currChar)){
                        currNum = `${currNum}${currChar}`
                        currNumGood = currNumGood ||( k === j || k === j+1 || k === j-1)
                        if (k === (workingLine.length -1)){
                            if (currNum && currNumGood) {
                                adjNums.push(parseInt(currNum))
                            }
                            currNumGood = false
                            currNum = ""
                        }
                    } else {
                        if (currNum && currNumGood) {
                            adjNums.push(parseInt(currNum))
                        }

                        currNumGood = false
                        currNum = ""
                    }

                }
            })
        }
        if (adjNums.length === 2){
            gears.push(adjNums[0]*adjNums[1])
        }
    }
    

}

console.log(gears.reduce((prev, curr)=> prev+curr))