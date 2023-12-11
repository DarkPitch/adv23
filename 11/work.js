const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt").toString();
const test = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const testX2 = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`;

// const galaxyarr = fileContents.split("\n").map((item) => item.split(""));
const galaxyarr = test.split("\n").map((item) => item.split(""));

function expandGalaxy(inputGal) {
    const result = [...inputGal];
    const rowlen = result[0].length;
    let rowWithGal = new Set();
    let colsGal = new Set();

    for (let i = 0; i < inputGal.length; i++) {
        for (let j = 0; j < rowlen; j++) {
            if (inputGal[i][j] === "#") {
                rowWithGal.add(i);
                colsGal.add(j);
            }
        }
    }

    let rowsAdded = 0;

    for (let i = 0; i < inputGal.length; i++) {
        if (!rowWithGal.has(i)) {
            for (let j = 0; j < 100; j++) {
                result.splice(i + rowsAdded, 0, Array(rowlen).fill("."));
                rowsAdded++;
            }
        }
    }
    let colsAdded = 0;
    for (let i = 0; i < rowlen; i++) {
        if (!colsGal.has(i)) {
            for (let k = 0; k < 100; k++) {
                for (let j = 0; j < result.length; j++) {
                    result[j].splice(i + colsAdded, 0, ".");
                }

                colsAdded++;
            }
        }
    }

    return result;
}

const expandedGal = expandGalaxy(galaxyarr);

function getGalaxyLocs(inputGal) {
    let galLocs = [];
    for (let i = 0; i < inputGal.length; i++) {
        for (let j = 0; j < inputGal[i].length; j++) {
            if (inputGal[i][j] === "#") {
                galLocs.push([i, j]);
            }
        }
    }

    return galLocs;
}

function getDistances(inputLocs) {
    let distances = [];
    for (let i = 0; i < inputLocs.length; i++) {
        for (let j = i + 1; j < inputLocs.length; j++) {
            distances.push(
                Math.abs(
                    Math.abs(inputLocs[i][0] - inputLocs[j][0]) +
                        Math.abs(inputLocs[i][1] - inputLocs[j][1])
                )
            );
        }
    }
    return distances;
}

function sumDist(inputArr) {
    return inputArr.reduce((p, c) => p + c);
}

console.debug("result is", sumDist(getDistances(getGalaxyLocs(expandedGal))));
