import { Router } from "express";
import {
  postreservation,
  addproduct,
  comfirmation,
  deleteproduct,
  getreceipt,
  getreservation,
  getreservations,
  getproducts,
} from "../controllers/restaurant";

const restaurantRouter = Router();

restaurantRouter.post("/reservation", postreservation);
restaurantRouter.post("/products/:id", addproduct);
restaurantRouter.post("/comfirm", comfirmation);
restaurantRouter.delete("/products/:id", deleteproduct);
restaurantRouter.get("/receipt", getreceipt);
restaurantRouter.get("/reservations", getreservation);
restaurantRouter.get("/reservation/:id", getreservations);
restaurantRouter.get("/products", getproducts);

export default restaurantRouter;