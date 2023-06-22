const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");



const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Upforce Tech Assignment");
});

app.use("/user",userRouter);

app.listen(4500,async()=>{
    try {
        await connection;
        console.log("connected to database");
        console.log("runnig port 4500");
    } catch (error) {
        console.log("not connected");
    }
});