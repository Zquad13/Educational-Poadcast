import React from "react";
import { Container } from "react-bootstrap";
import "./Admin.css";
import {Link} from 'react-router-dom'
import img from '../../Assest/Group 2123.png'
function AdminLandingPage() {
  return (
    <div className="AdminHomebody">
      <img src={img} style={{width:"100%",height:"350px"}}></img>
      <Container className="adminbg">
        <div className="row">
          <div className="col-7">
            <div className="AdminHomebodyheading">
              Welcome ,<span> Admin! </span>
            </div>
            <div className="AdminHomebodyparagraph text-justify"> 
              your central hub for steering the vibrant podcasting community!
              Here, you hold the reins, managing podcasts, connecting with
              creators, and overseeing user experiences with seamless ease.
            </div>
            <div>
              <button className="Adminloginbtn"><Link to="/adminlogin" className="text-light text-decoration-none">Log in</Link></button>
            </div>
          </div>
          <div className="col-5"></div>
        </div>
      </Container>
    </div>
  );
}

export default AdminLandingPage;
