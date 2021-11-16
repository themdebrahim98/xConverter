import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/main/Main'
import CsvToJson from './components/csvtojson/CsvToJson'


function App() {
  return (

    <div className="App">

    
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route exact path='/csvtojson' element={<CsvToJson />} />

      </Routes>

    </div>






  );
}

export default App;
