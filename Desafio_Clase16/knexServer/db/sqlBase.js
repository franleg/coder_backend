import knex from 'knex';

const sqliteOptions = {
    client: 'sqlite3',
    connection: {
        filename: './sqliteDatabase.sqlite'
    },
    useNullAsDefault: true
};

let db = knex(sqliteOptions);

try{
    let tableExists = await db.schema.hasTable('products');
    if(tableExists){
        //await db('products').del();
    }else{
        await db.schema.createTable('products', table =>{
            table.primary('id');
            table.increments('id');
            table.string('title', 30).nullable(false);
            table.float('price');
            table.string('image');
        })
    }
    
}catch(error) {
    console.log(error);
}

try{
    let tableExists = await db.schema.hasTable('messages');
    if(tableExists){
        //await db('messages').del();
    }else{
        await db.schema.createTable('messages', table =>{
            table.string('user', 30).nullable(false);
            table.string('message');
            table.timestamp('time')
        })
    }

}catch(error) {
    console.log(error);
}

export default db;