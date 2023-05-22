import pool from "../../db";
import { Request, Response } from "express";


const postreservation = async (req: Request, res: Response) => {
    try{

        const {res_code} = req.body;
        const newreservation = await pool.query("INSERT INTO reservation (res_code, res_date) VALUES ($1, $2) RETURNING res_code", [res_code, '5/20/2023']);
    
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
};

const addproduct = async (req: Request, res: Response) => {
    try {
        //const orderid = req.session.orderId;
        const {id} = req.params;
        const {quantity} = req.body;
        const unitp = await pool.query("SELECT product_unitprice FROM product WHERE product_id = $1", [id]);
        const newline = await pool.query("INSERT INTO Line VALUES ($1, $2, $3, $4, $5)", [1 , 1, id, quantity, unitp]);
      
        res.send ("Product added");
    
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
};

const comfirmation = async (req: Request, res: Response) => {
    try {

        //const orderid = req.session.orderId;
        const {client_id, client_fname, client_lname, res_retrievaltime} = req.body;
    
        const newclient = await pool.query("INSERT INTO client VALUES ($1, $2, $3)", [client_id, client_fname, client_lname]);
        const updateres = await pool.query ("UPDATE reservation SET res_Retrievaltime = $1, client_id = $2 WHERE res_code = $3", [res_retrievaltime, client_id, 1] );
    
        res.send ("Your order has been registered");
        
    
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
};

const deleteproduct = async (req: Request, res: Response) => {
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
};

const getreceipt = async (req: Request, res: Response) => {
    try {

        //const orderid = req.session.orderId;
        
        const allreservations = await pool.query("SELECT * FROM reservation");
            if (allreservations.rows.length === 0) {
              res.status(404).json({ message: "No orders found" });
            }
        
        const getreceipt = await pool.query ("SELECT * FROM Receipt WHERE res_code = $1", [1]);
        res.send ("That is your receipt");
      
    
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
};

const getreservations = async (req: Request, res: Response) => {
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
};

const getreservation = async (req: Request, res: Response) => {
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
};

const getproducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await pool.query("SELECT * FROM product");
        if (allProducts.rows.length === 0) {
          res.status(404).json({ message: "No products yet" });
        }
        res.json(allProducts.rows);
      } catch (err) {
        console.error(err);
        res.status(404).json({ message: "Something went wrong" });
      }
};

export { postreservation, addproduct, comfirmation, deleteproduct, getreceipt, getproducts, getreservation, getreservations};