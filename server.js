const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const port = 5304
// dev old
// const Port = 5100
// dev new
// const Port = 5101

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
app.use(express.static(path.join(__dirname, './build')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
})

app.listen(port, () => {
    console.log(`server successfully  running on port ${port}`);
});
