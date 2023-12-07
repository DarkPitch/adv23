const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()

const c = fileContents.split("\n");

const length = c.length

let sum = 0;

const numbers = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "zero": 0,
}

function checkNumberStart(letters){
    const posNum = Object.keys(numbers).find((item)=> letters.startsWith(item));
    return posNum ? numbers[posNum] : undefined;
}

function checkNumberEnd(letters){
    const posNum = Object.keys(numbers).find((item)=> letters.endsWith(item));
    return posNum ? numbers[posNum] : undefined;
}

function checkDigit(char){

    return char >= 0 && char <= 9;
}

function getLinenumber(line){

    let startPos = 0;
    let endPos = line.length-1;

    let firstNum;
    let lastNum;
    console.log(line)

    while((firstNum === undefined) || (lastNum ===undefined)){
        if (firstNum === undefined) {
            if (checkDigit(line[startPos])){
                firstNum = line[startPos]
            } else {
                firstNum = checkNumberStart(line.substring(startPos, startPos + 5))
            }

            
        } 
            startPos +=1
        
        if (lastNum ===undefined) {
            if (checkDigit(line[endPos])){
                lastNum = line[endPos]
            } else {
                lastNum = checkNumberEnd(line.substring(endPos-6, endPos+1))
            }
        } 
            endPos -= 1

    }
    console.log(`${firstNum}${lastNum}`)
    return parseInt(`${firstNum}${lastNum}`)
}

for ( let i = 0; i<length; i++){
    const line = c[i];
    if (!line.length) {
        continue;
    }
    sum += getLinenumber(line);


}


console.log(sum)