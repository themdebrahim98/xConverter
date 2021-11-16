 const fs = require("fs");



 function csvToJson(csv) {
  var lines = csv.split('\n');
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
       let quotionDatas = str.matchAll(
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
       let quotionDatas = str.matchAll(
          /"(((,*\s*\w+\s*\w*),*\s*)+)"|(\w+\s*"*\w*"*)|\w/g
        );

        for (let result of quotionDatas) {
          if (result[1] !== undefined) {
            neResults.push(result[1]);
          } else {
            neResults.push(result[0]);
          }
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
  return results //JSON
}

//


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






export  {fs,csvToJson};