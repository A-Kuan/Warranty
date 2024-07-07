import express from "express";
import { handler } from "./build/handler.js";

const app = express();
const PORT = 5173;

app.get("/health-check", (req,res) => {
    res.send({
        message: "Server is up ann running",
        status: 200
    })
})

app.use(handler);

app.listen(PORT, () => {
    console.log("svelte running on port: ",PORT);
})