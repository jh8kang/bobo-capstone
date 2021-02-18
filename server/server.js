const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

const URL = "https://api.unsplash.com/search/photos?per_page=21&query=";
const KEY = "&client_id=" + process.env.API_KEY;

app.get("/photos/:search", (req, res) => {
  const search = req.params.search;
    axios.get(URL +`${search}` + KEY)
    .then(response=> {
      res.json(response.data.results);
    })
});

app.listen(PORT, () => {
    console.log(`Server listening on Port ${PORT}`);
  });
  