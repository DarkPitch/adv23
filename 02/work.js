const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()

const c = fileContents.split("\n");

const length = c.length

let sum = 0;

const numberColor = {
    "red": 12,
    "blue": 14,
    "green": 13,
}

function parseColorNum(picksArr, color){
    const colorPick = picksArr.find(pick=> pick.endsWith(color))
    
    return parseInt(colorPick?.substring(0, colorPick.indexOf(color)-1) || "0");
}

function parsePick(pickString) {
    const picks = pickString.split(", ")
    return {red: parseColorNum(picks, "red"),
    green: parseColorNum(picks, "green"),
    blue: parseColorNum(picks, "blue") }
}

function parseLine(lineString) {
    const gameNumber = parseInt(lineString.substring(5, lineString.indexOf(":")));
    const restOfLine = lineString.substring(lineString.indexOf(": ")+2, lineString.length)
    const max = restOfLine.split("; ").map(parsePick).reduce((prev, curr)=> {
            const val = {...prev}
            if( prev.red < curr.red){
                val.red = curr.red
            }
            if( prev.green < curr.green){
                val.green = curr.green
            }
            if( prev.blue < curr.blue){
                val.blue = curr.blue
            }
            return val;}, {red:0,green:0, blue:0})

    return max.blue*max.red*max.green
}

const m = c.map(element => {
    return parseLine(element);
})
const f = m.reduce((prev, curr)=>{
    const x = prev + curr
    return x
} );




console.log(f)