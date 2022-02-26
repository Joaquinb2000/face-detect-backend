const handleRegister= (req, res, db, bcrypt, Saltrounds)=> {
    const {email, name, password}= req.body;
    const hashed= bcrypt.hashSync(password, Saltrounds);
    db.transaction(trx => {
        trx.insert({
            hash: hashed,
            email: email,
        }) 
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*')
                .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch (err => res.status(400).json("REGISTER ERROR"));
}

module.exports={
    handleRegister:handleRegister
}