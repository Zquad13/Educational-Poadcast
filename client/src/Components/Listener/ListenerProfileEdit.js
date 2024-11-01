import React, { useState, useEffect } from "react";
import "./listenerregister.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axiosInstance from "../../Baseurl";
import validator from "validator";
import { useNavigate, Link } from "react-router-dom";

function ListenerEdit() {
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .post("/viewListenerById", { id: localStorage.getItem("listenerid") })
      .then((response) => {
        console.log(response.data.data);
        document.getElementById(
          response.data.data.gender.toLowerCase()
        ).checked = true;

        setListenerRegister(response.data.data);
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  }, []);

  const [listenerRegister, setListenerRegister] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    password: "",
    street: "",
    city: "",
    country: "",
    pincode: "",
    image: null, 
  });

  const ListenerRegisterChange = (e) => {
    const { name, value, files } = e.target;
    setListenerRegister({
      ...listenerRegister,
      [name]: name === "image" ? files[0] : value, 
    });
  };

  // const onSubmitData = (e) => {
  //   e.preventDefault();

  //   const today = new Date();

  //   if (new Date(listenerRegister.dob) > today) {
  //     alert("Date of Birth cannot be in the future.");
  //   } else if (!validator.isMobilePhone(listenerRegister.mobile.toString(), 'en-IN')) {
  //     alert("Invalid Phone Number. It should have exactly 10 digits.");
  //   } else if (
  //     !validator.isByteLength(listenerRegister.pincode, {
  //       min: 6,
  //       max: 6,
  //     })
  //   ) {
  //     alert("Invalid Pincode");
  //   } else if (!validator.isStrongPassword(listenerRegister.password)) {
  //     alert(
  //       "Password should have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, a number, and a special character."
  //     );
  //   } else {
  //     const formData = new FormData();
  //     for (let key in listenerRegister) {
  //       formData.append(key, listenerRegister[key]);
  //     }
  //     formData.append("id", localStorage.getItem("listenerid"));

  //     axiosInstance
  //       .post("/editListenerById", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         alert(response.data.msg);
  //         navigate("/listenerProfile");
  //       })
  //       .catch((error) => {
  //         console.error("Error submitting data: ", error);
  //       });

  //     console.log("Submitted");
  //   }
  // };

  const onSubmitData = (e) => {
    e.preventDefault();
  
    const today = new Date();
  
    if (new Date(listenerRegister.dob) > today) {
      alert("Date of Birth cannot be in the future.");
    } else if (!/^\d{10}$/.test(listenerRegister.mobile)) {
      alert("Invalid Phone Number. It should have exactly 10 digits.");
    } else if (
      !validator.isByteLength(listenerRegister.pincode, {
        min: 6,
        max: 6,
      })
    ) {
      alert("Invalid Pincode");
    } else if (!validator.isStrongPassword(listenerRegister.password)) {
      alert(
        "Password should have at least 8 characters, including 1 uppercase letter, 1 lowercase letter, a number, and a special character."
      );
    } else {
      const formData = new FormData();
      for (let key in listenerRegister) {
        formData.append(key, listenerRegister[key]);
      }
      formData.append("id", localStorage.getItem("listenerid"));
  
      axiosInstance
        .post("/editListenerById", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          alert(response.data.msg);
          navigate("/listenerProfile");
        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });
  
      console.log("Submitted");
    }
  };
  

  useEffect(() => {
    if (localStorage.getItem("listenerid") !== null) {
      navigate("/listeneredit");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitData}>
        <Container>
          <Row>
            <Col>
              <div className="text-center mb-4">Edit Profile</div>
              <div className="firstname">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  name="firstname"
                  value={listenerRegister.firstname}
                  onChange={ListenerRegisterChange}
                />
              </div>
              <div className="col-12 pb-3 mt-4">
                <label className="pb-3">Gender:</label>
                <label htmlFor="male">&nbsp; Male &nbsp;</label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={ListenerRegisterChange}
                  required
                />
                <label htmlFor="female">&nbsp; Female &nbsp;</label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3 me-5">
                <label>Date of Birth</label>
                <input
                  type="date"
                  placeholder="DOB"
                  name="dob"
                  className="form-control"
                  value={listenerRegister.dob}
                  onChange={ListenerRegisterChange}
                  max={new Date().toISOString().split("T")[0]}  // Restrict future dates
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="lastname mt-5">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  name="lastname"
                  value={listenerRegister.lastname}
                  onChange={ListenerRegisterChange}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="imageUpload">Upload Profile Image</label>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept="image/*"
                  onChange={ListenerRegisterChange}
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Street"
                  name="street"
                  className="form-control"
                  value={listenerRegister.street}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Mobile"
                  className="form-control"
                  value={listenerRegister.mobile}
                  name="mobile"
                  // pattern="\d{10}" // Ensures only 10 digits are accepted
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
                  name="email"
                  value={listenerRegister.email}
                  id="inputwidth"
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="City"
                  name="city"
                  className="form-control"
                  value={listenerRegister.city}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  placeholder="Pincode"
                  name="pincode"
                  className="form-control"
                  value={listenerRegister.pincode}
                  onChange={ListenerRegisterChange}
                  required
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
          <div className="text-center">
            <button type="submit" className="RegisterButton ps-5 pe-5 p-2">
              Save Changes
            </button>
            <button type="reset" className="cancelbutton ps-5 pe-5 p-2">
              <Link className="text-dark" to="/listenerProfile">
                Cancel
              </Link>
            </button>
          </div>
        </Container>
      </form>
    </div>
  );
}

export default ListenerEdit;
