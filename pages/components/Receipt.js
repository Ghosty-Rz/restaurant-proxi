import React, { useEffect, useState } from "react";

const Receipt = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the database or API
    // Replace the URL with your endpoint
    fetch("http://localhost:5000/receipts")
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error(error));
  }, []);

  return (
    <div >
      <h2>Receipt</h2>
        <ul>
        {data.map(receipt => (
            <li key={receipt.id}>
              <p>Receipt ID: {receipt.id}</p>
              <p>Amount: {receipt.amount}</p>
              <p>Date: {receipt.date}</p>
              {/* Display other receipt data as needed */}
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Receipt;
