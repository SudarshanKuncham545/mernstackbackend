const express = require('express');
const dotEnv = require('dotenv');
const TaskSchema = require('./model');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000

dotEnv.config();

app.use(express.json());
app.use(cors({
    origin: '*'
}))


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected Successfully!")
}).catch((error)=>{
    console.log(`${error}`)
})

app.post('/addtodo',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo : todo
        });
        await newData.save();
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err)
    }
})

app.get('/gettodo', async(req,res)=>{
    try{
        return res.json(await TaskSchema.find());
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find())
    }
    catch(err){
        console.log(err);
    }
})

app.listen(PORT, ()=> {
    console.log(`server started and running at ${PORT}`)
});
