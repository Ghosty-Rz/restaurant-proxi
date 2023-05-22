const express = require("express");
const app = express();
const cors = require ("cors");
const pool = require ("../../server/db");

//midleware
app.use(cors());
app.use (express.json());

//ROUTES// 

/*app.post('/addproduct/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const {Line_quantityordered} = req.body;

    const addproduct = await pool.query("INSERT INTO Line VALUES (product_id $1, Line_quantityordered $2, Line_unitprice ) ")

  } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
})*/

// API route to add a product to the Line table

//post an order
app.post("/reservation", async (req, res) => {
  try{

    const {res_code} = req.body;
    const newreservation = await pool.query("INSERT INTO reservation (res_code, res_date) VALUES ($1, $2) RETURNING res_code", [res_code], 5/20/2023);

    //const insertedReservation = newreservation.rows[0];

    //req.session.orderId = insertedReservation.res_code;

    //res.json(insertedReservation);
    //req.session.orderId = req.body ;

    //res.send(' $1 Order created successfully', [req.session.orderId]);
    //res.json(newreservation.rows[0]);
    res.send('Order created successfully');

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
})

//add a product to an order

app.post("/products/:id", async(req, res) => {
  try {
    //const orderid = req.session.orderId;
    const {id} = req.params;
    const {quantity} = req.body;
    const unitp = await pool.query("SELECT product_unitprice FROM product WHERE product_id = $1", [id]);
    const newline = await pool.query("INSERT INTO Line VALUES ($1, $2, $3, $4, $5)", 01 , 01, [id], [quantity], unitp);
  
    res.send ("Product added");

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }

});

app.post("/comfirm", async (req, res) => {
  try {

    //const orderid = req.session.orderId;
    const {client_id, client_fname, client_lname, res_retrievaltime} = req.body;

    const newclient = await pool.query("INSERT INTO client VALUES ($1, $2, $3)", [client_id], [client_fname], [client_lname]);
    const updateres = await pool.query ("UPDATE reservation SET res_Retrievaltime = $1, client_id = $2 WHERE res_code = $3", [res_retrievaltime], [client_id], 01 );

    res.send ("Your order has been registered");
    

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
});

//delete product from order 

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteproductfromorder = await pool.query("DELETE FROM Line WHERE product_id = $1", [
      id
    ]);
    res.json("Product was removed!");
  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
});

//create bill 

app.get ('/receipt', async (req, res) => {
  try {

    //const orderid = req.session.orderId;
    
    const allreservations = await pool.query("SELECT * FROM reservation");
        if (allreservations.rows.length === 0) {
          res.status(404).json({ message: "No orders found" });
        }
    
    const getreceipt = await pool.query ("SELECT * FROM Receipt WHERE res_code = $1", 01);
    res.send ("That is your receipt");
  

  } catch (err) {
    console.error(err);
    res.status(404).json({ message: "Something went wrong" });
  }
});

//get all orders

app.get("/reservations", async(req, res) => {
    try {
        const allreservations = await pool.query("SELECT * FROM reservation");
        if (allreservations.rows.length === 0) {
          res.status(404).json({ message: "No orders found" });
        }
        res.json(allreservations.rows);
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
})

//get an order

app.get("/reservation/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const reservation = await pool.query("SELECT * FROM reservation WHERE id = $1", [id]);
        if (reservation.rows.length === 0) {
          res.status(404).json({ message: "No order found" });
        }
        res.json(reservation.rows[0]);
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
})

// get all products

app.get("/products", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM product");
        if (allTodos.rows.length === 0) {
          res.status(404).json({ message: "No products yet" });
        }
        res.json(allProducts.rows);
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
});

//PORT
app.listen(3000, () => {
    console.log("server has started on port 3000");
});



/*
app.post('/api/add-to-line', (req, res) => {
    // Extract the line details from the request body
    const { resCode, productId, quantityOrdered, unitPrice } = req.body;
  
    // Perform the SQL query to add the product to the Line table
    const query = 'INSERT INTO Line (res_code, product_id, Line_quantityordered, Line_unitprice) VALUES ($1, $2, $3, $4)';
  
    // Execute the SQL query
    db.query(query, [resCode, productId, quantityOrdered, unitPrice], (error, results) => {
      if (error) {
        // Handle the error if needed
        console.error('Error adding product to Line:', error);
        res.status(500).json({ error: 'Error adding product to Line' });
      } else {
        // Product added to Line successfully
        res.status(200).json({ message: 'Product added to Line successfully' });
      }
    });
  });
  

*/