const fs = require("fs");
csv = fs.readFileSync("Book1.csv").toString();

let json = csvToJson(csv);
fs.writeFileSync('output.json',json)
console.log(json)

function csvToJson(csv) {
  var lines = csv.split(/\r\n/g);
  var results = [];
  let headers = lines[0].split(",");

  for (let i = 1; i < lines.length-1; i++) {
    var obj = {};

    let str = lines[i];
    let neResults = [];
    // check String whether string start with ''"'(quotation mark) or not
    if (str.indexOf('"')===0) {
      quotionDatas = str.matchAll(/"(((,*\s*\w+\s*\w*),*\s*)+)"|(\d{1,})/g);
      for (let result of quotionDatas) {
        if (result[1] !== undefined) {
          neResults.push(result[1]);
        } else {
          neResults.push(result[0]);
        }
      }

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = neResults[j];
      }

      results.push(obj);
    } else {
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      results.push(obj);
    }
  }

  //return result; //JavaScript object
  return JSON.stringify(results); //JSON
}


