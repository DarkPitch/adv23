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
const test = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`
const fileContents = fs.readFileSync('./input.txt').toString()

const sections = fileContents.split("\n\n")

const seeds = parseNumArr(sections[0])

function createMap(sectionString){
    const maps = sectionString.split("\n")
    maps.shift()
    const map = []
    for (let i=0;i<maps.length;i++){
        const nums = parseNumArr(maps[i])
        const sourceStart = nums[1]
        const destStart = nums[0]
        const range = nums[2]
        map.push((number=>{
            if(number >= sourceStart && number <sourceStart+range){
                return number + destStart - sourceStart
            } else {
                return number
            }
        }))
    }
    return map
}

// const seedSoil = sections[1].split("/n")

const c = fileContents.split("\n");

const length = c.length

let allMaps = []

for (let k = 1;k<sections.length;k++){
    allMaps.push(createMap(sections[k]))
}

function getSeedLocation(seedNum){
    let currNum = seedNum
    for (let i=0;i<allMaps.length;i++){
        for (let k=0;k<allMaps[i].length;k++){
            const newNum = allMaps[i][k](currNum)
            if (newNum !== currNum){
                currNum = newNum
                break;
            }
        }
    }
    return currNum
}

const seedLocs = seeds.map(item => getSeedLocation(item))

seedLocs.sort((a,b)=> a-b)

console.log(seedLocs[0])
