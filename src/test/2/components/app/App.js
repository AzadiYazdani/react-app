import logo from './logo.svg';
import './App.css';
import Product from "../product/Product";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <p>
              <Product title="Book 1"/>
              <Product title="Book 2"/>
              <Product title="Book 3"/>
          </p>
      </header>
    </div>
  );
}

export default App;
