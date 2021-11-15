const fs = require("fs");

let json = JSON.parse(fs.readFileSync("output.json", { encoding: "utf8", flag: "r" }));

let csvDatas = jsonToCsv(json)

fs.writeFileSync("csvoutput.csv", csvDatas);


function jsonToCsv(json){
  var fields = Object.keys(json[0]);
  var replacer = function (key, value) {
    console.log(key);
    return value === null ? "" : value;
  };
  var csv = json.map(function (row) {
    return fields
      .map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer);
      })
      .join(",");
  });
  csv.unshift(fields.join(",")); // add header column
  csv = csv.join("\n");


  return csv;
}
