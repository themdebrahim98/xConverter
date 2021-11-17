import React, { useState } from 'react'
import './main.css'
import CsvToJson from '../csvtojson/CsvToJson'
import { Link } from 'react-router-dom'

export default function Main() {
  const [isshowcsvtojson, setisshowcsvtojson] = useState(false)

  // const handleCsvToJson = () => {

  //   setisshowcsvtojson(true);
  //   console.log("ok")
  // }



  return (
    <>


      <header className="main">

        <div class="wrapper">
          <div class="card">

            <Link to="/csvtojson"><h2 >CSV TO JSON</h2></Link>


          </div>
          <div class="card">
            {/* <Link><h2 >JSON TO CSV</h2></Link> */}
            <Link to="/jsontocsv"> <h2 >JSON TO CSV</h2>
            </Link>


          </div>
          <div class="card">
            {/* <Link><h2 >JSON TO CSV</h2></Link> */}
            <Link to="/jsontocsv"> <h2 >JPEG TO JPG</h2>
            </Link>


          </div>
          <div class="card">
            {/* <Link><h2 >JSON TO CSV</h2></Link> */}
            <Link to="/jsontocsv"> <h2 >JPG TO JPEG</h2>
            </Link>


          </div>


        </div>


      </header>


    </>






  )
}
