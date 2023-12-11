const fs = require("fs");

const fileContents = fs.readFileSync("./input.txt").toString();

const test = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const split = fileContents.split("\n\n");
const route = split[0];
const maps = split[1];

function parseNodeLine(line) {
  const loc = line.substring(0, 3);
  const left = line.substring(7, 10);
  const right = line.substring(12, 15);
  return { loc, left, right };
}

function buildNodeMap(input) {
  const lines = input.split("\n");
  const mapOb = {};
  for (let index = 0; index < lines.length; index++) {
    const element = lines[index];
    const p = parseNodeLine(element);
    mapOb[p.loc] = { L: p.left, R: p.right };
  }
  return mapOb;
}
function travelRoute(mapOb) {
  let steps = 0;

  let i = 0;
  let pos = "AAA";
  while (pos !== "ZZZ") {
    pos = mapOb[pos][route[i]];

    i++;
    steps++;
    if (i >= route.length) {
      i = 0;
    }
  }

  return steps;
}

console.debug("pt 1 steps are", travelRoute(buildNodeMap(maps)));

function buildnewmapObj(mapOb) {
  return Object.keys(mapOb)
    .map((item) => {
      let destArr = [];
      let pos = item;
      let endZarr = [];
      for (let i = 0; i < route.length; i++) {
        const newPos = mapOb[pos][route[i]];
        destArr.push(newPos);
        pos = newPos;
        if (pos.endsWith("Z")) {
          endZarr.push(i);
        }
      }
      return { [item]: { dests: destArr, goodEnd: endZarr } };
    })
    .reduce((prev, curr) => ({ ...prev, ...curr }));
}

const newmap = buildnewmapObj(buildNodeMap(maps));
const startNodes = Object.keys(buildNodeMap(maps)).filter((item) =>
  item.endsWith("A")
);

function findpathlength(startNode) {
  let currstep = 0;
  let currNode = startNode;
  while (true) {
    let tempStep = 0;
    if (newmap[currNode].goodEnd.length) {
      tempStep = newmap[currNode].goodEnd[0] + 1;
      currstep = currstep + tempStep;
      break;
    }

    currstep = route.length + currstep;
    currNode = newmap[currNode].dests[route.length - 1];
  }
  return currstep;
}

const loopLengths = startNodes.map(findpathlength);

function lowestCommonMultiple(arr) {
  const gcd = (a, b) => {
    return a ? gcd(b % a, a) : b;
  };
  const lcm = (a, b) => {
    return (a * b) / gcd(a, b);
  };
  return arr.reduce((a, b) => {
    return lcm(a, b);
  });
}

console.debug("pt 2 steps are", lowestCommonMultiple(loopLengths));
