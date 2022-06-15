import { Router } from "express";
import { ping } from "../controller";


const router = Router()

//ping the server
router.get("/", ping)


module.exports = router