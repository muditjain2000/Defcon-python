
const express = require('express')
const router = express.Router()
const registerTemplateCopy=require('../models/RegisterModel')
const faceDetection=require('../models/DetectionModel')
const countFace=require('../models/CountModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const dotenv=require('dotenv')
const config= require('config')
const {check,validationResult} = require('express-validator')
const spawn = require('child_process').spawn;



router.post("/python",async(req,res)=>{
    try {
        const process = spawn('python',['./final_minor.py']);
    process.stdout.on('data',data=>{
        const count=data.toString();
        console.log(count);
        const c=parseInt(count);
        let countData= new countFace({
            count:c,
            
        }) 
        countData.save();
    })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:"Server Error..."})
    }
    
})
router.post("/python1",async(req,res)=>{
    try {
        const process = spawn('python',['./python_ritik.py']);
    process.stdout.on('data',data=>{
        const faceData=data.toString();
        
        const finalData=faceData.split("~");
        console.log(finalData);
        const ar=JSON.parse(finalData[0])
        console.log(ar);
        let face = new faceDetection({
            detect: ar,
            face:finalData[1]
            
        }) 
        face.save();
    })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:"Server Error..."})
    }
    
})

router.get("/dashboard", async (req, res) => {
    const detect = await faceDetection.find()
      .select("-__v")
      .sort("detect");
    res.send(detect);
  });
  router.get("/dashboard1", async (req, res) => {
    const detect = await countFace.find()
      .select("-__v")
      .sort("count");
    res.send(detect);
  });

//dotenv.config()
router.put("/register/:id",
[check('email','Enter valid E-mail').isEmail(),
// check('password','Password is Required').not().isEmpty(),
check('name','Name is Required').not().isEmpty()
], async (req, res) => {
    try {
        
        // console.log(req.params.id)
        //let user = await registerTemplateCopy.findById(req.params.id);

        const errors =validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({erros : errors.array()});
        }
        // const saltPassword = await bcrypt.genSalt(10)
        // const securePassword = await bcrypt.hash(req.body.password, saltPassword)

        /*if(bcrypt.compare(req.body.password,user.password)){
         const update = await registerTemplateCopy.findByIdAndUpdate(
                req.params.id,
                {
                  name: req.body.name,
                  
                  email: req.body.email,
                  password: req.body.password
                },
                { new: true }
              )
              console.log("if")
              if (!update)
                return res.status(404).send("The user with the given ID was not found.");
    
            res.send(update);
        }*/
        //else{
            const update = await registerTemplateCopy.findByIdAndUpdate(
                req.params.id,
                {
                  name: req.body.name,
                  
                  email: req.body.email,
                //   password: securePassword
                },
                
              );
              
              
              if (!update)
                return res.status(404).send("The user with the given ID was not found.");
    
            
            const payload ={
                user:{
                    id: update.id,
                    name: req.body.name,
                    email: req.body.email,
                    password: update.password
                }
            }
            
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (error,token) => {
                    if(error) throw error;
                    res.json({token});
                    
                }
                //config.get('jwtSecret')
            )
       // }
        
        
        
      
      
    
      
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg:"Server Error..."})
    }
   
});

router.delete("/register/:id",  async (req, res) => {
    const user = await registerTemplateCopy.findByIdAndRemove(req.params.id);
  
    if (!user)
      return res.status(404).send("The user with the given ID was not found.");
  
    res.send(user);
  });

router.post('/login',
[check('email','Enter valid E-mail').isEmail(),
check('password','Password is Required').not().isEmpty(),

], 
async(request,response)=>{
    try {
        const{email,password}=request.body;
        let user = await registerTemplateCopy.findOne({email});
        const errors =validationResult(request);

        if(!errors.isEmpty()){
            return response.status(401).json({erros : errors.array()});
        }

        if(!user){
            return response.status(401).json({msg: "There is no user with this email"});
        }

        let isPasswordMatch = await bcrypt.compare(password,user.password);

        if(isPasswordMatch){
            const payload ={
                user:{
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                (error,token) => {
                    if(error) throw error;
                    response.json({token});
                }
                //config.get('jwtSecret')
            )
        }
        else{
            return response.status(401).json({msg:"Wrong Password"})
        }

        
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({msg:"Server Error..."})
    }
    
})

router.post('/register',
 [
    // check('file','File is Required').not().isEmpty(),
    check('email','Enter valid E-mail').isEmail(),
  check('password','Password is Required').not().isEmpty(),
  check('name','Name is Required').not().isEmpty()
 ],
 async (request,response)=>{
     try{
        let{email,password,name}=request.body;
        let user= await registerTemplateCopy.findOne({email});

        const errors =validationResult(request);

        if(!errors.isEmpty()){
            return response.status(401).json({erros : errors.array()});
        }

        if(user){
            return response.status(401).json({msg: "There is already a user with this email"});
        }
        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, saltPassword)

        user = new registerTemplateCopy({
            // file:file,
            name:name,
            email:email,
            password:securePassword
        }) 
        
        await user.save();

        const payload ={
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            (error,token) => {
                if(error) throw error;
                response.json({token});
            }
            //config.get('jwtSecret')
        )
    }
    catch(error){
        console.log(error.message);
        return response.status(500).json({msg:"Server Error..."})
    }
   
    })

    router.post('/hi', async (req,res)=>{
        try{
            res.send('hello')
        }
        catch(error){
            console.log(error.message)
        }
    })

module.exports = router