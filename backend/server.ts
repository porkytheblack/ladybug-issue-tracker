import path from "path"
import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import client from "./db"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit: "20mb"}))
app.use(express.urlencoded({limit: "20mb", extended: true}))



dotenv.config({path: path.resolve(`${__dirname}/.env`)})

app.use(cookieParser())
app.options("*", cors({
        origin: ["https://bug-tracker-five.vercel.app","https://bug-tracker-porkytheblack.vercel.app","https://bug-tracker-git-main-porkytheblack.vercel.app", "*"],
        credentials: true
}))
app.use(cors({
        origin: ["https://bug-tracker-five.vercel.app","https://bug-tracker-porkytheblack.vercel.app","https://bug-tracker-git-main-porkytheblack.vercel.app", "*"],
        credentials: true
}));
app.use(morgan('tiny'));
app.use(express.urlencoded({extended: true}))
app.use(express.json());


const PORT = process.env.PORT || 4000 || 4001

app.use("/", require("./server/router/index"))

    
app.listen(PORT, async ()=>{
        await client.then(()=>{
                console.log("Connected to db server successfully")
        }).catch((e)=>{
                console.log("An error occured while attempting connection to db")
        })
        console.log(`App is listening on PORT: ${PORT}`);
})