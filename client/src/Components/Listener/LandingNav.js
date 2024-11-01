import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../Assest/Logo (1).png";
import { Link } from "react-router-dom";
import "./landingnav.css";

function LandingNav({ props }) {
  const getLoginDropdown = () => {
    return (
      <NavDropdown title="Login" id="login-dropdown">
        <NavDropdown.Item as={Link} to="/ListenerLogin">
          Listener Login
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/creatorlogin">
          Creator Login
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/examcoordinatelogin">
        Coordinator Login
      </NavDropdown.Item>
      </NavDropdown>
    );
  };

  const getRegisterDropdown = () => {
    return (
      <NavDropdown title="Register" id="register-dropdown">
        <NavDropdown.Item as={Link} to="/ListenerRegister">
          Listener Register
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/creatorregister">
          Creator Register
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  let data;

  switch (props.value) {
    case "listenerlanding":
      data = [
        { content: "Home", path: "/" },
        { content: "Login", dropdown: getLoginDropdown },
        { content: "Register", dropdown: getRegisterDropdown },
      ];
      break;
    case "creatorlanding":
      data = [
        { content: "Home", path: "/" },
        { content: "Login", dropdown: getLoginDropdown },
        { content: "Register", dropdown: getRegisterDropdown },
      ];
      break;
    default:
      data = [];
  }

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Link to="/">
            <img className="footerimg" src={logo} alt="img" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {data.map((item, index) => (
                item.dropdown ? (
                  item.dropdown()
                ) : (
                  <Nav.Link
                    as={Link}
                    key={index}
                    to={item.path}
                    className="landingpage_links text-decoration-none me-5"
                    id="landingpage_links_hover"
                  >
                   <b>{item.content}</b> 
                  </Nav.Link>
                )
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default LandingNav;
