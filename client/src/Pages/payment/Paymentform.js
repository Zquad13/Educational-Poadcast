import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Footer from "../../Pages/Listener/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import { toast } from "react-toastify";
import { BsArrowClockwise } from "react-icons/bs";
import { useParams, Link } from 'react-router-dom';

function Paymentform() {
  const [cardholdername, setCardholdername] = useState("");
  const [creaditcardnumber, setCredictcardnumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [CVV, setCVV] = useState("");
  const [podcast, setPodcast] = useState({});

  const enteredDateObj = new Date(expirationDate);
  const currentDate = new Date();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    axiosInstance
      .post("/getPodcastByPodcastId", {
        id: id.split(",")[0],
      })
      .then((response) => {
        setPodcast(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Error submitting data: ", error);
      });
  }, [id]);

  const handlePayment = async () => {
    const cardNumberPattern = /^\d{16}$/;
    const cvvPattern = /^\d{3}$/;

    if (cardholdername.length > 3) {
      if (cardNumberPattern.test(creaditcardnumber)) {
        if (enteredDateObj > currentDate) {
          if (cvvPattern.test(CVV)) {
            try {
              const result = await axiosInstance.post("/subscribePodcast", {
                listenerid: localStorage.getItem("listenerid"),
                podcastid: id,
                paymentstatus: true,
              });
              if (result.data.status === 400) {
                alert("Already subscribed");
                navigate("/listenersubscription");
              } else if (result.data.status === 200) {
                alert("Payment Success");
                navigate("/listenersubscription");
              }

              console.log(result);
            } catch (err) {
              console.log("Error:", err);
              if (err.response && err.response.data && err.response.data.message) {
                document.getElementById("alertuser").innerHTML =
                  err.response.data.message;
              } else {
                document.getElementById("alertuser").innerHTML =
                  "An error occurred. Please try again.";
              }
            }
          } else {
            alert("CVV must be a 3-digit number");
          }
        } else {
          alert("Please select a future expiration date");
        }
      } else {
        alert("Credit card number must be a 16-digit number");
      }
    } else {
      alert("Please enter a valid cardholder name");
    }
  };

  return (
    <div>
      <div className="paymentmain">
        <div className="row">
          <div className="col">
            <div className="listenerlogin_form">
              <h4 className="text-success m-4">Upgrade Now!</h4>
              <form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardholdername}
                    onChange={(e) => setCardholdername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="Credit Card Number"
                    value={creaditcardnumber}
                    onChange={(e) => setCredictcardnumber(e.target.value)}
                    maxLength={16}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="month"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="CVV"
                    value={CVV}
                    onChange={(e) => setCVV(e.target.value)}
                    maxLength={3}
                  />
                </Form.Group>
                <div id="alertuser"></div>
                <div>
                  <button
                    type="button"
                    onClick={handlePayment}
                    className="listenerloginbtn mb-2 p-1"
                  >
                    Proceed to payment amount {podcast[0]?.price}/-
                  </button>{" "}
                </div>
                <div>
                  <button
                    type="button"
                    className="listenercancelbtn p-1"
                    variant="secondary"
                  >
                    <Link
                      className="text-dark text-decoration-none"
                      to="/listenerhome"
                    >
                      Cancel
                    </Link>
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paymentform;
