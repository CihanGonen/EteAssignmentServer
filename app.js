require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { authorization } = require("./middlewares/authMiddleware");
const companiesRoutes = require("./routes/companies");
const productsRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => console.error(error));

app.use(express.json());
app.use(cors());

app.use("/companies", authorization, companiesRoutes);
app.use("/products", authorization, productsRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("server started");
});
