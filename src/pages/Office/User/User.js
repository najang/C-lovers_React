import { Routes, Route } from "react-router-dom";
import UserRegistration from "./UserRegistration/UserRegistratioin";
import UserManaged from "./UserManaged/UserManaged";

const User = () => {
  return (
    <Routes>
      <Route path="/" element={<UserManaged />}></Route>
      <Route path="/userRegistration" element={<UserRegistration />}></Route>
    </Routes>
  );
};

export default User;
