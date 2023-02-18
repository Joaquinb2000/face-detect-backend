const { db } = require("./database")

const runSchema = async () =>{
    try{
        await db.schema.createTable('login', (table) =>{
            table.increments('id');
            table.string('email');
            table.string('hash')
        })

        await db.schema.createTable('users', (table) => {
            table.string('email');
            table.string('name');
            table.timestamp('joined').defaultTo(db.fn.now())
            table.integer('entries')
        })
    }
    catch(e){
        console.log("This tables exist already")
    }
}

runSchema()
