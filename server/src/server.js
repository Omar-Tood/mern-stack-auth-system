const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users.model');

const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/auth-dugsiiye-mentorship")

app.post('/register', (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email, password: password})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("success")
            }else{
                res.json("the password is incorrect")
            }
        }else{
            res.json("record is not exist")
        }
    })
})

app.listen(8000, () => {
    console.log("listening on port 8000")
})