const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()

const c = fileContents.split("\n");

const length = c.length

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
    return numArr.sort((a, b)=> a-b)
}

function parseLine(line) {
    return {
        winners: parseNumArr(line.substring(line.indexOf(":")+1, line.indexOf("|"))),
        ourNums: parseNumArr(line.substring(line.indexOf("|")+1, line.length))

    }
}
function pt1(){
    
let total = 0

for (let i=0; i<length; i++) {
    let lineTotal = 0

    const nums = parseLine(c[i])
    nums.winners.forEach(item=>{
        for (let j = 0;j<nums.ourNums.length;j++){
            if (nums.ourNums[j] === item){
                if (lineTotal === 0) {
                    lineTotal = 1
                } else {
                    lineTotal = lineTotal *2
                }
            }
        }
    })
    total = total + lineTotal
}

const s = parseLine(c[0])

console.log(total)
}

function pt2(){
    let cardArr = []
    for (let i=0; i<length; i++) {
        let cardWins = []
    
        const nums = parseLine(c[i])
        nums.winners.forEach(item=>{
            for (let j = 0;j<nums.ourNums.length;j++){
                if (nums.ourNums[j] === item){
                    cardWins.push(i+1+cardWins.length)
                }
            }
        })
        cardArr.push(cardWins)
    }
    let allCardTot = 0

    function countCard(num) {
        allCardTot +=1
        const newCards = cardArr[num]
        if (newCards.length === 0 ){
            return
        }
        newCards.forEach(item=>countCard(item))
        
    }

    for (let i = 0;i<cardArr.length;i++){
        countCard(i)

    }

    console.log(allCardTot)

}
pt2()
