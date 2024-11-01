import React, { useState } from 'react'
import '../Exam Coordinator/ExamCoordinator.css'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Baseurl';
function ExamCordinatorLogin() {

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

      axiosInstance.post(`/cordinatorLogin`,data)
     
      .then((res) => {
          console.log(res);
          if(res.status === 200){
              alert(res.data.message)
              localStorage.setItem('cordinator',1)
              navigate("/examcoordinatehome")
          }
      })
      .catch((err) => {
          console.log(err);
          alert("error")
      })
  }
  return (
    <div className='row mt-5 pt-5'>
        <div className='col-2'></div>
        <div className='col-8'>
            <div className='examcoordinator-login-divbox'>
              <div className='text-center mt-5'>
                <h2><b className='examcoordinator-login-b'>Exam Coordinator,</b> <span  className='examcoordinator-login-h2'>Log in !</span></h2>
              </div>
              <div className='text-center'>
                  <div className='mt-5'>
                    <input type='text'
                    className='examcoordinator-login-textbox ps-3'
                    placeholder='UserName'
                    value={data.email}
                    name='email'
                    onChange={handleChange}
                    />
                  </div>
                  {errors.email && <span className='text-danger'>{errors.email}</span>}
              </div>
              <div className='text-center'>
                  <div className='mt-4'>
                    <input type='password'
                    className='examcoordinator-login-textbox ps-3'
                    placeholder='Password'
                    value={data.password}
                    name='password'
                    onChange={handleChange}
                    />
                  </div>
                  {errors.password && <span className='text-danger'>{errors.password}</span>}
              </div>
              
              <div className='text-center mt-4'>
                <button className='examcoordinator-login-loginbtn ' onClick={handleSubmit}>Login</button>
              </div>
              <div className='text-center mt-4'>
                <button className='examcoordinator-login-cancelbtn'>Cancel</button>
              </div>
            </div>
        </div>
        <div className='col-2'></div>
    </div>
  )
}

export default ExamCordinatorLogin
