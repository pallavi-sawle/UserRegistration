require("dotenv").config()
const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let verifyToken = require('./middleware/authentication');
require('./config/database').connect()

const app = express()
const PORT = process.env.API_PORT;

const login = require('./model/user')
const user = require('./model/user')

// app.use(bodyParser.urlencoded({ extended: false }))
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());

app.post("/login1", urlencodedParser, async function (req, res) {
    let { email, password, name } = req.body;

    if (!(email && password && name)) {
        res.status(400).send("Please provide all the inputs")
    }

    if (await login.findOne({ email })) {
        res.send("User already exists")
    }
    else {
        let enc_password = await bcrypt.hash(password, 10)

        let user = await login.create({
            email: email,
            password: enc_password,
            name: name
        })
        let token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "5h" });

        user.token = token;

        res.json(user);
    }
    console.log(req.body);
})

app.get('/profile', verifyToken, function (req, res) {
    res.send("Hello Welcome")
})

app.listen(PORT, () => console.log(`Project is running at ${PORT} port`))