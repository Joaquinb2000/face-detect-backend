const imageLook =  (req, res, db)=>{
    const { email }= req.body;
    db('users').where('login_email', '=', email)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json({error: "Error during process:\n"}))
}

module.exports={
    imageLook:imageLook
}
