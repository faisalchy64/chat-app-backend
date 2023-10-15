require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.send("Chat App Backend");
});

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
