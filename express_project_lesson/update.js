const express=require('express');
const update=express.Router();
const path=require('path');
const {MongoClient,ObjectId}=require('mongodb');
const url='mongodb+srv://souravbosu844_db_user:6rRjJS8E4oyhmtJm@cluster03.wepgfva.mongodb.net/?appName=Cluster03';
const client=new MongoClient(url);
const dbname='test';
// update.use(express.json());

update.put('/api/update/:id',async(req,res)=>{
    const id=req.params.id;
    const {username,password}=req.body;
    try{
        await client.connect();
        const db=client.db(dbname);
        const col=db.collection('users');
        const result=await col.updateOne({_id:new ObjectId(id)},{$set:{username,password}});
        if(result.modifiedCount==1){
            res.status(200).json({message:'User updated successfully'});
        }
        else{
            res.status(404).json({message:'user not found'});
        }

    }
    catch(err){
        console.log('error is there',err);
        res.status(500).json({message:'internal server error'});
    }
   
})
module.exports=update;