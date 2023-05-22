import { Fragment, useState } from "react";


const qtyField = () => {

    const [quantity, setQuantity] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try{
            const body = {quantity};
            const response = await fetch("http://localhost:3000/api/products/10009",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/" ;
        } catch (err) {
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            <input type = "text" className="form-control" 
                        value= {quantity} 
                        onChange= {e => setQuantity(e.target.value)}/>
        </Fragment>
    )
}

export default qtyField;