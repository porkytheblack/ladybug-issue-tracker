import path from "path"

const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const client = require("./db")
const cookieParser = require("cookie-parser")



dotenv.config({path: path.resolve(`${__dirname}/.env`)})

app.use(cookieParser())
app.options("*", cors({
        origin: "http://localhost:3000",
        credentials: true
}))
app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
}));
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());


const PORT = process.env.dev_port || 4000 || 4001

app.use("/", require("./server/router/index"))

    
app.listen(PORT, ()=>{
        console.log(`App is listening on PORT: ${PORT}`);
})