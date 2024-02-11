// move categories to routes
// complete categories CRUD
// Add route: /categories/:cat_id/ - return all entries in category


import express from "express";
import { CategoryModel } from "./db.js";
import entryRoutes from "./routes/entry_routes.js"
import categoryRoutes from "./routes/category_routes.js"
import cors from "cors"

// Register app
const app = express();

// Apply Corrs Middleware
app.use(cors())

// This parses the body of the request into json and saves it in req.body
app.use(express.json());

// Attach Entry Router Middleware
app.use("/entries", entryRoutes)
app.use("/categories", categoryRoutes)

// status 200 is automatic so not required but you can change it like this
app.get("/", (req, res) => {
  res.send({ location: "Home" });
});

// start up app
export default app
