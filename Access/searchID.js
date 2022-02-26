const searchID = (req, res, db) =>{ 
    const { id }= req.params;
    db.select('*').from('users').where({
    id: id
    }).then(user => {
        if (user.length)
            res.json(user[0]);
        
        else
            res.status(400).json('Not found');
    })
    .catch(err => res.status(400).json("Error during process"))
}

module.exports ={
    searchID:searchID
}