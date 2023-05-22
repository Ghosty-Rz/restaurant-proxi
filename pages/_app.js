import "../styles/globals.css";
import { Fragmant, Fragment } from 'react'


//components
import CreateOrder from "./components/CreateOrder";
import ListProducts from "./components/ListProducts";
import Comfirmation from "./components/Comfirmation";


function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <div className="container">
          <CreateOrder />
          <ListProducts />
          <Comfirmation />
      </div>
      
    </Fragment>
  );
}

export default MyApp;