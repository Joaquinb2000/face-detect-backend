const express  = require('express');
const bcrypt   = require('bcrypt');
const cors     = require('cors');
const knex     = require ('knex');
const signin   = require("./Access/signin");
const register = require ("./Access/register");
const search   = require('./Access/searchID');
const image    = require('./Access/image');
const API      = require('./Access/APIcall') ;

const basic= {
    box: {},
    ImageURL: '',
    input: '',
    route: "signin",
    isSignedIn: false,
    user: {
      email  : "",
      id     : "",
      name   : "",
      entries: 0,
      joined : "",
    }
}

const db= knex({
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      port     : 5432,
      user     : 'postgres',
      password : 'l3arn1ngHW2Uz',
      database : 'face detect'
    }
  });

const Saltrounds= 10;

const app= express();

app.use(express.json());
app.use(cors());

app.post("/signin", (req, res)=>{signin.handleSignin(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, Saltrounds)});

app.get('/profile/:id', (req, res) =>{search.searchID(req, res, db)});

app.put("/image", (req, res) =>{image.imageLook(req, res, db)});

app.post("/API", (req, res) => {API.handleAPICall(req, res)});

app.listen(4000, () =>{
  console.log ("Server started")
})