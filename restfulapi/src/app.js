const express=require('express');
const app = express();
const https = require('https');

require("./db/conn");

const Student = require("./models/students")

const port = process.env.PORT || 8000;

app.use(express.json())
app.use(express.urlencoded({    extended:false   }));

//submit data
app.post("/students",(req,res)=>{
    console.log(req.body)
    
    const user=new Student(req.body)
    res.send(user)
    user.save().then(()=>{
        res.status(201).send(user)
     
    }).catch((e)=>{
        res.status(400).send(e)
    })
    res.redirect('/')
    // res.send("hello from this side")
})

//get data 
app.get("/students",async (req,res)=>{
    try{
        const studentsData= await Student.find();
        res.send(studentsData)
    }catch(e){
        res.send(e)
    }
})



//delete data 
app.delete("/students/:id",async (req,res)=>{
    try{
        const deleteStudents= await Student.findByIdAndDelete(req.params.id);
        if(!req.params.id){
            return res.status(400).send().json;
        }
        res.send(deleteStudents)
    }catch(e){
        res.status(500).send(e)
    }
})



//get data  single user
app.get("/students/:id",async (req,res)=>{
    try{
        const _id = req.params.id;  
        const studentData= await Student.findById(_id);
             res.render("update",{
                name:studentData.name,
                email:studentData.email,
                mobile:studentData.mobile,
                address:studentData.address,
                _id:studentData._id
            })
            // res.send(studentData)
        
    }catch(e){
        res.status(500).send(e)
    }
})



//patch data
app.post("/students/:id",async (req,res)=>{
  try{
    const _id=req.params.id;
  const updateStudents = await  Student.findByIdAndUpdate(_id,req.body);
  
  res.send(updateStudents);
  }catch(e){
    res.status(404).send(updateStudents);
  }
})


app.set("view engine","hbs");

app.get("/",async(req,res)=>{
    try{
        const studentsData= await Student.find();
         res.render("index",{
            studentsData
            
        })
    }catch(e){
        res.send(e)
    }
       
})

app.listen(port,()=>{
    console.log(`connecting to setup ${port}`);
})



