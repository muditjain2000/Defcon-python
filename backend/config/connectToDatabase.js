
const mongoose = require('mongoose')
//const dotenv= require('dotenv')
const config=require('config')

//dotenv.config()

const ConnectToDatabase = async()=>{
    try{
        await mongoose.connect(config.get('mongoURI'),
            {
                useCreateIndex:true,
                useFindAndModify:true,
                useUnifiedTopology:true,
                useNewUrlParser:true
            }, 
        ()=> console.log("Database Connected"))
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}
module.exports=ConnectToDatabase;