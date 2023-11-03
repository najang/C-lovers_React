import "./App.css";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Main from "./pages/Main/Main";

function App() {
  return (
    <Router basename='/admin'>
      <Routes>
        <Route path="/" element={<Main />}/>
      </Routes>
  </Router>
  );
}

export default App;
