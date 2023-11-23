import { Routes, Route } from "react-router-dom";
import AdminManaged from "./AdminManaged/AdminManaged";
// import { MenuContext } from "../../Office/Office";
import { MenuContext } from "../../../App";
import { useEffect, useContext } from "react";

const Admin = () => {
  const { setSelectedMenu } = useContext(MenuContext);

  useEffect(() => {
    setSelectedMenu("administrator");
  }, [setSelectedMenu]);

  return (
    <Routes>
      <Route path="/" element={<AdminManaged />}></Route>
    </Routes>
  );
};

export default Admin;
