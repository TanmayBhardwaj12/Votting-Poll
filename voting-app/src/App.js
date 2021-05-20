/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
import React from 'react';
import './App.css';
import Voting from './components/Voting';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from './components/Main';
function App() {
 return (
   <div className="App">
     <Router>
         <Switch>
           <Route exact path="/voting">
              <Voting/>
           </Route>
           <Route exact path='/'>
              <Main/>
           </Route>
         </Switch>
     </Router>
   </div>
 );
}

export default App;