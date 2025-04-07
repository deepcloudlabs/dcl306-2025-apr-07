import logo from './logo.svg';
import './App.css';

//  I. Stateful Component
//      i. class -> ii. function + hooks (useState())
// II. Stateless Component
//      function
// State Management: I. Stateful Component(s)
//                  II. Context API, Reducer
function App() { // Component
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

export default App;
