import { Router } from "express";
import restaurantRouter from "../../server/API/routes/todo";

const apirouter = Router();

apirouter.use("/", restaurantRouter);

export default apirouter;