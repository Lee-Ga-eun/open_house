const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5001;
const fs=require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// db
const data=fs.readFileSync('./database.json');
const conf=JSON.parse(data);
const mysql=require('mysql');

const connection=mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

app.get('/api/hello',(req,res)=>{
    res.send({message: 'Hello Express'});
});

app.get('/api/dbTest',(req,res)=>{
    // res.send({message:"DB연결테스트"})
    connection.query(
        "SELECT * FROM TEST",
        (err,rows,fields)=>{
            res.send(rows);
        }
    );

});

app.get('/api/houses',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
    // res.send({message:"DB연결테스트"})
    connection.query(
        "SELECT * FROM TEST",
        (err,rows,fields)=>{
            res.send(rows);
        }
    );
});


app.listen(port,()=>console.log(`PORT OPEN SUCCESS, PORT NUM: ${port}`));
