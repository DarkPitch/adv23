const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt").toString();

const test1 = `..........
.S------7.
.|F----7|.
.||OOOO||.
.||OOOO||.
.|L-7F-J|.
.|II||II|.
.L--JL--J.
..........`;
const test2 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const test3 = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const split = fileContents.split("\n");
// const split = test3.split("\n");

function getSt() {
    let startpos;
    let i = 0;
    while (!startpos) {
        const sInd = split[i].indexOf("S");
        if (sInd !== -1) {
            startpos = [sInd, i];
        } else {
            i++;
        }
    }
    return startpos;
}
// | is a vertical pipe connecting north and south.
// - is a horizontal pipe connecting east and west.
// L is a 90-degree bend connecting north and east.
// J is a 90-degree bend connecting north and west.
// 7 is a 90-degree bend connecting south and west.
// F is a 90-degree bend connecting south and east.
// . is ground; there is no pipe in this tile.
// S is the starting position of the animal; t
const pipeRt = {
    ["|"]: [
        [0, -1],
        [0, 1],
    ],
    ["-"]: [
        [-1, 0],
        [1, 0],
    ],
    ["L"]: [
        [0, -1],
        [1, 0],
    ],
    ["J"]: [
        [0, -1],
        [-1, 0],
    ],
    ["7"]: [
        [-1, 0],
        [0, 1],
    ],
    ["F"]: [
        [1, 0],
        [0, 1],
    ],
    // ["."]: [[],[]],
    // ["S"]: [[],[]],
};

function coordEq(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function pieLeadsFrom(pipePos, currPos) {
    const pipe = split[pipePos[1]][pipePos[0]];
    if (pipe === ".") {
        return undefined;
    }
    const pipeRoute = pipeRt[pipe].map((item) => [
        pipePos[0] + item[0],
        pipePos[1] + item[1],
    ]);

    for (let i = 0; i < pipeRoute.length; i++) {
        if (coordEq(pipeRoute[i], currPos)) {
            return pipePos;
        }
    }
}

function pieLeadsFromb(pipePos, currPos) {
    const pipe = split[pipePos[1]][pipePos[0]];
    const pipeRoute = pipeRt[pipe].map((item) => [
        pipePos[0] + item[0],
        pipePos[1] + item[1],
    ]);

    for (let i = 0; i < pipeRoute.length; i++) {
        if (coordEq(pipeRoute[i], currPos)) {
            return pipeRoute[pipeRoute.length - 1 - i];
        }
    }
}

function findNextfromS(spos) {
    let nextPipes = [];
    for (let i = -1; i <= 1; i++) {
        if (spos[1] + i < 0) {
            continue;
        }
        for (let j = -1; j <= 1; j++) {
            if (Math.abs(i) === Math.abs(j) || spos[0] + j < 0) {
                continue;
            }
            const nextPipe = pieLeadsFrom([spos[0] + j, spos[1] + i], spos);
            if (nextPipe) {
                nextPipes.push(nextPipe);
            }
        }
    }
    return nextPipes;
}

function getLength() {
    const stPos = getSt();
    const stpipipes = findNextfromS(stPos);
    let step = 1;
    let prevPoses = [stPos, stPos];
    let currPipePoses = [...stpipipes];

    while (!coordEq(currPipePoses[0], currPipePoses[1])) {
        let temp = currPipePoses.map((item, index) => {
            return pieLeadsFromb(item, prevPoses[index]);
        });
        prevPoses = currPipePoses;
        currPipePoses = temp;
        step++;
    }
    return step;
}

function replaceAt(string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + 1);
}

function p2() {
    function creatInsidelist() {
        const stPos = getSt();
        const stpipipes = findNextfromS(stPos);
        let step = 1;
        let prevPoses = [stPos, stPos];
        let currPipePoses = [...stpipipes];
        const posins = [];

        while (!coordEq(currPipePoses[0], currPipePoses[1])) {
            let temp = currPipePoses.map((item, index) => {
                return pieLeadsFromb(item, prevPoses[index]);
            });
            prevPoses.forEach((item) => {
                if (["|", "7", "F"].contains(split[item[1]][item0])) {
                    split[item[1]] = replaceAt(split[item[1]], item[0], "X");
                }
            });
            prevPoses = currPipePoses;
            currPipePoses = temp;
            step++;
        }
        prevPoses.forEach((item) => {
            if (["|", "7", "F"].contains(split[item[1]][item0])) {
                split[item[1]] = replaceAt(split[item[1]], item[0], "X");
            }
        });
        currPipePoses.forEach(
            (item) => (split[item[1]] = replaceAt(split[item[1]], item[0], "X"))
        );
        return step;
    }
    function substroutewithX() {
        const stPos = getSt();
        const stpipipes = findNextfromS(stPos);
        let step = 1;
        let prevPoses = [stPos, stPos];
        let currPipePoses = [...stpipipes];

        while (!coordEq(currPipePoses[0], currPipePoses[1])) {
            let temp = currPipePoses.map((item, index) => {
                return pieLeadsFromb(item, prevPoses[index]);
            });
            prevPoses.forEach((item) => {
                if (["|", "7", "F"].includes(split[item[1]][item[0]])) {
                    split[item[1]] = replaceAt(split[item[1]], item[0], "X");
                } else {
                    split[item[1]] = replaceAt(split[item[1]], item[0], "Y");
                }
            });
            prevPoses = currPipePoses;
            currPipePoses = temp;
            step++;
        }
        prevPoses.forEach((item) => {
            if (["|", "7", "F"].includes(split[item[1]][item[0]])) {
                split[item[1]] = replaceAt(split[item[1]], item[0], "X");
            } else {
                split[item[1]] = replaceAt(split[item[1]], item[0], "Y");
            }
        });
        currPipePoses.forEach((item) => {
            if (["|", "7", "F", "X"].includes(split[item[1]][item[0]])) {
                split[item[1]] = replaceAt(split[item[1]], item[0], "X");
            } else {
                split[item[1]] = replaceAt(split[item[1]], item[0], "Y");
            }
        });
        return step;
    }
    substroutewithX();
    let area = 0;
    function minXs(pos) {}

    for (let i = 0; i < split[0].length - 1; i++) {
        for (let j = 0; j < split.length - 1; j++) {
            let xcount1 = 0;
            let xcount = 0;
            if (split[j][i] === "X" || split[j][i] === "Y") {
                continue;
            }
            let chk = i;
            const v = split[j][i];
            while (chk >= 0) {
                if (split[j][chk] === "X") {
                    xcount++;
                }
                chk--;
            }
            let chk2 = i;
            while (chk2 < split[j].length) {
                if (split[j][chk2] === "X") {
                    xcount1++;
                }
                chk2++;
            }
            if (xcount % 2 !== 0 && xcount1 % 2 !== 0) {
                split[j] = replaceAt(split[j], i, "I");
                area++;
            }
            // if (xcount % 2 !== 0) {
            //     split[j] = replaceAt(split[j], i, "I");
            //     area++;
            // }
        }
    }
    return area;
}

console.debug("result is ", p2());
// console.debug("result is ", getSt());

// not 537 too high
