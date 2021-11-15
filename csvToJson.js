const fs = require("fs");
csv = fs.readFileSync("Book1.csv").toString();

let json = csvToJson(csv);
fs.writeFileSync("output.json", json);
console.log(json);

function csvToJson(csv) {
  var lines = csv.split(/\r\n/g);
  var results = [];
  let headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    var obj = {};

    let str = lines[i];
    let neResults = [];
    // check String whether string start with ''"'(quotation mark) or not
    if (str.indexOf('"') >= 0) {
      // for nesting quatation
      if (str.indexOf('""') >= 0) {
        console.log("true");
        quotionDatas = str.matchAll(
          // /"(\w+\s*,*""(\s*\w+\s*)""\s*)"|"*(\w+)"*/g
          /"((,*("*"*(\s*\w+\s*)"*"*))+)"|"*(\w+)"*/g
        );
        for (let result of quotionDatas) {
          console.log(result, "result");
          if (result[1] !== undefined) {
            neResults.push(result[1]);
          } else {
            neResults.push(result[0]);
          }
          console.log(neResults, "neResults");
        }
      } else {
        //without nesting quatation
        quotionDatas = str.matchAll(
          /"(((,*\s*\w+\s*\w*),*\s*)+)"|(\w+\s*"*\w*"*)|\w/g
        );

        for (let result of quotionDatas) {
          console.log(result, "result");
          if (result[1] !== undefined) {
            neResults.push(result[1]);
          } else {
            neResults.push(result[0]);
          }
          console.log(neResults, "neResults");
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

[
  { name: 'dscscscs,""sdcscsc"",""dcdvcvd', "roll No": "fdvd", marks: "65" },
  { name: '""sdcdsc"",dcdscdsdc', "roll No": "555", marks: "5555" },
];
