import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from "./pages/Main/Main";

function App() {
  return (
    <Router basename='/admin'>
    <div className="container">
      <Routes>
        <Route path="/" element={<Main />}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
