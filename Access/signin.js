const handleSignin =(req, res, db, bcrypt)=>{
    const { email, password } = req.body;
    db.select('email', 'hash').from('login')
        .where("email", '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
                if (isValid)
                    db('*').from('users').where('login_email', '=', email)
                        .then(user => res.json(user[0]))
                        .catch(err => {res.status(400).json("Unable to get user")})

                else
                    res.json("Wrong credentials");

    })
    .catch(err => res.status(400).json({error: `wrong credentials ${err}`}));
}

module.exports ={
    handleSignin: handleSignin
}
