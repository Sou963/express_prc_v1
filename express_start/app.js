const express=require('express');
const app=express();
const pageRoute=require('./routers/page_route');
app.use(pageRoute);
app.use((req,res)=>{
    res.send("404 page not found");
})
module.exports=app;