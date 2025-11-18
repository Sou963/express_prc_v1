const express=require('express');
const oneuser=express.Router();
const path=require('path');
const {MongoClient,ObjectId}=require('mongodb');
const url='mongodb+srv://souravbosu844_db_user:6rRjJS8E4oyhmtJm@cluster03.wepgfva.mongodb.net/?appName=Cluster03';
const dbname='test';
const client=new MongoClient(url);
//middleware

oneuser.use(express.urlencoded({extended:true}));
oneuser.use(express.json());
oneuser.use(express.static(path.join(__dirname, "public")));

//one user html file 
oneuser.get('/userone/:id',async(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/userone.html'));
})
//get one user by id

oneuser.get('/api/oneuser/:id',async(req,res)=>{
    const id=req.params.id;
    try{
        await client.connect();
        const db=client.db(dbname);
        const col=db.collection('users');
        const user=await col.findOne({_id:new ObjectId(id)});
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).json({message:"User not found"});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error"});
    }finally{
        await client.close();
    }
})
module.exports=oneuser;