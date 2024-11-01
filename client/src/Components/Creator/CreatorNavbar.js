import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../Assest/Logo (1).png";
import "../Listener/listenernav.css";
import Nav from "react-bootstrap/Nav";
import axiosInstance from "../../Baseurl";
import { useNavigate,Link } from "react-router-dom";
import image from '../../Assest/Group 2151.png'
import { Dropdown } from "react-bootstrap";

function CreatorNavbar({url}) {
  const [creatornav, setCreatornav] = useState("");

  const navigate=useNavigate();

  const addquestion = () => {
    navigate("/createraddquestion")
  }

  const viewquestion = () => {
    navigate("/createreditquestion")
  }

  const ExamQuestionStatus = () => {
    navigate("/createrexamquestionstatus")
  }

  const viewreport = () => {
    navigate("/createrviewreport")
  }

  useEffect(() => {
    axiosInstance
      .post("/viewCreatorById", { id: localStorage.getItem("creatorid") })
      .then((response) => {
        if (
          response.data.data &&
          response.data.data.image
        ) {
          console.log(response.data.data.image.filename);
          setCreatornav(response.data.data.image.filename);
        }else{
          console.log(creatornav, "mm");
        }
      });
  },[]);

  // const navigate=useNavigate()
  const creatorid=localStorage.getItem("creatorid")

  // const Viewreview=()=>{
  //   navigate("/viewreview/"+creatorid)
  // }


  return (
    <div>
      <Navbar>
        <Container>
          <Link to="/creatorhome">
            <img className="footerimg" src={logo} alt="img"></img>
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link
              to="/creatorhomepage"
              className="landingpage_links text-decoration-none me-5"
              id="landingpage_links_hover"
            >
              <b>Home</b>
            </Link>
            <Dropdown className=''>
              <Dropdown.Toggle variant="white" 
              style={{border:'none'}} 
              className="landingpage_links text-decoration-none" 
              id="landingpage_links_hover">
                <b>Exam</b>
              </Dropdown.Toggle>
                <Dropdown.Menu >
                  <Dropdown.Item onClick={addquestion}>Add Question</Dropdown.Item>
                  <Dropdown.Item onClick={viewquestion}>View Question</Dropdown.Item>
                  <Dropdown.Item onClick={ExamQuestionStatus}>Question Status</Dropdown.Item>
                  <Dropdown.Item onClick={viewreport}>Exam Report</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            <Link
              to={`/subscription`}
              className="landingpage_links text-decoration-none me-5 ms-3"
              id="landingpage_links_hover"
            >
              <b>Subscribers</b>
            </Link>
            {/* <Link
              className="landingpage_links text-decoration-none me-5"
              id="landingpage_links_hover"
              to={`/viewreview/${creatorid}`}
            >
              Reviews
            </Link> */}
            <Link class="nav-link text-decoration-none" to="/creatorprofile">
              <div className="circular-img">
                <img
                  src={url + creatornav}
                  alt="img"
                  className="creater-navbar-img"
                ></img>
              </div>
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default CreatorNavbar;
// {`${url}/${data.image.filename}`}
