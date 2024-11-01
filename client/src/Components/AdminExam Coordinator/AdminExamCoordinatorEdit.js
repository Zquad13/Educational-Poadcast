import React, { useState } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import axios from 'axios'; // Add axios for making HTTP requests
import axiosInstance from '../../Baseurl';
import { useNavigate } from 'react-router-dom';

function AdminExamCoordinatorEdit() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
const navigate=useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        let errors = {};
        errors.email = formValidating("Email", data.email);
        errors.password = formValidating("Password", data.password);

        if (errors.email || errors.password) {
            setErrors(errors);
            return;
        }

        try {
            const response = await axiosInstance.post('/editCordinator',data);

            if (response.data.status === 200) {
                setSuccessMessage(response.data.msg);
                setErrorMessage("");
            } else {
                setErrorMessage(response.data.msg);
                setSuccessMessage("");
                alert("Done")
                navigate("/adminexamcoordinatelogin")
            }
        } catch (error) {
            setErrorMessage("Error updating data. Please try again.");
            setSuccessMessage("");
        }
    };

    return (
        <div className='row'>
            <div className='col-2'>
                <AdminSidebar />
            </div>
            <div className='col-10'>
                <div className='text-center mt-5 pt-5'>
                    <h4 className='exam-coordinate-login-h4'>Exam Coordinator</h4>
                </div>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10 exam-coordinate-login-divbox'>
                        <div className='row'>
                            <div className='col-4'>
                                <div className='ms-5 mt-5 pt-5'>
                                    <label className='exam-coordinate-login-label'>E-Mail</label><br></br>
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
                                    <button className='exam-coordinate-login-createbtn' onClick={handleSubmit}>Save</button>
                                </div>
                                {successMessage && <div className='text-success'>{successMessage}</div>}
                                {errorMessage && <div className='text-danger'>{errorMessage}</div>}
                            </div>
                            <div className='col-8 exam-coordinate-login-img'></div>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        </div>
    );
}

export default AdminExamCoordinatorEdit;
