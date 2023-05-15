const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Xaajimacow3321",
    database:"dbsmschool"
});

server.post("/api/student/add", (req,res) => {
    let details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (err,data) => {
        if(err){
            res.send({status: false, message: "Student created failed"});
        }else {
            res.send({status: true, message: "Student created successfully"})
        }
    })
});

server.get("/api/student",(req,res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, (err,result) => {
        if(err) {
            console.log("Error Connection to DB");
        }else {
            res.send({status: true, data: result});
        }
    })
});

server.get("/api/student/:id", (req,res) => {
    var studentid = req.params.id;
    var sql = "SELECT* FROM student WHERE id = ?";
    db.query(sql,studentid, (err,result) => {
        if(err) {
            console.log("Error Connection to DB")
        }else {
            res.send({status:true, data: result});
        }
    })
});

server.put("/api/student/update/:id", (req,res) => {
    let sql = 
    "UPDATE student SET stname = '"+ req.body.stname +"' , course = '"+ req.body.course +"' , fee = '"+ req.body.fee +"' WHERE id = '"+ req.body.id +"'";

    let a = db.query(sql, (error) => {
        if(error) {
            res.send({status: false, message: "Student update failed!"});
        }else {
            res.send({status: true, message: "Student updated successfully!"});
        }
    });

});

server.delete("/api/student/delete/:id", (req,res) => {
    let sql = "DELETE FROM student WHERE id =" + req.params.id + "";
    let stid = req.body.id;
    db.query(sql, (error) => {
        if(error){
            res.send({status: false, message: "Student Deleted Failed!"});
        }else {
            res.send({Status: true, message: "Student Deleted Successfully!"})
        }
    });

});


server.listen(8800, (req,res) => console.log("Server Started!"));

db.connect(function(err) {
    if(err) {
        console.log(err)
    }else {
        console.log("Successfully Connected to DB");
    }
});




