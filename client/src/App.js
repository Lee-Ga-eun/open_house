import logo from './logo.svg';
import './App.css';
import './components/dbtest_'
import DbTest from './components/dbtest_';
//import Test from './components/dbtest';
//import Home from './components/home';
import ColorSchemesExample from './components/Home';
import "bootstrap/dist/css/bootstrap.min.css";
import LinkTest from './components/houses';
import {BrowserRouter as Router, Route,Routes, Switch, Link} from  'react-router-dom';
import Upload from './components/Upload';
import ImageTest from './components/imgtest';
import Uploaded from './components/Uploaded';

function App() {
  return (
    <div className="App">


    <Router>
      <Routes>
        <Route path='/' element={<ColorSchemesExample/>} />
        <Route path='/houses/' element={<LinkTest/>}/>
        <Route path='/houses/upload' element={<Upload/>}/>
        <Route path='/imgtest' element={<ImageTest/>}/>
        <Route path='/houses/upload/posting' element={<Uploaded/>}/>
      </Routes>
    </Router>

    </div>
    // <DbTest/>
    /*
    <div className="App">
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          수정,3001포트 <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>HI</p>
        <div>
          <a href="http://localhost:5001/api/dbTest">api연결확인</a></div>
      </header>
    </div>
  */
  );
}

export default App;
