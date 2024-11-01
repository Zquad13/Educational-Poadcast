import React, { useEffect } from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdVideoLibrary } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { RiLogoutCircleRLine  } from "react-icons/ri";
import {Link,useNavigate} from 'react-router-dom'
import { BsPersonFillUp } from "react-icons/bs";
import { IoLogoYoutube } from "react-icons/io";
import { FaGraduationCap } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

function AdminSidebar() {

  useEffect(()=>{
    if(localStorage.getItem("admin")==null){
      navigate('/')
    }
    
  })

const navigate=useNavigate()

  const handlelogout=(e)=>{
    e.preventDefault()
    alert("admin logout sucessfully")
    localStorage.removeItem("admin")
    localStorage.removeItem("token")
    navigate("/adminhome")

  }
  const handleexamcoordinator = () => {
    navigate('/adminexamcoordinatelogin')
  }
  
  return (
    <div className="sidebar">
    <div className="adminsidebar-background-color">
      <div className="text-center mt-5">
        <button className="adminsidebar-logoutbtn" onClick={handlelogout}>LOG OUT</button>
      </div>
      <div className="sidebarelements mt-5 pt-3">
        {" "}
        <Link to="/admindashboard"><IoHomeSharp className="adminsidebar-link1" style={{fontSize:"25"}}/><label className="adminsidebar-link ms-2">Dashboard</label></Link>
      </div>

      <div className="sidebarelements mt-4">
        {" "}
        <Link to="/podcastlist"><FaMicrophone className="adminsidebar-link1" style={{fontSize:"25"}}/><label className="adminsidebar-link ms-2">Podcasts</label></Link>
      </div>

      <div className="sidebarelements mt-4">
        {" "}
        <Link to="/listenerlist"><HiUsers className="adminsidebar-link1" style={{fontSize:"25"}}/><label className="adminsidebar-link ms-2">Users</label></Link>
      </div>

      <div className="sidebarelements mt-4">
        {" "}
        <Link to="/creatorlist"><BsPersonFillUp className="adminsidebar-link1" style={{fontSize:"25"}}/><label className="adminsidebar-link ms-2">Creators</label></Link>
      </div>

      <div className="sidebarelements mt-4">
        {" "}
        <Link to="/subscriptionList"><MdVideoLibrary className="adminsidebar-link1" style={{fontSize:"25"}} /><label className="adminsidebar-link ms-2">Subcribers</label></Link>
      </div>

      <div className="sidebarelements mt-4" onClick={handleexamcoordinator}>
        {" "}
        <Link to=""><FaGraduationCap className="adminsidebar-link1" style={{fontSize:"25"}} /><label className="adminsidebar-link ms-2">Exam Coordinator</label></Link>
      </div>

      {/* <div className="sidebarelements mt-4">
        {" "}
        <Link to=""><IoSearch className="adminsidebar-link1" style={{fontSize:"25"}} /><label className="adminsidebar-link ms-2">Search</label></Link>
      </div> */}
      

    

    </div></div>
  );
}

export default AdminSidebar;
