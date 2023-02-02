const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const port=process.env.PORT || 5001;
const fs=require('fs');
const cors =require('cors');


const multer=require('multer');
const upload=multer({dest:'./upload'});

app.use(bodyParser.json());
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

/*
app.post('/api/houses/upload', (req,res)=>{
    res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
    const sido=req.body.sido;
    const author=req.body.author;
    const sigungu=req.body.sigungu;
    const dong=req.body.dong;
    const content=req.body.content;
    const image=req.body.image;
    const title=req.body.title;
    //let image='http://localhost:5001/image/'+req.file.filename;

    const sqlQuery="INSERT INTO Posting(AUTHOR, SIDO, SIGUNGU, DONG, CONTENT, IMAGE,TITLE) VALUES (?,?,?,?,?,?,?)";
    connection.query(sqlQuery, [author, sido, sigungu,dong,content,image,title], (err,result)=>{
        res.send('success');
    });
    
});*/

app.get('/api/houses/upload',(req,res)=>{
    // res.send({message:"DB연결테스트"})
    connection.query(
        "SELECT * FROM Posting",
        (err,rows,fields)=>{
            res.send(rows);
        }
    );

});

app.post('/api/houses/upload', upload.single('image'),(req,res,err)=>{
    res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
    const sido=req.body.sido;
    const author=req.body.author;
    const sigungu=req.body.sigungu;
    const dong=req.body.dong;
    const content=req.body.content;
    const title=req.body.title;
    let image='/image/'+req.file.filename;

    console.log(req.file.filename);

    //let image='http://localhost:5001/image/'+req.file.filename;

    const sqlQuery="INSERT INTO Posting(AUTHOR, SIDO, SIGUNGU, DONG, CONTENT, IMAGE,TITLE) VALUES (?,?,?,?,?,?,?)";
    connection.query(sqlQuery, [author, sido, sigungu,dong,content,image,title], (err,result)=>{
        res.send('success');
    });
    
});

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/image',express.static('./upload'));

app.post('/api/imgtest', upload.single('image'),(req,res,err)=>{
    res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
    let sql= 'INSERT INTO IMGTEST(ID, NAME, profileImage,filename,fileByteName) VALUES(null,?,?,?,?)';
    //console.log(req.data.name);
    //console.log(req.body.profile_img);
    let image='/image/'+req.file.filename;
    console.log(image);
    const name=req.body.name;
    console.log("이름들어가는지확인",name);
    console.log(req.file.name);
    //const profile_img=req.file.filename;
    //console.log(profile_img);
    let filename=req.body.realfilename;

    let fileByteName=req.file.filename;
    console.log("fileByateName",fileByteName);
    connection.query(sql, [name,image,filename, fileByteName],(rows, err,result)=>{
        res.send(rows)
        if(err){
            console.log("에러발생",err);
        };
    })

});

app.get('/api/imgtest',(req,res)=>{
    connection.query(
        "SELECT * FROM IMGTEST", (err,rows,files)=>{
            res.send(rows);
            console.log("에러",err);
        }
    )
});

app.get('/api/imgtest/fileByteName',(req,res)=>{
    res.header("Access-Control-Allow-Origin", "*"); // cors 에러 해결
    connection.query(
        "SELECT fileByteName from IMGTEST ORDER BY ID DESC LIMIT 1",(err,rows,files)=>{
            res.send(rows);
        }
    )
});




app.listen(port,()=>console.log(`PORT OPEN SUCCESS, PORT NUM: ${port}`));
