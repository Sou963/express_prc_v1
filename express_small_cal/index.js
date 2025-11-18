const express=require('express');
const app=express();
const port=3000;
const bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

app.get('/',(req,res)=>{
   res.sendFile(__dirname+'/router/index.html');
});

app.get('/circle',(req,res)=>{
   res.sendFile(__dirname+'/router/circle.html');
});

app.get('/triangle',(req,res)=>{
   res.sendFile(__dirname+'/router/triangle.html');
});
app.post('/circle',(req,res)=>{
    const redius=req.body.redius;
    const area=3.1416*(redius*redius);
    res.send(`<h2>Area of Circle is : ${area}</h2>`);
})
app.post('/triangle',(req,res)=>{
    const base=req.body.base;
    const height=req.body.height;
    const area=0.5*base*height;
    res.send(`<h2>Area of Triangle is : ${area}</h2>`);
})
