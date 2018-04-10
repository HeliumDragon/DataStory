const fs = require("fs");
const parse = require("csv-parse");
const transform = require("stream-transform");
const path = require("path");
const parser = parse();
const filePath = path.join(__dirname, "USDA.csv");
const input = fs.createReadStream(filePath);
const jsonPath = path.join(__dirname, "usda.json");
fs.unlinkSync(jsonPath);
const writeable = fs.createWriteStream(jsonPath, {
  flags: "a"
});
const transformer = transform(function(data) {
  return JSON.stringify(data) + ",";
});

writeable.on("open", function(err) {
  writeable.write("[");
});

transformer.on("end", function(err) {
  console.log(writeable.length);
  writeable.write("]");
});
transformer.on("error", function(err) {
  console.log(err.message);
});

input
  .pipe(parser)
  .pipe(transformer)
  .pipe(writeable);
