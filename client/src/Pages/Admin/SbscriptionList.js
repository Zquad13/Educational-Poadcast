import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import Table from 'react-bootstrap/Table';
import axiosInstance from '../../Baseurl';
import '../../Components/Creator/creatorpodcastlist.css'


function SbscriptionList() {
    const [subscriptionList, setsubscriptionList] = useState([])

    useEffect(() => {
        axiosInstance
            .post("/viewsubscriptions")
            .then((response) => {
                console.log(response,"l");
                
                setsubscriptionList(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.error("Error submitting data: ", error);
            });


    }, []);


  return (
    <div className='row '>
    <div className='col-3 '><AdminSidebar /></div>
    <div className='col-9 mt-5 pt-5'>< div style={{
        margin: "8px", padding: "14px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    }}>   <h3 className='text-success'>Subscription List</h3>
    {
        subscriptionList.length>0?<Table striped bordered hover>
            <thead>
                <tr>
                    <th>Profile</th>
                    <th> Name</th>
                    <th> Mobile</th>
                    <th>Email ID</th>
                    <th> DOB</th>
                    <th> Gender</th>
                    <th> Country
                    </th> <th> City</th>

                </tr>
            </thead>
            {
                subscriptionList.map((item, index) => (
                    <tbody>
                        <tr>
                            <td>{ }</td>
                            <td>{item.listenerid?.firstname}{item.listenerid.lastname}</td>
                            <td>{item.listenerid?.mobile}</td>
                            <td>{item.listenerid?.email}</td>
                            <td>{item.listenerid?.dob}</td>
                            <td>{item.listenerid?.gender}</td>
                            <td>{item.listenerid?.country}</td>
                            <td>{item.listenerid?.city}</td>

                        </tr>
                    </tbody>
                ))
            }

        </Table>:'No Subscriptions Found'
    }
        
    </div></div>
</div>
  )
}

export default SbscriptionList