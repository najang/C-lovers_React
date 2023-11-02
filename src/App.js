import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import Office from "./pages/Office/Office";

function App() {
  return (
    <Router basename="/admin">
      <Routes>
        <Route path="/office/*" element={<Office />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
