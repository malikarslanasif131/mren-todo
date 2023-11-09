require("dotenv").config();

const cors = require("cors");

const express = require("express");

const app = express();

const todo = require("./routers/todo");

const connectDB = require("./config/db");

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Server started okay"));

app.use("/api/todo", todo);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => { console.log(`server is running on http:localhost:${PORT}`); });