import React, { useState } from 'react'
import './AdminExamCoordinator.css'
import AdminSidebar from '../Admin/AdminSidebar'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Baseurl';
function AdminExamCoordinatorLogin() {

    const navigate=useNavigate();
    const[data,setData]=useState({
        email:"",
        password:""
    })

    const[errors,setErrors]=useState({
        email:"",
        password:""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({
          ...data,
          [name]: value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      };

    const formValidating = (fieldName, value) => {
        if (!value.trim()) {
          return `${fieldName} is required`;
        }
    
        if (fieldName === "Email" && !value.endsWith("@gmail.com")) {
          return "Email must be a valid Gmail address";
        }
    
        if (fieldName === "Password") {
          const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
          if (!passwordRegex.test(value)) {
            return "Password must contain at least one number, one special character, and one capital letter";
          }
        }
    
        return "";
    };

    const validateForm = () => {
        let formErrors = {};
    
        if (!data.email) formErrors.email = "Email Required";
        if (!data.password) formErrors.password = "Password Required";
    
        return formErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        let errors={};
        errors.email = formValidating("Email",data.email);
        errors.password = formValidating("Password",data.password);
        console.log(data);
        setErrors(errors);

        axiosInstance.post(`/addCordinator`,data)
       
        .then((res) => {
            console.log(res);
            if(res.data.status === 200){
                alert(res.data.msg)
                navigate("/adminexamcoordinateview")
            }
        })
        .catch((err) => {
            console.log(err);
            alert("error")
        })
    }

    // const handleexamcoordinatorview = () => {
    //     navigate("/adminexamcoordinateedit")
    // }

  return (
    <div className='row'>
        <div className='col-3'>
            <AdminSidebar/>
        </div>
        <div className='col-9'>
            <div className='text-center mt-5 pt-5'>
                <h4 className='exam-coordinate-login-h4'>Exam Coordinator</h4>
            </div>
            <div className='row mt-5'>
                <div className='col-1'>
                    
                </div>
                <div className='col-10 exam-coordinate-login-divbox'>
                    <div className='row'>
                        <div className='col-4'>
                            <div className='ms-5 mt-5 pt-5'>
                                <label className='exam-coordinate-login-label' >E-Mail</label><br></br>
                                <input type='email' 
                                className='mt-2 exam-coordinate-login-textbox ps-3'
                                placeholder='E-Mail'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>
                            <div className='ms-5 mt-4'>
                                <label className='exam-coordinate-login-label'>Password</label><br></br>
                                <input type='password' 
                                className='mt-2 exam-coordinate-login-textbox ps-3'
                                placeholder='Password'
                                name='password'
                                value={data.password}
                                onChange={handleChange}
                                />
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>
                            <div className='text-center mt-5'>
                                <button className='exam-coordinate-login-createbtn'onClick={handleSubmit} >Create</button>
                            </div>
                        </div>
                        <div className='col-8 exam-coordinate-login-img'></div>
                    </div>
                </div>
                <div className='col-1'></div>
            </div>
        </div>
    </div>
  )
}

export default AdminExamCoordinatorLogin
