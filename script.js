const express = require("express")
const app = express()
const cors = require('cors')

app.use(cors())
app.get("/register", (req, res) => {
    console.log(req.body);
    res.json({"res": "ok"})
    res.end()
})
app.get("/login")

app.listen(8080, () => {
    console.log("ok !");
})