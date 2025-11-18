const express=require('express');
const path=require('path');
const remove=express.Router();
const {MongoClient,ObjectId}=require('mongodb');
const url='mongodb+srv://souravbosu844_db_user:6rRjJS8E4oyhmtJm@cluster03.wepgfva.mongodb.net/?appName=Cluster03';
const client=new MongoClient(url);
const dbname='test';
remove.delete('/api/delete/:id',async(req,res)=>{
    const Id=req.params.id;
    try{
        await client.connect();
        const db=client.db(dbname);
        const col=db.collection('users');
        const result=await col.deleteOne({_id:new ObjectId(Id)});
        if(result.deletedCount==1){
            res.json({message:'User deleted successfully'});
        }
        else{
            res.status(404).json({message:'user not found'});
        }
    }
    catch(err){
        console.error('Error deleting user:',err);
        res.status(500).json({error:'Internal Server Error'});
    }
    finally{
        await client.close();
    }
})
module.exports=remove;