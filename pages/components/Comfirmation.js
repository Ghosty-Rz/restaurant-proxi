import React, { Fragment, useState } from "react";
import Receipt from "./Receipt";

const ConfirmOrderButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [orderRegistered, setOrderRegistered] = useState(false);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  const handleConfirmOrder = () => {
    setShowPopup(true);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    // Perform any necessary actions to submit the order
    try {
      
        const response = await fetch("http://localhost/3000/api/comfirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ /* Order data */ }),
        });
  
        // Handle the API response
        if (response.ok) {
          console.log("New order created successfully");
          // Perform any necessary actions after order creation
        } else {
          console.error("Failed to create a new order");
        }
      } catch (error) {
        console.error("An error occurred while creating the order:", error);
      } 
    
    setOrderRegistered(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setOrderRegistered(false);
    setInput1("");
    setInput2("");
    setInput3("");
    setInput4("");
  };

  return (
    <Fragment>
        <div className="container mt-3 mb-5">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleConfirmOrder}
      >
        Confirm Order
      </button>

      {showPopup && !orderRegistered && (
        <div className="popup mt-4">
          <div className="popup-content">
            <h2>Enter Order Details</h2>
            <form onSubmit={handleSubmitOrder}>
              <input
                type="text"
                placeholder="ID"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
              />
              <input
                type="text"
                placeholder="First Name"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={input3}
                onChange={(e) => setInput3(e.target.value)}
              />
              <input
                type="text"
                placeholder="Retrieval Time"
                value={input4}
                onChange={(e) => setInput4(e.target.value)}
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={closePopup}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {orderRegistered && (
        <div className="popup mt-4 ">
          <div className="popup-content">
            <h2>Order Registered</h2>
            <p>Your order has been successfully registered.</p>
            <h4>Order Registered</h4>
            <p>ID:             {input1}</p>
            <p>First Name:     {input2}</p>
            <p>Last Name:      {input3}</p>
            <p>Retrieval Time: {input4}</p>
            {/* Display Receipt here */}
            <Receipt />
            <button type="button" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </Fragment>
  );
};


export default ConfirmOrderButton;
