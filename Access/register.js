const handleRegister= (req, res, db, bcrypt, Saltrounds)=> {
    const {email, name, password}= req.body;
    if(password.length < 8){
        throw {error: "password can't be shorter than 8 characters"}
    }
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
                    login_email: loginEmail[0].email,
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
    .catch (err => {
        return res.status(400).json({error: `REGISTER ERROR:\n ${err}`})
    });
}

module.exports={
    handleRegister:handleRegister
}
