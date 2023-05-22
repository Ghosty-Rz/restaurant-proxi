import React, { Fragment, useState } from "react";

const CreateOrderButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const createNewOrder = async () => {
    setIsLoading(true);
    try {
      
      const response = await fetch("http://localhost/3000/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ /* Order data */ }),

        
      });

      // Handle the API response
      //if (response.ok) {
        console.log("New order created successfully");
        showOrderStartMessage();
        // Perform any necessary actions after order creation
      /*} else {
        console.error("Failed to create a new order");
      }*/
    } catch (error) {
      console.error("An error occurred while creating the order:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const showOrderStartMessage = () => {
    // Display the message using an alert or a custom modal component
    // Replace this with your preferred method of displaying messages
    alert("You can start ordering");
  };

  return (
    <Fragment>
        <div className="container mt-5 ">
    <button 
      type="button"
      className="btn btn-primary"
      onClick={() => {
        createNewOrder();
      }}
      disabled={isLoading}
    >
      {isLoading ? "Creating Order..." : "Create New Order"}
      

    </button>

    </div>
    </Fragment>
  );
};

export default CreateOrderButton;
