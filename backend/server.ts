import path from "path"

const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require("morgan")
const client = require("./db")



dotenv.config({path: path.resolve(`${__dirname}/config.env`)})


app.use(cors());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());

client.connect().then(()=>{
        console.log("Connected successfully to db")
}).catch((e)=>{
        console.error("An error occured")
        console.error(e)
})

const PORT = process.env.dev_port || 4000 || 4001

app.use("/", require("./server/router/index"))

    
app.listen(PORT, ()=>{
        console.log(`App is listening on PORT: ${PORT}`);
})