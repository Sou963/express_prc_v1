const express=require('express');
const path=require('path');
const {MongoClient}=require('mongodb');
const show=express.Router();
const url='mongodb+srv://souravbosu844_db_user:6rRjJS8E4oyhmtJm@cluster03.wepgfva.mongodb.net/?appName=Cluster03';
const client=new MongoClient(url);
const dbname='test';
show.get('/show',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/show_data.html'));
});

show.get('/api/show',async(req,res)=>{
    try{
        await client.connect();
        const db=client.db(dbname);
        const col=db.collection('users');
        const data=await col.find().toArray();
        res.json(data);
    }catch(err){
        console.error('Error fetching users:', err);
        res.status(500).json({error:'Internal Server Error'});
    }
    finally{
        await client.close();
    }
});
module.exports=show;