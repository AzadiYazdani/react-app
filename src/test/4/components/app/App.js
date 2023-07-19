import logo from './logo.svg';
import './App.css';
import ProductList from "../productList/ProductList";

function App() {

    const products =[
        {id:1, title:'Book 1'},
        {id:2, title:'Book 2'},
        {id:3, title:'Book 3'}
    ]

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
              <ProductList products={products}/>

          </p>
      </header>
    </div>
  );
}

export default App;
