const express = require("express");
const data = require("./data.json");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 5000;

app.get('/', (req, res) => {
    return res.json(data);
})

app.listen(PORT, () => { console.log('Server started on port', PORT) });