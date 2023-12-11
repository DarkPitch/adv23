const fs = require('fs')

const fileContents = fs.readFileSync('./input.txt').toString()


const test = `TTJJK 765
77827 684
KK677 28
KTJJT 220
QQQJA 483`
const c = fileContents.split("\n");


const length = c.length

const cardRank = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3","2","J"];


function calculateHandRank(hand){

    const cardsecRank = hand.split("").map(item => cardRank.findIndex(j => item===j));

    const handObj = {}
    const numjokers = hand.split("").filter(item => item ==="J").length
    
    for (let i = 0; i < hand.length; i++) {
        if (hand[i]=== "J"){
            continue;
        }
        if(!handObj[hand[i]]){
            handObj[hand[i]] = 0
        }
        handObj[hand[i]] = handObj[hand[i]] + 1 
        
    }
    let handRank;
    const handVals = Object.values(handObj).sort((a,b)=>b-a);
 

        const curr = handVals[0] ?? 0;
        if (curr === 5) {
            handRank =  0
        }
        if(curr === 4){
            handRank =  1 -numjokers
        }
        if(curr === 3){
            if (handVals[1]===2){
                handRank = 2 - numjokers *2
            } else {
                switch (numjokers){
                    case 1:
                        handRank = 1
                        break
                    case 2:
                        handRank = 0
                        break
                    default:
                        handRank = 3
            }
            }
        }
        if(curr === 2){
            if(handVals[1]===2){
                switch (numjokers){
                    case 1:
                        handRank = 2
                        break
                    default:
                        handRank = 4
            }
                handRank = 4
            } else {
                switch (numjokers){
                    case 1:
                        handRank = 3
                        break
                    case 2:
                        handRank = 1
                        break
                    case 3:
                        handRank = 0
                        break
                    default:
                        handRank = 5
            }
        }}
        if(curr === 1){
            switch (numjokers){
                case 1:
                    handRank = 5
                    break
                case 2:
                    handRank = 3
                    break
                case 3:
                    handRank = 1
                    break
                case 4:
                    handRank = 0
                    break
                default:
                    handRank = 6
            }
        }


        if (numjokers === 5){
            handRank=0
        }
//     if(numjokers ===1){
//         switch (handRank) {
//             case 1:
//                 handRank = 0
//                 break;
            
//             case 2:
//                 handRank = 1
//                 break;
//             case 3:
//                 handRank = 1
//                 break;
//             case 4:
//                 handRank = 2
//                 break;
//             case 5:
//                 handRank = 3
//                 break;
//             case 6:
//                 handRank = 5
//                 break;
        
//             default:
//                 break;
//         }
// }
// if(numjokers ===2){
//     switch (handRank) {
//         case 3:
//             handRank = 0
//             break;
//         case 5:
//             handRank = 1
//             break;
//         case 6:
//             handRank = 3
//             break;
    
//         default:
//             break;
//     }
// }
// if(numjokers ===3){
//     switch (handRank) {
//         case 5:
//             handRank = 0
//             break;
//         case 6:
//             handRank = 1
//             break;
    
//         default:
//             break;
//     }
// }
// if(numjokers ===4){
//     switch (handRank) {
//         case 6:
//             handRank = 0
//             break;
    
//         default:
//             break;
//     }
// }
if(numjokers ===5){
    handRank = 0
}
    
    return [handRank, cardsecRank, hand]
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
    } else  if (a.strength[0] > b.strength[0]){
        return 1
    } else if (a.strength[0] === b.strength[0]){
        let i = 0;
        while (a.strength[1][i] === b.strength[1][i] && i < a.strength[1].length){
            i++
        }
        if(a.strength[1][i] === b.strength[1][i]) {
            return 0;
        }
        return a.strength[1][i] < b.strength[1][i] ? -1: 11
    }
    throw new Error(`failed on a = ${a.strength} b = ${b.strength}`)

})

let total = 0

for (let index = 0; index < sorted.length; index++) {
    total += sorted[index].bid * (sorted.length - index)
    
}

const g = sorted.map(item=>item.strength[2])



console.debug("this", total)
