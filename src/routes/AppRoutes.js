import { Route, Routes, Link } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../components/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUsers />
            </PrivateRoutes>
          }
        />
        <Route
          path="*"
          element={<NotFound/>}
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
