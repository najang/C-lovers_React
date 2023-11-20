import { Routes, Route } from "react-router-dom";
import AdminManaged from "./AdminManaged/AdminManaged";
import AdminRegistration from "./AdminRegistration/AdminRegistration";
import { MenuContext } from "../../Office/Office";
import { useEffect, useContext } from "react";

const Admin = () => {

  const { setSelectedMenu } = useContext(MenuContext);

  useEffect(() => {
    setSelectedMenu("administrator");

  }, [setSelectedMenu]); 


  return (
    <Routes>
      <Route path="/" element={<AdminManaged />}></Route>
      <Route path="/userRegistration" element={<AdminRegistration />}></Route>
    </Routes>
  );
};

export default Admin;
