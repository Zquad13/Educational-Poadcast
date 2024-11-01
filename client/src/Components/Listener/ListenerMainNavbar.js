import React, { useEffect, useState } from 'react'
import logo from "../../Assest/Logo (1).png";
import { Link } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import axiosInstance from '../../Baseurl';
import image from '../../Assest/Group 2151.png'
function ListenerMainNavbar({url}) {
  
    const [listenernav, setListenernav] = useState("");


    useEffect(() => {
        axiosInstance
        .post("/viewListenerById", { id: localStorage.getItem("listenerid") })
        .then((response) => {
            if (
            response.data.data &&
            response.data.data.image
            ) {
            console.log(response.data.data.image.filename);
            setListenernav(response.data.data.image.filename);
            }
            console.log(listenernav, "mm");
        });
    },[]);
  return (
    <Navbar>
    <Container>
      <Link to="/listenerhome">
        <img className="footerimg" src={logo} alt="img"></img>
      </Link>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Link
          to="/listenerhome"
          className="landingpage_links text-decoration-none me-5"
          id="landingpage_links_hover"
        >
          <b>Home</b>
        </Link>
        <Link
          to="/listenerexamreport"
          className="landingpage_links text-decoration-none me-5"
          id="landingpage_links_hover"
        >
          <b>Exam Report</b>
        </Link>
        <Link
          to="/listenersubscription"
          className="landingpage_links text-decoration-none me-5"
          id="landingpage_links_hover"
        >
          <b>Subscription</b>
        </Link>
        <Link
          to="/listenerWhishlist"
          className="landingpage_links text-decoration-none me-5"
          id="landingpage_links_hover"
        >
          <b>wishlist</b>
        </Link>
        <Link class="nav-link text-decoration-none" to="/listenerProfile">
          <div className="circular-img">
            <img
              src={url + listenernav}
              alt="img"
              className="listener-mainnavbar-profileimg"
            ></img>
          </div>
        </Link>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default ListenerMainNavbar
