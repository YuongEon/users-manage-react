import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../images/atom.png";
import { useLocation, NavLink, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalContextApi } from "../customHooks/useContextApi";

const Header = (props) => {
  let location = useLocation();
  console.log(location.pathname);
  const { userLogout } = useContext(GlobalContextApi);

  let user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/");
    toast.success("logout success!");
  };
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to={"/"} className="flex-algin-center">
            <img src={logo} alt="logo" width={40} height={40} />
            <span className="mrl-2">Users CSV Manage App</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {location.pathname !== "/login" && (
              <>
                <Nav className="me-auto" activeKey={location.pathname}>
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Manage Users
                  </NavLink>
                </Nav>
                <Nav>
                  <NavDropdown
                    title={user && user.email ? `${user.email}` : "Account"}
                    id="basic-nav-dropdown"
                  >
                    {user ? (
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    ) : (
                      <NavDropdown.Item as={Link} to={"/login"}>
                        Login
                      </NavDropdown.Item>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
