require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const userRoute = require("./routes/userRoute");
const conversationRoute = require("./routes/conversationRoute");
const messageRoute = require("./routes/messageRoute");

const app = express();

// use middlewares
app.use(express.json());
app.use(cors());

// connect database
connectDB();

// routes
app.get("/", (req, res) => {
    res.send({ message: "chat app" });
});

app.use("/", userRoute);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

// not found route
app.use((req, res, next) => {
    res.status(404).send({ message: "Page not found!" });
});

// error boundary
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err);
});

app.listen(process.env.PORT, () => {
    console.log(`Listening to port ${process.env.PORT}.`);
});
