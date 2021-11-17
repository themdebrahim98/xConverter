import React, { useRef, useEffect } from 'react'
import './csvtojson.css'
import { fs, csvToJson } from '../allScripts'


export default function CsvToJson() {

  const inputRef = useRef(null);
  const csv_textarea = useRef(null);
  const json_textarea = useRef(null);
  const convert_button = useRef(null);



  useEffect(() => {
    const input = document.querySelector('form input');
    input.addEventListener("change", handleFile);
    convert_button.current.addEventListener("click", tojson);
    csv_textarea.current.addEventListener("keydown", textareaDataUpdate);
    console.log(convert_button)



    async function handleFile() {
      // console.log(input.files[0],'file');
      var buffer = await input.files[0].arrayBuffer();
      let unint8 = new Uint8Array(buffer);
      // console.log(unint8.toString('base64'))
      let utf8decoder = new TextDecoder();
      // let data = JSON.parse(utf8decoder.decode(unint8));
      let data = utf8decoder.decode(unint8);
      console.log(data);
      csv_textarea.current.innerHTML = data;

      // let csv =  jsonToCsv(data);
    };

    function tojson() {
      let csvData = csv_textarea.current.value;
      let json = csvToJson(csvData);
      console.log(JSON.stringify(
        json,
        undefined,
        4
      ),'json');
      console.log(json_textarea.current)
      json_textarea.current.value = JSON.stringify(
        json,
        undefined,
        4
      );
      // console.log(JSON.stringify(
      //   data,
      //   undefined,
      //   4
      // ))
    };

    function textareaDataUpdate() {
      csv_textarea.current.value = csv_textarea.current.value;
      console.log(csv_textarea.value);
    }


  }, []);





  return (

    <div className="csvtojson">

      <div class="header">
        <h1>csv to json</h1>
      </div>
      <section>

        <form action="">
          <input ref={inputRef} type="file" multiple />

        </form>


        <div class="wrapper">
          <div class="left">
            <h1>CSV</h1>
            <textarea name="" id="csv-textarea" ref={csv_textarea} cols="30" rows="10">
              
            </textarea>
          </div>

          <div class="right">
            <h1>Json</h1>
            <textarea name="" id="json-textarea" ref={json_textarea}  cols="30" rows="10">
              
            </textarea>
           
          </div>

        </div>
        <div class="convert">
          <button ref={convert_button}>Convert</button>
        </div>

      </section>
    </div>
  )
}
