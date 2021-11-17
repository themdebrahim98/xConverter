import React, { useRef, useEffect } from 'react'
import './jsontocsv.css'
import jsontocsv from '../allScripts'


export default function JsonToCsv() {

  const inputRef = useRef(null);
  const csv_textarea = useRef(null);
  const json_textarea = useRef(null);
  const convert_button = useRef(null);




  useEffect(() => {
    let data;
    const input = document.querySelector('form input');
    input.addEventListener("change", handleFile);
    convert_button.current.addEventListener("click", tocsv);
    json_textarea.current.addEventListener("keydown", textareaDataUpdate);
    console.log(convert_button)



    async function handleFile() {
      var buffer = await input.files[0].arrayBuffer();
      let unint8 = new Uint8Array(buffer);
      let utf8decoder = new TextDecoder();
       data = JSON.parse(utf8decoder.decode(unint8));
   
      json_textarea.current.value = JSON.stringify(data,null,5);
      console.log(data)


    };

    function tocsv(){

      // console.log(data)
      let jsonData = JSON.parse(json_textarea.current.value,null,0);
      let csv = jsontocsv(jsonData);
      csv_textarea.current.value = csv


    }
   
  

    function textareaDataUpdate() {
      json_textarea.current.value = json_textarea.current.value;
    }


  }, []);





  return (

    <div className="jsontocsv">

      <div class="header">
        <h1>json to csv</h1>
      </div>
      <section>

        <form action="">
          <input ref={inputRef} type="file" multiple />

        </form>


        <div class="wrapper">
        <div class="right">
            <h1>Json</h1>
            <textarea name="" id="json-textarea" ref={json_textarea}  cols="30" rows="10">
              
            </textarea>
           
          </div>
          <div class="left">
            <h1>CSV</h1>
            <textarea name="" id="csv-textarea" ref={csv_textarea} cols="30" rows="10">
              
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
