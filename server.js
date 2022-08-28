const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");

app.use(express.static("client/build"));

app.get("/barcode", async (req, res)=>{
   let barcode = req.query.barcode;
   let response = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`);
   let json = await response.json();
   res.send(json);
});

app.listen(3000);