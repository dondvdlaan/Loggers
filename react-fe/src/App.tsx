import React from 'react';
import './App.css';
import { logger } from './shared/Logger';

/**
 * Module to send a test event to the audit database at Node-logger
 */
function App() {

  // Simulating a fetch error
  const fetchData = async () => {

    try {
      return await fetch("https://some-url-that-might-fail.com");
    } 
    catch (e) {
      logger.error(e);
      return e;
    }
  };

  // *********** Event handling ***********
  const onLog = (e: React.FormEvent) =>{
    
      e.preventDefault();

      // Simulate an error
      fetchData();

      logger.info({message: "Info test message.."});
  }

  // Displays Logging button to start error simulating and logging
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
