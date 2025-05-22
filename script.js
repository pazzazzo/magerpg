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
    const { username, password } = req.body
    const hashPass = crypto.createHash("sha256").update(password).digest("base64")
    if (database.getUser({username}).length > 0) {
        return res.status(409).json({"error": "Un utilisateur existe déjà sous ce nom"})
    }

    console.log(hashPass);
    
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
    
    res.redirect("/")
})

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body
    const hashPass = crypto.createHash("sha256").update(password).digest("base64")
    console.log(hashPass);
    const user = database.getUser({username, password: hashPass})
    
    res.cookie("sessionId", user[0].id, {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 365
    })
    
    res.redirect("/")
})

app.listen(8080, () => {
    console.log("Serveur en écoute sur http://localhost:8080");
})