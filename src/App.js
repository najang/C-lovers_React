import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Office from "./pages/Office/Office";
import Main from "./pages/Main/Main";

function App() {
  return (
    <Router basename="/admin">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/office/*" element={<Office />}></Route>
      </Routes>
    </Router>
  );
}

export default App; 
