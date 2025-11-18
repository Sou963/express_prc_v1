const express=require('express');
const app=express();
const port=3000;

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
});

const muddleware=(req,res,next)=>{
    console.log('this is a muddleware function');
    req.current=new Date(Date.now());
    next();
}

app.use(muddleware);
app.get('/',(req,res)=>{
    res.send(`<h1>Welcome to Lesson 07</h1><p>Current Date and Time: ${req.current}</p>`)
})