// Define the maps as arrays of objects
const seedToSoil = [
    {destStart: 50, srcStart: 98, length: 2},
    {destStart: 52, srcStart: 50, length: 48}
  ];
  
  const soilToFertilizer = [
    {destStart: 0, srcStart: 15, length: 37},
    {destStart: 37, srcStart: 52, length: 2},
    {destStart: 39, srcStart: 0, length: 15}
  ];
  
  const fertilizerToWater = [
    {destStart: 49, srcStart: 53, length: 8},
    {destStart: 0, srcStart: 11, length: 42},
    {destStart: 42, srcStart: 0, length: 7},
    {destStart: 57, srcStart: 7, length: 4}
  ];
  
  const waterToLight = [
  {destStart :88 , srcStart :18 , length :7},
  {destStart :18 , srcStart :25 , length :70}
  ];
  
  const lightToTemperature = [
  {destStart :45 , srcStart :77 , length :23},
  {destStart :81 , srcStart :45 , length :19},
  {destStart :68 , srcStart :64 , length :13}
  ];
  
  const temperatureToHumidity = [
  {destStart :0 , srcStart :69 , length :1},
  {destStart :1 , srcStart :0 , length :69}
  ];
  
  const humidityToLocation = [
  {destStart :60 , srcStart :56 , length :37},
  {destStart :56 , srcStart :93 , length :4}
  ];
  
  // Define a function that takes a map and a source number and returns the corresponding destination number
  function mapNumber(map, source) {
      // Loop through the map array
      for (let i = 0; i < map.length; i++) {
          // Get the current line object
          let line = map[i];
          // Check if the source number is in the source range of the line
          if (source >= line.srcStart && source < line.srcStart + line.length) {
              // Calculate the offset from the source range start
              let offset = source - line.srcStart;
              // Return the destination number with the same offset from the destination range start
              return line.destStart + offset;
          }
      }
      // If the source number is not in any source range, return the same number
      return source;
  }
  
  // Define an array of seed ranges as objects with start and length properties
  const seedRanges = [
      {start:79,length:14},
      {start:55,length:13}
  ];
  
  // Define a variable to store the minimum location value
  let minLocation = Infinity;
  
  // Loop through the seed ranges
  for (let seedRange of seedRanges) {
      // Loop through the individual seed numbers in each range
      for (let seed = seedRange.start; seed < seedRange.start + seedRange.length; seed++) {
          // Apply the maps in sequence to get the location number
          let soil = mapNumber(seedToSoil, seed);
          let fertilizer = mapNumber(soilToFertilizer, soil);
          let water = mapNumber(fertilizerToWater, fertilizer);
          let light = mapNumber(waterToLight, water);
          let temperature = mapNumber(lightToTemperature, light);
          let humidity = mapNumber(temperatureToHumidity, temperature);
          let location = mapNumber(humidityToLocation,humidity);
  
          // Print the result
          console.log(`Seed ${seed} -> Location ${location}`);
  
          // Update the minimum location value if needed
          if (location < minLocation) {
              minLocation = location;
          }
      }
  }
  
  // Print the minimum location value
  console.log(`The minimum location value is ${minLocation}`);
  