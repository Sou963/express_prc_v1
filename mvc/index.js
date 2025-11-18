const express=require('express');
const app=express();
const port=3000;
const controller=require('./controller/control')




app.use(controller);
app.use((req,res,next)=>{
    res.status(404).json({
        message:"Route not found"
    });
})
app.listen(port,()=>{
    console.log(`MVC app listening at http://localhost:${port}`);
});