import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Components/Admin/AdminSidebar";
import Table from "react-bootstrap/Table";
import axiosInstance from "../../Baseurl";

function CreatorList({ url }) {
  const [creatorlist, setCreatorList] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("/viewCreators")
      .then((response) => {
        setCreatorList(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  }, []);

  return (
    <div className="row adminbg ">
      <div className="col-3">
        <AdminSidebar />
      </div>
      <div className="col-9 mt-5 pt-5">
        <div
          style={{
            margin: "8px",
            padding: "14px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          {" "}
          <h3 className="text-success">Creators List</h3>
          {
            creatorlist.length>0?<Table striped bordered hover>
            <thead>
              <tr>
                <th>Profile</th>
                <th> Name</th>
                <th> Mobile</th>
                <th>Email ID</th>
                <th> DOB</th>
                <th> Gender</th>
                <th> Country</th> <th> City</th>
              </tr>
            </thead>
            {creatorlist.map((item, index) => (
              <tbody>
                <tr>
                  <td>
                    {
                      <div className="circular-img">
                        <img
                          src={url + item.image.filename}
                          alt="img"
                          className="profileimg"
                        ></img>
                      </div>
                    }
                  </td>
                  <td>
                    {item.firstname}
                    {item.lastname}
                  </td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>{item.dob}</td>
                  <td>{item.gender}</td>
                  <td>{item.country}</td>
                  <td>{item.city}</td>
                </tr>
              </tbody>
            ))}
          </Table>:'No Creators Found'
          }
          
        </div>
      </div>
    </div>
  );
}

export default CreatorList;
