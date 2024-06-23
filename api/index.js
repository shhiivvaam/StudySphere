const express = require("express");
const data = require("./data.json");

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    return res.json(data);
})

app.listen(PORT, () => { console.log('Server started on port', PORT) });