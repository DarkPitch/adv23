const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()


const test = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`
const c = fileContents.split("\n");


const length = c.length

const cardRank = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3","2"];


function calculateHandRank(hand){

    const cardsecRank = hand.split("").map(item => cardRank.findIndex(j => item===j));

    const handObj = {}
    
    for (let i = 0; i < hand.length; i++) {
        if(!handObj[hand[i]]){
            handObj[hand[i]] = 0
        }
        handObj[hand[i]] = handObj[hand[i]] + 1 
        
    }
    let handRank;
    const handVals = Object.values(handObj)
    for (let i = 0; i < handVals.length; i++) {
        const curr = handVals[i];
        if (curr === 5) {
            handRank =  0
            break;
        }
        if(curr === 4){
            handRank =  1
            break;
        }
        if(curr === 3){
            if (handRank === 5){
                handRank =2
                break;
            } else {
                handRank = 3
            }
        }
        if(curr === 2){
            if(handRank===5){
                handRank = 4
                break
            } else if(handRank===3){
                handRank=2
                break
            } else {
                handRank = 5
            }
        }
        if(curr === 1 && !handRank){
            handRank = 6
        }
    }
    return [handRank, cardsecRank]
}

function processHand(handstr){
    const d = handstr.split(" ")
    const bid = parseInt(d[1])

    const hand = d[0]

    return {strength: calculateHandRank(hand), bid}

}

const rankedCards = c.map(item=>processHand(item))

const sorted = rankedCards.sort((a,b)=>{
    if (a.strength[0] < b.strength[0]){
        return -1
    }
    if (a.strength[0] > b.strength[0]){
        return 1
    }
    if (a.strength[0] === b.strength[0]){
        let i = 0;
        while (a.strength[1][i] === b.strength[1][i] && i < a.strength[1].length){
            i++
        }
        if(a.strength[1][i] === b.strength[1][i]) {
            return 0;
        }
        return a.strength[1][i] < b.strength[1][i] ? -1: 1
    }

})

let total = 0

for (let index = 0; index < sorted.length; index++) {
    total += sorted[index].bid * (sorted.length - index)
    
}

console.debug("this", total)

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