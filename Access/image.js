const imageLook =  (req, res, db)=>{   
    const { id }= req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json("Error during process:\n", err))
}

module.exports={
    imageLook:imageLook
}