import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Method } from 'axios';
import { ApiSimplified } from './shared/Api';


function App() {


    // *********** Event handling ***********
    const onLog = (e: React.FormEvent) =>{
      e.preventDefault();

      const log = {
        timestamp: new Date(),
        levelMsg: "INFO",
        message: "Zo maar een infootje"
      }

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
