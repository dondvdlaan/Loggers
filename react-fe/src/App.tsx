import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Method } from 'axios';
import { ApiSimplified } from './shared/Api';


function App() {


    // *********** Event handling ***********
    const onLog = (e: React.FormEvent) =>{
      e.preventDefault();

      console.log("new Date()", new Date())

      let today = new Date();
      let timestamp = today.getFullYear() + "-";
      timestamp += today.getMonth() + 1 + "-";  
      timestamp += today.getDate() + " ";  
      timestamp += today.getHours() + ":";  
      timestamp += today.getMinutes().toString().padStart(2,'0') + ":";  
      timestamp += today.getSeconds().toString().padStart(2,'0');  

      console.log("timestap", timestamp)

      const log = {
        timestamp,
        levelMsg: "INFO",
        message: "Zo maar een infootje"
      }

      console.log("log", log.timestamp)

      // Send Company request to DB
      const [method, path]:[Method, string] = ["POST", `api/logs`];

      ApiSimplified(method, path, log)
      .then((res)=> console.warn("back from Api logging: ", res))
      .catch(err=> console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <button 
          type="button" 
          onClick={onLog} 
          className="btn btn-warning btn-sm">
                Logging
        </button>
      </header>
    </div>
  );
}

export default App;
