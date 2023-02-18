const express  = require('express');
const bcrypt   = require('bcrypt');
const cors     = require('cors');
const signin   = require("./Access/signin");
const register = require ("./Access/register");
const search   = require('./Access/searchID');
const image    = require('./Access/image');
const API      = require('./Access/APIcall') ;
const { db }   = require('./database')

const port = process.env.PORT || 3000

const Saltrounds= 10;

const app= express();

app.use(express.json());
app.use(cors());

app.post("/signin", (req, res)=>{signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, Saltrounds)});

app.get('/profile/:id', (req, res) =>{search.searchID(req, res, db)});

app.put("/image", (req, res) =>{image.imageLook(req, res, db)});

app.post("/API", (req, res) => {API.handleAPICall(req, res)});

app.listen(port, () =>{
  console.log (`Server started on port ${port}`)
})

module.exports = {
  db: db
}
