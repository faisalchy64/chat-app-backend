require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoute = require("./routes/userRoute");

const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

// connect database
connectDB();

// routes
app.get("/", (req, res) => {
    res.send("Chat App Backend");
});

app.use("/", userRoute);

// not found route
app.use((req, res, next) => {
    res.status(404).send({ message: "Route not found." });
});

// error boundary
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}.`);
});
