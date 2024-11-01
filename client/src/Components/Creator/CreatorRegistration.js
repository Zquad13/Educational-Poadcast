import React, { useState } from "react";
import "../Creator/creator.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import axiosInstance from "../../Baseurl";
import validator from "validator";
import { useNavigate } from "react-router-dom";

function CreatorRegister() {
  const [CreatorRegister, setCreatorRegister] = useState({
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
    image: "",
  });

  const navigate = useNavigate();

  const creatorRegisterChange = (e) => {
    setCreatorRegister({
      ...CreatorRegister,
      [e.target.name]:
        e.target.name === "file" ? e.target.files[0] : e.target.value,
    });
  };

  const onSubmitData = (e) => {
    e.preventDefault();
    const birthDate = new Date(CreatorRegister.dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    // Adjust age calculation for edge cases
    if (
      age < 18 ||
      (age === 18 && (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)))
    ) {
      alert("You must be at least 18 years old to register.");
    } else if (birthDate > today) {
      alert("Date of Birth cannot be a future date.");
    }

    // Validate First Name and Last Name
   else  if (/\d/.test(CreatorRegister.firstname) || /\d/.test(CreatorRegister.lastname)) {
      alert("First name and Last name should not contain numbers.");
    }
    // Validate Date of Birth
    else if (new Date(CreatorRegister.dob) > new Date()) {
      alert("Date of Birth cannot be a future date.");
    }
    // Validate Mobile Number
    else if (!validator.isMobilePhone(CreatorRegister.mobile) || !validator.isByteLength(CreatorRegister.mobile, {
      min: 10,
      max: 10
    })) {
      alert("Invalid Phone Number");
    }
    // Validate Pincode
    else if (!validator.isByteLength(CreatorRegister.pincode, {
      min: 6,
      max: 6
    })) {
      alert("Invalid Pincode");
    }
    // Validate Password
    else if (!validator.isStrongPassword(CreatorRegister.password)) {
      alert("Password should have a minimum of 8 characters, including 1 uppercase letter, 1 lowercase letter, a number, and a special character.");
    }
    // If all validations pass, submit the form
    else {
      const formData = new FormData();
      for (let key in CreatorRegister) {
        formData.append(key, CreatorRegister[key]);
      }
      formData.append("image", CreatorRegister.image);

      axiosInstance
        .post("/CreatorRegister", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if(response.data.status==200){
            navigate("/creatorlogin");
            alert('Registered Successfully')
          }else{
            alert(response.data.msg);
          }
          
        })
        .catch((error) => {
          console.error("Error submitting data: ", error);
        });
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitData}>
        <div className="backgroundimg">
          <Container>
            <Row>
              <Col>
                <div className="text-center ms-5 ps-5 mt-4">
                  <b>Register</b>
                </div>
                <label>Name</label>
                <div className="firstname">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstname"
                    id="inputtransparent"
                    value={CreatorRegister.firstname}
                    onChange={creatorRegisterChange}
                  />
                </div>
                <div className="mb-2 mt-3">
                  <label className="pb-3">Gender</label>
                  <div>
                    <label htmlFor="male">&nbsp; Male &nbsp;</label>
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Male"
                      onChange={creatorRegisterChange}
                      required
                    />
                    <label htmlFor="female">&nbsp; Female &nbsp;</label>
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Female"
                      onChange={creatorRegisterChange}
                      required
                    />
                    <label htmlFor="other">&nbsp; Other &nbsp;</label>
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="Other"
                      onChange={creatorRegisterChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label>Date Of Birth</label>
                  <input
                    type="date"
                    placeholder="dob"
                    name="dob"
                    id="inputtransparent"
                    className="form-control"
                    value={CreatorRegister.dob}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col>
                <div className="mt-5  mb-3">
                  <label></label>
                  <input
                    type="text"
                    id="inputtransparent"
                    placeholder="Last Name"
                    name="lastname"
                    className="form-control"
                    value={CreatorRegister.lastname}
                    onChange={creatorRegisterChange}
                    required
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
                    id="inputtransparent"
                    placeholder="Street"
                    className="form-control"
                    value={CreatorRegister.street}
                    name="street"
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    id="inputtransparent"
                    type="number"
                    placeholder="Mobile"
                    className="form-control"
                    value={CreatorRegister.mobile}
                    name="mobile"
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    id="inputtransparent"
                    type="email"
                    placeholder="Enter Your Email"
                    className="form-control"
                    name="email"
                    value={CreatorRegister.email}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    id="inputtransparent"
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={CreatorRegister.password}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    id="inputtransparent"
                    name="country"
                    className="form-control"
                    onChange={creatorRegisterChange}
                    required
                  >
                    <option value="">Select Country</option>
                    <option>Nationality</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Japan">Japan</option>
                    <option value="China">China</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>
                <div className="mb-3">
                  Profile Picture
                  <br />
                  <input
                    type="file"
                    id="inputtransparent"
                    placeholder="Choose file"
                    className="form-control"
                    name="file"
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col>
                <div className="mb-3 pt-4">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    id="inputtransparent"
                    className="form-control"
                    value={CreatorRegister.city}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
                <div className="mb-3 pt-4">
                  <input
                    type="number"
                    id="inputtransparent"
                    placeholder="Pincode"
                    name="pincode"
                    className="form-control"
                    value={CreatorRegister.pincode}
                    onChange={creatorRegisterChange}
                    required
                  />
                </div>
              </Col>
              <Col></Col>
            </Row>
            <div className="text-center">
              {" "}
              <button
                type="submit"
                className=" RegisterButton ps-5 pe-5 p-2 mt-5 mb-5"
              >
                Register
              </button>
              <button
                type="reset"
                className="cancelbutton ps-5 pe-5 p-2 mt-5 mb-5"
              >
                Cancel
              </button>
            </div>
          </Container>
        </div>
      </form>
    </div>
  );
}

export default CreatorRegister;
