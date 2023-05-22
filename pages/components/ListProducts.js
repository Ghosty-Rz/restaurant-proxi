import React, { Fragment, useEffect, useState } from "react";
import QtyField from "./QtyField";
import AddProducts from "./AddProduct";
import AddProduct from "./AddProduct";
//import restaurantRouter from "../../server/API/routes/restaurant";


const ListProducts = () => {

    const [products, setProduct] = useState([]);

    const getProducts = async() => {
        try{

            const response = await fetch("http://localhost:3000/api/products");
            const jsonData = await response.json();

            setProduct(jsonData);
        }catch (err){
            console.error(err.message);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);


    return <Fragment>
        <div className="container mt-5">
            <h1> ~Proxi Menu~ </h1>
        </div>

        <table className ="table mt-5 text-center">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    {products.map(products => (
            <tr>
            <td>{products.product_name}</td>
            <td>{products.product_description}</td>
            <td>{products.product_unitprice}</td>
            <td> <QtyField /> </td>
            <td> <AddProduct /> </td>
          </tr> 
        )
        
        )}
    </tbody>
  </table>
        </Fragment>;
};

export default ListProducts;