const http=require('http');
http.createServer((req,res)=>{
    res.end("<h1>My mother name is Mukta Bosu.</h1>");
}).listen(3000);
// http://localhost:3000