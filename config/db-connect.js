const express = require('express');
const config = require('./db');
const MongoClient = require('mongodb').MongoClient;

module.exports = async function start(){
    try{
        console.log('In db-connect');
        const client = new MongoClient(config.db, { 
            useUnifiedTopology: true,
            useNewUrlParser: true 
        });

        await client.connect(err => {
            const collection = client.db("test").collection("devices");
            client.close();
        });
    }catch(e) {
        console.log(e);
    }
}

// module.exports = modele;

