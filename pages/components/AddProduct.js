import React, { Fragment, useState } from "react";

const AddProduct = ({ product }) => {
  const [theproduct, setproductid] = useState (product.product_id);

  //edit description function

  const addproductid = async e => {
    e.preventDefault();
    try {
      const body = { theproduct };
      const response = await fetch(
        `http://localhost:5000/todos/${product.Product_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${product.Product_id}`}
      >
        
      </button>

      {/* 
        id = id10
      */}
      <div
        class="modal"
        id={`id${product.Product_id}`}
        onClick={() => setproductid(product.Product_id)}
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Product</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                onClick={() => setproductid(product.Product_id)}
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input
                type="text"
                className="form-control"
                value={Product_id}
                onChange={e => setproductid(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-warning"
                data-dismiss="modal"
                onClick={e => addproductid(e)}
              >
                
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setproductid(product.Product_id)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddProduct;