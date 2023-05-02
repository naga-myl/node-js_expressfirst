//import database
const dbDriver= require('better-sqlite3');
//connect to db

const db=dbDriver('bands.sqlite3');

//import express
const express = require('express');

//create express app
const app= express();

//express setup
//server a static frontend
app.use(express.static('frontend'));

//tell express to use json
app.use(express.json());

//Rest api routes

app.get('/bands',(req,res)=>
{
const bands= db.prepare('select * from bands ').all();
//send back json
res.json(bands);
});

app.get('/bands/:id',(req,res)=>
{
    //get the url id
    const id= req.params.id;
    let statement =db.prepare('select * from bands where id =:id');
    let result =statement.all(
        {
            id 

        });
    

    //send back band or error
    res.json(result[0]||{'error': 'no band matching id'});
});

//start from the server
app.listen(3000, ()=> 
{
    console.log('server started on port 3000');
});
