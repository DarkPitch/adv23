const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()

const c = fileContents.split("\n");

const length = c.length

function checkDigit(char){

    return char >= 0 && char <= 9;
}

const goodParts = []

let sum = 0;
let prevPos = []
let currPos = []
let nextPos = []

let workingLine = "";

let currLine;

for(let i=0;i<length; i++){
    currLine = c[i]
    const lineLength = currLine.length
    prevPos = [...currPos]
    currPos = [...nextPos]
    nextPos = []
    for(let j=0;j< lineLength; j++){
        const char = currLine[j]
        if (char !== "." && !checkDigit(char)){
            nextPos.push(j)
        }
    }
    
    const goodPos = new Set([])
    prevPos.forEach(item=>{
        goodPos.add(item)
        goodPos.add(item+1)
        goodPos.add(item-1)
    })
    nextPos.forEach(item=>{
        goodPos.add(item)
        goodPos.add(item+1)
        goodPos.add(item-1)
    })
    currPos.forEach(item=>{
        goodPos.add(item+1)
        goodPos.add(item-1)
    })
    let currNum = ""
    let currNumGood = false
    for(let k=0; k< workingLine.length;k++){
        const currChar = workingLine[k]
        if (checkDigit(currChar)){
            currNum = `${currNum}${currChar}`
            currNumGood = currNumGood || goodPos.has(k)
            if (k === (workingLine.length -1)){
                if (currNum && currNumGood) {
                    goodParts.push(parseInt(currNum))
                }
                currNumGood = false
                currNum = ""
            }
        } else {
            if (currNum && currNumGood) {
                goodParts.push(parseInt(currNum))
            }
            
            currNumGood = false
            currNum = ""
        }
        
    }
    workingLine = currLine

}

console.log(goodParts.reduce((prev, curr)=> prev+curr))