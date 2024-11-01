import React, { useState, useEffect } from 'react';
import AdminSidebar from '../Admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../../Baseurl';

function AdminExamCoordinateView() {
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the coordinator data when the component mounts
        axiosInstance.post('/viewCordinator')
            .then(response => {
                if (response.data.status === 200) {
                    setData(response.data.data);
                } else {
                    setErrors({ email: "Failed to fetch data", password: "" });
                }
            })
            .catch(error => {
                console.error('There was an error fetching the coordinator data!', error);
            });
    }, []);

    const handleEdit = () => {
        navigate('/adminexamcoordinatesave');
    }

    const handleDelete = () => {
        axiosInstance.post('/deleteCordinator')
            .then(response => {
                if (response.data.status === 200) {
                    alert('Coordinator deleted successfully');
                    setData({ email: "", password: "" });
                } else {
                    alert('Failed to delete coordinator');
                }
            })
            .catch(error => {
                console.error('There was an error deleting the coordinator!', error);
            });
    }

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
                                    <div className='row pt-5'>
                                        <div className='col-3'>
                                            <label className='exam-coordinate-login-label'>Email</label><br></br>
                                        </div>
                                        <div className='col-1'>
                                            <label>:</label>
                                        </div>
                                        <div className='col-8'>
                                            <label>{data.email}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='ms-5 mt-4'>
                                    <div className='row'>
                                        <div className='col-3'>
                                            <label className='exam-coordinate-login-label'>Password</label><br></br>
                                        </div>
                                        <div className='col-1'>
                                            <label>:</label>
                                        </div>
                                        <div className='col-8'>
                                            <label>{data.password}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center mt-5 '>
                                    <button className='exam-coordinate-login-createbtn' onClick={handleEdit}>Edit</button>
                                    <button className='exam-coordinate-login-createbtn ms-3' onClick={handleDelete}>Remove</button>
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

export default AdminExamCoordinateView;
