import handler from "../handlers/order.handler";
import { Router } from "express";
import { tokenValidator } from "../middleware/isToken";

const app = Router();

app.get("/index", tokenValidator, handler.getOrders);

app.get("/show/:id", tokenValidator, handler.getOrder);

app.post("/create", tokenValidator, handler.createOrder);

app.put("/update/:id", tokenValidator, handler.updateOrder);

app.delete("/delete/:id", tokenValidator, handler.deleteOrder);

export default app;
