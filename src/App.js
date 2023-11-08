import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import Office from "./pages/Office/Office";
import Main from "./pages/Main/Main";

export const SubMenuContext = createContext();
function App() {
  const [naviModalOpen, setNaviModalOpen] = useState(false);
  // 모달창 닫기
  const closeModal = () => {
    setNaviModalOpen(false);
  };

  // 모달창 외부 클릭시 창 닫기

  const handlerClickBackground = (e) => {
    if (e.target.tagName !== "DIV") {
      console.log(e.target.parentElement.parentElement);
      if (e.target.tagName === "svg") {
        if (
          !e.target.parentElement.className.includes(
            "Header_headerLeft__dropNav"
          )
        ) {
          closeModal();
        } else if (e.target.tagName === "path") {
          if (
            !e.target.parentElement.parentElement.className.includes(
              "Header_headerLeft__dropNav"
            )
          ) {
            closeModal();
          }
        }
      }
    } else {
      if (!e.target.className.includes("Header_headerLeft__dropNav")) {
        console.log("같지 않음");
        closeModal();
      }
    }
  };

  return (
    <SubMenuContext.Provider
      value={{ naviModalOpen, setNaviModalOpen, handlerClickBackground }}
    >
      <Router basename="/admin">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/office/*" element={<Office />}></Route>
        </Routes>
      </Router>
    </SubMenuContext.Provider>
  );
}

export default App;
