const express = require("express")
const cookieParser = require('cookie-parser');
const { v4 } = require('uuid');
const cors = require('cors')
const crypto = require("crypto")
const Database = require("./Database.js")
const bodyParser = require('body-parser');

const database = new Database()
const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser());


app.use((req, res, next) => {
    if (req.path == "/") {
        const {sessionId} = req.cookies
        if (sessionId && database.getUser({id: sessionId}).length == 1) {
            req.user = database.getUser({id: sessionId})[0]
            return next()
        } else {
            return res.redirect("/login")
        }
    }
    return next()
})

app.use(express.static("public"))





app.post("/api/register", (req, res) => {
    console.log(req.user);
    

    console.log(req.body);
    res.json({"res": "ok"})
    res.end()
})
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body
    const hashPass = crypto.createHash("sha256").update(password).digest("base64")
    console.log(hashPass);
    
    console.log(database.getUser({username, password: hashPass}));
    const sessionId = v4()
    database.setUser(sessionId, {
        username,
        password: hashPass,
    })
    res.cookie("sessionId", sessionId, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365
    })
    
    res.json({"res": "ok"})
    res.end()
})

app.listen(8080, () => {
    console.log("Serveur en écoute sur http://localhost:8080");
})