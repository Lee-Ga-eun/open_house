const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5001;
const fs=require('fs');
const cors =require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

// db
const data=fs.readFileSync('./database.json');
const conf=JSON.parse(data);
const mysql=require('mysql');
// const { default: DbTest } = require('./client/src/components/dbtest_');


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

// app.post('/api/houses/upload',(req,res)=>{
//     res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
//     const name=req.body.name;
//     const sqlQuery="INSERT INTO Test(NAME) VALUES (?)";
//     connection.query(sqlQuery, [name], (err,result)=>{
//         res.send('success');
//     });
    
// });

app.post('/api/houses/upload',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
    const sido=req.body.sido;
    const author=req.body.author;
    const sigungu=req.body.sigungu;
    const dong=req.body.dong;
    const content=req.body.content;
    const image=req.body.image;
    const title=req.body.title;

    const sqlQuery="INSERT INTO Posting(AUTHOR, SIDO, SIGUNGU, DONG, CONTENT, IMAGE,TITLE) VALUES (?,?,?,?,?,?,?)";
    connection.query(sqlQuery, [author, sido, sigungu,dong,content,image,title], (err,result)=>{
        res.send('success');
    });
    
});

app.get('/api/houses/upload',(req,res)=>{
    // res.send({message:"DB연결테스트"})
    connection.query(
        "SELECT * FROM TEST",
        (err,rows,fields)=>{
            res.send(rows);
        }
    );

});

app.listen(port,()=>console.log(`PORT OPEN SUCCESS, PORT NUM: ${port}`));
